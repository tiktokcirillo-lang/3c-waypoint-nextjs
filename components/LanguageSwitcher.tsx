'use client';

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "../i18n/navigation";
import { routing, type Locale } from "../i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Locale");
  const [isPending, startTransition] = useTransition();

  function handleChange(nextLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    window.localStorage.setItem("3c-waypoint-locale", nextLocale);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{t("label")}</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value as Locale)}
        className="h-10 border border-white/10 bg-white/[0.035] px-3 text-sm font-semibold text-ice outline-none transition hover:border-cyan focus:border-cyan disabled:cursor-wait disabled:opacity-60"
        aria-label={t("label")}
      >
        {routing.locales.map((availableLocale) => (
          <option key={availableLocale} value={availableLocale} className="bg-ink text-ice">
            {t(availableLocale)}
          </option>
        ))}
      </select>
    </label>
  );
}
