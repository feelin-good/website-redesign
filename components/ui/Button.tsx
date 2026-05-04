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
  'primary':        'bg-ink text-white hover:bg-obsidian focus-visible:ring-ink',
  'primary-lg':     'bg-ink text-white hover:bg-obsidian focus-visible:ring-ink',
  'secondary':      'bg-canvas text-ink border border-alabaster hover:bg-ghost-white focus-visible:ring-ink',
  'ghost-white':    'text-white border border-white/15 hover:bg-white/10 focus-visible:ring-white',
  'ghost-navy':     'text-ink border border-ink/15 hover:bg-ink/5 focus-visible:ring-ink',
  'outline-orange': 'text-electric-orange border border-electric-orange/40 hover:bg-electric-orange/5 focus-visible:ring-electric-orange',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs gap-2',
  md: 'px-7 py-3.5 text-sm gap-2.5',
  lg: 'px-10 py-4 text-base gap-2.5',
}

const baseStyles =
  'inline-flex items-center justify-center font-medium rounded-full ' +
  'transition-all duration-200 cursor-pointer select-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconPosition = 'right', className, children } = props

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    variant === 'primary-lg' ? 'px-10 py-4 text-base gap-2.5' : sizeStyles[size],
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
