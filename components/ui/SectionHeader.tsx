import { cn } from '@/lib/utils'
import { AnimateOnScroll } from './AnimateOnScroll'

interface SectionHeaderProps {
  tag?: string
  title: string
  description?: string
  align?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
  className?: string
  titleClassName?: string
  maxWidth?: string
}

export function SectionHeader({
  tag,
  title,
  description,
  align = 'left',
  theme = 'light',
  className,
  titleClassName,
  maxWidth = 'max-w-2xl',
}: SectionHeaderProps) {
  const isDark = theme === 'dark'

  const alignClass = {
    left:   'text-left items-start',
    center: 'text-center items-center mx-auto',
    right:  'text-right items-end ml-auto',
  }[align]

  return (
    <div className={cn('flex flex-col', alignClass, maxWidth, className)}>
      {tag && (
        <AnimateOnScroll animation="fade-up">
          <span className={cn(
            'inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest mb-3',
            isDark ? 'text-orange-400' : 'text-orange-500'
          )}>
            <span className="w-6 h-0.5 bg-current rounded-full" />
            {tag}
          </span>
        </AnimateOnScroll>
      )}

      <AnimateOnScroll animation="fade-up" delay={100}>
        <h2 className={cn(
          'font-display font-bold leading-tight mb-4',
          isDark ? 'text-white' : 'text-navy-900',
          titleClassName
        )}
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
        >
          {title}
        </h2>
      </AnimateOnScroll>

      {description && (
        <AnimateOnScroll animation="fade-up" delay={200}>
          <p className={cn(
            'text-lg leading-relaxed',
            isDark ? 'text-slate-300' : 'text-slate-500'
          )}>
            {description}
          </p>
        </AnimateOnScroll>
      )}
    </div>
  )
}
