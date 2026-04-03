import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import {
  Truck,
  CircleDollarSign,
  Warehouse,
  Rocket,
  ShieldCheck,
  FileCheck2,
  Wifi,
  Building2,
  Factory,
} from "lucide-react";

const advantages = [
  {
    icon: Truck,
    title: "Прямые поставки",
    text: "Работаем напрямую с заводом Hunan GL Technology (Китай) — без посредников и наценок.",
  },
  {
    icon: CircleDollarSign,
    title: "Низкие цены",
    text: "Оптовые цены производителя. Чем больше объём — тем выгоднее условия.",
  },
  {
    icon: Warehouse,
    title: "Склад в наличии",
    text: "Широкий ассортимент в наличии на складе. Отгрузка в день заказа.",
  },
  {
    icon: Rocket,
    title: "Быстрая доставка",
    text: "Доставка по всей России транспортными компаниями. Уральский регион — самовывоз.",
  },
  {
    icon: ShieldCheck,
    title: "Сертификаты",
    text: "Вся продукция сертифицирована. Предоставляем полный пакет документов.",
  },
  {
    icon: FileCheck2,
    title: "Работаем с НДС",
    text: "Официальная поставка с полным комплектом закрывающих документов для юрлиц.",
  },
];

const audience = [
  {
    icon: Wifi,
    title: "Телеком-операторы",
    text: "Ростелеком, МТС, МегаФон, региональные провайдеры",
  },
  {
    icon: Building2,
    title: "Строительные организации",
    text: "Прокладка ВОЛС, инфраструктурные проекты",
  },
  {
    icon: Factory,
    title: "Промышленность и энергетика",
    text: "РЖД, Россети, нефтегазовый сектор",
  },
];

export default function HomePage() {
  const topProducts = products.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-dark text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-semibold mb-6">
            Оптоволоконные кабели оптом
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
            Прямые поставки из Китая — без посредников. Склад в наличии.
            Работаем с НДС.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded transition-colors font-body"
            >
              Запросить прайс
            </Link>
            <Link
              href="/catalog"
              className="border-2 border-white text-white hover:bg-white hover:text-dark font-bold py-3 px-8 rounded transition-colors font-body"
            >
              Смотреть каталог
            </Link>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-dark text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((a) => (
              <div key={a.title} className="flex gap-4">
                <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center shrink-0">
                  <a.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-dark mb-1">
                    {a.title}
                  </h3>
                  <p className="text-neutral text-sm font-body">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-dark text-center mb-12">
            Работаем с профессионалами отрасли
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audience.map((a) => (
              <div
                key={a.title}
                className="bg-white rounded-lg p-8 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <a.icon size={32} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-dark mb-2">
                  {a.title}
                </h3>
                <p className="text-neutral text-sm font-body">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP PRODUCTS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-dark text-center mb-12">
            Популярные позиции
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topProducts.map((p) => (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                name={p.name}
                shortDescription={p.shortDescription}
                tags={p.tags}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-primary-dark py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">
            Нужен оптоволоконный кабель для вашего проекта?
          </h2>
          <p className="text-white/80 text-lg font-body mb-8">
            Оставьте заявку — рассчитаем стоимость и сроки поставки
          </p>
          <Link
            href="/contacts"
            className="inline-block bg-white text-primary-dark hover:bg-gray-100 font-bold py-3 px-8 rounded transition-colors font-body"
          >
            Получить коммерческое предложение
          </Link>
        </div>
      </section>
    </>
  );
}
