'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type WhyItem = {
  title: string;
  description: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyUs() {
  const t = useTranslations("WhyUs");
  const items = t.raw("items") as WhyItem[];

  return (
    <section
      id="why-us"
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
          WHY US
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
          {items.map((why, index) => (
            <motion.div
              key={why.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-6 py-6"
              style={{
                borderBottom:
                  index < items.length - 1
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
              <div>
                <h3
                  className="text-lg font-semibold leading-tight text-white"
                  style={{ fontFamily: 'var(--font-barlow)' }}
                >
                  {why.title}
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: 'rgba(244,247,248,0.65)', fontFamily: 'var(--font-inter)' }}
                >
                  {why.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
