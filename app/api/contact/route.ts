import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, company, product, message } = await req.json();

    if (!name || !phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json(
        { error: "Заполните обязательные поля" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.YANDEX_EMAIL,
        pass: process.env.YANDEX_APP_PASSWORD,
      },
    });

    const now = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    await transporter.sendMail({
      from: process.env.YANDEX_EMAIL,
      to: "info@pruzhina-metizdetal.ru",
      subject: `Заявка с сайта — ${product || "Общая"} — ${name}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <table style="border-collapse:collapse;font-family:Arial,sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;">Имя:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Телефон:</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Компания:</td><td style="padding:8px;">${company || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Интересует:</td><td style="padding:8px;">${product || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Сообщение:</td><td style="padding:8px;">${message || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Дата:</td><td style="padding:8px;">${now}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Ошибка отправки" },
      { status: 500 }
    );
  }
}
