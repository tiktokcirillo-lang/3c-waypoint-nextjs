'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

// ─── Data ────────────────────────────────────────────────────────────────────

const PORTS: [number, number][] = [
  [ 33.74, -118.27], //  0 Los Angeles
  [ 40.66,  -74.07], //  1 New York
  [ 51.90,    4.48], //  2 Rotterdam
  [ 31.23,  121.47], //  3 Shanghai
  [  1.26,  103.82], //  4 Singapore
  [-23.95,  -46.33], //  5 Santos
  [ 25.77,  -80.19], //  6 Miami
  [ 53.54,    9.98], //  7 Hamburg
  [ 35.10,  129.04], //  8 Busan
  [ 25.27,   55.30], //  9 Dubai
]

const ROUTES = [
  [0,3],[0,4],[1,2],[1,0],[5,2],[5,1],
  [6,2],[3,8],[4,9],[2,7],[0,7],[1,9],
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toVec3(lat: number, lng: number, r = 1): THREE.Vector3 {
  const φ = (90 - lat) * (Math.PI / 180)
  const λ = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -r * Math.sin(φ) * Math.cos(λ),
     r * Math.cos(φ),
     r * Math.sin(φ) * Math.sin(λ)
  )
}

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segs = 64, lift = 0.24) {
  return Array.from({ length: segs + 1 }, (_, i) => {
    const t = i / segs
    return new THREE.Vector3()
      .lerpVectors(a, b, t)
      .normalize()
      .multiplyScalar(1 + Math.sin(Math.PI * t) * lift)
  })
}

// ─── Shaders ─────────────────────────────────────────────────────────────────

const ATMOS_VERT = /* glsl */`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const ATMOS_FRAG = /* glsl */`
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.52 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
    gl_FragColor = vec4(0.102, 0.373, 0.478, 1.0) * intensity * 1.6;
  }
`

// ─── Globe ───────────────────────────────────────────────────────────────────

function Globe() {
  const grp = useRef<THREE.Group>(null)

  const atmos = useMemo(() => new THREE.ShaderMaterial({
    vertexShader: ATMOS_VERT,
    fragmentShader: ATMOS_FRAG,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  }), [])

  const surface = useMemo(() => new THREE.MeshPhongMaterial({
    color:     new THREE.Color('#091520'),
    emissive:  new THREE.Color('#071828'),
    specular:  new THREE.Color('#2a8fad'),
    shininess: 30,
    transparent: true,
    opacity: 0.97,
  }), [])

  // Latitude / longitude grid lines — give the globe readable structure
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = []
    // Latitude rings: -60 -30 0 +30 +60
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: THREE.Vector3[] = []
      for (let lng = -180; lng <= 181; lng += 4) pts.push(toVec3(lat, lng, 1.003))
      lines.push(pts)
    }
    // Meridians: every 30°
    for (let lng = -180; lng < 180; lng += 30) {
      const pts: THREE.Vector3[] = []
      for (let lat = -85; lat <= 85; lat += 4) pts.push(toVec3(lat, lng, 1.003))
      lines.push(pts)
    }
    return lines
  }, [])

  useFrame(({ clock }) => {
    if (grp.current) grp.current.rotation.y = clock.getElapsedTime() * 0.07
  })

  return (
    <group ref={grp}>
      {/* Atmosphere shell */}
      <mesh scale={1.18}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={atmos} attach="material" />
      </mesh>
      {/* Surface sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={surface} attach="material" />
      </mesh>
      {/* Grid */}
      {gridLines.map((pts, i) => (
        <Line key={i} points={pts} color="#1A5F7A" lineWidth={0.4} transparent opacity={0.4} />
      ))}
    </group>
  )
}

// ─── Trade Routes — TubeGeometry for real 3D arcs visible on all screens ──────

function Arc({ pts, delay }: { pts: THREE.Vector3[]; delay: number }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts)
    return new THREE.TubeGeometry(curve, 80, 0.0045, 5, false)
  }, [pts])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const t = Math.max(0, Math.min(1, ((clock.getElapsedTime() - delay + 100) % 6) / 2.5))
    matRef.current.opacity =
      t < 0.15 ? (t / 0.15) * 0.80
      : t > 0.75 ? ((1 - t) / 0.25) * 0.80
      : 0.80
  })

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial ref={matRef} color="#7ECECA" transparent opacity={0} />
    </mesh>
  )
}

function TradeRoutes() {
  const grp = useRef<THREE.Group>(null)

  const routes = useMemo(() =>
    ROUTES.map(([a, b]) => arcPoints(toVec3(...PORTS[a]), toVec3(...PORTS[b]))),
    []
  )
  const portVecs = useMemo(() => PORTS.map(([lat, lng]) => toVec3(lat, lng)), [])

  useFrame(({ clock }) => {
    if (grp.current) grp.current.rotation.y = clock.getElapsedTime() * 0.07
  })

  return (
    <group ref={grp}>
      {routes.map((pts, i) => <Arc key={i} pts={pts} delay={i * 0.5} />)}
      {portVecs.map((pos, i) => <Port key={i} position={pos} phase={i * 0.63} />)}
    </group>
  )
}

// ─── Port nodes — pulsing rings ───────────────────────────────────────────────

function Port({ position, phase }: { position: THREE.Vector3; phase: number }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const s = 1 + Math.sin(clock.getElapsedTime() * 2.2 + phase) * 0.35
    ringRef.current.scale.setScalar(s)
    ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity =
      0.25 - Math.sin(clock.getElapsedTime() * 2.2 + phase) * 0.12
  })

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshBasicMaterial color="#A8E6E4" transparent opacity={0.15} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.011, 8, 8]} />
        <meshBasicMaterial color="#A8E6E4" />
      </mesh>
    </group>
  )
}

// ─── Starfield ────────────────────────────────────────────────────────────────

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(2400)
    for (let i = 0; i < 800; i++) {
      const θ = Math.random() * Math.PI * 2
      const φ = Math.acos(2 * Math.random() - 1)
      const r = 9 + Math.random() * 3
      arr[i*3]   = r * Math.sin(φ) * Math.cos(θ)
      arr[i*3+1] = r * Math.sin(φ) * Math.sin(θ)
      arr[i*3+2] = r * Math.cos(φ)
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={800} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#A8E6E4" transparent opacity={0.30} sizeAttenuation />
    </points>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 2.6], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 3, 5]}   intensity={1.0} color="#A8E6E4" />
      <directionalLight position={[-2, -1, -3]} intensity={0.15} color="#1A5F7A" />
      <pointLight position={[2, 1, 3]} intensity={0.6} color="#7ECECA" distance={8} />
      <Stars />
      <Globe />
      <TradeRoutes />
    </Canvas>
  )
}
