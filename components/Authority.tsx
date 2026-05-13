'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Metric = {
  value: string;
  label: string;
};

export default function Authority() {
  const t = useTranslations("Authority");
  const authorityPoints = t.raw("points") as string[];
  const metrics = t.raw("metrics") as Metric[];

  return (
    <section id="authority" className="section-shell border-y border-white/10 bg-graphite/50">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
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

        <div className="grid gap-px border border-white/10 bg-white/10">
          {authorityPoints.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid gap-6 bg-ink p-6 sm:grid-cols-[72px_1fr] sm:p-8"
            >
              <span className="text-sm font-semibold text-gold">0{index + 1}</span>
              <p className="text-lg leading-8 text-ice">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-ink p-8">
            <div className="text-5xl font-semibold text-cyan">{metric.value}</div>
            <div className="mt-3 max-w-48 text-sm leading-6 text-steel">{metric.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
