'use client'

import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'

// Minimal MapLibre marker styles override — keeps the default marker but makes it ink-coloured
const MARKER_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 28 38">
  <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24S28 24.5 28 14C28 6.27 21.73 0 14 0z"
        fill="#1c1c1c"/>
  <circle cx="14" cy="14" r="5" fill="white"/>
</svg>`

export interface OfficeMapProps {
  lat: number
  lng: number
  zoom?: number
  className?: string
}

export function OfficeMap({ lat, lng, zoom = 14, className = '' }: OfficeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('maplibre-gl').Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('maplibre-gl').then(({ Map, Marker }) => {
      if (!containerRef.current) return

      const map = new Map({
        container: containerRef.current,
        // Positron style — clean, minimal, matches the design aesthetic
        style: 'https://tiles.openfreemap.com/styles/positron',
        center: [lng, lat],
        zoom,
        interactive: false,
        attributionControl: false,
      })

      // Custom ink-coloured marker
      const el = document.createElement('div')
      el.innerHTML = MARKER_SVG
      el.style.width = '28px'
      el.style.height = '38px'

      new Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map)

      mapRef.current = map
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [lat, lng, zoom])

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label="Office location map"
    />
  )
}
