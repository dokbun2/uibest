'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

const spinnerVariants = cva(
  'animate-spin text-white',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        white: 'text-white',
        primary: 'text-blue-500',
        secondary: 'text-zinc-400',
        success: 'text-green-500',
        warning: 'text-amber-500',
        danger: 'text-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'white',
    },
  }
)

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex flex-col items-center gap-2 ${className}`}
        role="status"
        aria-label={label || 'Loading'}
        {...props}
      >
        <Loader2 className={spinnerVariants({ size, color })} />
        {label && (
          <span className="text-sm text-zinc-400">{label}</span>
        )}
        <span className="sr-only">{label || 'Loading'}</span>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

// Dots Loading Component
const dotsVariants = cva(
  'inline-flex items-center gap-1',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1',
        lg: 'gap-1.5',
      },
      color: {
        white: '[&>span]:bg-white',
        primary: '[&>span]:bg-blue-500',
        secondary: '[&>span]:bg-zinc-400',
        success: '[&>span]:bg-green-500',
        warning: '[&>span]:bg-amber-500',
        danger: '[&>span]:bg-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'white',
    },
  }
)

const dotSizeVariants = cva(
  'rounded-full animate-bounce',
  {
    variants: {
      size: {
        sm: 'h-1.5 w-1.5',
        md: 'h-2 w-2',
        lg: 'h-3 w-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface DotsLoadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof dotsVariants> {}

export const DotsLoading = forwardRef<HTMLDivElement, DotsLoadingProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={dotsVariants({ size, color, className })}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <span
          className={dotSizeVariants({ size })}
          style={{ animationDelay: '0ms' }}
        />
        <span
          className={dotSizeVariants({ size })}
          style={{ animationDelay: '150ms' }}
        />
        <span
          className={dotSizeVariants({ size })}
          style={{ animationDelay: '300ms' }}
        />
        <span className="sr-only">Loading</span>
      </div>
    )
  }
)

DotsLoading.displayName = 'DotsLoading'

// Skeleton Loading Component
const skeletonVariants = cva(
  'animate-pulse rounded-lg bg-zinc-800/50',
  {
    variants: {
      variant: {
        text: 'h-4',
        title: 'h-8',
        avatar: 'rounded-full',
        thumbnail: 'aspect-square',
        card: 'h-32',
        button: 'h-10 w-24',
      },
    },
    defaultVariants: {
      variant: 'text',
    },
  }
)

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={skeletonVariants({ variant, className })}
        style={{
          width: width || (variant === 'avatar' ? 40 : undefined),
          height: height || (variant === 'avatar' ? 40 : undefined),
          ...style,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

// Loading Overlay Component
export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean
  label?: string
  blur?: boolean
  fullScreen?: boolean
}

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ visible = true, label, blur = false, fullScreen = false, className, children, ...props }, ref) => {
    if (!visible) return <>{children}</>

    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        {children}
        <div
          className={`
            absolute inset-0 z-50 flex items-center justify-center
            ${fullScreen ? 'fixed' : 'absolute'}
            ${blur ? 'backdrop-blur-sm' : ''}
            bg-black/50
          `}
        >
          <div className="flex flex-col items-center gap-4">
            <Spinner size="lg" color="white" />
            {label && (
              <p className="text-sm font-medium text-white">{label}</p>
            )}
          </div>
        </div>
      </div>
    )
  }
)

LoadingOverlay.displayName = 'LoadingOverlay'

// Progress Bar Loading Component
export interface ProgressBarLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number
  indeterminate?: boolean
}

export const ProgressBarLoading = forwardRef<HTMLDivElement, ProgressBarLoadingProps>(
  ({ progress = 0, indeterminate = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent ${className}`}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{
            width: indeterminate ? '100%' : `${progress}%`,
            animation: indeterminate 
              ? 'indeterminate-progress 1.5s ease-in-out infinite' 
              : undefined
          }}
        />
      </div>
    )
  }
)

ProgressBarLoading.displayName = 'ProgressBarLoading'

export { spinnerVariants, dotsVariants, skeletonVariants }