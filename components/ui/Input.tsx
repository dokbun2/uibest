'use client'

import { InputHTMLAttributes, forwardRef, useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Eye, EyeOff, Search, X } from 'lucide-react'

const inputVariants = cva(
  'flex w-full rounded-xl bg-dark-glass-light backdrop-blur-sm border border-dark-glass-light px-4 py-3 text-white placeholder:text-dark-text-tertiary focus:outline-none focus:ring-2 focus:ring-dark-accent-blue focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'h-9 text-sm',
        md: 'h-11 text-base',
        lg: 'h-13 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClear?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      size,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onClear,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const isSearch = type === 'search'

    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-dark-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-dark-text-secondary">
              {leftIcon}
            </div>
          )}
          {isSearch && !leftIcon && (
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-dark-text-secondary" />
          )}
          <input
            type={inputType}
            className={inputVariants({
              size,
              className: `${leftIcon || isSearch ? 'pl-10' : ''} ${
                rightIcon || isPassword || onClear ? 'pr-10' : ''
              } ${error ? 'border-dark-accent-red focus:ring-dark-accent-red' : ''} ${className}`,
            })}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text-secondary hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
          {onClear && props.value && !isPassword && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text-secondary hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {rightIcon && !isPassword && !onClear && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-dark-accent-red">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-dark-text-tertiary">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input, inputVariants }