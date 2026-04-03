import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Каталог оптоволоконных кабелей оптом | УралМеталлРесурс",
  description:
    "Оптоволоконные кабели GYTA, FTTH Drop, GYTA53, ADSS, Figure-8 оптом. Прямые поставки из Китая. Склад в наличии. Тел: 8-800-201-52-77",
};

export default function CatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-4">
            Каталог продукции
          </h1>
          <p className="text-gray-400 font-body text-lg">
            Оптоволоконные кабели для любых задач — от абонентских подключений
            до магистральных сетей
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
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

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-neutral font-body text-lg mb-6">
            Не нашли нужную позицию? Мы поставляем полный ассортимент GL
            Technology — свяжитесь с нами.
          </p>
          <Link
            href="/contacts"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded transition-colors font-body"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </>
  );
}
