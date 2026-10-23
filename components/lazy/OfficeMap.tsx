'use client'

import dynamic from 'next/dynamic'

// Client-only: Server Components can't use ssr: false (Next 15+).
export const OfficeMap = dynamic(
  () => import('@/components/ui/OfficeMap').then(m => m.OfficeMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-ghost-white animate-pulse" /> }
)
