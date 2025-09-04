'use client'

import React, { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { User } from 'lucide-react'

const avatarVariants = cva(
  'relative inline-flex items-center justify-center font-medium text-white rounded-full overflow-hidden bg-gradient-to-br transition-all duration-200',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      variant: {
        default: 'from-blue-500 to-purple-500',
        primary: 'from-blue-500 to-blue-600',
        secondary: 'from-zinc-600 to-zinc-700',
        success: 'from-green-500 to-green-600',
        warning: 'from-amber-500 to-amber-600',
        danger: 'from-red-500 to-red-600',
      },
      status: {
        online: '',
        offline: '',
        busy: '',
        away: '',
        none: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      status: 'none',
    },
  }
)

const statusIndicatorVariants = cva(
  'absolute bottom-0 right-0 rounded-full border-2 border-black',
  {
    variants: {
      size: {
        xs: 'h-2 w-2',
        sm: 'h-2.5 w-2.5',
        md: 'h-3 w-3',
        lg: 'h-3.5 w-3.5',
        xl: 'h-4 w-4',
        '2xl': 'h-5 w-5',
      },
      status: {
        online: 'bg-green-500',
        offline: 'bg-zinc-500',
        busy: 'bg-red-500',
        away: 'bg-amber-500',
        none: 'hidden',
      },
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string | React.ReactNode
  showBorder?: boolean
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size,
      variant,
      status,
      src,
      alt,
      fallback,
      showBorder = false,
      ...props
    },
    ref
  ) => {
    const initials = typeof fallback === 'string'
      ? fallback.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : fallback

    return (
      <div
        ref={ref}
        className={`${avatarVariants({ size, variant })} ${
          showBorder ? 'ring-2 ring-zinc-800 ring-offset-2 ring-offset-black' : ''
        } ${className}`}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
          />
        ) : initials ? (
          <span className="select-none">{initials}</span>
        ) : (
          <User className="h-1/2 w-1/2 text-white/80" />
        )}
        {status && status !== 'none' && (
          <span
            className={statusIndicatorVariants({ size, status })}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
  size?: VariantProps<typeof avatarVariants>['size']
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max = 3, size = 'md', className, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const visibleChildren = max ? childArray.slice(0, max) : childArray
    const remainingCount = max && childArray.length > max ? childArray.length - max : 0

    return (
      <div
        ref={ref}
        className={`flex items-center -space-x-3 ${className}`}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className="relative z-10 transition-transform hover:z-20 hover:-translate-y-0.5"
            style={{ zIndex: visibleChildren.length - index }}
          >
            {child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={`${avatarVariants({ size, variant: 'secondary' })} relative z-0 flex items-center justify-center ring-2 ring-zinc-800 ring-offset-2 ring-offset-black`}
          >
            <span className="select-none text-xs">+{remainingCount}</span>
          </div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, avatarVariants }