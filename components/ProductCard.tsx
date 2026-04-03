import Link from "next/link";
import { Cable, ArrowRight } from "lucide-react";

interface ProductCardProps {
  slug: string;
  name: string;
  shortDescription: string;
  tags: string[];
}

export default function ProductCard({
  slug,
  name,
  shortDescription,
  tags,
}: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col hover:shadow-lg hover:border-primary/30 transition-all group">
      <div className="w-12 h-12 bg-light rounded-lg flex items-center justify-center mb-4">
        <Cable size={24} className="text-primary" />
      </div>

      <h3 className="font-heading text-lg font-semibold text-dark mb-2 group-hover:text-primary-dark transition-colors">
        {name}
      </h3>

      <p className="text-neutral text-sm font-body mb-4 flex-1">
        {shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-light text-neutral text-xs font-body px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/catalog/${slug}`}
        className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-body font-bold text-sm transition-colors"
      >
        Подробнее
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
