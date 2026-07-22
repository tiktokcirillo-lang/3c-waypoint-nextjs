import { setRequestLocale } from "next-intl/server";
import { OrganizationJsonLd } from "../../components/JsonLd";
import Hero from '@/components/hero';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Problem from "../../components/Problem";
import Brand from "../../components/Brand";
import RadarMethod from "../../components/RadarMethod";
import PillarsPractice from "../../components/PillarsPractice";
import Personas from "../../components/Personas";
import WhyUs from "../../components/WhyUs";
import CTA from "../../components/CTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd />
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Problem />
        <Brand />
        <RadarMethod />
        <PillarsPractice />
        <Personas />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
