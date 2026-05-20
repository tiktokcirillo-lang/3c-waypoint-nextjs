'use client'

import { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'

const MINT    = '#7ECECA'
const GLACIAL = '#A8E6E4'
const TEAL    = '#1A5F7A'

const PORTS = [
  { id: 'SHA', lat:  31.23, lng:  121.47 },
  { id: 'LAX', lat:  33.74, lng: -118.28 },
  { id: 'SSZ', lat: -23.96, lng:  -46.33 },
  { id: 'MIA', lat:  25.76, lng:  -80.19 },
  { id: 'RTM', lat:  51.92, lng:    4.48 },
  { id: 'HOU', lat:  29.76, lng:  -95.37 },
]

const PM = Object.fromEntries(PORTS.map(p => [p.id, p]))

const ARCS = (
  [
    ['SHA', 'LAX'],
    ['SHA', 'RTM'],
    ['LAX', 'HOU'],
    ['HOU', 'MIA'],
    ['MIA', 'SSZ'],
    ['RTM', 'SSZ'],
    ['HOU', 'RTM'],
    ['SSZ', 'MIA'],
  ] as [string, string][]
).map(([s, d]) => ({
  startLat: PM[s].lat, startLng: PM[s].lng,
  endLat:   PM[d].lat, endLng:   PM[d].lng,
}))

export default function GlobeScene({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef     = useRef<any>(null)
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => {
      const w = el.offsetWidth
      const h = el.offsetHeight
      if (w > 0 && h > 0) setDims({ w, h })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!globeRef.current || !dims) return
    const ctrl = globeRef.current.controls()
    ctrl.autoRotate      = true
    ctrl.autoRotateSpeed = 0.35
    ctrl.enableZoom      = false
    ctrl.enablePan       = false
    globeRef.current.pointOfView({ lat: 18, lng: -20, altitude: 2.0 }, 0)
  }, [dims])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {dims && (
        <Globe
          ref={globeRef}
          width={dims.w}
          height={dims.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="/textures/earth-night.jpg"
          bumpImageUrl="/textures/earth-topology.png"
          atmosphereColor={TEAL}
          atmosphereAltitude={0.14}
          arcsData={ARCS}
          arcColor={() => [MINT, GLACIAL]}
          arcAltitude={0.3}
          arcStroke={0.4}
          arcDashLength={0.5}
          arcDashGap={0.5}
          arcDashAnimateTime={2000}
          pointsData={PORTS}
          pointColor={() => GLACIAL}
          pointAltitude={0.01}
          pointRadius={0.4}
        />
      )}
    </div>
  )
}
