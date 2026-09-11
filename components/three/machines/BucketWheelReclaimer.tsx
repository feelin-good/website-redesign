'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  MAT, Struts, Box, Drum, Walkway, IdlerSet, DriveUnit,
  boxTruss, latticeTower, handrail,
  type Seg, type V3,
} from '../primitives'

/* Boom geometry — shared between the truss, the belt and the wheel mount */
const BOOM_LEN = 13
const BOOM_PIVOT: V3 = [0.9, 3.5, 0]
const BOOM_ANGLE = -0.14 // radians, boom dipping toward the stockpile
const WHEEL_R = 2.15
const BUCKETS = 10

/** One crawler track assembly — track frame, road wheels, drive sprocket. */
function Crawler({ z }: { z: number }) {
  const len = 6.4
  return (
    <group position={[0, 0, z]}>
      {/* track belt, rendered as a rounded slab */}
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[len, 1.04, 1.5]} />
        <meshStandardMaterial {...MAT.rubber} />
      </mesh>
      {/* track shoe ribs */}
      {Array.from({ length: 22 }, (_, i) => (
        <mesh key={i} position={[-len / 2 + 0.15 + i * (len / 22), 0.03, 0]} receiveShadow>
          <boxGeometry args={[0.16, 0.08, 1.56]} />
          <meshStandardMaterial {...MAT.dark} />
        </mesh>
      ))}
      {/* road wheels */}
      {Array.from({ length: 6 }, (_, i) => (
        <Drum key={i} radius={0.3} length={1.6}
              position={[-len / 2 + 0.9 + i * ((len - 1.8) / 5), 0.42, 0]} kind="dark" />
      ))}
      {/* drive sprocket + idler wheel */}
      <Drum radius={0.52} length={1.5} position={[len / 2 - 0.35, 0.6, 0]} kind="dark" />
      <Drum radius={0.52} length={1.5} position={[-len / 2 + 0.35, 0.6, 0]} kind="dark" />
      {/* track frame */}
      <Box size={[len * 0.92, 0.5, 1.1]} position={[0, 1.2, 0]} kind="white" />
    </group>
  )
}

/**
 * The bucket wheel itself. The wheel plane contains the boom axis and the
 * wheel turns about a transverse (Z) axis, which is how a real bucket wheel
 * reclaimer cuts into the face of a stockpile.
 */
