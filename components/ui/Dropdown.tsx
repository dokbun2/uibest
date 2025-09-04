'use client'

import { useState, useRef, useEffect, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, Check } from 'lucide-react'

const dropdownVariants = cva(
  'relative inline-block text-left w-full',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const dropdownButtonVariants = cva(
  'flex w-full items-center justify-between rounded-xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 px-4 py-2.5 text-white hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'py-2 text-sm',
        md: 'py-2.5 text-base',
        lg: 'py-3 text-lg',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:bg-zinc-900/50',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
    },
  }
)

const dropdownMenuVariants = cva(
  'absolute z-50 mt-2 w-full rounded-xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200',
  {
    variants: {
      position: {
        bottom: 'top-full',
        top: 'bottom-full',
      },
    },
    defaultVariants: {
      position: 'bottom',
    },
  }
)

export interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  description?: string
}

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'size'>,
    VariantProps<typeof dropdownVariants> {
  options: DropdownOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  helperText?: string
  disabled?: boolean
  searchable?: boolean
  multiple?: boolean
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      size,
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      label,
      error,
      helperText,
      disabled = false,
      searchable = false,
      multiple = false,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedValues, setSelectedValues] = useState<string[]>(
      multiple && value ? value.split(',') : value ? [value] : []
    )
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchQuery('')
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [isOpen, searchable])

    const filteredOptions = searchable
      ? options.filter(option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue]
        setSelectedValues(newValues)
        onChange?.(newValues.join(','))
      } else {
        setSelectedValues([optionValue])
        onChange?.(optionValue)
        setIsOpen(false)
      }
      setSearchQuery('')
    }

    const getDisplayValue = () => {
      if (selectedValues.length === 0) return placeholder
      if (multiple) {
        const count = selectedValues.length
        if (count === 1) {
          const option = options.find(opt => opt.value === selectedValues[0])
          return option?.label || placeholder
        }
        return `${count} selected`
      }
      const option = options.find(opt => opt.value === selectedValues[0])
      return option?.label || placeholder
    }

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white">
            {label}
          </label>
        )}
        <div
          ref={dropdownRef}
          className={dropdownVariants({ size, className })}
          {...props}
        >
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={dropdownButtonVariants({ size, disabled })}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={`truncate ${
              selectedValues.length === 0 ? 'text-zinc-400' : 'text-white'
            }`}>
              {getDisplayValue()}
            </span>
            <ChevronDown 
              className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {isOpen && (
            <div className={dropdownMenuVariants()}>
              {searchable && (
                <div className="border-b border-zinc-800/50 p-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-lg bg-zinc-800/50 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:bg-zinc-800"
                  />
                </div>
              )}
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-zinc-500 text-center">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                      className={`
                        flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors
                        ${option.disabled 
                          ? 'cursor-not-allowed opacity-50' 
                          : 'hover:bg-zinc-800/50 cursor-pointer'
                        }
                        ${selectedValues.includes(option.value) 
                          ? 'bg-blue-500/10 text-blue-400' 
                          : 'text-white'
                        }
                      `}
                      role="option"
                      aria-selected={selectedValues.includes(option.value)}
                    >
                      {multiple && (
                        <div className={`
                          h-4 w-4 rounded border flex items-center justify-center
                          ${selectedValues.includes(option.value)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-zinc-600'
                          }
                        `}>
                          {selectedValues.includes(option.value) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                      )}
                      {option.icon && (
                        <span className="flex-shrink-0 text-zinc-400">
                          {option.icon}
                        </span>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="truncate">{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-zinc-500 truncate">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {!multiple && selectedValues.includes(option.value) && (
                        <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-zinc-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Dropdown.displayName = 'Dropdown'

export { Dropdown, dropdownVariants }