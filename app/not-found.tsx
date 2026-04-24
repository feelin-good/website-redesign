import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Large 404 */}
        <div className="font-display font-extrabold text-navy-800 mb-4 select-none"
             style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', lineHeight: 1 }}>
          404
        </div>

        <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mb-6" />

        <h1 className="font-display font-bold text-white text-2xl mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600
                       text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/20
                       text-white font-medium px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft size={16} /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
