'use client';

import { useTranslations } from 'next-intl';

const SEP = <span className="mx-4 opacity-40 select-none">·</span>;

function TickerRow({ terms, reverse = false }: { terms: string[]; reverse?: boolean }) {
  const row = [...terms, ...terms];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, #0A0F14, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, #0A0F14, transparent)' }}
      />
      <div
        className={`flex whitespace-nowrap ${reverse ? 'animate-ticker-reverse' : 'animate-ticker'}`}
        style={{ willChange: 'transform' }}
      >
        {row.map((term, i) => (
          <span
            key={i}
            className="inline-flex items-center font-display text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ color: '#D7B56D' }}
          >
            {term}
            {SEP}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ComexTicker() {
  const t = useTranslations('Hero');
  const terms = t.raw('marquee') as string[];

  return (
    <section
      className="relative w-full overflow-hidden py-5"
      style={{ background: '#0A0F14' }}
      aria-hidden="true"
    >
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D7B56D44, transparent)' }}
      />
      <div className="flex flex-col gap-2">
        <TickerRow terms={terms} />
        <TickerRow terms={terms} reverse />
      </div>
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D7B56D44, transparent)' }}
      />
    </section>
  );
}
