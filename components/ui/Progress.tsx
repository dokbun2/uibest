'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const progressVariants = cva(
  'relative overflow-hidden rounded-full bg-zinc-800/50',
  {
    variants: {
      size: {
        xs: 'h-1',
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
        xl: 'h-6',
      },
      variant: {
        default: '',
        primary: '',
        success: '',
        warning: '',
        danger: '',
        gradient: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

const progressBarVariants = cva(
  'h-full transition-all duration-500 ease-out relative overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-zinc-600',
        primary: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-amber-500',
        danger: 'bg-red-500',
        gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
      },
      animated: {
        true: 'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:animate-shimmer',
        false: '',
      },
      striped: {
        true: 'bg-gradient-to-r from-current via-current to-current bg-[length:1rem_1rem] animate-stripes',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
      striped: false,
    },
  }
)

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  animated?: boolean
  striped?: boolean
  indeterminate?: boolean
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      variant,
      value = 0,
      max = 100,
      label,
      showValue = false,
      animated = false,
      striped = false,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100)

    return (
      <div className="w-full space-y-2">
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm">
            {label && <span className="text-zinc-400">{label}</span>}
            {showValue && !indeterminate && (
              <span className="text-zinc-300 font-medium">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={progressVariants({ size, variant, className })}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div
            className={progressBarVariants({ 
              variant, 
              animated: animated || indeterminate,
              striped 
            })}
            style={{
              width: indeterminate ? '100%' : `${percentage}%`,
              animation: indeterminate 
                ? 'indeterminate 1.5s ease-in-out infinite' 
                : undefined
            }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

// Circular Progress Component
export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  strokeWidth?: number
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  showValue?: boolean
  indeterminate?: boolean
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      size = 'md',
      strokeWidth,
      variant = 'primary',
      showValue = false,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: { width: 32, fontSize: 'text-xs' },
      md: { width: 48, fontSize: 'text-sm' },
      lg: { width: 64, fontSize: 'text-base' },
      xl: { width: 80, fontSize: 'text-lg' },
    }

    const colors = {
      default: 'stroke-zinc-600',
      primary: 'stroke-blue-500',
      success: 'stroke-green-500',
      warning: 'stroke-amber-500',
      danger: 'stroke-red-500',
    }

    const sizeConfig = sizes[size]
    const radius = (sizeConfig.width - (strokeWidth || 4)) / 2
    const circumference = radius * 2 * Math.PI
    const offset = indeterminate ? circumference * 0.25 : circumference - (value / 100) * circumference

    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center ${className}`}
        {...props}
      >
        <svg
          width={sizeConfig.width}
          height={sizeConfig.width}
          className={indeterminate ? 'animate-spin' : ''}
        >
          <circle
            cx={sizeConfig.width / 2}
            cy={sizeConfig.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth || 4}
            className="text-zinc-800/50"
          />
          <circle
            cx={sizeConfig.width / 2}
            cy={sizeConfig.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth || 4}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${colors[variant]} transition-all duration-500 ease-out`}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
        </svg>
        {showValue && !indeterminate && (
          <div className={`absolute ${sizeConfig.fontSize} font-medium text-white`}>
            {Math.round(value)}%
          </div>
        )}
      </div>
    )
  }
)

CircularProgress.displayName = 'CircularProgress'

// Steps Progress Component
export interface Step {
  label: string
  description?: string
  completed?: boolean
  current?: boolean
}

export interface StepsProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  variant?: 'default' | 'numbered' | 'icon'
}

export const StepsProgress = forwardRef<HTMLDivElement, StepsProgressProps>(
  ({ steps, variant = 'default', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-between ${className}`}
        {...props}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all
                  ${step.completed 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : step.current
                    ? 'border-blue-500 bg-transparent text-blue-500'
                    : 'border-zinc-700 bg-transparent text-zinc-500'
                  }
                `}
              >
                {variant === 'numbered' ? (
                  <span className="text-sm font-medium">
                    {step.completed ? '✓' : index + 1}
                  </span>
                ) : (
                  <div className={`
                    h-3 w-3 rounded-full
                    ${step.completed || step.current ? 'bg-current' : 'bg-zinc-600'}
                  `} />
                )}
              </div>
              {step.label && (
                <span className={`
                  mt-2 text-xs
                  ${step.completed || step.current ? 'text-white' : 'text-zinc-500'}
                `}>
                  {step.label}
                </span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                mx-3 h-0.5 flex-1
                ${steps[index + 1].completed || steps[index + 1].current
                  ? 'bg-blue-500'
                  : 'bg-zinc-700'
                }
              `} />
            )}
          </div>
        ))}
      </div>
    )
  }
)

StepsProgress.displayName = 'StepsProgress'

export { Progress, progressVariants }