function BucketWheel({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.5 * speed
  })

  const angles = useMemo(
    () => Array.from({ length: BUCKETS }, (_, i) => (i / BUCKETS) * Math.PI * 2),
    []
  )

  // Spokes run hub → rim in the XY plane, doubled either side of the wheel.
  const spokes = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    angles.forEach(a => {
      const x = Math.cos(a), y = Math.sin(a)
      const ri = 0.5, ro = WHEEL_R - 0.32
      s.push([[x * ri, y * ri, 0.42], [x * ro, y * ro, 0.42]])
      s.push([[x * ri, y * ri, -0.42], [x * ro, y * ro, -0.42]])
      // cross bracing between the two discs
      s.push([[x * ro, y * ro, 0.42], [x * ri, y * ri, -0.42]])
    })
    return s
  }, [angles])

  return (
    <group ref={ref}>
      {/* hub and shaft, axis along Z */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.52, 0.52, 1.0, 20]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 1.9, 16]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>
      <Struts segments={spokes} radius={0.055} kind="white" />

      {/* rim rings — torusGeometry already lies in the XY plane */}
      {[0.44, -0.44].map(z => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[WHEEL_R - 0.3, 0.07, 8, 44]} />
          <meshStandardMaterial {...MAT.white} />
        </mesh>
      ))}

      {/* digging buckets, lips leading the direction of rotation */}
      {angles.map((a, i) => (
        <group
          key={i}
          position={[Math.cos(a) * (WHEEL_R - 0.1), Math.sin(a) * (WHEEL_R - 0.1), 0]}
          rotation={[0, 0, a]}
        >
          <mesh castShadow>
            <boxGeometry args={[0.66, 0.62, 1.0]} />
            <meshStandardMaterial {...MAT.dark} />
          </mesh>
          {/* wear lip on the outer radial face */}
          <mesh position={[0.34, 0.06, 0]} castShadow>
            <boxGeometry args={[0.1, 0.5, 1.04]} />
            <meshStandardMaterial {...MAT.accent} />
          </mesh>
          {/* cutting teeth */}
          {[-0.33, -0.11, 0.11, 0.33].map(tz => (
            <mesh key={tz} position={[0.44, 0.2, tz]} rotation={[0, 0, -Math.PI / 2]} castShadow>
              <coneGeometry args={[0.07, 0.26, 4]} />
              <meshStandardMaterial {...MAT.grey} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

/** Bulk material riding the boom conveyor back toward the machine. */
function BoomMaterial({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  const lumps = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      t: i / 14,
      z: (Math.random() - 0.5) * 0.5,
      s: 0.16 + Math.random() * 0.14,
      r: Math.random() * Math.PI,
    })),
    []
  )
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.children.forEach(c => {
      // travel from the wheel end back toward the pivot
      c.position.x -= dt * 2.4 * speed
      if (c.position.x < 0.5) c.position.x = BOOM_LEN - 0.5
    })
  })
  return (
    <group ref={ref}>
      {lumps.map((l, i) => (
        <mesh key={i} position={[0.5 + l.t * (BOOM_LEN - 1), 0.62, l.z]}
              rotation={[l.r, l.r * 1.7, 0]} castShadow>
          <dodecahedronGeometry args={[l.s, 0]} />
          <meshStandardMaterial {...MAT.bulk} />
        </mesh>
      ))}
    </group>
  )
}

/** Boom: lattice truss + conveyor + wheel + walkways. */
function Boom({ speed }: { speed: number }) {
  const truss = useMemo(
    () => boxTruss(BOOM_LEN, 2.0, 1.7, 11, { taperTo: 0.72 }),
    []
  )
  const rails = useMemo(
    () => [
      ...handrail([0.6, 0.95, 1.15], [BOOM_LEN - 0.6, 0.95, 1.15]),
      ...handrail([0.6, 0.95, -1.15], [BOOM_LEN - 0.6, 0.95, -1.15]),
    ],
    []
  )

  return (
    <group position={BOOM_PIVOT} rotation={[0, 0, BOOM_ANGLE]}>
      <Struts segments={truss} radius={0.075} kind="white" />
      <Struts segments={rails} radius={0.03} kind="grey" />

      {/* service walkways either side of the belt */}
      <Walkway length={BOOM_LEN - 1.2} width={0.55} position={[BOOM_LEN / 2, 0.9, 1.0]} />
      <Walkway length={BOOM_LEN - 1.2} width={0.55} position={[BOOM_LEN / 2, 0.9, -1.0]} />

      {/* conveyor belt running the length of the boom */}
      <mesh position={[BOOM_LEN / 2, 0.55, 0]} receiveShadow>
        <boxGeometry args={[BOOM_LEN - 0.8, 0.06, 1.25]} />
        <meshStandardMaterial {...MAT.rubber} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <IdlerSet key={i} position={[1.0 + i * ((BOOM_LEN - 2) / 11), 0.5, 0]} width={1.3} />
      ))}
      <BoomMaterial speed={speed} />

      {/* head pulley + drive at the machine end, tail pulley at the wheel end */}
      <Drum radius={0.36} length={1.4} position={[0.45, 0.42, 0]} kind="dark" />
      <Drum radius={0.3} length={1.35} position={[BOOM_LEN - 0.45, 0.48, 0]} kind="dark" />
      <DriveUnit position={[0.1, 1.5, 1.35]} scale={0.72} />

      {/* wheel mounting bracket and the bucket wheel */}
      <Box size={[1.0, 1.6, 2.8]} position={[BOOM_LEN - 0.15, 0.1, 0]} kind="white" />
      <group position={[BOOM_LEN + 1.5, -0.15, 0]} rotation={[0, 0, -BOOM_ANGLE]}>
        <BucketWheel speed={speed} />
        {/* wheel drive gearbox, mounted outboard of the wheel disc */}
        <Box size={[1.0, 1.1, 0.8]} position={[0, 0, -1.35]} kind="dark" />
        <Box size={[0.5, 0.5, 0.5]} position={[0, 0, -1.9]} kind="accent" />
      </group>
    </group>
  )
}

