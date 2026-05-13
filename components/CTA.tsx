'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("CTA");

  return (
    <section id="contact" className="section-shell border-y border-white/10 bg-ice text-ink">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <span className="text-sm font-semibold text-teal">
          {t("eyebrow")}
        </span>

        <h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
          {t("title")}
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate">
          {t("copy")}
        </p>

        <a href="mailto:hello@3cwaypoint.com" className="mt-10 inline-flex bg-ink px-8 py-4 text-sm font-semibold text-ice transition hover:bg-teal">
          {t("button")}
        </a>
      </motion.div>
    </section>
  );
}
