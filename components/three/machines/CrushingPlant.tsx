'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  MAT, Struts, Box, Drum, Walkway, IdlerSet, DriveUnit,
  boxTruss, handrail, type Seg, type V3,
} from '../primitives'

/** Jaw crusher — fixed jaw, swing jaw on an eccentric, twin flywheels. */
function JawCrusher({ speed }: { speed: number }) {
  const flywheels = useRef<THREE.Group>(null)
  const swingJaw = useRef<THREE.Mesh>(null)
  const pitman = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed
    if (flywheels.current) flywheels.current.rotation.z = t * 5.2
    // the swing jaw nips through a few degrees, driven off the eccentric
    const nip = Math.sin(t * 5.2) * 0.055
    if (swingJaw.current) swingJaw.current.rotation.z = 0.17 + nip
    if (pitman.current) pitman.current.position.y = 1.9 + Math.sin(t * 5.2) * 0.09
  })

  return (
    <group>
      {/* main frame cheeks */}
      {[-1, 1].map(sz => (
        <Box key={sz} size={[3.4, 4.0, 0.35]} position={[0, 2.0, sz * 1.5]} kind="white" />
      ))}
      <Box size={[3.4, 0.5, 3.3]} position={[0, 0.2, 0]} kind="dark" />

      {/* fixed jaw */}
      <mesh position={[-1.0, 2.1, 0]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.45, 3.2, 2.7]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      {/* swing jaw */}
      <mesh ref={swingJaw} position={[0.95, 2.1, 0]} castShadow>
        <boxGeometry args={[0.45, 3.2, 2.7]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      {/* pitman / eccentric link */}
      <mesh ref={pitman} position={[1.35, 1.9, 0]} castShadow>
        <boxGeometry args={[0.5, 2.4, 1.6]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>
      {/* toggle plate */}
      <Box size={[1.0, 0.18, 1.4]} position={[1.6, 0.75, 0]} kind="accent" />

      {/* eccentric shaft + twin flywheels */}
      <group ref={flywheels} position={[1.35, 3.5, 0]}>
        {[-1.9, 1.9].map(z => (
          <group key={z} position={[0, 0, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[1.5, 1.5, 0.34, 28]} />
              <meshStandardMaterial {...MAT.white} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.5, 0.1, 8, 32]} />
              <meshStandardMaterial {...MAT.accent} />
            </mesh>
            {/* spoke slots so the rotation is legible */}
            {Array.from({ length: 6 }, (_, i) => (
              <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI * 2]} position={[0, 0, 0.02]}>
                <boxGeometry args={[2.5, 0.16, 0.4]} />
                <meshStandardMaterial {...MAT.dark} />
              </mesh>
            ))}
          </group>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 4.2, 16]} />
          <meshStandardMaterial {...MAT.grey} />
        </mesh>
      </group>

      {/* drive motor and V-belt guard */}
      <DriveUnit position={[3.6, 1.4, 2.6]} scale={1.0} />
      <Box size={[0.2, 3.0, 1.0]} position={[2.5, 3.0, 2.6]} kind="grey" />
    </group>
  )
}

/** Double-deck vibrating screen, shaking on its springs. */
function VibratingScreen({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed * 22
    ref.current.position.x = Math.sin(t) * 0.05
    ref.current.position.y = 5.0 + Math.cos(t) * 0.05
  })
  return (
    <group ref={ref} position={[0, 5.0, 0]} rotation={[0, 0, -0.22]}>
      <Box size={[4.6, 0.24, 2.4]} position={[0, 0.75, 0]} kind="grey" />
      <Box size={[4.6, 0.24, 2.4]} position={[0, 0.1, 0]} kind="grey" />
      {/* side plates in painted steel, with a single accent stripe */}
      {[-1, 1].map(sz => (
        <group key={sz}>
          <Box size={[4.8, 1.4, 0.2]} position={[0, 0.42, sz * 1.25]} kind="white" />
          <Box size={[4.85, 0.18, 0.22]} position={[0, 1.0, sz * 1.25]} kind="accent" />
        </group>
      ))}
      {/* screen media, drawn as bars so the decks read as mesh */}
      {[0.75, 0.1].map(y =>
        Array.from({ length: 9 }, (_, i) => (
          <Box key={`${y}:${i}`} size={[4.5, 0.05, 0.07]}
               position={[0, y + 0.14, -1.05 + i * 0.26]} kind="dark" />
        ))
      )}
      {/* exciter drive */}
      <Drum radius={0.42} length={2.8} position={[0.8, 1.25, 0]} kind="dark" />
    </group>
  )
}

