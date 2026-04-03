import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://umr-cable.ru"),
  title: {
    default:
      "УралМеталлРесурс — оптоволоконные кабели оптом из Китая",
    template: "%s | УралМеталлРесурс",
  },
  description:
    "Прямые поставки оптоволоконных кабелей из Китая. GYTA, FTTH, ADSS, GYTA53 оптом. Склад в наличии. Работаем с НДС. Тел: 8-800-201-52-77",
  openGraph: {
    type: "website",
    siteName: "УралМеталлРесурс",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
