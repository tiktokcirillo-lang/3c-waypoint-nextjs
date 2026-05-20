'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props { onComplete: () => void }

export default function HeroLoader({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2400)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0E10]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Eyebrow */}
      <motion.span
        className="font-mono text-[10px] tracking-[0.38em] uppercase text-[#7ECECA] mb-8"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Since 2025
      </motion.span>

      {/* Wordmark reveal */}
      <div className="overflow-hidden">
        <motion.h1
          className="font-['Barlow_Condensed'] text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-[-0.02em] text-white leading-none"
          initial={{ y: '105%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          WAYPOINT
        </motion.h1>
      </div>

      {/* Progress bar */}
      <motion.div
        className="mt-10 w-36 h-px bg-white/[0.08] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#7ECECA]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.65, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}
