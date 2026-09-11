'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  MAT, Struts, Box, Drum, Walkway, DriveUnit,
  handrail, type Seg,
} from '../primitives'

const BAYS = 4          // filter compartments
const BAY_W = 3.2
const CASING_Y = 5.6    // underside of the casing

/** One filter compartment: casing, hopper, pulse header and access hatch. */
function Compartment({ x, index, speed }: { x: number; index: number; speed: number }) {
  const pulse = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!pulse.current || speed === 0) return
    // Compartments are pulse-cleaned in sequence — the valve glows as it fires.
    const t = (clock.elapsedTime * speed) % (BAYS * 1.4)
    const on = t > index * 1.4 && t < index * 1.4 + 0.45
    const m = pulse.current.material as THREE.MeshStandardMaterial
    m.emissiveIntensity = on ? 1.5 : 0.2
  })

  return (
    <group position={[x, 0, 0]}>
      {/* casing */}
      <Box size={[BAY_W - 0.1, 4.6, 4.4]} position={[0, CASING_Y + 2.3, 0]} kind="white" />
      {/* stiffener ribs */}
      {[-1.4, 0, 1.4].map(z => (
        <Box key={z} size={[BAY_W, 4.6, 0.12]} position={[0, CASING_Y + 2.3, z * 1.5]} kind="grey" />
      ))}
      {/* clean-air plenum lid */}
      <Box size={[BAY_W, 0.5, 4.5]} position={[0, CASING_Y + 4.85, 0]} kind="grey" />

      {/* pyramidal dust hopper */}
      <mesh position={[0, CASING_Y - 1.9, 0]} castShadow>
        <cylinderGeometry args={[2.6, 0.7, 3.8, 4, 1, false, Math.PI / 4]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>

      {/* rotary airlock under the hopper */}
      <Drum radius={0.5} length={1.0} position={[0, CASING_Y - 4.1, 0]} kind="accent" />

      {/* pulse-jet air header + diaphragm valve */}
      <mesh position={[0, CASING_Y + 5.4, 1.9]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, BAY_W - 0.2, 12]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>
      <mesh ref={pulse} position={[0, CASING_Y + 5.4, 2.35]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff4000" emissive="#ff4000" emissiveIntensity={0.2}
                              roughness={0.4} metalness={0.1} />
      </mesh>

      {/* access door */}
      <Box size={[0.08, 1.6, 1.2]} position={[BAY_W / 2 - 0.02, CASING_Y + 2.2, 1.0]} kind="dark" />
    </group>
  )
}

export function BaghouseFilter({ speed = 1 }: { speed?: number }) {
  const totalW = BAYS * BAY_W
  const x0 = -totalW / 2 + BAY_W / 2

  const frame = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    const xs = [-totalW / 2 - 0.2, totalW / 2 + 0.2]
    const zs = [-2.4, 2.4]
    xs.forEach(x => zs.forEach(z => s.push([[x, 0, z], [x, CASING_Y, z]])))
    // intermediate columns between compartments
    for (let i = 1; i < BAYS; i++) {
      const x = x0 + i * BAY_W - BAY_W / 2
      zs.forEach(z => s.push([[x, 0, z], [x, CASING_Y, z]]))
    }
    // horizontal rings + bracing
    ;[2.6, CASING_Y].forEach(y => {
      s.push([[xs[0], y, zs[0]], [xs[1], y, zs[0]]])
      s.push([[xs[0], y, zs[1]], [xs[1], y, zs[1]]])
      s.push([[xs[0], y, zs[0]], [xs[0], y, zs[1]]])
      s.push([[xs[1], y, zs[0]], [xs[1], y, zs[1]]])
    })
    zs.forEach(z => {
      s.push([[xs[0], 0, z], [xs[0] + BAY_W, 2.6, z]])
      s.push([[xs[1], 0, z], [xs[1] - BAY_W, 2.6, z]])
    })
    return s
  }, [totalW, x0])

  const rails = useMemo(
    () => [
      ...handrail([-totalW / 2 - 0.4, CASING_Y + 5.1, 2.4], [totalW / 2 + 0.4, CASING_Y + 5.1, 2.4]),
      ...handrail([-totalW / 2 - 0.4, CASING_Y + 5.1, -2.4], [totalW / 2 + 0.4, CASING_Y + 5.1, -2.4]),
    ],
    [totalW]
  )

  const fan = useRef<THREE.Group>(null)
  const screw = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => {
    if (fan.current) fan.current.rotation.x += dt * 6 * speed
    if (screw.current) screw.current.rotation.x += dt * 2.5 * speed
  })

  return (
    <group>
      <Struts segments={frame} radius={0.13} kind="white" />
      <Struts segments={rails} radius={0.028} kind="grey" />

      {Array.from({ length: BAYS }, (_, i) => (
        <Compartment key={i} x={x0 + i * BAY_W} index={i} speed={speed} />
      ))}

      {/* maintenance platform on the roof */}
      <Walkway length={totalW + 1.2} width={1.1} position={[0, CASING_Y + 5.15, 2.3]} />

      {/* dirty-gas inlet manifold running the length of the unit */}
      <mesh position={[0, CASING_Y - 0.2, -3.3]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.95, 0.95, totalW + 1, 20]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>
      {Array.from({ length: BAYS }, (_, i) => (
        <mesh key={i} position={[x0 + i * BAY_W, CASING_Y + 0.6, -2.9]}
              rotation={[0.5, 0, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 2.2, 14]} />
          <meshStandardMaterial {...MAT.grey} />
        </mesh>
      ))}

      {/* screw conveyor collecting dust from all four hoppers */}
      <mesh ref={screw} position={[0, CASING_Y - 4.6, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, totalW + 1.6, 14]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>

      {/* ID fan and stack on the clean side */}
      <group position={[totalW / 2 + 3.4, 2.2, 0]}>
        <Box size={[2.2, 0.4, 2.6]} position={[0, -2.0, 0]} kind="ink" />
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[1.7, 1.7, 1.3, 24]} />
          <meshStandardMaterial {...MAT.white} />
        </mesh>
        <group ref={fan}>
          {Array.from({ length: 8 }, (_, i) => (
            <mesh key={i} rotation={[(i / 8) * Math.PI * 2, 0, 0]} position={[0.1, 0, 0]}>
              <boxGeometry args={[0.5, 2.6, 0.16]} />
              <meshStandardMaterial {...MAT.dark} />
            </mesh>
          ))}
        </group>
        <DriveUnit position={[1.9, -0.4, 0]} scale={0.8} />
        {/* clean gas duct up to the stack */}
        <mesh position={[0, 2.4, 0]} castShadow>
          <cylinderGeometry args={[0.85, 0.85, 3.2, 16]} />
          <meshStandardMaterial {...MAT.grey} />
        </mesh>
      </group>

      {/* clean-gas duct running from the fan outlet across to the stack */}
      <mesh position={[totalW / 2 + 5.6, 5.0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.8, 0.8, 4.4, 16]} />
        <meshStandardMaterial {...MAT.grey} />
      </mesh>

      {/* stack, set clear of the fan so both read separately */}
      <group position={[totalW / 2 + 7.8, 0, 0]}>
        <mesh position={[0, 9.0, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1.0, 10.0, 20]} />
          <meshStandardMaterial {...MAT.white} />
        </mesh>
        {/* hazard banding near the top */}
        {[12.4, 13.2].map(y => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[0.83, 0.83, 0.4, 20]} />
            <meshStandardMaterial {...MAT.accent} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
