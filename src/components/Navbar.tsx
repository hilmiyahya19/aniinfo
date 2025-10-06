'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-blue-400">AniInfo</h1>
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
          <li><Link href="/anime" className="hover:text-blue-400">Anime</Link></li>
          <li><Link href="/about" className="hover:text-blue-400">About</Link></li>
        </ul>
      </div>
    </motion.nav>
  )
}
