'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroText from './HeroText'

// ─── Dynamic import — Three.js can't run on the server ───────────────────────
const GlobeScene = dynamic(() => import('./GlobeScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

gsap.registerPlugin(ScrollTrigger)

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const globeRef    = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /*
       * Cinematic scroll sequence — Active Theory–style:
       *
       * 0% → 100% scroll progress across a pinned 220vh wrapper:
       *   • Globe: scale 1→1.25, drifts right, opacity 1→0
       *   • Text block: drifts up and fades, slight scale-down
       *   • Grid overlay: fades out early
       *   • Ambient gradient: intensifies at mid-scroll
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top top',
          end:     '+=130%',
          scrub:   1.2,
          pin:     true,
          // Uncomment once Lenis is wired at root layout:
          // anticipatePin: 1,
        },
      })

      // Globe: breathes out and fades
      tl.to(globeRef.current, {
        scale:   1.22,
        x:       '8%',
        opacity: 0,
        ease:    'none',
      }, 0)

      // Text: lifts and dissolves
      tl.to(textRef.current, {
        yPercent: -12,
        opacity:  0,
        ease:     'none',
      }, 0)

      // Decorative grid: out early
      tl.to(gridRef.current, {
        opacity: 0,
        ease:    'none',
        duration: 0.4,
      }, 0)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0A0E10]"
      aria-label="Hero — 3C Waypoint"
    >

      {/* ── Background gradient layers ── */}
      {/*
        Two overlapping radials create depth without harshness:
        • Right: warm teal haze behind the globe
        • Left: dark gradient lets text stay legible
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 75% 65% at 72% 52%, rgba(26,95,122,0.18) 0%, transparent 65%)',
            'radial-gradient(ellipse 55% 90% at 12% 100%, rgba(10,14,16,0.9) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      {/* ── Globe — positioned right of center ── */}
      <div
        ref={globeRef}
        className="
          absolute
          top-1/2 -translate-y-1/2
          right-[-14%]
          w-[62vw] h-[62vw]
          max-w-[860px] max-h-[860px]
          pointer-events-none
        "
      >
        <GlobeScene />
      </div>

      {/* ── Typography layer ── */}
      <div ref={textRef} className="absolute inset-0">
        <HeroText />
      </div>

      {/* ── Decorative dot-grid — Active Theory texture ── */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.028,
          backgroundImage: [
            'radial-gradient(circle, rgba(168,230,228,0.9) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      {/* ── Bottom edge vignette ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0A0E10 0%, transparent 100%)' }}
        aria-hidden
      />

      {/* ── Left edge vignette — keeps type legible over globe bleed ── */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[45%] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(10,14,16,0.55) 0%, transparent 100%)' }}
        aria-hidden
      />

    </section>
  )
}
