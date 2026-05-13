'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Service = {
  title: string;
  description: string;
  signal: string;
};

export default function Services() {
  const t = useTranslations("Services");
  const services = t.raw("items") as Service[];

  return (
    <section id="services" className="section-shell">
      <div className="section-header">
        <span className="eyebrow">{t("eyebrow")}</span>

        <h2 className="section-title">
          {t("title")}
        </h2>
        <p className="section-copy">
          {t("copy")}
        </p>
      </div>

      <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group min-h-[300px] bg-ink p-7 transition hover:bg-graphite"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan">{service.signal}</span>
              <span className="h-px w-12 bg-gold/50 transition group-hover:w-16" />
            </div>

            <h3 className="mt-12 text-2xl font-semibold leading-tight text-ice">
              {service.title}
            </h3>

            <p className="mt-5 text-sm leading-7 text-steel">
              {service.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
