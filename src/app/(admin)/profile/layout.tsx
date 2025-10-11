// src/app/(admin)/profile/layout.tsx
'use client';
import { motion } from 'framer-motion';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profil Pengguna 👤</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Lihat dan kelola informasi akun Anda di bawah ini.
          </p>
        </header>

        {/* Halaman di-render di sini */}
        <main>{children}</main>
      </div>
    </motion.div>
  );
}
