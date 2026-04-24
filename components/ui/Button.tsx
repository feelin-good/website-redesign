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

interface ButtonAsLink extends SharedProps {
  href: string
  external?: boolean
  disabled?: never
  onClick?: never
  type?: never
}

interface ButtonAsButton extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never
  external?: never
}

type ButtonProps = ButtonAsLink | ButtonAsButton

const variantStyles: Record<Variant, string> = {
  'primary':
    'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg focus-visible:ring-orange-500',
  'primary-lg':
    'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl focus-visible:ring-orange-500',
  'secondary':
    'bg-white text-navy-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-navy-500',
  'ghost-white':
    'text-white border border-white/30 hover:bg-white/10 focus-visible:ring-white',
  'ghost-navy':
    'text-navy-700 hover:bg-navy-50 hover:text-navy-900 focus-visible:ring-navy-500',
  'outline-orange':
    'text-orange-500 border border-orange-400 hover:bg-orange-50 focus-visible:ring-orange-500',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-base gap-2',
}

const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-xl ' +
  'transition-all duration-200 cursor-pointer select-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'right',
    className,
    children,
  } = props

  const isLg = variant === 'primary-lg'
  const sizeClass = isLg ? 'px-10 py-4 text-lg gap-2' : sizeStyles[size]

  const classes = cn(baseStyles, variantStyles[variant], sizeClass, className)

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  )

  if (props.href) {
    const { href, external } = props as ButtonAsLink
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  // Native button — extract only HTML button attributes
  const {
    variant: _v, size: _s, icon: _i, iconPosition: _ip,
    className: _c, children: _ch, href: _href, external: _ext,
    ...htmlButtonProps
  } = props as ButtonAsButton & ButtonAsLink

  return (
    <button className={classes} {...htmlButtonProps}>
      {content}
    </button>
  )
}
