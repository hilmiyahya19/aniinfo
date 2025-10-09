// src/app/product/[slug]/page.tsx
import { getProductById } from "@/lib/api/productApi";
import Image from "next/image";

interface ProductDetailProps {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  // const [_, id] = params.slug.split("--");
  const parts = params.slug.split("--");
  const id = parts[parts.length - 1]; // ambil bagian terakhir setelah "--"

  const product = await getProductById(id);

  console.log("🟢 params.slug:", params.slug);
  console.log("🟢 Extracted id:", id);

  if (!product) {
    return (
      <div className="text-center text-gray-600 mt-20">
        <h2 className="text-xl font-semibold">Produk tidak ditemukan 😢</h2>
      </div>
    );
  }

  if (!id) {
  return (
    <div className="text-center text-gray-600 mt-20">
      <h2 className="text-xl font-semibold">URL produk tidak valid 😢</h2>
    </div>
  );
  }


  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover object-bottom"
        width={500}
        height={300}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
        <p className="text-xl text-blue-600 font-semibold mb-4">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-gray-600 leading-relaxed">
          Sepatu ini cocok untuk gaya kasual maupun olahraga. Nyaman, stylish,
          dan berkualitas tinggi.
        </p>
      </div>
    </div>
  );
}
