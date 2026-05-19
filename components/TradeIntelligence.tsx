'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function TradeIntelligence() {
  const t = useTranslations("TradeIntelligence");
  const intelligenceSignals = t.raw("signals") as string[];

  return (
    <section id="trade-intelligence" className="bg-[#070A0D] px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span
            className="block text-[11px] font-semibold uppercase text-[#1A5F7A]"
            style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-inter)' }}
          >
            {t("eyebrow")}
          </span>
          <h2
            className="mt-4 text-[42px] font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            {t("title")}
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
          >
            {t("copy")}
          </p>
        </motion.div>

        <div>
          {intelligenceSignals.map((signal, index) => (
            <motion.div
              key={signal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex cursor-default items-center gap-8 py-6 transition-colors duration-200"
              style={{
                borderTop: index === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Hover background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'rgba(26,95,122,0.06)' }}
              />

              {/* Number */}
              <span
                className="relative shrink-0 text-base font-medium"
                style={{ color: '#7ECECA', fontFamily: 'var(--font-mono)', minWidth: '2.5rem' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Signal text */}
              <span
                className="relative flex-1 text-base transition-colors duration-200"
                style={{ color: 'rgba(244,247,248,0.65)', fontFamily: 'var(--font-inter)' }}
              >
                <span className="transition-colors duration-200 group-hover:text-white">
                  {signal}
                </span>
              </span>

              {/* Arrow — appears on hover */}
              <span
                className="relative text-[#7ECECA] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              >
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
