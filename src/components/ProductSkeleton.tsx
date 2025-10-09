// src/components/ProductSkeleton.tsx

export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white">
      <div className="w-full h-56 shimmer"></div>

      <div className="p-4 space-y-3">
        <div className="h-5 shimmer rounded w-3/4"></div>
        <div className="h-4 shimmer rounded w-1/2"></div>
      </div>
    </div>
  );
}

