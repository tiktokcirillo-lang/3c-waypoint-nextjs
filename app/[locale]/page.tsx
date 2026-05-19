import { setRequestLocale } from "next-intl/server";
import Authority from "../../components/Authority";
import Hero from '@/components/hero';
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Services from "../../components/Services";
import TradeIntelligence from "../../components/TradeIntelligence";
import CTA from "../../components/CTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Services />
        <Authority />
        <TradeIntelligence />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
