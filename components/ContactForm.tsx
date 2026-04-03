"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

interface ContactFormProps {
  product?: string;
}

export default function ContactForm({ product }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      product: (form.elements.namedItem("product") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-green-800 font-body">
        <p className="font-bold text-lg mb-1">Спасибо!</p>
        <p>Мы свяжемся с вами в течение часа.</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="bg-red-50 border border-red-300 rounded-lg p-6 text-red-800 font-body">
        <p className="font-bold text-lg mb-1">Ошибка отправки</p>
        <p>
          Позвоните нам:{" "}
          <a href="tel:88002015277" className="underline font-bold">
            8-800-201-52-77
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-body">
      <div>
        <label htmlFor="cf-name" className="block text-sm font-bold text-neutral mb-1">
          Ваше имя <span className="text-primary">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label htmlFor="cf-phone" className="block text-sm font-bold text-neutral mb-1">
          Телефон <span className="text-primary">*</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          required
          minLength={10}
          placeholder="+7 (___) ___-__-__"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div>
        <label htmlFor="cf-company" className="block text-sm font-bold text-neutral mb-1">
          Компания
        </label>
        <input
          id="cf-company"
          name="company"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <input type="hidden" name="product" value={product || ""} />

      <div>
        <label htmlFor="cf-message" className="block text-sm font-bold text-neutral mb-1">
          Сообщение
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 size={18} className="animate-spin" />}
        Отправить заявку
      </button>
    </form>
  );
}
