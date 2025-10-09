// src/lib/api/productApi.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const BASE_URL = "http://localhost:3000/api/product";

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  const { data } = await res.json();
  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}?id=${id}`, { cache: "no-store" });
  const { data } = await res.json();
  return data?.[0] ?? null;
}
