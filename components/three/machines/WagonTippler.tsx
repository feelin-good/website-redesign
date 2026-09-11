'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import {
  MAT, Struts, Box, Drum, DriveUnit, type Seg,
} from '../primitives'

const TIP_ANGLE = (145 * Math.PI) / 180  // rotary tipplers turn ~145°
const CYCLE = 11                          // seconds for a full tip + return

/** Open rail wagon sitting in the cage. The payload mesh is driven by ref so
 *  it can empty out mid-roll without re-rendering the scene graph. */
function Wagon({ payloadRef }: { payloadRef: React.RefObject<THREE.Mesh> }) {
  return (
    <group>
      {/* body */}
      <Box size={[7.4, 2.1, 2.9]} position={[0, 1.55, 0]} kind="dark" />
      {/* ribbed sides */}
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} size={[0.14, 2.0, 3.0]} position={[-3.2 + i * 0.8, 1.55, 0]} kind="ink" />
      ))}
      {/* payload — collapses away as the wagon inverts */}
      <mesh ref={payloadRef} position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[7.0, 0.9, 2.6]} />
        <meshStandardMaterial {...MAT.bulk} />
      </mesh>
      {/* underframe + bogies */}
      <Box size={[7.6, 0.35, 2.6]} position={[0, 0.45, 0]} kind="ink" />
      {[-2.4, 2.4].map(x => (
        <group key={x} position={[x, 0.1, 0]}>
          <Box size={[1.9, 0.4, 2.3]} position={[0, 0.1, 0]} kind="ink" />
          {[-0.7, 0.7].map(dx =>
            [-1.15, 1.15].map(dz => (
              <mesh key={`${dx}:${dz}`} position={[dx, -0.12, dz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.42, 0.42, 0.16, 16]} />
                <meshStandardMaterial {...MAT.grey} />
              </mesh>
            ))
          )}
        </group>
      ))}
    </group>
  )
}

/** Material falling out of the wagon into the hopper. Visibility is toggled
 *  by the cage each frame, so it only streams while the wagon is inverted. */
function Discharge({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const ref = useRef<THREE.Group>(null)
  const drops = useMemo(
    () => Array.from({ length: 40 }, () => ({
      x: (Math.random() - 0.5) * 6.4,
      z: (Math.random() - 0.5) * 2.2,
      y: Math.random() * 5,
      s: 0.12 + Math.random() * 0.16,
      v: 3.5 + Math.random() * 3,
    })),
    []
  )
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.children.forEach((c, i) => {
      c.position.y -= dt * drops[i].v
      c.rotation.x += dt * 3
      if (c.position.y < -1.2) c.position.y = 4.2 + Math.random() * 1.5
    })
  })
  return (
    <group ref={groupRef} visible={false}>
      <group ref={ref}>
        {drops.map((d, i) => (
          <mesh key={i} position={[d.x, d.y, d.z]} castShadow>
            <dodecahedronGeometry args={[d.s, 0]} />
            <meshStandardMaterial {...MAT.bulk} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/** The rotating cage: end rings, clamp beams, platform and the wagon. */
function Cage({
  speed, payloadRef, dischargeRef,
}: {
  speed: number
  payloadRef: React.RefObject<THREE.Mesh>
  dischargeRef: React.RefObject<THREE.Group>
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const setSpill = (v: number) => {
      if (payloadRef.current) {
        payloadRef.current.scale.y = Math.max(0.001, v)
        payloadRef.current.visible = v > 0.02
      }
    }
    if (speed === 0) {
      // Reduced motion: hold the cage part-tipped so the mechanism still reads.
      ref.current.rotation.x = -TIP_ANGLE * 0.45
      setSpill(0.55)
      if (dischargeRef.current) dischargeRef.current.visible = false
      return
    }
    const t = (clock.elapsedTime * speed) % CYCLE
    let p: number // 0 → 1 tipped
    if (t < 3)       p = t / 3                    // rolling over
    else if (t < 5)  p = 1                        // held inverted, discharging
    else if (t < 8)  p = 1 - (t - 5) / 3          // returning
    else             p = 0                        // dwell for the next wagon

    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
    ref.current.rotation.x = -TIP_ANGLE * eased
    setSpill(Math.max(0, 1 - Math.max(0, (eased - 0.45) / 0.4)))
    if (dischargeRef.current) {
      dischargeRef.current.visible = eased > 0.6 && t < 5.6
    }
  })

  const ringSegs = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    // radial spokes in each end ring (ring lies in the YZ plane, axis = X)
    const R = 4.3
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2
      const y = Math.cos(a), z = Math.sin(a)
      ;[-4.3, 4.3].forEach(x => {
        s.push([[x, y * 1.0, z * 1.0], [x, y * R, z * R]])
      })
    }
    // longitudinal ties between the rings
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2
      const y = Math.cos(a) * R, z = Math.sin(a) * R
      s.push([[-4.3, y, z], [4.3, y, z]])
    }
    return s
  }, [])

  return (
    <group ref={ref} position={[0, 4.3, 0]}>
      <Struts segments={ringSegs} radius={0.09} kind="white" />

      {/* end rings */}
      {[-4.3, 4.3].map(x => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <torusGeometry args={[4.3, 0.26, 10, 44]} />
          <meshStandardMaterial {...MAT.white} />
        </mesh>
      ))}

      {/* table the wagon stands on, plus its rails */}
      <Box size={[9.4, 0.4, 3.6]} position={[0, -1.5, 0]} kind="grey" />
      {[-0.75, 0.75].map(z => (
        <Box key={z} size={[9.4, 0.16, 0.16]} position={[0, -1.24, z]} kind="dark" />
      ))}

      {/* top clamping beam that holds the wagon during the roll */}
      <Box size={[8.6, 0.5, 0.7]} position={[0, 2.75, 1.25]} kind="accent" />
      <Box size={[8.6, 0.5, 0.7]} position={[0, 2.75, -1.25]} kind="accent" />
      {[-3.4, 0, 3.4].map(x => (
        <Box key={x} size={[0.5, 1.5, 3.2]} position={[x, 3.3, 0]} kind="white" />
      ))}

      {/* side support columns tying the table to the rings */}
      {[-1, 1].map(sz => (
        <Box key={sz} size={[8.8, 0.45, 0.45]} position={[0, -1.0, sz * 2.4]} kind="white" />
      ))}

      <group position={[0, -1.15, 0]}>
        <Wagon payloadRef={payloadRef} />
      </group>
    </group>
  )
}

