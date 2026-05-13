'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Stat = {
  value: string;
  label: string;
};

export default function Hero() {
  const t = useTranslations("Hero");
  const heroStats = t.raw("stats") as Stat[];
  const dashboardSignals = t.raw("dashboard.signals") as string[];

  return (
    <section id="top" className="hero-surface relative overflow-hidden px-5 py-24 sm:px-8 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: ["-4%", "4%", "-4%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
        />
        <motion.div
          animate={{ x: ["5%", "-5%", "5%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative z-10"
        >
          <span className="eyebrow">
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[1.06] text-ice sm:text-6xl lg:text-7xl">
            {t("headline.line1")}
            <span className="block text-cyan">{t("headline.line2")}</span>
            <span className="block">{t("headline.line3")}</span>
            <span className="block text-frost">{t("headline.line4")}</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-steel">
            {t("copy")}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="button-primary">
              {t("primaryCta")}
            </a>

            <a href="#services" className="button-secondary">
              {t("secondaryCta")}
            </a>
          </div>

          <div className="mt-14 grid max-w-2xl grid-cols-3 border border-white/10 bg-white/[0.025]">
            {heroStats.map((stat) => (
              <div key={stat.label} className="border-r border-white/10 p-4 last:border-r-0">
                <div className="text-lg font-semibold text-ice">{stat.value}</div>
                <div className="mt-1 text-xs leading-5 text-steel">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative z-10 min-h-[540px] overflow-hidden border border-white/10 bg-graphite/65 shadow-2xl shadow-black/30"
          aria-label={t("dashboardAria")}
        >
          <div className="absolute inset-0 command-grid" />
          <motion.div
            animate={{ y: ["0%", "72%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-8 h-24 w-full border-y border-cyan/20 bg-cyan/5"
          />
          <div className="absolute inset-x-6 top-6 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-semibold text-ice">{t("dashboard.title")}</span>
            <span className="text-xs text-cyan">{t("dashboard.signalMap")}</span>
          </div>
          <div className="absolute left-6 right-6 top-24 grid gap-4">
            {dashboardSignals.map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.32 + index * 0.12 }}
                className="grid grid-cols-[1fr_auto] items-center gap-4 border border-white/10 bg-ink/70 p-4"
              >
                <div>
                  <div className="text-sm font-semibold text-ice">{label}</div>
                  <div className="mt-2 h-2 overflow-hidden bg-white/10">
                    <motion.div
                      initial={{ width: "24%" }}
                      animate={{ width: `${72 + index * 8}%` }}
                      transition={{ duration: 1.2, delay: 0.6 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-cyan to-gold"
                    />
                  </div>
                </div>
                <span className="text-sm font-semibold text-frost">{86 + index * 4}</span>
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
            <div className="border border-white/10 bg-white/[0.035] p-4">
              <div className="text-xs text-steel">{t("dashboard.marketLabel")}</div>
              <div className="mt-1 text-2xl font-semibold text-ice">{t("dashboard.marketValue")}</div>
            </div>
            <div className="border border-white/10 bg-white/[0.035] p-4">
              <div className="text-xs text-steel">{t("dashboard.partnerLabel")}</div>
              <div className="mt-1 text-lg font-semibold text-ice">{t("dashboard.partnerValue")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
