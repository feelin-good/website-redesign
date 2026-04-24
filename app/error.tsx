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
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center
                        mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="font-display font-bold text-white text-2xl mb-3">
          Something Went Wrong
        </h1>
        <p className="text-slate-400 mb-8">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600
                       text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <RefreshCw size={16} /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/20 text-white
                       font-medium px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  )
}
