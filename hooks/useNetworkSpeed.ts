import { useEffect, useState } from 'react'

type NetworkSpeed = 'slow' | 'fast'

export function useNetworkSpeed(): NetworkSpeed {
  const [speed, setSpeed] = useState<NetworkSpeed>('slow')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Only run on client side
    if (typeof window === 'undefined') return

    try {
      // Check navigator.connection API first (most reliable)
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection

      if (connection) {
        const downlink = connection.downlink || 0
        const effectiveType = connection.effectiveType
        
        // downlink in Mbps, 4g typically means 100+ Mbps
        if (downlink >= 100 || (downlink === 0 && effectiveType === '4g')) {
          setSpeed('fast')
          return
        }
      }

      // Fallback: check localStorage for cached speed result
      const cached = localStorage.getItem('network-speed')
      if (cached === 'fast' || cached === 'slow') {
        setSpeed(cached)
      }
    } catch (error) {
      console.error('Speed detection error:', error)
      setSpeed('slow')
    }
  }, [])

  // Return slow during SSR
  if (!mounted) return 'slow'
  return speed
}
