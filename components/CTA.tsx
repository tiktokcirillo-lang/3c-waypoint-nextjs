'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CTA() {
  const t = useTranslations("CTA");

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-32 sm:px-8 lg:px-10"
      style={{ background: '#070A0D' }}
    >
      {/* Radial teal glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(26,95,122,0.15) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl text-center"
      >
        {/* Gold horizontal line above label */}
        <div
          className="mx-auto mb-6"
          style={{ height: '1px', width: '48px', background: '#D7B56D' }}
        />

        <span
          className="block text-[11px] font-semibold uppercase text-[#1A5F7A]"
          style={{ letterSpacing: '0.2em', fontFamily: 'var(--font-inter)' }}
        >
          {t("eyebrow")}
        </span>

        <h2
          className="mt-6 leading-tight text-white"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          {t("title")}
        </h2>

        <p
          className="mx-auto mt-7 max-w-2xl text-lg leading-8"
          style={{ color: 'rgba(244,247,248,0.55)', fontFamily: 'var(--font-inter)' }}
        >
          {t("copy")}
        </p>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center justify-center text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#155168]"
          style={{
            background: '#1A5F7A',
            borderRadius: '9999px',
            padding: '16px 48px',
          }}
        >
          {t("button")}
        </Link>
      </motion.div>
    </section>
  );
}
