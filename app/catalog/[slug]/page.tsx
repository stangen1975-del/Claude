import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ProductCard from "@/components/ProductCard";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/products";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    alternates: {
      canonical: `/catalog/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.relatedSlugs);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-1 text-sm font-body text-neutral">
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/catalog"
              className="hover:text-primary transition-colors"
            >
              Каталог
            </Link>
            <ChevronRight size={14} />
            <span className="text-dark font-bold">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-primary font-body text-sm uppercase tracking-wide mb-2">
            {product.category}
          </p>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold mb-6">
            {product.name}
          </h1>
          <Link
            href="#form"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded transition-colors font-body"
          >
            Запросить цену
          </Link>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-semibold text-dark mb-6">
            Описание
          </h2>
          <div className="space-y-4 font-body text-neutral leading-relaxed">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-12 bg-light">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-semibold text-dark mb-6">
            Применение
          </h2>
          <ul className="space-y-3">
            {product.applications.map((a) => (
              <li key={a} className="flex items-start gap-3 font-body text-neutral">
                <CheckCircle2
                  size={20}
                  className="text-primary shrink-0 mt-0.5"
                />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-semibold text-dark mb-8 text-center">
            Преимущества
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {product.advantages.map((a) => (
              <div
                key={a.title}
                className="bg-light rounded-lg p-6 border border-gray-200"
              >
                <h3 className="font-heading text-lg font-semibold text-dark mb-2">
                  {a.title}
                </h3>
                <p className="text-neutral font-body text-sm">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-12 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-semibold text-dark mb-8 text-center">
            Технические характеристики
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body border-collapse">
              <thead>
                <tr className="bg-dark text-white">
                  {product.table.headers.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.table.rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-primary/5 transition-colors`}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-4 py-3 text-neutral border-b border-gray-200 whitespace-nowrap"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-semibold text-dark mb-8 text-center">
            Запросить цену на {product.name}
          </h2>
          <div className="bg-light rounded-lg p-8 border border-gray-200">
            <ContactForm product={product.name} />
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-12 bg-light">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-heading text-2xl font-semibold text-dark mb-8 text-center">
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {related.map((p) => (
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
      )}
    </>
  );
}
