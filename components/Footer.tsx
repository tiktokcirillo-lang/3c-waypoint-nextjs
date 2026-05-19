'use client';

import { useTranslations } from "next-intl";

type NavItem = {
  label: string;
  href: string;
};

export default function Footer() {
  const footer = useTranslations("Footer");
  const navbar = useTranslations("Navbar");
  const navItems = navbar.raw("items") as NavItem[];

  return (
    <footer
      style={{
        background: '#070A0D',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        {/* Main row: logo / nav / tagline */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: logo */}
          <div
            className="text-xl font-bold"
            style={{
              fontFamily: 'var(--font-barlow)',
              letterSpacing: '0.18em',
              color: '#F4F7F8',
            }}
          >
            3C WAYPOINT
          </div>

          {/* Center: nav links */}
          <nav className="flex flex-wrap gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold uppercase transition-colors duration-150 hover:text-white"
                style={{
                  color: '#95A4AD',
                  letterSpacing: '0.12em',
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: partner tagline */}
          <div
            className="text-sm italic"
            style={{ color: '#D7B56D', fontFamily: 'var(--font-inter)' }}
          >
            {footer("partner")}
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div
          className="mt-8 pt-8 text-xs"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            color: '#95A4AD',
            fontFamily: 'var(--font-inter)',
          }}
        >
          &copy; {new Date().getFullYear()} 3C Waypoint. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
