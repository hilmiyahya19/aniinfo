// src/components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import ClientNavbar from "@/components/ClientNavbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbarFooter = pathname !== "/login" && pathname !== "/register";

  return (
    <>
      {showNavbarFooter && <ClientNavbar />}
      <main className="flex-grow">{children}</main>
      {showNavbarFooter && <Footer />}
    </>
  );
}
