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

// ─── AutoFitHeadline — calcula o maior font-size que cabe em largura E altura ──

function AutoFitHeadline({
  lines,
  containerRef,
}: {
  lines: { text: string; className: string }[]
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [fontSize, setFontSize] = useState(140) // fallback inicial em px

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const compute = () => {
      if (!ctx || !containerRef.current) return

      const containerWidth  = containerRef.current.offsetWidth
      const containerHeight = containerRef.current.offsetHeight
      const numLines = lines.length
      const lineHeightMultiplier = 0.92 // bate com leading-none / gap-[0.06em]

      // Mede a linha mais larga numa referência de 100px
      const REF = 100
      ctx.font = `900 ${REF}px 'Barlow Condensed'`
      const widestRatio = Math.max(
        ...lines.map((l) => ctx.measureText(l.text.toUpperCase()).width / REF)
      )

      const sizeByWidth  = containerWidth / widestRatio
      const sizeByHeight = containerHeight / (numLines * lineHeightMultiplier)

      // Usa o menor dos dois, com uma margem de segurança de 4%
      const finalSize = Math.min(sizeByWidth, sizeByHeight) * 0.96

      // Trava entre um piso e um teto razoáveis
      setFontSize(Math.max(32, Math.min(finalSize, 200)))
    }

    // Espera a fonte custom carregar — medir com a fonte de fallback do
    // canvas dá widestRatio errado (mesma corrida do round anterior).
    document.fonts.ready.then(compute)
    const ro = new ResizeObserver(compute)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', compute)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [lines, containerRef])

  return (
    <>
      {lines.map((line, i) => (
        <MaskedLine key={i} index={i} className={line.className}>
          <span style={{ fontSize: `${fontSize}px` }}>{line.text}</span>
        </MaskedLine>
      ))}
    </>
  )
}

// ─── HeroText ─────────────────────────────────────────────────────────────────

export default function HeroText() {
  const t = useTranslations('Hero')
  const headlineRef = useRef<HTMLDivElement>(null)

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

        {/* ── Headline — tamanho calculado dinamicamente pra preencher largura e altura ── */}
        {/* budget de altura fica acima do topo do bloco de parágrafo/CTA (que é absolute, fixo embaixo) — nunca deve encostar nele */}
        <div ref={headlineRef} className="flex flex-col gap-[0.06em] mb-6 md:mb-9 h-[52vh] max-h-[500px]">
          <AutoFitHeadline
            containerRef={headlineRef}
            lines={[
              { text: t('headline.line1'), className: "font-['Barlow_Condensed'] font-black uppercase tracking-[-0.025em] text-white" },
              { text: t('headline.line2'), className: "font-['Barlow_Condensed'] font-black uppercase tracking-[-0.025em] text-[#7ECECA]" },
              { text: t('headline.line3'), className: "font-['Barlow_Condensed'] font-black uppercase tracking-[-0.025em] text-white" },
              { text: t('headline.line4'), className: "font-['Barlow_Condensed'] font-black uppercase tracking-[-0.025em] text-white/30" },
            ]}
          />
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
