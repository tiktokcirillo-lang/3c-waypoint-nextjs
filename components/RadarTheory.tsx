'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Quadrant = {
  label: string;
  description: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const QUADRANT_COLORS = ['#1A5F7A', '#7ECECA', '#D7B56D', '#A8E6E4'];

export default function RadarTheory() {
  const t = useTranslations("RadarTheory");
  const quadrants = t.raw("quadrants") as Quadrant[];

  return (
    <section
      id="radar-theory"
      className="px-5 py-28 sm:px-8 lg:px-10"
      style={{ background: '#070A0D' }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          {/* Gold line + eyebrow */}
          <div style={{ height: '1px', width: '48px', background: '#D7B56D', marginBottom: '20px' }} />
          <span
            className="block text-[11px] font-semibold uppercase text-[#1A5F7A]"
            style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-inter)' }}
          >
            {t("eyebrow")}
          </span>
          <h2
            className="mt-4 max-w-3xl text-[42px] font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            {t("title")}
          </h2>
          <p
            className="mt-5 max-w-3xl text-base leading-relaxed"
            style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
          >
            {t("copy")}
          </p>
        </motion.div>

        {/* Quadrant grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quadrants.map((q, index) => (
            <motion.div
              key={q.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg"
              style={{
                background: '#111820',
                border: '1px solid rgba(26,95,122,0.2)',
                padding: '28px 24px',
              }}
            >
              {/* Top accent line */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(126,206,202,0.55), transparent)' }}
              />
              {/* Hover border overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ border: '1px solid rgba(126,206,202,0.4)' }}
              />

              {/* Quadrant index dot */}
              <div
                className="mb-5 h-2 w-2 rounded-full"
                style={{ background: QUADRANT_COLORS[index] }}
              />

              <span
                className="block text-[13px] font-bold uppercase tracking-widest"
                style={{ color: QUADRANT_COLORS[index], fontFamily: 'var(--font-barlow)' }}
              >
                {q.label}
              </span>

              <p
                className="mt-3 text-[14px] leading-relaxed"
                style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
              >
                {q.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