/** Inclined product conveyor feeding a stockpile. */
function ProductConveyor({ speed, angle, length, at, flip = false }: {
  speed: number; angle: number; length: number; at: V3; flip?: boolean
}) {
  const truss = useMemo(() => boxTruss(length, 1.3, 1.0, Math.round(length / 1.4)), [length])
  const load = useRef<THREE.Group>(null)
  const lumps = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      x: 0.5 + (i / 16) * (length - 1),
      z: (Math.random() - 0.5) * 0.4,
      s: 0.1 + Math.random() * 0.1,
    })),
    [length]
  )
  useFrame((_, dt) => {
    if (!load.current) return
    load.current.children.forEach(c => {
      c.position.x += dt * 3 * speed
      if (c.position.x > length - 0.5) c.position.x = 0.5
    })
  })

  return (
    <group position={at} rotation={[0, flip ? Math.PI : 0, flip ? -angle : angle]}>
      <Struts segments={truss} radius={0.06} kind="white" />
      <mesh position={[length / 2, 0.25, 0]} receiveShadow>
        <boxGeometry args={[length - 0.4, 0.06, 0.95]} />
        <meshStandardMaterial {...MAT.rubber} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <IdlerSet key={i} position={[0.6 + i * ((length - 1.2) / 8), 0.2, 0]} width={1.0} />
      ))}
      <group ref={load}>
        {lumps.map((l, i) => (
          <mesh key={i} position={[l.x, 0.36, l.z]} castShadow>
            <dodecahedronGeometry args={[l.s, 0]} />
            <meshStandardMaterial {...MAT.bulk} />
          </mesh>
        ))}
      </group>
      <Drum radius={0.3} length={1.1} position={[length - 0.2, 0.22, 0]} kind="dark" />
      <Drum radius={0.3} length={1.1} position={[0.2, 0.22, 0]} kind="dark" />
    </group>
  )
}

export function CrushingPlant({ speed = 1 }: { speed?: number }) {
  // Support structure carrying the feed hopper and screen above the crusher.
  const frame = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    const xs = [-3.6, 3.6], zs = [-3.2, 3.2]
    xs.forEach(x => zs.forEach(z => s.push([[x, 0, z], [x, 9.4, z]])))
    ;[3.0, 6.2, 9.4].forEach(y => {
      s.push([[-3.6, y, -3.2], [3.6, y, -3.2]])
      s.push([[-3.6, y, 3.2], [3.6, y, 3.2]])
      s.push([[-3.6, y, -3.2], [-3.6, y, 3.2]])
      s.push([[3.6, y, -3.2], [3.6, y, 3.2]])
    })
    // K-bracing on the long faces
    ;[[-3.6], [3.6]].forEach(([x]) => {
      s.push([[x, 0, -3.2], [x, 3.0, 3.2]])
      s.push([[x, 3.0, -3.2], [x, 6.2, 3.2]])
      s.push([[x, 6.2, 3.2], [x, 9.4, -3.2]])
    })
    return s
  }, [])

  const rails = useMemo(
    () => [
      ...handrail([-3.6, 9.4, 3.2], [3.6, 9.4, 3.2]),
      ...handrail([-3.6, 9.4, -3.2], [3.6, 9.4, -3.2]),
    ],
    []
  )

  // Stockpile cone under the discharge end of the product conveyor.
  return (
    <group>
      <Struts segments={frame} radius={0.13} kind="white" />
      <Struts segments={rails} radius={0.028} kind="grey" />
      <Walkway length={7.4} width={1.0} position={[0, 9.5, 3.0]} />

      {/* feed hopper — square-to-round, fed by truck or front loader */}
      <mesh position={[0, 11.0, 0]} castShadow>
        <cylinderGeometry args={[4.0, 1.5, 3.2, 4, 1, false, Math.PI / 4]} />
        <meshStandardMaterial {...MAT.white} />
      </mesh>
      <Box size={[4.3, 0.22, 4.3]} position={[0, 12.6, 0]} kind="grey" />
      {/* grizzly bars across the hopper mouth */}
      {Array.from({ length: 7 }, (_, i) => (
        <Box key={i} size={[4.2, 0.12, 0.12]} position={[0, 12.75, -1.5 + i * 0.5]} kind="accent" />
      ))}

      <VibratingScreen speed={speed} />

      {/* jaw crusher sits at grade under the screen oversize */}
      <group position={[0, 0, 0]}>
        <JawCrusher speed={speed} />
      </group>

      {/* discharge chute from crusher onto the product conveyor */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[2.0, 1.2, 2.2]} />
        <meshStandardMaterial {...MAT.ink} />
      </mesh>

      <ProductConveyor speed={speed} angle={0.34} length={12.5} at={[1.6, 0.9, 0]} />

      {/* finished aggregate stockpile */}
      <mesh position={[14.2, 2.1, 0]} receiveShadow castShadow>
        <coneGeometry args={[4.1, 4.2, 40]} />
        <meshStandardMaterial {...MAT.bulk} />
      </mesh>

      {/* fines conveyor running the other way off the screen underflow */}
      <ProductConveyor speed={speed} angle={0.3} length={9} at={[-2.2, 4.2, 0]} flip />
      <mesh position={[-11.0, 1.6, 0]} receiveShadow castShadow>
        <coneGeometry args={[3.0, 3.2, 36]} />
        <meshStandardMaterial {...MAT.bulk} />
      </mesh>
    </group>
  )
}
