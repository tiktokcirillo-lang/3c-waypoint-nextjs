'use client'

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
  return (
    <div className="overflow-hidden leading-none">
      <motion.div
        custom={index}
        variants={REVEAL}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ─── HeroText ─────────────────────────────────────────────────────────────────

export default function HeroText() {
  const t = useTranslations('Hero')

  return (
    <div className="relative z-10 w-full h-full flex items-center">
      <div className="px-8 md:px-16 lg:px-20 xl:px-24 w-full max-w-[1440px] mx-auto">

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
        <div className="flex flex-col gap-[0.06em] mb-10 md:mb-14">
          <MaskedLine index={0} className="font-['Barlow_Condensed'] text-[clamp(2.6rem,7.5vw,8.5rem)] [@media(max-height:800px)]:text-[clamp(2rem,5.5vh,5rem)] font-black uppercase tracking-[-0.025em] text-white">
            {t('headline.line1')}
          </MaskedLine>
          <MaskedLine index={1} className="font-['Barlow_Condensed'] text-[clamp(2.6rem,7.5vw,8.5rem)] [@media(max-height:800px)]:text-[clamp(2rem,5.5vh,5rem)] font-black uppercase tracking-[-0.025em] text-[#7ECECA]">
            {t('headline.line2')}
          </MaskedLine>
          <MaskedLine index={2} className="font-['Barlow_Condensed'] text-[clamp(2.6rem,7.5vw,8.5rem)] [@media(max-height:800px)]:text-[clamp(2rem,5.5vh,5rem)] font-black uppercase tracking-[-0.025em] text-white">
            {t('headline.line3')}
          </MaskedLine>
          <MaskedLine index={3} className="font-['Barlow_Condensed'] text-[clamp(2.6rem,7.5vw,8.5rem)] [@media(max-height:800px)]:text-[clamp(2rem,5.5vh,5rem)] font-black uppercase tracking-[-0.025em] text-white/30">
            {t('headline.line4')}
          </MaskedLine>
        </div>

        {/* ── Body + CTA ── */}
        <motion.div
          custom={1}
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-8"
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
    </div>
  )
}
