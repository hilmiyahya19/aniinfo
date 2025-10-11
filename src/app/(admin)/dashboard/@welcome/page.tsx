"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WelcomeSection() {
  const { data: session } = useSession();
  const router = useRouter();

  const user = session?.user || {};
  const name = user.fullname || user.name || "Admin";

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        bg-gray-900 p-6 rounded-2xl shadow-lg
        flex items-center justify-between
        text-white mb-6
      "
    >
      {/* Kiri - Sambutan */}
      <div>
        <h2 className="text-xl font-semibold">
          Selamat Datang, <span className="text-indigo-400">{name}</span> 👋
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Semoga harimu menyenangkan hari ini!
        </p>
      </div>

      {/* Kanan - Tombol ke Profil */}
      <button
        onClick={() => router.push("/profile")}
        className="
          px-4 py-2 bg-indigo-600 hover:bg-indigo-700
          rounded-lg shadow-md text-sm font-medium
          transition cursor-pointer m-2 md:m-0
        "
      >
        Lihat Profil
      </button>
    </motion.section>
  );
}
