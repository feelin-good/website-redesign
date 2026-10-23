'use client'

import dynamic from 'next/dynamic'

// Client-only: Server Components can't use ssr: false (Next 15+).
export const AnimeImagePlaceholder = dynamic(
  () => import('@/components/ui/AnimeImagePlaceholder').then(m => m.AnimeImagePlaceholder),
  { ssr: false }
)
