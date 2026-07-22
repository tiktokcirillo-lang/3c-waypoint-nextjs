'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Persona = {
  number: string;
  name: string;
  role: string;
  hook: string;
  pain: string;
  goal: string;
  pillars: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Personas() {
  const t = useTranslations("Personas");
  const personas = t.raw("items") as Persona[];

  return (
    <section id="personas" className="bg-[#0A0F14] px-5 py-24 sm:px-8 lg:px-10">
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
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((persona, index) => (
            <motion.article
              key={persona.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300"
              style={{
                background: '#111820',
                border: '1px solid rgba(26,95,122,0.2)',
                padding: '28px',
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
                className="text-[13px] font-semibold uppercase"
                style={{ color: '#1A5F7A', fontFamily: 'var(--font-barlow)', letterSpacing: '0.15em' }}
              >
                {persona.number}
              </span>

              <h3
                className="mt-4 text-[22px] font-semibold leading-tight text-white"
                style={{ fontFamily: 'var(--font-barlow)' }}
              >
                {persona.name}
              </h3>
              <span
                className="mt-1 text-[12px] uppercase"
                style={{ color: '#7ECECA', letterSpacing: '0.1em', fontFamily: 'var(--font-inter)' }}
              >
                {persona.role}
              </span>

              <p
                className="mt-5 text-[16px] font-medium italic leading-snug"
                style={{ color: '#F4F7F8', fontFamily: 'var(--font-barlow)' }}
              >
                {persona.hook}
              </p>

              <div className="mt-6 flex flex-col gap-1">
                <span
                  className="text-[10px] font-semibold uppercase"
                  style={{ color: '#D7B56D', letterSpacing: '0.18em', fontFamily: 'var(--font-inter)' }}
                >
                  {t("painLabel")}
                </span>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: 'rgba(244,247,248,0.6)', fontFamily: 'var(--font-inter)' }}
                >
                  {persona.pain}
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-1">
                <span
                  className="text-[10px] font-semibold uppercase"
                  style={{ color: '#D7B56D', letterSpacing: '0.18em', fontFamily: 'var(--font-inter)' }}
                >
                  {t("goalLabel")}
                </span>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: 'rgba(244,247,248,0.6)', fontFamily: 'var(--font-inter)' }}
                >
                  {persona.goal}
                </p>
              </div>

              <div
                className="mt-6 pt-5 text-[11px] uppercase"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  color: '#95A4AD',
                  letterSpacing: '0.12em',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {t("pillarsLabel")}
                <div className="mt-2 normal-case" style={{ color: '#7ECECA', fontFamily: 'var(--font-inter)' }}>
                  {persona.pillars}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-6 border-t pt-16 text-center"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <h3
            className="text-[32px] font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-barlow)' }}
          >
            {t("closing.title")}
          </h3>
          <p
            className="max-w-xl text-base leading-relaxed"
            style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
          >
            {t("closing.copy")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#155168]"
            style={{
              background: '#1A5F7A',
              borderRadius: '9999px',
              padding: '16px 48px',
            }}
          >
            {t("closing.button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