export function WagonTippler({ speed = 1 }: { speed?: number }) {
  const houseFrame = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    // portal frame around the tippler
    ;[-6.2, 6.2].forEach(x => {
      ;[-5.6, 5.6].forEach(z => s.push([[x, 0, z], [x, 11.5, z]]))
      s.push([[x, 11.5, -5.6], [x, 11.5, 5.6]])
      s.push([[x, 0, -5.6], [x, 5.5, 5.6]])
      s.push([[x, 0, 5.6], [x, 5.5, -5.6]])
    })
    ;[-5.6, 5.6].forEach(z => {
      s.push([[-6.2, 11.5, z], [6.2, 11.5, z]])
      s.push([[-6.2, 6.0, z], [6.2, 6.0, z]])
    })
    return s
  }, [])

  const payloadRef = useRef<THREE.Mesh>(null)
  const dischargeRef = useRef<THREE.Group>(null)
  // Open roof framing: purlins plus a shallow truss over each bay.
  const roofTrusses = useMemo<Seg[]>(() => {
    const s: Seg[] = []
    for (let i = 0; i <= 6; i++) {
      const z = -5.6 + i * (11.2 / 6)
      s.push([[-6.2, 11.5, z], [0, 12.5, z]])
      s.push([[0, 12.5, z], [6.2, 11.5, z]])
      s.push([[0, 11.5, z], [0, 12.5, z]])
    }
    ;[-6.2, -3.1, 0, 3.1, 6.2].forEach(x => {
      const y = 11.5 + (1 - Math.abs(x) / 6.2) * 1.0
      s.push([[x, y, -5.6], [x, y, 5.6]])
    })
    return s
  }, [])

  const drive = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (drive.current) drive.current.rotation.x -= dt * 1.2 * speed
  })

  return (
    <group>
      {/* foundation and receiving hopper below the tippler */}
      <Box size={[15, 0.6, 12]} position={[0, -0.3, 0]} kind="ink" />
      <mesh position={[0, -2.4, 0]} castShadow>
        <cylinderGeometry args={[4.4, 1.6, 4.0, 4, 1, false, Math.PI / 4]} />
        <meshStandardMaterial {...MAT.dark} />
      </mesh>
      {/* apron feeder taking material away underneath */}
      <Box size={[13, 0.7, 2.2]} position={[3.5, -4.4, 0]} kind="dark" />
      <Box size={[13, 0.2, 1.8]} position={[3.5, -4.0, 0]} kind="rubber" />

      {/* trunnion supports carrying the cage rings */}
      {[-4.3, 4.3].map(x => (
        <group key={x} position={[x, 0, 0]}>
          {[-1, 1].map(sz => (
            <group key={sz} position={[0, 0, sz * 4.55]}>
              <Box size={[1.5, 4.4, 1.5]} position={[0, 2.2, 0]} kind="white" />
              <Drum radius={0.55} length={1.1} position={[0, 4.4, 0]} kind="dark" />
            </group>
          ))}
        </group>
      ))}

      {/* drive: ring gear pinion + motor, on one end */}
      <group position={[5.35, 4.3, 3.4]}>
        <group ref={drive}>
          {/* pinion meshing with the cage ring gear */}
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.72, 0.72, 0.45, 24]} />
            <meshStandardMaterial {...MAT.dark} />
          </mesh>
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[0, Math.cos(a) * 0.78, Math.sin(a) * 0.78]}
                rotation={[-a, 0, 0]}
              >
                <boxGeometry args={[0.45, 0.17, 0.14]} />
                <meshStandardMaterial {...MAT.grey} />
              </mesh>
            )
          })}
        </group>
        <DriveUnit position={[1.3, -1.1, 0]} scale={0.8} />
      </group>

      <Cage speed={speed} payloadRef={payloadRef} dischargeRef={dischargeRef} />
      <group position={[0, 3.0, 0]}>
        <Discharge groupRef={dischargeRef} />
      </group>

      {/* tippler house steelwork — open roof trusses rather than a solid slab,
          so the cage and wagon stay readable from above */}
      <Struts segments={houseFrame} radius={0.13} kind="white" />
      <Struts segments={roofTrusses} radius={0.07} kind="grey" />

      {/* approach track either side of the tippler house */}
      {[-1, 1].map(sx => (
        <group key={sx}>
          <Box size={[7, 0.3, 3.4]} position={[sx * 10.5, 2.6, 0]} kind="ink" />
          {[-0.75, 0.75].map(z => (
            <Box key={z} size={[7, 0.16, 0.16]} position={[sx * 10.5, 2.82, z]} kind="dark" />
          ))}
        </group>
      ))}
    </group>
  )
}
