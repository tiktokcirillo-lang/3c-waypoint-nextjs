'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

// ─── Animation variants ───────────────────────────────────────────────────────

const REVEAL = {
  hidden:  { y: '102%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1 + i * 0.11,
    },
  }),
}

const FADE_UP = {
  hidden:  { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.65 + i * 0.12,
    },
  }),
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MaskedLine({
  children,
  index,
  className = '',
}: {
  children: React.ReactNode
  index: number
  className?: string
}) {
  const innerRef   = useRef<HTMLSpanElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scaleX, setScaleX] = useState(1)

  useEffect(() => {
    const measure = () => {
      if (innerRef.current && wrapperRef.current) {
        const textWidth      = innerRef.current.scrollWidth
        const containerWidth = wrapperRef.current.offsetWidth
        if (textWidth > 0 && containerWidth > 0) {
          // Cap em 1.6x pra não distorcer demais linhas curtas como "O MUNDO"
          setScaleX(Math.min(containerWidth / textWidth, 1.6))
        }
      }
    }
    // Espera a fonte custom carregar — medir com a fonte de fallback
    // dá scrollWidth errado e cada linha estica um valor diferente.
    document.fonts.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <div ref={wrapperRef} className="overflow-hidden leading-none">
      <motion.div
        custom={index}
        variants={REVEAL}
        initial="hidden"
        animate="visible"
      >
        <span
          ref={innerRef}
          className={className}
          style={{
            display: 'inline-block',
            transform: `scaleX(${scaleX})`,
            transformOrigin: 'left',
          }}
        >
          {children}
        </span>
      </motion.div>
    </div>
  )
}

// ─── HeroText ─────────────────────────────────────────────────────────────────

export default function HeroText() {
  const t = useTranslations('Hero')

  return (
    <div className="relative z-10 w-full h-full flex items-start">
      <div className="px-8 md:px-16 lg:px-20 xl:px-24 pt-28 md:pt-32 w-full max-w-[1440px] mx-auto">

        {/* ── Eyebrow ── */}
        <motion.div
          custom={0}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-7"
        >
          <span className="block w-7 h-px bg-[#7ECECA] opacity-80" />
          <span className="font-mono text-[10px] tracking-[0.38em] uppercase text-[#7ECECA] opacity-70">
            {t('eyebrow')}
          </span>
        </motion.div>

        {/* ── Headline ── */}
        {/* max-w caps how far scaleX can stretch each line — full column width (1248px) would let lines cross into the globe */}
        <div className="flex flex-col gap-[0.06em] mb-6 md:mb-9 max-w-[700px]">
          <MaskedLine index={0} className="font-['Barlow_Condensed'] text-[clamp(3.5rem,13vw,10rem)] font-black uppercase tracking-[-0.025em] text-white">
            {t('headline.line1')}
          </MaskedLine>
          <MaskedLine index={1} className="font-['Barlow_Condensed'] text-[clamp(3.5rem,13vw,10rem)] font-black uppercase tracking-[-0.025em] text-[#7ECECA]">
            {t('headline.line2')}
          </MaskedLine>
          <MaskedLine index={2} className="font-['Barlow_Condensed'] text-[clamp(3.5rem,13vw,10rem)] font-black uppercase tracking-[-0.025em] text-white">
            {t('headline.line3')}
          </MaskedLine>
          <MaskedLine index={3} className="font-['Barlow_Condensed'] text-[clamp(3.5rem,13vw,10rem)] font-black uppercase tracking-[-0.025em] text-white/30">
            {t('headline.line4')}
          </MaskedLine>
        </div>

      </div>

      {/* ── Body + CTA — pulled out of the centered stack so headline height doesn't push it ── */}
      <motion.div
        custom={1}
        variants={FADE_UP}
        initial="hidden"
        animate="visible"
        className="absolute left-8 md:left-16 lg:left-20 xl:left-24 right-8 bottom-24 md:bottom-28 flex flex-col sm:flex-row items-start sm:items-center gap-8"
      >
        <p className="font-['Inter'] text-sm leading-[1.7] text-white/45 max-w-[320px]">
          {t('copy')}
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="
              group relative flex items-center gap-3
              border border-[#1A5F7A] px-6 py-[11px]
              font-['Inter'] text-[11px] tracking-[0.22em] uppercase
              text-[#A8E6E4]
              hover:bg-[#1A5F7A]/30 hover:border-[#7ECECA]
              transition-all duration-300 ease-out
            "
          >
            {t('primaryCta')}
            <svg className="w-4 h-px mt-px group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 16 1" fill="none">
              <line x1="0" y1="0.5" x2="12" y2="0.5" stroke="#A8E6E4" strokeWidth="1" />
              <line x1="10" y1="-2" x2="14" y2="0.5" stroke="#A8E6E4" strokeWidth="1" />
              <line x1="10" y1="3"  x2="14" y2="0.5" stroke="#A8E6E4" strokeWidth="1" />
            </svg>
          </a>

          <a
            href="#method"
            className="
              font-['Inter'] text-[11px] tracking-[0.22em] uppercase
              text-white/35 hover:text-white/65
              transition-colors duration-300 pb-px
              border-b border-transparent hover:border-white/30
            "
          >
            {t('secondaryCta')}
          </a>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8 }}
        className="absolute bottom-10 left-8 md:left-16 lg:left-20 xl:left-24 flex items-center gap-3"
        aria-hidden
      >
        <div className="relative w-px h-14 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute left-0 w-full bg-[#7ECECA]"
            animate={{ top: ['0%', '100%'], height: ['30%', '30%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          />
        </div>
      </motion.div>

    </div>
  )
}
