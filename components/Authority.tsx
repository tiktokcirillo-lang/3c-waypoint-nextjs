'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Metric = {
  value: string;
  label: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Authority() {
  const t = useTranslations("Authority");
  const authorityPoints = t.raw("points") as string[];
  const metrics = t.raw("metrics") as Metric[];

  return (
    <>
      {/* Authority two-column section */}
      <section
        id="authority"
        className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-10"
        style={{ background: '#0A0F14' }}
      >
        {/* Faded watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            style={{
              fontFamily: 'var(--font-barlow)',
              fontSize: 'clamp(120px, 20vw, 260px)',
              fontWeight: 800,
              lineHeight: 1,
              color: '#ffffff',
              opacity: 0.03,
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
          >
            AUTHORITY
          </span>
        </div>

        <div className="relative mx-auto max-w-7xl grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <span
              className="block text-[11px] font-semibold uppercase text-[#1A5F7A]"
              style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-inter)' }}
            >
              {t("eyebrow")}
            </span>
            <h2
              className="mt-5 text-[42px] font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-barlow)' }}
            >
              {t("title")}
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
            >
              {t("copy")}
            </p>
          </motion.div>

          {/* Right column — stacked numbered list */}
          <div>
            {authorityPoints.map((point, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 py-6"
                style={{
                  borderBottom:
                    index < authorityPoints.length - 1
                      ? '1px solid rgba(255,255,255,0.06)'
                      : 'none',
                  borderTop: index === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <span
                  className="shrink-0 text-base font-medium"
                  style={{ color: '#7ECECA', fontFamily: 'var(--font-mono)', minWidth: '2rem' }}
                >
                  0{index + 1}
                </span>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(244,247,248,0.8)', fontFamily: 'var(--font-inter)' }}
                >
                  {point}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="px-5 sm:px-8 lg:px-10" style={{ background: '#0E151A' }}>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row"
          >
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className="relative flex flex-1 flex-col items-center justify-center py-16 px-8"
                style={{
                  borderRight:
                    i < metrics.length - 1
                      ? '1px solid rgba(255,255,255,0.08)'
                      : 'none',
                }}
              >
                {/* Teal glow behind number */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(126,206,202,0.07) 0%, transparent 70%)',
                  }}
                />
                <span
                  className="relative leading-none"
                  style={{
                    fontFamily: 'var(--font-barlow)',
                    fontSize: '80px',
                    fontWeight: 800,
                    color: '#7ECECA',
                  }}
                >
                  {metric.value}
                </span>
                <span
                  className="relative mt-3 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    color: '#95A4AD',
                    fontFamily: 'var(--font-inter)',
                    letterSpacing: '0.15em',
                  }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
