// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi' // Icon hamburger dan close
import { signIn, signOut, useSession } from 'next-auth/react'

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // state untuk hamburger
  const { data: session, status } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/anime', label: 'Anime' },
    { href: '/product', label: 'Product' },
    { href: '/about', label: 'About' },
  ];

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-blue-400">AniInfo</h1>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 items-center">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${pathname === link.href ? 'text-blue-400' : 'hover:text-blue-400'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          { status === "authenticated" ? (
            <button
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md cursor-pointer"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Logout
          </button>
          ) : (
             <button
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md cursor-pointer"
            onClick={() => signIn()}
          >
            Login
          </button>
          )}
        </ul>

        {/* Hamburger Button */}
        <button
          className="sm:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="sm:hidden bg-gray-900 flex flex-col gap-4 px-4 py-4"
        >
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${pathname === link.href ? 'text-blue-400' : 'hover:text-blue-400'}`}
                onClick={() => setIsOpen(false)} // close menu ketika klik
              >
                {link.label}
              </Link>
            </li>
          ))}
          { status === "authenticated" ? (
              <button
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md cursor-pointer"
              onClick={() => { signOut({ callbackUrl: '/login' }); setIsOpen(false); }}
              >
                Logout
              </button>
          ) : (
             <button
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-md cursor-pointer"
            onClick={() => { signIn(); setIsOpen(false); }}
          >
            Login
          </button>
          )}
        </motion.ul>
      )}
    </motion.nav>
  )
}
