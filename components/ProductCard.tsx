"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import VerifiedTick from "@/components/VerifiedTick";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { items, addItem } = useCart();
  const [pulsing, setPulsing] = useState(false);
  const inCart = items.some((line) => line.product.id === product.id);

  function handleAddToCart() {
    addItem(product.id);
    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 400);
  }

  return (
    <article className="product-card flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden border-b border-iron">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover"
        />
        {product.discountLabel && <span className="sale-badge">{product.discountLabel}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <VerifiedTick />
        <h3 className="font-display text-h3 text-bone">{product.name}</h3>
        <div className="price-row font-mono">
          <p className="text-body text-lime">{formatPrice(product.priceCents)}</p>
          {product.originalPrice && (
            <p className="price-original">{formatPrice(product.originalPrice)}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn-primary mt-auto w-full justify-center ${pulsing ? "btn-add-pulse" : ""}`}
        >
          {inCart ? "Add another" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
