// src/app/(admin)/dashboard/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const {data: session, status}: {data: any; status: string} = useSession();
  console.log("SESSION:", session);
  const router = useRouter();
  // console.log(session);
  // console.log(status);

  useEffect(() => {
    console.log("Session:", session)
    console.log("Status:", status)
    if (status === "unauthenticated") {
      router.push('/login');
    } else {
      if(session !== undefined && session?.user.role !== "admin") {
        router.push('/');
      }
    }
  }, [router, session, session?.user.role, status]);

  return (
    <div className="hidden">
      {/* Parallel Routes handle all visible sections */}
    </div>
  )
}
