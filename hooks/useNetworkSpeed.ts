import { useEffect, useState } from 'react'

type NetworkSpeed = 'slow' | 'fast'

export function useNetworkSpeed(): NetworkSpeed {
  const [speed, setSpeed] = useState<NetworkSpeed>('slow')

  useEffect(() => {
    const detectSpeed = async () => {
      try {
        // Use navigator.connection API if available
        const connection = (navigator as any).connection || 
                          (navigator as any).mozConnection || 
                          (navigator as any).webkitConnection

        if (connection) {
          const effectiveType = connection.effectiveType
          const downlink = connection.downlink

          // effectiveType: '4g', '3g', '2g', 'slow-2g'
          // downlink: effective bandwidth in Mbps
          if (effectiveType === '4g' && downlink >= 100) {
            setSpeed('fast')
            return
          }
        }

        // Fallback: test actual download speed
        const testFileUrl = '/api/speed-test' // Optional: small test file
        const startTime = performance.now()
        
        // Use a small resource (1KB) to test speed
        const response = await fetch(`${testFileUrl}?t=${Date.now()}`, {
          method: 'HEAD',
          cache: 'no-cache',
        }).catch(() => null)

        if (response) {
          const endTime = performance.now()
          const timeMs = endTime - startTime

          // If 1KB downloads in less than 10ms, likely 100mbps+
          if (timeMs < 10) {
            setSpeed('fast')
          } else {
            setSpeed('slow')
          }
        }
      } catch (error) {
        // Default to slow on error
        setSpeed('slow')
      }
    }

    detectSpeed()
  }, [])

  return speed
}
