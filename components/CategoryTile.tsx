import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/products";

export default function CategoryTile({ category }: { category: Category }) {
  return (
    <Link
      href={`/products#${category.slug}`}
      className="category-tile relative block aspect-square"
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="tile-reveal absolute bottom-4 right-4 font-mono text-meta text-lime">
        → View
      </span>
    </Link>
  );
}
