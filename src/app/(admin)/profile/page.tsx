'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  // TypeScript sekarang otomatis tahu tipe session dari deklarasi kamu di next-auth.d.ts
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user || {};

  const [fullname, setFullname] = useState(user.fullname || '');
  const [email] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('✅ Data profil berhasil diperbarui (simulasi).');
    setIsEditing(false);
    setPassword('');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      {/* Header Profil */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        {/* Foto Profil */}
        {/* <Image
          src={user.image || 'https://ui-avatars.com/api/?name=' + (user.fullname || 'User')}
          alt="Profile"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
        /> */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">{user.fullname || 'Nama Lengkap'}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">Role: {user.role || 'Admin'}</p>
        </div>
      </div>

      {/* Tombol ke Dashboard (hanya jika role = admin) */}
      {user.role === 'admin' && (
        <div className="flex justify-center md:justify-end mb-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition cursor-pointer"
          >
            Menuju Dashboard
          </button>
        </div>
      )}
      
      {/* Tombol Edit */}
      {!isEditing ? (
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
          >
            Edit Profil
          </button>
        </div>
      ) : (
        /* Form Edit Profil */
        <motion.form
          onSubmit={handleUpdate}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 mt-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password Baru</label>
            <input
              type="password"
              placeholder="Masukkan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.startsWith('✅') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition cursor-pointer"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setMessage('');
                setPassword('');
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition cursor-pointer"
            >
              Batal
            </button>
          </div>
        </motion.form>
      )}
    </motion.section>
  );
}
