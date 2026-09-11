'use client'

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import './map.css'

interface MapProps {
  center?: [number, number]
  zoom?: number
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

interface MapContextValue {
  map: maplibregl.Map | null
}

import { createContext, useContext } from 'react'

const MapContext = createContext<MapContextValue>({ map: null })

export function useMapContext() {
  return useContext(MapContext)
}

export function Map({
  center = [77.3574, 28.6275],
  zoom = 12,
  children,
  className = '',
  style,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.com/styles/positron',
      center,
      zoom,
      attributionControl: false,
    })

    map.addControl(new maplibregl.AttributionControl({ compact: false }), 'bottom-left')

    mapRef.current = map

    return () => {
      map.remove()
    }
  }, [center, zoom])

  return (
    <MapContext.Provider value={{ map: mapRef.current }}>
      <div
        ref={containerRef}
        className={`mapcn-container ${className}`}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
      {children}
    </MapContext.Provider>
  )
}

interface MarkerProps {
  longitude: number
  latitude: number
  children?: ReactNode
}

export function MapMarker({ longitude, latitude, children }: MarkerProps) {
  const { map } = useMapContext()
  const markerRef = useRef<maplibregl.Marker | null>(null)
  const popupRef = useRef<maplibregl.Popup | null>(null)

  useEffect(() => {
    if (!map) return

    const el = document.createElement('div')
    el.className = 'mapcn-marker'

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([longitude, latitude])
      .addTo(map)

    markerRef.current = marker

    return () => {
      marker.remove()
      if (popupRef.current) popupRef.current.remove()
    }
  }, [map, longitude, latitude])

  return <MapMarkerContent markerEl={markerRef.current?.getElement()} markerRef={markerRef}>{children}</MapMarkerContent>
}

interface MarkerContentProps {
  children?: ReactNode
  markerEl?: HTMLElement
  markerRef?: React.MutableRefObject<maplibregl.Marker | null>
}

function MapMarkerContent({ children, markerEl, markerRef }: MarkerContentProps) {
  useEffect(() => {
    if (!markerEl || !children) return

    // Find and inject content into marker
    const contentEl = markerEl.querySelector('.mapcn-marker-content')
    if (contentEl && Array.isArray(children)) {
      children.forEach((child) => {
        if (child?.type.name === 'MarkerContent') {
          contentEl.replaceChildren(child.props.children)
        }
      })
    }
  }, [markerEl, children])

  return null
}

interface MarkerContentBaseProps {
  children?: ReactNode
}

export function MarkerContent({ children }: MarkerContentBaseProps) {
  return <div className="mapcn-marker-content">{children}</div>
}

export function MarkerLabel({ children }: MarkerContentBaseProps) {
  return <div className="mapcn-marker-label">{children}</div>
}

export function MarkerTooltip({ children }: MarkerContentBaseProps) {
  return <div className="mapcn-marker-tooltip">{children}</div>
}

interface MarkerPopupProps {
  children?: ReactNode
  offset?: number
}

export function MarkerPopup({ children, offset = 0 }: MarkerPopupProps) {
  const { map } = useMapContext()
  const popupRef = useRef<maplibregl.Popup | null>(null)
  const markerElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!map) return

    const popup = new maplibregl.Popup({
      offset: offset,
      closeButton: true,
      closeOnClick: true,
    })

    const content = document.createElement('div')
    if (typeof children === 'string') {
      content.textContent = children
    } else if (children && typeof children === 'object' && 'props' in children) {
      content.appendChild(children.props.children)
    }

    popup.setDOMContent(content)

    popupRef.current = popup

    const markers = document.querySelectorAll('.mapcn-marker')
    const lastMarker = markers[markers.length - 1] as HTMLElement | undefined
    if (lastMarker) {
      markerElementRef.current = lastMarker
      lastMarker.addEventListener('click', () => {
        const lng = parseFloat(lastMarker.dataset.lng || '0')
        const lat = parseFloat(lastMarker.dataset.lat || '0')
        popup.setLngLat([lng, lat]).addTo(map)
      })
    }

    return () => {
      popup.remove()
    }
  }, [map, children, offset])

  return null
}

export function MapControls() {
  const { map } = useMapContext()

  useEffect(() => {
    if (!map) return

    map.addControl(new maplibregl.NavigationControl(), 'top-right')
    map.addControl(new maplibregl.FullscreenControl(), 'top-right')
  }, [map])

  return null
}
