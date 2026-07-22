'use client'
import { useRef, useEffect, useState } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'

const MINT    = '#7ECECA'
const GLACIAL = '#A8E6E4'
const TEAL    = '#1A5F7A'

const INITIAL_POV = { lat: 18, lng: -25, altitude: 2.4 }
const ARC_ALTITUDE = 0.3 // compartilhado entre arcsData e o bulge dos veículos

const PORTS = [
  { id: 'SHA', lat:  31.23, lng:  121.47, core: false },
  { id: 'LAX', lat:  33.74, lng: -118.28, core: false },
  { id: 'SSZ', lat: -23.96, lng:  -46.33, core: true  },
  { id: 'MIA', lat:  25.76, lng:  -80.19, core: true  },
  { id: 'RTM', lat:  51.92, lng:    4.48, core: true  },
  { id: 'HOU', lat:  29.76, lng:  -95.37, core: false },
]

const CORE_RINGS = PORTS.filter(p => p.core).map(p => ({
  lat: p.lat,
  lng: p.lng,
  maxR: 4,
  propagationSpeed: 2,
  repeatPeriod: 900,
}))

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

// ─── Veículos viajando pelas rotas — navio em trechos marítimos, avião em longo curso ──

type VehicleType = 'ship' | 'plane'

const ROUTE_VEHICLES: { id: string; from: string; to: string; type: VehicleType }[] = [
  { id: 'SHA-LAX', from: 'SHA', to: 'LAX', type: 'plane' },
  { id: 'SHA-RTM', from: 'SHA', to: 'RTM', type: 'plane' },
  { id: 'LAX-HOU', from: 'LAX', to: 'HOU', type: 'ship'  },
  { id: 'HOU-MIA', from: 'HOU', to: 'MIA', type: 'ship'  },
  { id: 'MIA-SSZ', from: 'MIA', to: 'SSZ', type: 'ship'  },
  { id: 'RTM-SSZ', from: 'RTM', to: 'SSZ', type: 'ship'  },
  { id: 'HOU-RTM', from: 'HOU', to: 'RTM', type: 'plane' },
  { id: 'SSZ-MIA', from: 'SSZ', to: 'MIA', type: 'ship'  },
]

// Duração-base para um trajeto de 1/4 do globo (ω = π/2) — rotas mais longas
// escalam proporcionalmente, ajusta esse número pra acelerar/desacelerar tudo de uma vez
const BASE_DURATION_MS = 9000
const STATE_TICK_MS    = 50 // ~20fps de atualização de estado — suave e leve

// ─── Matemática esférica — auto-contida, não depende da convenção interna da lib ──

function toVec3(lat: number, lng: number) {
  const phi = lat * (Math.PI / 180)
  const lambda = lng * (Math.PI / 180)
  return {
    x: Math.cos(phi) * Math.cos(lambda),
    y: Math.cos(phi) * Math.sin(lambda),
    z: Math.sin(phi),
  }
}

function toLatLng(v: { x: number; y: number; z: number }) {
  return {
    lat: (Math.asin(Math.max(-1, Math.min(1, v.z))) * 180) / Math.PI,
    lng: (Math.atan2(v.y, v.x) * 180) / Math.PI,
  }
}

function angularDistance(aLat: number, aLng: number, bLat: number, bLng: number) {
  const a = toVec3(aLat, aLng)
  const b = toVec3(bLat, bLng)
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z))
  return Math.acos(dot)
}

function slerpLatLng(aLat: number, aLng: number, bLat: number, bLng: number, t: number) {
  const a = toVec3(aLat, aLng)
  const b = toVec3(bLat, bLng)
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z))
  const omega = Math.acos(dot)
  if (omega < 1e-6) return { lat: aLat, lng: aLng }
  const sinOmega = Math.sin(omega)
  const wa = Math.sin((1 - t) * omega) / sinOmega
  const wb = Math.sin(t * omega) / sinOmega
  return toLatLng({
    x: a.x * wa + b.x * wb,
    y: a.y * wa + b.y * wb,
    z: a.z * wa + b.z * wb,
  })
}

// ─── Malhas simples — sem asset externo, upgrade futuro pra .glb se quiser mais fidelidade ──

function makeShipMesh() {
  const group = new THREE.Group()
  const hull = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2.8, 4),
    new THREE.MeshBasicMaterial({ color: MINT })
  )
  hull.rotation.x = Math.PI / 2
  hull.rotation.z = Math.PI / 4
  group.add(hull)
  return group
}

function makePlaneMesh() {
  const group = new THREE.Group()
  const fuselage = new THREE.Mesh(
    new THREE.ConeGeometry(0.45, 2.6, 3),
    new THREE.MeshBasicMaterial({ color: GLACIAL })
  )
  fuselage.rotation.x = Math.PI / 2
  group.add(fuselage)
  const wings = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.12, 0.5),
    new THREE.MeshBasicMaterial({ color: GLACIAL })
  )
  wings.position.z = 0.15
  group.add(wings)
  return group
}

export default function GlobeScene({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef     = useRef<any>(null)
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)
  const [vehicles, setVehicles] = useState<any[]>([])

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
    globeRef.current.pointOfView(INITIAL_POV, 0)
  }, [dims])

  // Loop de animação dos veículos — rAF pro timing, mas só escreve estado a ~20fps
  useEffect(() => {
    const meta = ROUTE_VEHICLES.map((v, i) => {
      const dist = angularDistance(PM[v.from].lat, PM[v.from].lng, PM[v.to].lat, PM[v.to].lng)
      return {
        ...v,
        duration: BASE_DURATION_MS * (dist / (Math.PI / 2)),
        offset: (i / ROUTE_VEHICLES.length) * BASE_DURATION_MS * 2,
      }
    })

    let raf = 0
    let lastTick = 0

    const tick = (now: number) => {
      if (now - lastTick >= STATE_TICK_MS) {
        lastTick = now
        setVehicles(
          meta.map(v => {
            const t = ((now + v.offset) % v.duration) / v.duration
            const { lat, lng } = slerpLatLng(PM[v.from].lat, PM[v.from].lng, PM[v.to].lat, PM[v.to].lng, t)
            return {
              id: v.id,
              type: v.type,
              lat,
              lng,
              alt: ARC_ALTITUDE * Math.sin(Math.PI * t),
            }
          })
        )
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      data-cursor="globe"
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
          arcAltitude={ARC_ALTITUDE}
          arcStroke={0.4}
          arcDashLength={0.5}
          arcDashGap={0.5}
          arcDashAnimateTime={2000}
          pointsData={PORTS}
          pointColor={(p: any) => p.core ? MINT : GLACIAL}
          pointAltitude={0.01}
          pointRadius={(p: any) => p.core ? 0.55 : 0.3}
          ringsData={CORE_RINGS}
          ringColor={() => (t: number) => `rgba(126,206,202,${1 - t})`}
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          objectsData={vehicles}
          objectLat="lat"
          objectLng="lng"
          objectAltitude="alt"
          objectThreeObject={(d: any) => d.type === 'ship' ? makeShipMesh() : makePlaneMesh()}
        />
      )}
    </div>
  )
}
