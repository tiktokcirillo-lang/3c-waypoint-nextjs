'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TradeIntelligence() {
  const t = useTranslations("TradeIntelligence");
  const intelligenceSignals = t.raw("signals") as string[];

  return (
    <section id="trade-intelligence" className="section-shell">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">
            {t("title")}
          </h2>
          <p className="section-copy">
            {t("copy")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border border-white/10 bg-graphite p-6 sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <span className="text-sm font-semibold text-ice">{t("panelTitle")}</span>
            <span className="text-sm text-cyan">{t("partner")}</span>
          </div>

          <div className="mt-7 grid gap-4">
            {intelligenceSignals.map((signal, index) => (
              <div key={signal} className="flex items-center gap-4 border border-white/10 bg-ink p-4">
                <span className="grid h-9 w-9 place-items-center bg-cyan/10 text-sm font-semibold text-cyan">
                  {index + 1}
                </span>
                <span className="text-sm leading-6 text-ice">{signal}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
