'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

// ─── Brand Palette ────────────────────────────────────────────────────────────
const TEAL    = '#1A5F7A'
const MINT    = '#7ECECA'
const GLACIAL = '#A8E6E4'
const R       = 1.5

// ─── Port Data ────────────────────────────────────────────────────────────────
const PORTS = [
  { id: 'SHA', label: 'Shanghai',    lat:  31.23, lon:  121.47 },
  { id: 'LAX', label: 'Los Angeles', lat:  33.74, lon: -118.28 },
  { id: 'SSZ', label: 'Santos',      lat: -23.96, lon:  -46.33 },
  { id: 'MIA', label: 'Miami',       lat:  25.76, lon:  -80.19 },
  { id: 'RTM', label: 'Rotterdam',   lat:  51.92, lon:    4.48 },
  { id: 'HOU', label: 'Houston',     lat:  29.76, lon:  -95.37 },
]

const CONNECTIONS: [string, string][] = [
  ['SHA', 'LAX'],
  ['SHA', 'RTM'],
  ['LAX', 'HOU'],
  ['HOU', 'MIA'],
  ['MIA', 'SSZ'],
  ['RTM', 'SSZ'],
  ['HOU', 'RTM'],
  ['SSZ', 'MIA'],
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toVec3(lat: number, lon: number, r = R): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

function buildArc(a: THREE.Vector3, b: THREE.Vector3, lift = 0.30): THREE.Vector3[] {
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * (1 + lift))
  return new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(100)
}

// ─── Port Marker ──────────────────────────────────────────────────────────────

function PortMarker({ position }: { position: THREE.Vector3 }) {
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const pulse = Math.sin(clock.getElapsedTime() * 2.2 + position.x * 7) * 0.5 + 0.5
    glowRef.current.scale.setScalar(1 + pulse * 0.55)
    ;(glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + pulse * 0.18
  })

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.013, 10, 10]} />
        <meshBasicMaterial color={GLACIAL} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}

// ─── Traveler ─────────────────────────────────────────────────────────────────

function Traveler({ arc, speed, timeOffset }: { arc: THREE.Vector3[]; speed: number; timeOffset: number }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t   = ((clock.getElapsedTime() * speed + timeOffset) % 1)
    const idx = Math.floor(t * (arc.length - 1))
    ref.current.position.copy(arc[idx])
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.009, 6, 6]} />
      <meshBasicMaterial color={MINT} />
    </mesh>
  )
}

// ─── Starfield ────────────────────────────────────────────────────────────────

function Starfield() {
  const geo = useMemo(() => {
    const g   = new THREE.BufferGeometry()
    const pos = new Float32Array(1800 * 3).map(() => (Math.random() - 0.5) * 80)
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  return (
    <points geometry={geo}>
      <pointsMaterial color="#3A7A94" size={0.035} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

// ─── World Scene ──────────────────────────────────────────────────────────────

function WorldScene() {
  const groupRef = useRef<THREE.Group>(null!)

  const portMap = useMemo(
    () => Object.fromEntries(PORTS.map(p => [p.id, toVec3(p.lat, p.lon)])),
    [],
  )

  const routes = useMemo(
    () =>
      CONNECTIONS.map(([a, b], i) => ({
        key:    `${a}-${b}`,
        arc:    buildArc(portMap[a], portMap[b]),
        speed:  0.07 + i * 0.011,
        offset: i / CONNECTIONS.length,
      })),
    [portMap],
  )

  useFrame((_, dt) => {
    groupRef.current.rotation.y += dt * 0.055
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshPhongMaterial color="#060E1A" emissive="#071520" shininess={22} />
      </mesh>

      <mesh>
        <sphereGeometry args={[R * 1.002, 24, 16]} />
        <meshBasicMaterial color="#0D2E45" wireframe transparent opacity={0.20} />
      </mesh>

      <mesh>
        <sphereGeometry args={[R * 1.07, 32, 32]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {routes.map(({ key, arc }) => (
        <Line key={key} points={arc} color={TEAL} lineWidth={1} transparent opacity={0.45} />
      ))}

      {routes.map(({ key, arc, speed, offset }) => (
        <Traveler key={`t-${key}`} arc={arc} speed={speed} timeOffset={offset} />
      ))}

      {PORTS.map(p => (
        <PortMarker key={p.id} position={portMap[p.id]} />
      ))}
    </group>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function GlobeScene({ className = '' }: { className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <Canvas
        camera={{ position: [0, 1.0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.22} />
        <directionalLight position={[4,  6,  4]}  intensity={0.9}  color={GLACIAL} />
        <directionalLight position={[-4, -2, -4]} intensity={0.14} color={TEAL}    />

        <Starfield />
        <WorldScene />
      </Canvas>
    </div>
  )
}
