'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props { onComplete: () => void }

export default function HeroLoader({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0E10]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >

      {/* ── Wordmark ── */}
      <div className="flex items-center gap-5">

        {/* "3C" — gradiente teal igual ao logo */}
        <div className="overflow-hidden leading-none">
          <motion.span
            className="block font-['Barlow_Condensed'] text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-none"
            style={{
              background: 'linear-gradient(160deg, #A8E6E4 0%, #7ECECA 40%, #1A5F7A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            3C
          </motion.span>
        </div>

        {/* Waypoint dot — vermelho, o pin de navegação */}
        <motion.span
          className="relative flex-shrink-0 mb-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.85, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Halo pulsante */}
          <motion.span
            className="absolute inset-0 rounded-full bg-red-500"
            animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
            transition={{ duration: 1.4, delay: 1.1, repeat: Infinity, ease: 'easeOut' }}
          />
          {/* Dot */}
          <span className="block w-[10px] h-[10px] rounded-full bg-red-500" />
        </motion.span>

        {/* "WAYPOINT" — branco, revela com stagger */}
        <div className="overflow-hidden leading-none">
          <motion.span
            className="block font-['Barlow_Condensed'] text-[clamp(2.8rem,8vw,7rem)] font-black uppercase leading-none text-white"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            WAYPOINT
          </motion.span>
        </div>

      </div>

      {/* ── Since 2025 ── */}
      <motion.span
        className="font-mono text-[10px] tracking-[0.38em] uppercase text-[#7ECECA] mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.8, delay: 0.95 }}
      >
        Since 2025
      </motion.span>

      {/* ── Progress bar ── */}
      <motion.div
        className="mt-8 w-36 h-px bg-white/[0.08] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 bg-[#7ECECA]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>

    </motion.div>
  )
}
