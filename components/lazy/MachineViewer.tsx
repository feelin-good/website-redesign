'use client'

import dynamic from 'next/dynamic'

// Client-only: Server Components can't use ssr: false (Next 15+).
export const MachineViewer = dynamic(
  () => import('@/components/three/MachineViewer').then(m => m.MachineViewer),
  { ssr: false }
)
