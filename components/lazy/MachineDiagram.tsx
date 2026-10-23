'use client'

import dynamic from 'next/dynamic'

// Client-only: Server Components can't use ssr: false (Next 15+).
export const MachineDiagram = dynamic(
  () => import('@/components/anime/MachineDiagram').then(m => m.MachineDiagram),
  { ssr: false }
)
