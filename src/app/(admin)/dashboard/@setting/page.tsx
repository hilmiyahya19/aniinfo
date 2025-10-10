// src/app/(admin)/dashboard/@setting/page.tsx

'use client';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { data: session }: { data: any } = useSession();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('❌ Password baru tidak cocok!');
      return;
    }
    setMessage('✅ Password berhasil diubah (simulasi).');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordForm(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-xl transition-all">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">Settings ⚙️</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Kelola preferensi akun dan konfigurasi dashboard.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">Login sebagai:</p>
            <p className="font-medium">{session?.user?.fullname || session?.user?.email}</p>
          </div>
        </div>

        {/* Card: Account */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold border-b pb-2 border-gray-300 dark:border-gray-700">
            👤 Akun
          </h3>
          <p>Email: {session?.user?.email}</p>
          <p>Nama Lengkap: {session?.user?.fullname || '-'}</p>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showPasswordForm ? 'Batalkan' : 'Ubah Password'}
            </button>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Keluar
            </button>
          </div>

          {showPasswordForm && (
            <motion.form
              onSubmit={handleChangePassword}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 space-y-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
            >
              <input
                type="password"
                placeholder="Password lama"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                required
              />
              <input
                type="password"
                placeholder="Password baru"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                required
              />
              <input
                type="password"
                placeholder="Konfirmasi password baru"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                required
              />
              {message && (
                <p
                  className={`text-sm ${
                    message.startsWith('✅')
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {message}
                </p>
              )}
              <button
                type="submit"
                className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Simpan Perubahan
              </button>
            </motion.form>
          )}
        </motion.div>

        {/* Card: Theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold border-b pb-2 border-gray-300 dark:border-gray-700">
            🎨 Tampilan
          </h3>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Atur mode tampilan aplikasi.
          </p>
          <button
            onClick={toggleTheme}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Ganti ke {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </motion.div>
      </div>
    </section>
  );
}
