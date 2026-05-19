"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItem = { label: string; href: string };

export default function Navbar() {
  const t = useTranslations("Navbar");
  const items = t.raw("items") as NavItem[];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(7,10,13,0.96)",
          borderBottom: scrolled
            ? "1px solid #D7B56D"
            : "1px solid rgba(255,255,255,0.06)",
          transition: "border-color 0.4s ease",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" aria-label={t("homeAria")}>
            <img src="/logo.png" alt="3C Waypoint" className="h-8 w-auto object-contain" />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase transition-colors duration-200 text-white/55 hover:text-white"
                style={{
                  fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA + language switcher + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2 text-xs font-semibold uppercase transition-colors duration-200 text-cyan border border-teal hover:bg-teal hover:text-ice"
              style={{
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              {t("cta")}
            </a>

            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 text-ice bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay — z-[49] keeps the header (z-50) visible on top */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[49] flex flex-col items-center justify-center gap-10 md:hidden"
            style={{ backgroundColor: "#070A0D" }}
          >
            {items.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-semibold uppercase text-white/70 hover:text-white transition-colors"
                style={{
                  fontFamily: "var(--font-barlow, 'Barlow Condensed', sans-serif)",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: items.length * 0.07, duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center px-8 py-3 text-sm font-semibold uppercase text-cyan border border-teal hover:bg-teal hover:text-ice transition-colors"
              style={{
                fontFamily: "var(--font-inter, 'Inter', sans-serif)",
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              {t("cta")}
            </motion.a>

            <div className="mt-2">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
