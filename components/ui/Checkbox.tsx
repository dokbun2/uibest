'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check, Minus } from 'lucide-react'

const checkboxVariants = cva(
  'relative flex items-center justify-center rounded-md border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        default: 'border-zinc-600 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 data-[state=indeterminate]:border-blue-500 data-[state=indeterminate]:bg-blue-500',
        success: 'border-zinc-600 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 data-[state=indeterminate]:border-green-500 data-[state=indeterminate]:bg-green-500',
        warning: 'border-zinc-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 data-[state=indeterminate]:border-amber-500 data-[state=indeterminate]:bg-amber-500',
        danger: 'border-zinc-600 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500 data-[state=indeterminate]:border-red-500 data-[state=indeterminate]:bg-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

const checkIconVariants = cva(
  'pointer-events-none text-white',
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        md: 'h-3.5 w-3.5',
        lg: 'h-4 w-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  label?: string
  helperText?: string
  indeterminate?: boolean
  onCheckedChange?: (checked: boolean | 'indeterminate') => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size,
      variant,
      label,
      helperText,
      checked,
      indeterminate = false,
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

    const dataState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'

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
            data-state={dataState}
            className={checkboxVariants({ size, variant, className })}
          >
            {indeterminate ? (
              <Minus className={checkIconVariants({ size })} />
            ) : checked ? (
              <Check className={checkIconVariants({ size })} />
            ) : null}
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
              <span className="text-xs text-zinc-500 mt-1">{helperText}</span>
            )}
          </div>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

// Checkbox Group Component
export interface CheckboxOption {
  value: string
  label: string
  helperText?: string
  disabled?: boolean
}

export interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof checkboxVariants> {
  options: CheckboxOption[]
  value?: string[]
  onChange?: (values: string[]) => void
  label?: string
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options,
      value = [],
      onChange,
      label,
      orientation = 'vertical',
      size,
      variant,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
      const newValues = checked
        ? [...value, optionValue]
        : value.filter(v => v !== optionValue)
      onChange?.(newValues)
    }

    return (
      <div ref={ref} className={`space-y-2 ${className}`} {...props}>
        {label && (
          <p className="text-sm font-medium text-white mb-3">{label}</p>
        )}
        <div
          className={`
            ${orientation === 'horizontal' ? 'flex flex-wrap items-center gap-6' : 'space-y-4'}
          `}
        >
          {options.map((option) => (
            <Checkbox
              key={option.value}
              size={size}
              variant={variant}
              label={option.label}
              helperText={option.helperText}
              checked={value.includes(option.value)}
              disabled={disabled || option.disabled}
              onCheckedChange={(checked) => 
                handleCheckboxChange(option.value, checked as boolean)
              }
            />
          ))}
        </div>
      </div>
    )
  }
)

CheckboxGroup.displayName = 'CheckboxGroup'

export { Checkbox, checkboxVariants }