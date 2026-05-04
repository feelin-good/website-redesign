import { ReactNode, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'primary-lg' | 'secondary' | 'ghost-white' | 'ghost-navy' | 'outline-orange'
type Size = 'sm' | 'md' | 'lg'

interface SharedProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: ReactNode
}

type ButtonAsLink = SharedProps & {
  href: string
  external?: boolean
}

type ButtonAsButton = SharedProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  href?: never
  external?: never
}

type ButtonProps = ButtonAsLink | ButtonAsButton

const variantStyles: Record<Variant, string> = {
  'primary':        'bg-ink text-canvas hover:bg-obsidian shadow-lab focus-visible:ring-ink',
  'primary-lg':     'bg-ink text-canvas hover:bg-obsidian shadow-lab focus-visible:ring-ink',
  'secondary':      'bg-canvas text-obsidian border border-alabaster hover:bg-ghost focus-visible:ring-obsidian',
  'ghost-white':    'text-canvas border border-canvas/30 hover:bg-canvas/10 focus-visible:ring-canvas',
  'ghost-navy':     'text-obsidian border border-alabaster hover:bg-ghost focus-visible:ring-obsidian',
  'outline-orange': 'text-electric border border-electric/40 hover:bg-ghost focus-visible:ring-electric',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-base gap-2',
}

const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-pill ' +
  'transition-all duration-200 cursor-pointer select-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconPosition = 'right', className, children } = props

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    variant === 'primary-lg' ? 'px-10 py-4 text-lg gap-2' : sizeStyles[size],
    className
  )

  const content = (
    <>
      {icon && iconPosition === 'left'  && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  )

  if (props.href) {
    const { href, external } = props as ButtonAsLink
    if (external) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{content}</a>
    }
    return <Link href={href} className={classes}>{content}</Link>
  }

  const {
    variant: _variant, size: _size, icon: _icon, iconPosition: _pos,
    className: _cls, children: _ch, href: _href, external: _ext,
    ...nativeProps
  } = props as ButtonAsButton & { href?: never; external?: never }

  return <button className={classes} {...nativeProps}>{content}</button>
}
