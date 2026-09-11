'use client'

import * as THREE from 'three'
import { useLayoutEffect, useRef } from 'react'

/* ------------------------------------------------------------------ *
 * Shared material palette — mirrors the Tailwind "Precise White Lab"
 * tokens so the 3D reads as part of the same design system.
 * ------------------------------------------------------------------ */
export const MAT = {
  /** Primary painted structural steel */
  white:  { color: '#d9d9d6', roughness: 0.52, metalness: 0.30 },
  /** Secondary steelwork, walkways, chords */
  grey:   { color: '#9a9a97', roughness: 0.60, metalness: 0.35 },
  /** Machinery housings, gearboxes, shadowed detail */
  dark:   { color: '#3c3c3c', roughness: 0.55, metalness: 0.45 },
  /** Deep shadow parts — undercarriage, chutes */
  ink:    { color: '#1f1f1f', roughness: 0.70, metalness: 0.25 },
  /** electric-orange accent — drives, moving parts, hazard marks */
  accent: { color: '#ff4000', roughness: 0.40, metalness: 0.10,
            emissive: '#ff4000', emissiveIntensity: 0.22 },
  /** Conveyor belting / tyres */
  rubber: { color: '#1a1a1a', roughness: 0.92, metalness: 0.05 },
  /** Bulk material — coal, limestone, bauxite */
  bulk:   { color: '#4b4743', roughness: 0.96, metalness: 0.02 },
} as const

export type MatKind = keyof typeof MAT

export type V3 = [number, number, number]
export type Seg = [V3, V3]

const _up = new THREE.Vector3(0, 1, 0)

/* ------------------------------------------------------------------ *
 * Struts — renders an arbitrary list of line segments as real tubular
 * members in a single InstancedMesh. This is the workhorse behind every
 * lattice boom, handrail and bracing frame in the scene.
 * ------------------------------------------------------------------ */
export function Struts({
  segments,
  radius = 0.04,
  kind = 'grey',
  sides = 6,
}: {
  segments: Seg[]
  radius?: number
  kind?: MatKind
  sides?: number
}) {
  const ref = useRef<THREE.InstancedMesh>(null)

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return

    const m = new THREE.Matrix4()
    const pos = new THREE.Vector3()
    const dir = new THREE.Vector3()
    const scale = new THREE.Vector3()
    const q = new THREE.Quaternion()

    segments.forEach(([a, b], i) => {
      dir.set(b[0] - a[0], b[1] - a[1], b[2] - a[2])
      const len = dir.length() || 0.0001
      pos.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2)
      q.setFromUnitVectors(_up, dir.divideScalar(len))
      scale.set(1, len, 1)
      m.compose(pos, q, scale)
      mesh.setMatrixAt(i, m)
    })
    mesh.count = segments.length
    mesh.instanceMatrix.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [segments])

  // Unit-height cylinder; the Y scale above stretches it to each span.
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, Math.max(segments.length, 1)]}
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={[radius, radius, 1, sides]} />
      <meshStandardMaterial {...MAT[kind]} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ *
 * Lattice geometry builders
 * ------------------------------------------------------------------ */

/**
 * Four-chord box truss running along +X, from x=0 to x=length.
 * Cross-section is `width` (Z) by `height` (Y), centred on the X axis.
 * Produces chords, transverse frames and alternating face diagonals —
 * i.e. an actual Warren truss, not a decorative zig-zag.
 */
export function boxTruss(
  length: number,
  width: number,
  height: number,
  bays: number,
  opts: { taperTo?: number } = {}
): Seg[] {
  const segs: Seg[] = []
  const bay = length / bays
  const taper = opts.taperTo ?? 1 // scale of the cross-section at the far end

  // Half-dimensions at a given bay index (allows tapered booms)
  const hw = (i: number) => (width / 2) * (1 + (taper - 1) * (i / bays))
  const hh = (i: number) => (height / 2) * (1 + (taper - 1) * (i / bays))

  // corner sign table: [zSign, ySign]
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  const node = (i: number, c: number): V3 => {
    const [zs, ys] = corners[c]
    return [i * bay, ys * hh(i), zs * hw(i)]
  }

  for (let i = 0; i < bays; i++) {
    // 4 longitudinal chords
    for (let c = 0; c < 4; c++) segs.push([node(i, c), node(i + 1, c)])

    // transverse frame at each node plane
    for (let c = 0; c < 4; c++) segs.push([node(i, c), node(i, (c + 1) % 4)])

    // face diagonals, alternating direction bay to bay (Warren pattern)
    const flip = i % 2 === 0
    for (let c = 0; c < 4; c++) {
      const c2 = (c + 1) % 4
      segs.push(flip ? [node(i, c), node(i + 1, c2)] : [node(i, c2), node(i + 1, c)])
    }
  }
  // closing frame at the tip
  for (let c = 0; c < 4; c++) segs.push([node(bays, c), node(bays, (c + 1) % 4)])

  return segs
}

/**
 * Tapered lattice mast / A-frame tower rising along +Y from y=0 to y=height,
 * square in plan, shrinking from `base` to `top` across `bays`.
 */
