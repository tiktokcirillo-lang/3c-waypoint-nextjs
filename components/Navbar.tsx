'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = {
  label: string;
  href: string;
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const navItems = t.raw("items") as NavItem[];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl"
    >
      <nav className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label={t("homeAria")}>
          <span className="grid h-9 w-9 place-items-center border border-cyan/40 bg-white/[0.03] text-sm font-semibold text-ice">
            3C
          </span>
          <span className="text-sm font-semibold text-ice">3C Waypoint</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-steel transition hover:text-ice"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden border border-cyan/35 bg-cyan/10 px-4 py-2 text-sm font-semibold text-ice transition hover:border-cyan hover:bg-cyan/20 sm:inline-flex"
        >
          {t("cta")}
        </a>

        <LanguageSwitcher />
      </nav>
    </motion.header>
  );
}
