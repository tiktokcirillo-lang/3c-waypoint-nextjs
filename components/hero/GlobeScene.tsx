'use client'

import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

const PORTS = [
  { id: 'SHA', lat:  31.23, lng:  121.47, label: 'Shanghai'    },
  { id: 'LAX', lat:  33.74, lng: -118.28, label: 'Los Angeles' },
  { id: 'SSZ', lat: -23.96, lng:  -46.33, label: 'Santos'      },
  { id: 'MIA', lat:  25.76, lng:  -80.19, label: 'Miami'       },
  { id: 'RTM', lat:  51.92, lng:    4.48, label: 'Rotterdam'   },
  { id: 'HOU', lat:  29.76, lng:  -95.37, label: 'Houston'     },
]

const ARCS = [
  { src: 'SHA', dst: 'LAX' },
  { src: 'SHA', dst: 'RTM' },
  { src: 'LAX', dst: 'HOU' },
  { src: 'HOU', dst: 'MIA' },
  { src: 'MIA', dst: 'SSZ' },
  { src: 'RTM', dst: 'SSZ' },
  { src: 'HOU', dst: 'RTM' },
  { src: 'SSZ', dst: 'MIA' },
].map(({ src, dst }) => {
  const s = PORTS.find(p => p.id === src)!
  const d = PORTS.find(p => p.id === dst)!
  return {
    startLat: s.lat, startLng: s.lng,
    endLat:   d.lat, endLng:   d.lng,
    color:    ['#7ECECA', '#A8E6E4'],
  }
})

export default function GlobeScene({ className = '' }: { className?: string }) {
  const globeRef = useRef<any>(null)

  useEffect(() => {
    const g = globeRef.current
    if (!g) return
    g.controls().autoRotate      = true
    g.controls().autoRotateSpeed = 0.4
    g.controls().enableZoom      = false
    g.controls().enablePan       = false
    g.pointOfView({ lat: 20, lng: -30, altitude: 2.2 }, 0)
  }, [])

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeRef}
        width={undefined}
        height={undefined}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.png"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#1A5F7A"
        atmosphereAltitude={0.18}
        arcsData={ARCS}
        arcColor="color"
        arcAltitude={0.32}
        arcStroke={0.5}
        arcDashLength={0.5}
        arcDashGap={0.5}
        arcDashAnimateTime={2200}
        pointsData={PORTS}
        pointColor={() => '#A8E6E4'}
        pointAltitude={0.01}
        pointRadius={0.45}
        pointsMerge={false}
      />
    </div>
  )
}
