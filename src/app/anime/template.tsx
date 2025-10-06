'use client' // Karena kita pakai framer-motion, harus di client

import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimeTemplateProps {
  children: ReactNode
}

export default function AnimeTemplate({ children }: AnimeTemplateProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={Math.random()} // setiap page baru beda key, agar animasi dijalankan
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
