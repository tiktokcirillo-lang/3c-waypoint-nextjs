'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Pillar = {
  signal: string;
  title: string;
  description: string;
  bullets: string[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function PillarsPractice() {
  const t = useTranslations("PillarsPractice");
  const pillars = t.raw("items") as Pillar[];

  return (
    <section id="pillars" className="bg-[#070A0D] px-5 pt-14 pb-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mb-16"
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
            className="mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
          >
            {t("copy")}
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.signal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg transition-all duration-300"
              style={{
                background: '#111820',
                border: '1px solid rgba(26,95,122,0.2)',
                padding: '32px',
              }}
            >
              {/* Top highlight on hover */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(126,206,202,0.55), transparent)' }}
              />
              {/* Hover border overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ border: '1px solid rgba(126,206,202,0.4)' }}
              />

              {/* Number label */}
              <span
                className="block text-[13px] font-semibold uppercase"
                style={{ color: '#1A5F7A', fontFamily: 'var(--font-barlow)', letterSpacing: '0.15em' }}
              >
                {pillar.signal}
              </span>

              {/* Gold accent line above title */}
              <div style={{ marginTop: '24px', height: '2px', width: '40px', background: '#D7B56D' }} />

              {/* Title */}
              <h3
                className="mt-4 text-[22px] font-semibold leading-tight text-white"
                style={{ fontFamily: 'var(--font-barlow)' }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                className="mt-4 text-[15px] leading-relaxed"
                style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
              >
                {pillar.description}
              </p>

              {/* Bullets */}
              <ul className="mt-5 flex flex-col gap-2">
                {pillar.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[14px] leading-relaxed"
                    style={{ color: 'rgba(244,247,248,0.65)', fontFamily: 'var(--font-inter)' }}
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: '#7ECECA' }}
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
