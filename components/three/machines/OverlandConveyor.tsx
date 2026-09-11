'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  MAT, Struts, Box, Walkway, IdlerSet, DriveUnit,
  boxTruss, latticeTower, handrail, offsetSegs,
  type Seg,
} from '../primitives'

const RUN_LEN = 22          // total conveyor run along X
const X0 = -13              // start of the run
const DECK_Y = 5.2          // belt elevation
const TOWER_X = X0 + RUN_LEN

/** A-frame trestle bent carrying the conveyor gallery. */
function Trestle({ x, height }: { x: number; height: number }) {
  const segs = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    const spread = 2.1
    const top = height
    // two splayed legs, braced as a simple portal — no tangle of kickers
    ;[1, -1].forEach(sz => {
      s.push([[0, 0, sz * spread], [0, top, sz * 1.25]])
    })
    s.push([[0, top * 0.62, spread * 0.78], [0, top * 0.62, -spread * 0.78]])
    s.push([[0, top * 0.26, spread * 0.9], [0, top * 0.96, -1.3]])
    s.push([[0, top * 0.26, -spread * 0.9], [0, top * 0.96, 1.3]])
    return s
  }, [height])

  return (
    <group position={[x, 0, 0]}>
      <Struts segments={segs} radius={0.11} kind="white" />
      {/* concrete pedestals */}
      {[1, -1].map(sz => (
        <Box key={sz} size={[1.1, 0.5, 1.0]} position={[0, 0.25, sz * 2.1]} kind="ink" />
      ))}
    </group>
  )
}

/** Bulk material stream riding the belt. */
function BeltLoad({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  const lumps = useMemo(
    () => Array.from({ length: 46 }, (_, i) => ({
      x: X0 + 1 + (i / 46) * (RUN_LEN - 2),
      z: (Math.random() - 0.5) * 0.62,
      y: Math.random() * 0.1,
      s: 0.13 + Math.random() * 0.13,
      r: Math.random() * Math.PI,
    })),
    []
  )
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.children.forEach(c => {
      c.position.x += dt * 4.2 * speed
      if (c.position.x > X0 + RUN_LEN - 1) c.position.x = X0 + 1
    })
  })
  return (
    <group ref={ref}>
      {lumps.map((l, i) => (
        <mesh key={i} position={[l.x, DECK_Y + 0.16 + l.y, l.z]}
              rotation={[l.r, l.r * 1.6, l.r * 0.4]} castShadow>
          <dodecahedronGeometry args={[l.s, 0]} />
          <meshStandardMaterial {...MAT.bulk} />
        </mesh>
      ))}
    </group>
  )
}

/** Transfer tower at the discharge end — head chute, drive and dust enclosure. */
function TransferTower({ speed }: { speed: number }) {
  const tower = useMemo(() => latticeTower(11.5, 5.0, 3.6, 9), [])
  const rails = useMemo(
    () => [
      ...handrail([-1.8, 11.5, 1.8], [1.8, 11.5, 1.8]),
      ...handrail([-1.8, 11.5, -1.8], [1.8, 11.5, -1.8]),
    ],
    []
  )
  const pulley = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (pulley.current) pulley.current.rotation.y += dt * 2.2 * speed
  })

  return (
    <group position={[TOWER_X + 2.6, 0, 0]}>
      <Struts segments={tower} radius={0.13} kind="white" />
      <Struts segments={rails} radius={0.03} kind="grey" />

      {/* head end enclosure */}
      <Box size={[3.4, 2.6, 3.4]} position={[0, DECK_Y + 0.6, 0]} kind="white" />
      {/* transfer chute dropping to the next flight */}
      <mesh position={[0, DECK_Y - 2.0, 0]} castShadow>
        <cylinderGeometry args={[0.75, 1.15, 3.4, 6]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      <Box size={[2.6, 1.0, 2.6]} position={[0, DECK_Y - 4.0, 0]} kind="dark" />

      {/* dust extraction duct and filter can */}
      <mesh position={[1.7, DECK_Y + 1.6, 0]} rotation={[0, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 2.4, 12]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>
      <mesh position={[2.55, DECK_Y + 2.8, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 1.7, 16]} />
        <meshStandardMaterial {...MAT.white} />
      </mesh>
      <mesh position={[2.55, DECK_Y + 3.2, 0]}>
        <cylinderGeometry args={[0.63, 0.63, 0.25, 16]} />
        <meshStandardMaterial {...MAT.accent} />
      </mesh>
      <mesh position={[2.55, DECK_Y + 3.9, 0]} castShadow>
        <coneGeometry args={[0.65, 0.55, 16]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>

      {/* top deck + platform */}
      <Walkway length={4.4} width={4.4} position={[0, 11.6, 0]} />

      {/* head pulley + drive */}
      <group position={[-2.6, DECK_Y, 0]}>
        <mesh ref={pulley} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.62, 0.62, 1.7, 20]} />
          <meshStandardMaterial {...MAT.dark} />
        </mesh>
        <DriveUnit position={[0.2, -1.5, 1.7]} scale={0.85} />
      </group>
    </group>
  )
}

