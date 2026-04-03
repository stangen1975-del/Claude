import type { Metadata } from "next";
import Link from "next/link";
import {
  ClipboardList,
  Calculator,
  Truck,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "О компании ПКП УралМеталлРесурс — поставщик оптоволоконного кабеля из Китая",
  description:
    "ООО ПКП УралМеталлРесурс — прямые поставки оптоволоконных кабелей Hunan GL Technology из Китая. Работаем с телеком-операторами, строителями, промышленными предприятиями.",
};

const steps = [
  {
    icon: ClipboardList,
    title: "Заявка",
    text: "Вы описываете задачу или присылаете спецификацию",
  },
  {
    icon: Calculator,
    title: "Подбор и расчёт",
    text: "Мы подбираем кабель и рассчитываем стоимость за 1 день",
  },
  {
    icon: Truck,
    title: "Поставка",
    text: "Отгрузка со склада или под заказ из Китая",
  },
];

const stats = [
  { value: "20+", label: "лет опыта завода-производителя" },
  { value: "170+", label: "стран в которых работает GL Technology" },
  { value: "5", label: "складских позиций в наличии" },
  { value: "1 день", label: "срок расчёта КП" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
            О компании
          </h1>
          <p className="text-gray-400 font-body text-lg">
            ООО &laquo;ПКП УралМеталлРесурс&raquo; — надёжный поставщик
            оптоволоконных кабелей из Китая
          </p>
        </div>
      </section>

      {/* About text */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg font-body text-neutral max-w-none">
            <p>
              ООО &laquo;ПКП УралМеталлРесурс&raquo; специализируется на
              поставке высококачественных оптоволоконных кабелей из Китая. Мы
              являемся официальным партнёром завода Hunan GL Technology Co.,
              Ltd. — одного из ведущих производителей волоконно-оптических
              кабелей с 20-летним опытом работы и производственными мощностями до
              12 миллионов кор&middot;км в год.
            </p>
            <p>
              Наши клиенты — телекоммуникационные операторы, строительные
              организации, промышленные предприятия и энергетические компании по
              всей России.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-dark text-center mb-12">
            Как мы работаем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.title} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-heading text-2xl font-semibold">
                  {i + 1}
                </div>
                <h3 className="font-heading text-xl font-semibold text-dark mb-2">
                  {s.title}
                </h3>
                <p className="text-neutral font-body text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-2">
                  {s.value}
                </div>
                <p className="text-gray-400 font-body text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GL Technology */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 bg-light rounded-xl flex items-center justify-center shrink-0">
              <Award size={48} className="text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-dark mb-4">
                Hunan GL Technology Co., Ltd.
              </h2>
              <p className="text-neutral font-body mb-3">
                Китайский завод полного цикла производства оптоволоконных
                кабелей. Производительность: 45 000 кор&middot;км в сутки.
                Поставки в 170+ стран мира.
              </p>
              <p className="text-neutral font-body">
                <strong>Сертификаты:</strong> ISO 9001, ISO 14001, OHSMS 18001
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-dark py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-4">
            Готовы обсудить поставку?
          </h2>
          <Link
            href="/contacts"
            className="inline-block bg-white text-primary-dark hover:bg-gray-100 font-bold py-3 px-8 rounded transition-colors font-body"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </>
  );
}
