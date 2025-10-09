// src/app/product/page.tsx
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api/productApi";

export default async function ProductPage() {
  const products = await getAllProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => {
        // bikin slug SEO friendly
        const slug = `${product.name.toLowerCase().replace(/\s+/g, "-")}--${product.id}`;
        return <ProductCard key={product.id} product={{ ...product, slug }} />;
      })}
    </div>
  );
}
