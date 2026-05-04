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
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] mb-3 font-label',
            isDark ? 'text-electric' : 'text-electric'
          )}>
            <span className="w-6 h-0.5 bg-current rounded-full" />
            {tag}
          </span>
        </AnimateOnScroll>
      )}

      <AnimateOnScroll animation="fade-up" delay={100}>
        <h2 className={cn(
          'font-display font-semibold leading-tight mb-4',
          isDark ? 'text-canvas' : 'text-obsidian',
          titleClassName
        )}
          style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)' }}
        >
          {title}
        </h2>
      </AnimateOnScroll>

      {description && (
        <AnimateOnScroll animation="fade-up" delay={200}>
          <p className={cn(
            'text-lg leading-relaxed',
            isDark ? 'text-canvas/70' : 'text-granite'
          )}>
            {description}
          </p>
        </AnimateOnScroll>
      )}
    </div>
  )
}
