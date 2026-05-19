'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Stat = { value: string; label: string };

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function TradeNetworkSVG() {
  return (
    <motion.svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
    >
      <defs>
        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7ECECA" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7ECECA" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Concentric rings suggesting a globe */}
      <circle cx="240" cy="240" r="210" stroke="#7ECECA" strokeOpacity="0.04" strokeWidth="1" />
      <circle cx="240" cy="240" r="160" stroke="#7ECECA" strokeOpacity="0.07" strokeWidth="1" />
      <circle cx="240" cy="240" r="100" stroke="#7ECECA" strokeOpacity="0.1" strokeWidth="1" />
      <circle cx="240" cy="240" r="48" stroke="#7ECECA" strokeOpacity="0.14" strokeWidth="1" />

      {/* Globe latitude / longitude ellipses */}
      <ellipse cx="240" cy="240" rx="160" ry="46" stroke="#7ECECA" strokeOpacity="0.06" strokeWidth="1" fill="none" />
      <ellipse cx="240" cy="240" rx="46" ry="160" stroke="#7ECECA" strokeOpacity="0.06" strokeWidth="1" fill="none" />

      {/* Radial spokes from center to outer nodes */}
      <line x1="240" y1="240" x2="110" y2="160" stroke="#7ECECA" strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="348" y2="148" stroke="#7ECECA" strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="88" y2="310" stroke="#7ECECA" strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="376" y2="300" stroke="#7ECECA" strokeOpacity="0.07" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="400" y2="220" stroke="#7ECECA" strokeOpacity="0.05" strokeWidth="0.5" />
      <line x1="240" y1="240" x2="240" y2="68" stroke="#7ECECA" strokeOpacity="0.05" strokeWidth="0.5" />

      {/* Trade route arcs */}
      <motion.path
        d="M 110 160 Q 210 100 348 148"
        stroke="#7ECECA" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="5 7"
        animate={{ strokeOpacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 88 310 Q 210 365 376 300"
        stroke="#7ECECA" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="5 7"
        animate={{ strokeOpacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.path
        d="M 130 220 Q 260 285 400 220"
        stroke="#7ECECA" strokeOpacity="0.12" strokeWidth="1"
        animate={{ strokeOpacity: [0.12, 0.24, 0.12] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />
      <motion.path
        d="M 148 308 Q 250 210 376 300"
        stroke="#7ECECA" strokeOpacity="0.09" strokeWidth="1"
        animate={{ strokeOpacity: [0.09, 0.2, 0.09] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      />

      {/* Center glow */}
      <circle cx="240" cy="240" r="56" fill="url(#centerGlow)" />

      {/* Center pulse ring */}
      <motion.circle
        cx={240} cy={240}
        r={12}
        stroke="#7ECECA"
        fill="none"
        animate={{ r: [12, 34], strokeOpacity: [0.35, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Center node */}
      <motion.circle
        cx={240} cy={240} r={7}
        fill="#7ECECA"
        animate={{ fillOpacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Outer endpoint nodes */}
      {([
        { cx: 110, cy: 160, delay: 0 },
        { cx: 348, cy: 148, delay: 0.6 },
        { cx: 88,  cy: 310, delay: 1.2 },
        { cx: 376, cy: 300, delay: 0.9 },
        { cx: 400, cy: 220, delay: 1.5 },
        { cx: 240, cy: 68,  delay: 0.3 },
        { cx: 300, cy: 408, delay: 1.8 },
      ] as { cx: number; cy: number; delay: number }[]).map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx} cy={n.cy} r={4}
          fill="#7ECECA"
          animate={{ fillOpacity: [0.28, 0.65, 0.28] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
        />
      ))}

      {/* Mid-route secondary nodes */}
      {([
        { cx: 202, cy: 152, delay: 0.4 },
        { cx: 304, cy: 182, delay: 1.0 },
        { cx: 172, cy: 296, delay: 0.7 },
        { cx: 320, cy: 264, delay: 1.3 },
      ] as { cx: number; cy: number; delay: number }[]).map((n, i) => (
        <motion.circle
          key={`m${i}`}
          cx={n.cx} cy={n.cy} r={2.5}
          fill="#7ECECA"
          animate={{ fillOpacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: n.delay }}
        />
      ))}
    </motion.svg>
  );
}

export default function Hero() {
  const t = useTranslations('Hero');
  const stats = t.raw('stats') as Stat[];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#070A0D]">
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_28%_50%,rgba(26,95,122,0.18)_0%,transparent_70%)]" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-5 py-32 sm:px-8 lg:grid-cols-2 lg:px-10">

        {/* Left: content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {/* Eyebrow */}
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-medium uppercase text-cyan"
            style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-inter)' }}
          >
            {t('eyebrow')}
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display font-extrabold leading-[1.0] tracking-tight text-[48px] lg:text-[72px]"
          >
            <span className="block text-white">
              {t('headline.line1')} {t('headline.line2')}
            </span>
            <span className="block">
              <span className="text-white">{t('headline.line3')} </span>
              <span className="text-cyan">{t('headline.line4')}</span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[560px] text-lg leading-relaxed"
            style={{ color: 'rgba(244,247,248,0.6)', fontFamily: 'var(--font-inter)' }}
          >
            {t('copy')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#1A5F7A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#155168]"
            >
              {t('primaryCta')}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center border px-6 py-3 text-sm font-semibold text-cyan transition-colors hover:border-[rgba(126,206,202,0.6)]"
              style={{ borderColor: 'rgba(126,206,202,0.3)' }}
            >
              {t('secondaryCta')}
            </a>
          </motion.div>

          {/* Signal bar */}
          <motion.div
            variants={fadeUp}
            className="mt-12 grid grid-cols-3 pt-12"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col"
                style={{
                  paddingRight: i < stats.length - 1 ? '1.5rem' : 0,
                  paddingLeft: i > 0 ? '1.5rem' : 0,
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <span className="text-base font-semibold text-white">{stat.value}</span>
                <span className="mt-1 text-xs text-steel">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: animated SVG globe */}
        <div className="hidden items-center justify-center lg:flex">
          <TradeNetworkSVG />
        </div>
      </div>
    </section>
  );
}
