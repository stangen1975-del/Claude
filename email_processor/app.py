import os
import re
import uuid
import asyncio
import json
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO

import dns.resolver
import pandas as pd
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify, send_file, render_template

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
RESULT_DIR = os.path.join(os.path.dirname(__file__), "results")
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

EMAIL_RE = re.compile(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)

ROLE_PREFIXES = {
    "abuse", "admin", "billing", "compliance", "devnull", "dns", "ftp",
    "hostmaster", "info", "inoc", "ispfeedback", "ispsupport", "list",
    "maildaemon", "mailerdaemon", "marketing", "noc", "noreply", "no-reply",
    "null", "phish", "phishing", "postmaster", "privacy", "registrar",
    "root", "sales", "security", "spam", "support", "sysadmin", "tech",
    "undisclosed-recipients", "unsubscribe", "usenet", "uucp", "webmaster",
    "www",
}

DISPOSABLE_DOMAINS: set[str] = set()


def load_disposable_domains():
    global DISPOSABLE_DOMAINS
    try:
        resp = requests.get(
            "https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf",
            timeout=10,
        )
        if resp.status_code == 200:
            DISPOSABLE_DOMAINS = {
                line.strip().lower()
                for line in resp.text.splitlines()
                if line.strip() and not line.startswith("#")
            }
    except Exception:
        DISPOSABLE_DOMAINS = {
            "mailinator.com", "guerrillamail.com", "tempmail.com",
            "throwaway.email", "yopmail.com", "sharklasers.com",
            "guerrillamailblock.com", "grr.la", "discard.email",
            "trashmail.com", "10minutemail.com", "temp-mail.org",
        }


def is_valid_syntax(email: str) -> bool:
    if not email or len(email) > 254:
        return False
    return EMAIL_RE.match(email) is not None


def is_role_based(email: str) -> bool:
    local = email.split("@")[0].lower()
    return local in ROLE_PREFIXES


def is_disposable(domain: str) -> bool:
    return domain.lower() in DISPOSABLE_DOMAINS


def check_mx(domain: str) -> bool:
    try:
        answers = dns.resolver.resolve(domain, "MX", lifetime=5)
        return len(answers) > 0
    except Exception:
        try:
            answers = dns.resolver.resolve(domain, "A", lifetime=5)
            return len(answers) > 0
        except Exception:
            return False


MX_CACHE: dict[str, bool] = {}


def check_mx_cached(domain: str) -> bool:
    if domain not in MX_CACHE:
        MX_CACHE[domain] = check_mx(domain)
    return MX_CACHE[domain]


def extract_emails_from_text(text: str) -> list[str]:
    pattern = r"[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    return re.findall(pattern, text)


def parse_uploaded_file(filepath: str, filename: str) -> list[str]:
    ext = os.path.splitext(filename)[1].lower()
    emails: list[str] = []

    if ext in (".csv", ".txt"):
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        emails = extract_emails_from_text(content)

    elif ext in (".xls", ".xlsx"):
        df = pd.read_excel(filepath, header=None, engine="openpyxl")
        for col in df.columns:
            for val in df[col].dropna().astype(str):
                emails.extend(extract_emails_from_text(val))

    return emails


def process_emails(
    raw_emails: list[str],
    remove_duplicates: bool = True,
    validate_syntax: bool = True,
    check_dns: bool = True,
    filter_role: bool = False,
    filter_disposable: bool = True,
    allowed_domains: list[str] | None = None,
    blocked_domains: list[str] | None = None,
) -> dict:
    results = []
    seen = set()

    for email in raw_emails:
        email = email.strip().lower()
        if not email:
            continue

        record = {
            "email": email,
            "valid_syntax": True,
            "duplicate": False,
            "has_mx": True,
            "role_based": False,
            "disposable": False,
            "domain_allowed": True,
            "status": "valid",
            "reason": "",
        }

        parts = email.split("@")
        if len(parts) != 2:
            record["valid_syntax"] = False
            record["status"] = "invalid"
            record["reason"] = "invalid format"
            results.append(record)
            continue

        domain = parts[1]

        if validate_syntax and not is_valid_syntax(email):
            record["valid_syntax"] = False
            record["status"] = "invalid"
            record["reason"] = "syntax error"
            results.append(record)
            continue

        if remove_duplicates:
            if email in seen:
                record["duplicate"] = True
                record["status"] = "duplicate"
                record["reason"] = "duplicate"
                results.append(record)
                continue
            seen.add(email)

        if filter_role and is_role_based(email):
            record["role_based"] = True
            record["status"] = "filtered"
            record["reason"] = "role-based address"
            results.append(record)
            continue

        if filter_disposable and is_disposable(domain):
            record["disposable"] = True
            record["status"] = "filtered"
            record["reason"] = "disposable domain"
            results.append(record)
            continue

        if allowed_domains:
            allowed_set = {d.strip().lower() for d in allowed_domains if d.strip()}
            if allowed_set and domain not in allowed_set:
                record["domain_allowed"] = False
                record["status"] = "filtered"
                record["reason"] = "domain not in allowlist"
                results.append(record)
                continue

        if blocked_domains:
            blocked_set = {d.strip().lower() for d in blocked_domains if d.strip()}
            if domain in blocked_set:
                record["domain_allowed"] = False
                record["status"] = "filtered"
                record["reason"] = "domain in blocklist"
                results.append(record)
                continue

        if check_dns:
            has_mx = check_mx_cached(domain)
            record["has_mx"] = has_mx
            if not has_mx:
                record["status"] = "invalid"
                record["reason"] = "no MX/A record"
                results.append(record)
                continue

        record["status"] = "valid"
        results.append(record)

    df = pd.DataFrame(results)
    total = len(results)
    valid = len(df[df["status"] == "valid"]) if not df.empty else 0
    invalid = len(df[df["status"] == "invalid"]) if not df.empty else 0
    duplicates = len(df[df["status"] == "duplicate"]) if not df.empty else 0
    filtered = len(df[df["status"] == "filtered"]) if not df.empty else 0

    return {
        "results": results,
        "stats": {
            "total": total,
            "valid": valid,
            "invalid": invalid,
            "duplicates": duplicates,
            "filtered": filtered,
        },
    }


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if not file.filename:
        return jsonify({"error": "Empty filename"}), 400

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in (".csv", ".txt", ".xls", ".xlsx"):
        return jsonify({"error": "Unsupported file type. Use CSV, TXT, XLS, or XLSX"}), 400

    file_id = str(uuid.uuid4())
    safe_name = file_id + ext
    filepath = os.path.join(UPLOAD_DIR, safe_name)
    file.save(filepath)

    emails = parse_uploaded_file(filepath, file.filename)

    return jsonify({
        "file_id": file_id,
        "filename": file.filename,
        "email_count": len(emails),
        "emails": emails,
    })