export function OverlandConveyor({ speed = 1 }: { speed?: number }) {
  // Conveyor gallery: a walled truss carrying belt, walkway and roof.
  const gallery = useMemo(
    () => offsetSegs(boxTruss(RUN_LEN, 3.0, 2.4, 20), [X0, DECK_Y - 0.5, 0]),
    []
  )
  const rails = useMemo(
    () => [
      ...offsetSegs(handrail([0.5, 0, 0], [RUN_LEN - 0.5, 0, 0]), [X0, DECK_Y + 0.7, 1.55]),
      ...offsetSegs(handrail([0.5, 0, 0], [RUN_LEN - 0.5, 0, 0]), [X0, DECK_Y + 0.7, -1.55]),
    ],
    []
  )
  const tailPulley = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (tailPulley.current) tailPulley.current.rotation.y += dt * 2.2 * speed
  })

  const trestles = [-10.5, -6.3, -2.1, 2.1, 6.3, 9.8]

  return (
    <group>
      {trestles.map(x => <Trestle key={x} x={x} height={DECK_Y - 1.6} />)}

      <Struts segments={gallery} radius={0.085} kind="white" />
      <Struts segments={rails} radius={0.028} kind="grey" />

      {/* maintenance walkway alongside the belt */}
      <Walkway length={RUN_LEN - 1} width={0.9}
               position={[X0 + RUN_LEN / 2, DECK_Y + 0.62, 1.5]} />

      {/* carrying belt + troughing idlers */}
      <mesh position={[X0 + RUN_LEN / 2, DECK_Y, 0]} receiveShadow>
        <boxGeometry args={[RUN_LEN - 1, 0.07, 1.5]} />
        <meshStandardMaterial {...MAT.rubber} />
      </mesh>
      {/* return strand below */}
      <mesh position={[X0 + RUN_LEN / 2, DECK_Y - 1.15, 0]} receiveShadow>
        <boxGeometry args={[RUN_LEN - 1, 0.06, 1.4]} />
        <meshStandardMaterial {...MAT.rubber} />
      </mesh>
      {Array.from({ length: 20 }, (_, i) => (
        <IdlerSet key={i}
                  position={[X0 + 0.8 + i * ((RUN_LEN - 1.6) / 19), DECK_Y - 0.06, 0]}
                  width={1.55} />
      ))}
      <BeltLoad speed={speed} />

      {/* tail end: pulley, take-up and feed chute */}
      <group position={[X0 - 0.4, DECK_Y - 0.1, 0]}>
        <mesh ref={tailPulley} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.55, 0.55, 1.7, 20]} />
          <meshStandardMaterial {...MAT.dark} />
        </mesh>
        <Box size={[1.4, 2.0, 2.4]} position={[-1.3, 1.6, 0]} kind="dark" />
        <Box size={[1.0, 1.6, 1.0]} position={[-0.2, -1.8, 0]} kind="accent" />
      </group>

      <TransferTower speed={speed} />
    </group>
  )
}
