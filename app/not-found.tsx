import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <div className="font-display font-semibold text-alabaster mb-4 select-none"
             style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', lineHeight: 1 }}>
          404
        </div>

        <div className="w-12 h-1 bg-electric rounded-full mx-auto mb-6" />

        <h1 className="font-display font-semibold text-obsidian text-2xl mb-3">
          Page Not Found
        </h1>
        <p className="text-granite mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-ink hover:bg-obsidian
                       text-canvas font-semibold px-6 py-3 rounded-pill transition-colors shadow-lab"
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-alabaster
                       text-obsidian font-medium px-6 py-3 rounded-pill hover:bg-ghost transition-colors"
          >
            <ArrowLeft size={16} /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
