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
      <div className="flex items-center gap-4">

        {/*
          "3C" — container relative para ancorar o dot.
          O overflow-hidden fica só no wrapper interno do texto
          para o dot não ser cortado na animação de reveal.
        */}
        <div className="relative leading-none">

          {/* Texto com mask reveal */}
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

          {/*
            Waypoint pin — centro do "C".
            "3" ocupa ~50% da largura, "C" os outros 50%.
            Centro do C ≈ left 75%, top 50%.
          */}
          <motion.span
            className="absolute"
            style={{ left: '74%', top: '50%', transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Halo pulsante */}
            <motion.span
              className="absolute rounded-full bg-red-500"
              style={{ inset: '-5px' }}
              animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
              transition={{ duration: 1.5, delay: 1.15, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* Pin */}
            <span
              className="block w-[11px] h-[11px] rounded-full bg-red-500"
              style={{ boxShadow: '0 0 10px 2px rgba(239,68,68,0.65)' }}
            />
          </motion.span>

        </div>

        {/* "WAYPOINT" */}
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
