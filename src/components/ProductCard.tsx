// src/components/ProductCard.tsx
"use client";

import Link from "next/link";
import { Product } from "@/lib/api/productApi";
import Image from "next/image";

interface ProductCardProps {
  product: Product & { slug?: string };
}

export default function ProductCard({ product }: ProductCardProps) {
    const slug = product.slug ?? product.id;
  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white"
    >
      <Image
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover object-bottom"
        width={500}
        height={300}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">Rp {product.price.toLocaleString("id-ID")}</p>
      </div>
    </Link>
  );
}
