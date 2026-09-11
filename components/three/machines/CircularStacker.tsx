'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  MAT, Struts, Box, Drum, Walkway, IdlerSet, DriveUnit,
  boxTruss, latticeTower, type Seg,
} from '../primitives'

const PILE_R = 13        // stockpile outer radius
const PILE_INNER = 4.0
const PILE_H = 5.0
const BOOM_LEN = 11.5

/**
 * The annular limestone pile. Built as a lathe so the section has the real
 * angle-of-repose profile: steep outer face, crest, steep inner face.
 */
function Stockpile() {
  const geom = useMemo(() => {
    const pts: THREE.Vector2[] = []
    const crest = PILE_INNER + (PILE_R - PILE_INNER) * 0.52
    pts.push(new THREE.Vector2(PILE_INNER, 0))
    pts.push(new THREE.Vector2(crest - 1.2, PILE_H * 0.94))
    pts.push(new THREE.Vector2(crest + 1.2, PILE_H))
    pts.push(new THREE.Vector2(PILE_R, 0))
    return new THREE.LatheGeometry(pts, 44)
  }, [])

  return (
    <mesh geometry={geom} receiveShadow castShadow>
      <meshStandardMaterial color="#403c38" roughness={0.98} metalness={0.0}
                            side={THREE.DoubleSide} flatShading />
    </mesh>
  )
}

/** Slewing stacking boom that throws material onto the crest of the pile. */
function StackingBoom({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  const load = useRef<THREE.Group>(null)
  const truss = useMemo(() => boxTruss(BOOM_LEN, 1.6, 1.4, 11, { taperTo: 0.8 }), [])
  const lumps = useMemo(
    () => Array.from({ length: 16 }, (_, i) => ({
      x: 1 + (i / 16) * (BOOM_LEN - 2),
      z: (Math.random() - 0.5) * 0.4,
      s: 0.12 + Math.random() * 0.1,
    })),
    []
  )

  useFrame(({ clock }, dt) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.055 * speed
    if (load.current) {
      load.current.children.forEach(c => {
        c.position.x += dt * 3.2 * speed
        if (c.position.x > BOOM_LEN - 1) c.position.x = 1
      })
    }
  })

  return (
    <group ref={ref}>
      <group position={[0, 12.6, 0]} rotation={[0, 0, -0.12]}>
        <Struts segments={truss} radius={0.07} kind="white" />
        <mesh position={[BOOM_LEN / 2, 0.35, 0]} receiveShadow>
          <boxGeometry args={[BOOM_LEN - 0.8, 0.06, 1.1]} />
          <meshStandardMaterial {...MAT.rubber} />
        </mesh>
        {Array.from({ length: 10 }, (_, i) => (
          <IdlerSet key={i} position={[1 + i * ((BOOM_LEN - 2) / 9), 0.3, 0]} width={1.15} />
        ))}
        <group ref={load}>
          {lumps.map((l, i) => (
            <mesh key={i} position={[l.x, 0.46, l.z]} castShadow>
              <dodecahedronGeometry args={[l.s, 0]} />
              <meshStandardMaterial {...MAT.bulk} />
            </mesh>
          ))}
        </group>
        {/* discharge chute at the tip */}
        <Box size={[1.1, 1.6, 1.3]} position={[BOOM_LEN - 0.2, -0.6, 0]} kind="dark" />
        <DriveUnit position={[0.4, 1.2, 1.2]} scale={0.6} />
      </group>

      {/* hoist ropes from the mast head out to the boom */}
      <Struts
        segments={[
          [[0.2, 17.4, 0], [BOOM_LEN * 0.72, 12.0, 0.6]],
          [[0.2, 17.4, 0], [BOOM_LEN * 0.72, 12.0, -0.6]],
        ]}
        radius={0.035}
        kind="dark"
        sides={5}
      />
    </group>
  )
}

/**
 * Bridge-type scraper reclaimer: a raking harrow drags material down the
 * inner face onto a scraper chain running back to the centre column.
 */
