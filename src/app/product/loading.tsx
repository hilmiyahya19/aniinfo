// src/app/product/loading.tsx
import ProductSkeleton from "@/components/ProductSkeleton";

export default function LoadingProductPage() {
  // tampilkan 6 skeleton product card
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
