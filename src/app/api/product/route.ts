// src/app/api/product/route.ts
import { NextResponse } from "next/server";
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";

export interface Product {
  id: string;
  [key: string]: unknown;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    let data: Product[];

    if (id) {
      data = await retrieveDataById("products", id);
    } else {
      data = await retrieveData("products");
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "Data tidak ditemukan", data: [] },
        { status: 404 }
      );
    }

    // ✅ Sukses
    return NextResponse.json({ message: "OK", data }, { status: 200 });
  } catch (error: unknown) {
    // ✅ Periksa tipe error sebelum akses message
    if (error instanceof Error) {
      console.error("Error fetching data:", error.message);
      return NextResponse.json(
        { message: "Terjadi kesalahan server", error: error.message },
        { status: 500 }
      );
    }

    // ✅ Fallback jika error bukan instance Error
    console.error("Unknown error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan tidak diketahui" },
      { status: 500 }
    );
  }
}
