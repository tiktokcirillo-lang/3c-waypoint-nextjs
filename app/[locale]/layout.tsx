import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing, type Locale } from "../../i18n/routing";
import SmoothScroll from "../../components/SmoothScroll";
import CustomCursor from "../../components/CustomCursor";

const BASE_URL = 'https://3c-waypoint-nextjs.vercel.app'

// Maps route locale code → BCP-47 tag used in hreflang / html[lang] / og:locale
const localeMeta: Record<Locale, { lang: string; ogLocale: string }> = {
  en:    { lang: 'en-US', ogLocale: 'en_US' },
  'pt-br': { lang: 'pt-BR', ogLocale: 'pt_BR' },
  es:    { lang: 'es-ES', ogLocale: 'es_ES' },
  zh:    { lang: 'zh-CN', ogLocale: 'zh_CN' },
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const l = locale as Locale
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const { ogLocale } = localeMeta[l]
  const canonical = `${BASE_URL}/${locale}`

  const languageAlternates: Record<string, string> = Object.fromEntries(
    routing.locales.map((loc) => [localeMeta[loc as Locale].lang, `${BASE_URL}/${loc}`])
  )
  languageAlternates['x-default'] = `${BASE_URL}/en`

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s | 3C Waypoint`,
    },
    description: t("description"),
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: '3C Waypoint',
      title: t("title"),
      description: t("description"),
      locale: ogLocale,
      alternateLocale: routing.locales
        .filter((loc) => loc !== l)
        .map((loc) => localeMeta[loc as Locale].ogLocale),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: '3C Waypoint',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t("title"),
      description: t("description"),
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: '349a9e11a7add2aa',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const { lang } = localeMeta[locale as Locale]

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <CustomCursor />
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