/** Everything above the slew ring — rotates as one body. */
function Superstructure({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      // slow luffing slew sweep across the stockpile
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.12 * speed) * 0.30
    }
  })

  const mast = useMemo(() => latticeTower(6.2, 2.6, 0.9, 6), [])
  const cwBoom = useMemo(() => boxTruss(4.6, 1.6, 1.3, 4), [])

  // Hoist ropes: mast head → boom, and mast head → counterweight boom
  const ropes = useMemo<Seg[]>(() => {
    const head: V3 = [-0.4, 8.9, 0]
    const bx = BOOM_PIVOT[0] + Math.cos(BOOM_ANGLE) * BOOM_LEN * 0.78
    const by = BOOM_PIVOT[1] + Math.sin(BOOM_ANGLE) * BOOM_LEN * 0.78 + 0.85
    return [
      [head, [bx, by, 0.8]],
      [head, [bx, by, -0.8]],
      [head, [-5.2, 4.6, 0.6]],
      [head, [-5.2, 4.6, -0.6]],
    ]
  }, [])

  return (
    <group ref={ref} position={[0, 2.55, 0]}>
      {/* slew platform */}
      <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.3, 2.5, 0.45, 32]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>

      {/* machinery house */}
      <Box size={[3.2, 2.0, 3.0]} position={[-2.2, 1.15, 0]} kind="white" />
      <Box size={[3.3, 0.16, 3.1]} position={[-2.2, 2.22, 0]} kind="grey" />
      {/* ventilation louvres on the long side of the house */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} size={[0.34, 1.1, 0.06]}
             position={[-3.4 + i * 0.46, 1.2, 1.52]} kind="dark" />
      ))}
      <Box size={[3.3, 0.18, 3.1]} position={[-2.2, 0.1, 0]} kind="grey" />
      {/* operator cab, cantilevered out to see the wheel */}
      <Box size={[1.3, 1.15, 1.3]} position={[-0.6, 2.9, 1.7]} kind="dark" />
      <mesh position={[-0.6, 3.0, 2.37]}>
        <boxGeometry args={[1.15, 0.72, 0.06]} />
        <meshStandardMaterial color="#7fb2c9" roughness={0.12} metalness={0.6} />
      </mesh>

      {/* A-frame mast */}
      <group position={[-0.4, 2.4, 0]}>
        <Struts segments={mast} radius={0.09} kind="white" />
      </group>

      {/* counterweight boom + block */}
      <group position={[-2.0, 3.9, 0]} rotation={[0, 0, Math.PI]}>
        <Struts segments={cwBoom} radius={0.07} kind="white" />
      </group>
      <Box size={[1.8, 1.5, 2.2]} position={[-7.0, 3.9, 0]} kind="dark" />
      <Box size={[1.92, 0.1, 2.32]} position={[-7.0, 4.68, 0]} kind="accent" />

      {/* hoist ropes */}
      <Struts segments={ropes} radius={0.035} kind="dark" sides={5} />

      <Boom speed={speed} />
    </group>
  )
}

export function BucketWheelReclaimer({ speed = 1 }: { speed?: number }) {
  const portal = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    // portal legs from each crawler up to the slew deck
    const zs = [2.3, -2.3]
    zs.forEach(z => {
      s.push([[1.6, 1.4, z], [0.7, 2.5, z * 0.35]])
      s.push([[-1.6, 1.4, z], [-0.7, 2.5, z * 0.35]])
      s.push([[1.6, 1.4, z], [-1.6, 1.4, z]])
    })
    s.push([[0.7, 2.5, 0.8], [0.7, 2.5, -0.8]])
    s.push([[-0.7, 2.5, 0.8], [-0.7, 2.5, -0.8]])
    return s
  }, [])

  return (
    <group>
      <Crawler z={2.3} />
      <Crawler z={-2.3} />
      {/* equaliser beam tying the crawlers together */}
      <Box size={[2.2, 0.6, 5.2]} position={[0, 1.55, 0]} kind="white" />
      <Struts segments={portal} radius={0.14} kind="white" />
      {/* slew ring */}
      <mesh position={[0, 2.42, 0]} castShadow>
        <cylinderGeometry args={[1.9, 1.9, 0.3, 32]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      <Superstructure speed={speed} />
    </group>
  )
}
