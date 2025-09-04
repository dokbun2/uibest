'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const switchVariants = cva(
  'relative inline-flex cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
      },
      variant: {
        default: 'data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-zinc-700',
        success: 'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-zinc-700',
        warning: 'data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-zinc-700',
        danger: 'data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-zinc-700',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white shadow-lg transition-transform duration-200',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof switchVariants> {
  label?: string
  helperText?: string
  onCheckedChange?: (checked: boolean) => void
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size,
      variant,
      label,
      helperText,
      checked,
      disabled,
      onCheckedChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className={`flex items-start gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <div
            data-state={checked ? 'checked' : 'unchecked'}
            className={switchVariants({ size, variant, className })}
          >
            <span
              data-state={checked ? 'checked' : 'unchecked'}
              className={switchThumbVariants({ size })}
            />
          </div>
        </div>
        {(label || helperText) && (
          <div className="flex flex-col">
            {label && (
              <span className={`text-sm font-medium ${disabled ? 'text-zinc-500' : 'text-white'}`}>
                {label}
              </span>
            )}
            {helperText && (
              <span className="text-xs text-zinc-500 mt-0.5">{helperText}</span>
            )}
          </div>
        )}
      </label>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch, switchVariants }