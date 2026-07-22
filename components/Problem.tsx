'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type ProblemItem = {
  number: string;
  title: string;
  description: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Problem() {
  const t = useTranslations("Problem");
  const items = t.raw("items") as ProblemItem[];

  return (
    <section id="problem" className="bg-[#070A0D] px-5 pt-14 pb-24 sm:px-8 lg:px-10">
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
            className="mt-4 max-w-3xl text-[42px] font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.number}
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
              <div
                className="pointer-events-none absolute left-0 right-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(126,206,202,0.55), transparent)' }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ border: '1px solid rgba(126,206,202,0.4)' }}
              />

              <span
                className="block text-[13px] font-semibold uppercase"
                style={{ color: '#1A5F7A', fontFamily: 'var(--font-barlow)', letterSpacing: '0.15em' }}
              >
                {item.number}
              </span>

              <div style={{ marginTop: '24px', height: '2px', width: '40px', background: '#D7B56D' }} />

              <h3
                className="mt-4 text-[22px] font-semibold leading-tight text-white"
                style={{ fontFamily: 'var(--font-barlow)' }}
              >
                {item.title}
              </h3>

              <p
                className="mt-4 text-[15px] leading-relaxed"
                style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
              >
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
