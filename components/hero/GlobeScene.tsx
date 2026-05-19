'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Data ────────────────────────────────────────────────────────────────────

/** [lat, lng] for major trade ports */
const PORTS: [number, number][] = [
  [33.74,  -118.27],  // 0 Los Angeles
  [40.66,   -74.07],  // 1 New York
  [51.90,     4.48],  // 2 Rotterdam
  [31.23,   121.47],  // 3 Shanghai
  [ 1.26,   103.82],  // 4 Singapore
  [-23.95,  -46.33],  // 5 Santos
  [25.77,   -80.19],  // 6 Miami
  [53.54,     9.98],  // 7 Hamburg
  [35.10,   129.04],  // 8 Busan
  [25.27,    55.30],  // 9 Dubai
]

/** Index pairs forming trade routes */
const ROUTES = [
  [0, 3], [0, 4], [1, 2], [1, 0],
  [5, 2], [5, 1], [6, 2], [3, 8],
  [4, 9], [2, 7], [0, 7], [1, 9],
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

function arcPoints(a: THREE.Vector3, b: THREE.Vector3, segs = 80, lift = 0.26): THREE.Vector3[] {
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
    float intensity = pow(0.60 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
    // Teal Profundo → Ciano Glacial gradient
    vec3 inner = vec3(0.102, 0.373, 0.478); // #1A5F7A
    vec3 outer = vec3(0.039, 0.082, 0.118); // rim falloff
    gl_FragColor = vec4(mix(inner, outer, 1.0 - intensity) * intensity, 1.0);
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
    color:     new THREE.Color('#05090d'),
    emissive:  new THREE.Color('#071520'),
    specular:  new THREE.Color('#1A5F7A'),
    shininess: 35,
    transparent: true,
    opacity: 0.96,
  }), [])

  useFrame(({ clock }) => {
    if (grp.current) grp.current.rotation.y = clock.getElapsedTime() * 0.07
  })

  return (
    <group ref={grp}>
      {/* Atmosphere halo */}
      <mesh scale={1.20}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={atmos} attach="material" />
      </mesh>
      {/* Surface sphere */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={surface} attach="material" />
      </mesh>
    </group>
  )
}

// ─── Animated Arc ─────────────────────────────────────────────────────────────

function Arc({ pts, delay }: { pts: THREE.Vector3[]; delay: number }) {
  const line = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    geo.setDrawRange(0, 0)
    const mat = new THREE.LineBasicMaterial({
      color:       0x7ececa,  // Mint
      transparent: true,
      opacity:     0,
    })
    return new THREE.Line(geo, mat)
  }, [pts])

  useFrame(({ clock }) => {
    // 5-second cycle: 2.2s draw, hold briefly, fade out
    const raw    = (clock.getElapsedTime() - delay + 100) % 5
    const clamped = Math.max(0, Math.min(1, raw / 2.2))
    line.geometry.setDrawRange(0, Math.floor(clamped * (pts.length + 1)))
    ;(line.material as THREE.LineBasicMaterial).opacity =
      clamped < 0.12 ? (clamped / 0.12) * 0.58
      : clamped > 0.80 ? ((1 - clamped) / 0.20) * 0.58
      : 0.58
  })

  return <primitive object={line} />
}

// ─── Trade Routes ─────────────────────────────────────────────────────────────

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
      {routes.map((pts, i) => <Arc key={i} pts={pts} delay={i * 0.52} />)}
      {portVecs.map((pos, i) => <Port key={i} position={pos} phase={i * 0.63} />)}
    </group>
  )
}

function Port({ position, phase }: { position: THREE.Vector3; phase: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(0.88 + Math.sin(clock.getElapsedTime() * 2.4 + phase) * 0.12)
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.013, 8, 8]} />
      <meshBasicMaterial color="#A8E6E4" />
    </mesh>
  )
}

// ─── Starfield ───────────────────────────────────────────────────────────────

function Stars() {
  const positions = useMemo(() => {
    const arr = new Float32Array(2400)
    for (let i = 0; i < 800; i++) {
      const θ = Math.random() * Math.PI * 2
      const φ = Math.acos(2 * Math.random() - 1)
      const r = 9 + Math.random() * 3
      arr[i * 3]     = r * Math.sin(φ) * Math.cos(θ)
      arr[i * 3 + 1] = r * Math.sin(φ) * Math.sin(θ)
      arr[i * 3 + 2] = r * Math.cos(φ)
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={800}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#A8E6E4"
        transparent
        opacity={0.32}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.85], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.14} />
      <directionalLight position={[4, 3, 5]}   intensity={0.85} color="#A8E6E4" />
      <directionalLight position={[-3, -2, -3]} intensity={0.18} color="#1A5F7A" />
      <Stars />
      <Globe />
      <TradeRoutes />
    </Canvas>
  )
}
