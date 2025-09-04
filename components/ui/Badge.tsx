'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-full font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50',
        primary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        secondary: 'bg-zinc-700/50 text-zinc-200 border border-zinc-600/50',
        success: 'bg-green-500/10 text-green-400 border border-green-500/20',
        warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
        info: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        outline: 'border border-zinc-700 text-zinc-300',
        ghost: 'text-zinc-400 hover:bg-zinc-800/50',
      },
      size: {
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
      pulse: {
        true: 'animate-pulse',
        false: '',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        glow: true,
        className: 'shadow-[0_0_10px_rgba(59,130,246,0.5)]',
      },
      {
        variant: 'success',
        glow: true,
        className: 'shadow-[0_0_10px_rgba(34,197,94,0.5)]',
      },
      {
        variant: 'warning',
        glow: true,
        className: 'shadow-[0_0_10px_rgba(245,158,11,0.5)]',
      },
      {
        variant: 'danger',
        glow: true,
        className: 'shadow-[0_0_10px_rgba(239,68,68,0.5)]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      pulse: false,
      glow: false,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  removable?: boolean
  onRemove?: () => void
  dot?: boolean
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      pulse,
      glow,
      children,
      leftIcon,
      rightIcon,
      removable = false,
      onRemove,
      dot = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={badgeVariants({ variant, size, pulse, glow, className })}
        {...props}
      >
        {dot && (
          <span className={`
            ${size === 'xs' || size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'}
            rounded-full animate-pulse
            ${variant === 'primary' ? 'bg-blue-400' : ''}
            ${variant === 'success' ? 'bg-green-400' : ''}
            ${variant === 'warning' ? 'bg-amber-400' : ''}
            ${variant === 'danger' ? 'bg-red-400' : ''}
            ${variant === 'info' ? 'bg-cyan-400' : ''}
            ${variant === 'default' || variant === 'secondary' || variant === 'outline' || variant === 'ghost' ? 'bg-zinc-400' : ''}
          `} />
        )}
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && !removable && <span className="flex-shrink-0">{rightIcon}</span>}
        {removable && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="ml-0.5 -mr-1 flex-shrink-0 rounded-full p-0.5 transition-colors hover:bg-white/10"
            aria-label="Remove badge"
          >
            <X className={`
              ${size === 'xs' || size === 'sm' ? 'h-2.5 w-2.5' : ''}
              ${size === 'md' ? 'h-3 w-3' : ''}
              ${size === 'lg' ? 'h-3.5 w-3.5' : ''}
            `} />
          </button>
        )}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

// Notification Badge Component
export interface NotificationBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
  max?: number
  dot?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  variant?: VariantProps<typeof badgeVariants>['variant']
  children: React.ReactNode
}

export const NotificationBadge = forwardRef<HTMLDivElement, NotificationBadgeProps>(
  (
    {
      count = 0,
      max = 99,
      dot = false,
      position = 'top-right',
      variant = 'danger',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const displayCount = count > max ? `${max}+` : count
    const showBadge = dot || count > 0

    const positionClasses = {
      'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
      'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    }

    return (
      <div ref={ref} className={`relative inline-block ${className}`} {...props}>
        {children}
        {showBadge && (
          <div
            className={`absolute ${positionClasses[position]} z-10`}
          >
            {dot ? (
              <span className="flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            ) : (
              <Badge
                variant={variant}
                size="xs"
                className="min-w-[1.25rem] px-1.5"
              >
                {displayCount}
              </Badge>
            )}
          </div>
        )}
      </div>
    )
  }
)

NotificationBadge.displayName = 'NotificationBadge'

export { Badge, badgeVariants }