@app.route("/api/paste", methods=["POST"])
def paste_emails():
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    emails = extract_emails_from_text(data["text"])
    return jsonify({
        "email_count": len(emails),
        "emails": emails,
    })


@app.route("/api/process", methods=["POST"])
def process():
    data = request.get_json()
    if not data or "emails" not in data:
        return jsonify({"error": "No emails provided"}), 400

    options = data.get("options", {})
    allowed_domains = options.get("allowed_domains", "")
    blocked_domains = options.get("blocked_domains", "")

    result = process_emails(
        raw_emails=data["emails"],
        remove_duplicates=options.get("remove_duplicates", True),
        validate_syntax=options.get("validate_syntax", True),
        check_dns=options.get("check_dns", True),
        filter_role=options.get("filter_role", False),
        filter_disposable=options.get("filter_disposable", True),
        allowed_domains=[d.strip() for d in allowed_domains.split(",") if d.strip()] if allowed_domains else None,
        blocked_domains=[d.strip() for d in blocked_domains.split(",") if d.strip()] if blocked_domains else None,
    )

    return jsonify(result)


@app.route("/api/export", methods=["POST"])
def export_results():
    data = request.get_json()
    if not data or "results" not in data:
        return jsonify({"error": "No results to export"}), 400

    fmt = data.get("format", "csv")
    filter_status = data.get("filter_status", "valid")

    df = pd.DataFrame(data["results"])

    if filter_status != "all":
        df = df[df["status"] == filter_status]

    buf = BytesIO()

    if fmt == "xlsx":
        df.to_excel(buf, index=False, engine="openpyxl")
        buf.seek(0)
        return send_file(
            buf,
            mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            as_attachment=True,
            download_name="emails_export.xlsx",
        )
    elif fmt == "txt":
        content = "\n".join(df["email"].tolist())
        buf.write(content.encode("utf-8"))
        buf.seek(0)
        return send_file(
            buf,
            mimetype="text/plain",
            as_attachment=True,
            download_name="emails_export.txt",
        )
    else:
        df.to_csv(buf, index=False)
        buf.seek(0)
        return send_file(
            buf,
            mimetype="text/csv",
            as_attachment=True,
            download_name="emails_export.csv",
        )


@app.route("/api/scrape", methods=["POST"])
def scrape_emails():
    data = request.get_json()
    if not data or "url" not in data:
        return jsonify({"error": "No URL provided"}), 400

    url = data["url"]
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    try:
        resp = requests.get(url, timeout=15, headers={
            "User-Agent": "Mozilla/5.0 (compatible; EmailScraper/1.0)"
        })
        resp.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to fetch URL: {str(e)}"}), 400

    soup = BeautifulSoup(resp.text, "html.parser")
    text = soup.get_text(separator=" ")
    emails = list(set(extract_emails_from_text(text)))

    mailto_links = soup.find_all("a", href=re.compile(r"^mailto:"))
    for link in mailto_links:
        href = link.get("href", "")
        email = href.replace("mailto:", "").split("?")[0].strip()
        if email and email not in emails:
            emails.append(email)

    return jsonify({
        "url": url,
        "email_count": len(emails),
        "emails": emails,
    })


if __name__ == "__main__":
    load_disposable_domains()
    app.run(debug=True, host="0.0.0.0", port=5000)
