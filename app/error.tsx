'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 bg-ghost rounded-full flex items-center justify-center
                        mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-display font-semibold text-obsidian text-2xl mb-3">
          Something Went Wrong
        </h1>
        <p className="text-granite mb-8">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-ink hover:bg-obsidian
                       text-canvas font-semibold px-6 py-3 rounded-pill transition-colors shadow-lab"
          >
            <RefreshCw size={16} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-alabaster text-obsidian
                       font-medium px-6 py-3 rounded-pill hover:bg-ghost transition-colors"
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  )
}