function ScraperReclaimer({ speed }: { speed: number }) {
  const ref = useRef<THREE.Group>(null)
  const harrow = useRef<THREE.Group>(null)
  const bridge = useMemo(() => boxTruss(PILE_R - PILE_INNER + 1.5, 1.3, 1.2, 10), [])

  useFrame(({ clock }) => {
    // Trails ~150° behind the stacking boom, as on a real circular yard.
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.055 * speed + 2.6
    if (harrow.current) harrow.current.rotation.z = Math.sin(clock.elapsedTime * 1.4 * speed) * 0.12
  })

  const len = PILE_R - PILE_INNER + 1.5

  return (
    <group ref={ref}>
      <group position={[PILE_INNER - 0.6, PILE_H + 0.9, 0]}>
        <Struts segments={bridge} radius={0.06} kind="white" />
        {/* scraper chain conveyor slung under the bridge */}
        <Box size={[len - 0.5, 0.5, 1.0]} position={[len / 2, -0.75, 0]} kind="dark" />
        {Array.from({ length: 12 }, (_, i) => (
          <Box key={i} size={[0.1, 0.34, 1.1]}
               position={[0.6 + i * ((len - 1.2) / 11), -0.55, 0]} kind="grey" />
        ))}
        {/* raking harrow hanging down the inner face of the pile */}
        <group ref={harrow} position={[len * 0.55, -1.1, 0]} rotation={[0, 0, 0]}>
          <Box size={[len * 0.8, 0.18, 0.18]} position={[0, 0, 0]} kind="accent" />
          {Array.from({ length: 9 }, (_, i) => (
            <Box key={i} size={[0.1, 1.0, 0.1]}
                 position={[-len * 0.36 + i * (len * 0.09), -0.55, 0]} kind="grey" />
          ))}
        </group>
        <DriveUnit position={[len - 1.0, 0.9, 0.9]} scale={0.55} />
      </group>

      {/* outer rail bogie carrying the free end of the bridge */}
      <group position={[PILE_R + 1.2, 0, 0]}>
        <Box size={[1.6, 1.0, 2.2]} position={[0, 0.6, 0]} kind="white" />
        {[-0.7, 0.7].map(z => (
          <Drum key={z} radius={0.42} length={0.4} position={[0, 0.42, z]} kind="dark" />
        ))}
        <Struts
          segments={[
            [[0, 1.1, 0], [-(PILE_R - PILE_INNER) * 0.42, PILE_H + 0.5, 0.5]],
            [[0, 1.1, 0], [-(PILE_R - PILE_INNER) * 0.42, PILE_H + 0.5, -0.5]],
          ]}
          radius={0.09}
          kind="white"
        />
      </group>
    </group>
  )
}

export function CircularStacker({ speed = 1 }: { speed?: number }) {
  const column = useMemo(() => latticeTower(17.5, 3.4, 1.8, 12), [])

  // Circular running rail at the outer edge of the yard.
  const rail = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    const N = 72
    for (let i = 0; i < N; i++) {
      const a1 = (i / N) * Math.PI * 2
      const a2 = ((i + 1) / N) * Math.PI * 2
      const R = PILE_R + 1.2
      s.push([
        [Math.cos(a1) * R, 0.18, Math.sin(a1) * R],
        [Math.cos(a2) * R, 0.18, Math.sin(a2) * R],
      ])
    }
    return s
  }, [])

  return (
    <group>
      <Stockpile />

      {/* yard slab */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[PILE_INNER * 0.4, PILE_R + 3.2, 64]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.95} metalness={0.02} />
      </mesh>
      <Struts segments={rail} radius={0.1} kind="dark" sides={4} />

      {/* central column carrying the feed conveyor and the slew bearings */}
      <Struts segments={column} radius={0.15} kind="white" />
      <Box size={[3.0, 1.0, 3.0]} position={[0, 18.0, 0]} kind="white" />
      <Walkway length={3.4} width={3.4} position={[0, 18.6, 0]} />

      {/* incoming feed conveyor bridging to the top of the column, carried on
          a lattice support tower out beyond the edge of the yard */}
      <group position={[-PILE_R - 5, 12.4, 0]} rotation={[0, 0, 0.26]}>
        <Struts segments={boxTruss(PILE_R + 5.4, 1.6, 1.5, 12)} radius={0.07} kind="white" />
        <mesh position={[(PILE_R + 5.4) / 2, 0.4, 0]} receiveShadow>
          <boxGeometry args={[PILE_R + 5, 0.06, 1.2]} />
          <meshStandardMaterial {...MAT.rubber} />
        </mesh>
      </group>
      <group position={[-PILE_R - 4.4, 0, 0]}>
        <Struts segments={latticeTower(12.2, 3.0, 1.8, 8)} radius={0.1} kind="white" />
      </group>

      <StackingBoom speed={speed} />
      <ScraperReclaimer speed={speed} />
    </group>
  )
}
