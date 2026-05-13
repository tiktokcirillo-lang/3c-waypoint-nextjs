import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pt-br", "es", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "pt-br": "Português",
  es: "Español",
  zh: "简体中文"
};