export function latticeTower(
  height: number,
  base: number,
  top: number,
  bays: number
): Seg[] {
  const segs: Seg[] = []
  const bay = height / bays
  const half = (i: number) => (base + (top - base) * (i / bays)) / 2
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
  const node = (i: number, c: number): V3 => {
    const [xs, zs] = corners[c]
    return [xs * half(i), i * bay, zs * half(i)]
  }

  for (let i = 0; i < bays; i++) {
    for (let c = 0; c < 4; c++) segs.push([node(i, c), node(i + 1, c)])      // legs
    for (let c = 0; c < 4; c++) segs.push([node(i, c), node(i, (c + 1) % 4)]) // horizontal frame
    const flip = i % 2 === 0
    for (let c = 0; c < 4; c++) {
      const c2 = (c + 1) % 4
      segs.push(flip ? [node(i, c), node(i + 1, c2)] : [node(i, c2), node(i + 1, c)])
    }
  }
  for (let c = 0; c < 4; c++) segs.push([node(bays, c), node(bays, (c + 1) % 4)])
  return segs
}

/**
 * Handrail along a straight run: two rails plus stanchions at `spacing`.
 * `from`/`to` are floor-level points; rail sits `h` above them.
 */
export function handrail(from: V3, to: V3, h = 0.5, spacing = 0.9): Seg[] {
  const segs: Seg[] = []
  const dx = to[0] - from[0], dy = to[1] - from[1], dz = to[2] - from[2]
  const len = Math.hypot(dx, dy, dz)
  const n = Math.max(1, Math.round(len / spacing))
  const at = (t: number, yOff: number): V3 =>
    [from[0] + dx * t, from[1] + dy * t + yOff, from[2] + dz * t]

  segs.push([at(0, h), at(1, h)])           // top rail
  segs.push([at(0, h * 0.55), at(1, h * 0.55)]) // knee rail
  for (let i = 0; i <= n; i++) segs.push([at(i / n, 0), at(i / n, h)]) // stanchions
  return segs
}

/** Translate a segment list — lets builders be composed without wrapper groups. */
export function offsetSegs(segs: Seg[], [ox, oy, oz]: V3): Seg[] {
  return segs.map(([a, b]) => [
    [a[0] + ox, a[1] + oy, a[2] + oz],
    [b[0] + ox, b[1] + oy, b[2] + oz],
  ] as Seg)
}

/** Mirror a segment list across the XY plane (Z → −Z). */
export function mirrorZ(segs: Seg[]): Seg[] {
  return segs.map(([a, b]) => [
    [a[0], a[1], -a[2]],
    [b[0], b[1], -b[2]],
  ] as Seg)
}

/* ------------------------------------------------------------------ *
 * Mesh primitives
 * ------------------------------------------------------------------ */

export function Box({
  size, position = [0, 0, 0], rotation = [0, 0, 0], kind = 'white',
}: {
  size: V3; position?: V3; rotation?: V3; kind?: MatKind
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial {...MAT[kind]} />
    </mesh>
  )
}

/** Cylinder with its axis along X (the usual orientation for shafts/pulleys). */
export function Drum({
  radius, length, position = [0, 0, 0], kind = 'dark', segments = 24,
}: {
  radius: number; length: number; position?: V3; kind?: MatKind; segments?: number
}) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, length, segments]} />
      <meshStandardMaterial {...MAT[kind]} />
    </mesh>
  )
}

/** Grated walkway deck. */
export function Walkway({
  length, width, position = [0, 0, 0], rotation = [0, 0, 0],
}: {
  length: number; width: number; position?: V3; rotation?: V3
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[length, 0.05, width]} />
      <meshStandardMaterial {...MAT.grey} />
    </mesh>
  )
}

/**
 * Troughed idler set — the three-roll carrying frame that gives a conveyor
 * belt its characteristic V profile. Axis of the run is +X.
 */
export function IdlerSet({ position = [0, 0, 0], width = 1.2 }: { position?: V3; width?: number }) {
  const r = 0.075
  const side = width * 0.36
  const tilt = Math.PI / 6 // 30° troughing angle
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[r, r, width * 0.46, 12]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      {[-1, 1].map(s => (
        <mesh
          key={s}
          position={[0, Math.sin(tilt) * side * 0.5, s * (width * 0.28)]}
          rotation={[Math.PI / 2, 0, 0, ]}
          castShadow
        >
          <cylinderGeometry args={[r, r, side, 12]} />
          <meshStandardMaterial {...MAT.dark} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Electric drive unit — motor, coupling guard and gearbox. Dressed in the
 * accent colour because on a real plant the drives are what you look at.
 */
export function DriveUnit({ position = [0, 0, 0], scale = 1 }: { position?: V3; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.9, 16]} />
        <meshStandardMaterial {...MAT.accent} />
      </mesh>
      {/* cooling fins */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[-0.4 + i * 0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.31, 0.31, 0.03, 16]} />
          <meshStandardMaterial {...MAT.accent} />
        </mesh>
      ))}
      {/* gearbox */}
      <mesh position={[0.75, -0.05, 0]} castShadow>
        <boxGeometry args={[0.6, 0.62, 0.5]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      {/* bedplate */}
      <mesh position={[0.15, -0.42, 0]} receiveShadow>
        <boxGeometry args={[1.7, 0.12, 0.7]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>
    </group>
  )
}
