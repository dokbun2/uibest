'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'

const cardVariants = cva(
  'group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'glass hover:bg-dark-glass-medium border border-dark-glass-light',
        elevated: 'bg-dark-bg-elevated shadow-2xl hover:shadow-3xl hover:-translate-y-1',
        interactive: 'glass cursor-pointer hover:bg-dark-glass-medium hover:scale-[1.02] border border-dark-glass-light',
        image: 'bg-dark-bg-secondary',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  title?: string
  description?: string
  badge?: string
  footer?: React.ReactNode
  onClick?: () => void
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      image,
      title,
      description,
      badge,
      footer,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isClickable = onClick || variant === 'interactive'

    return (
      <div
        ref={ref}
        className={cardVariants({ variant, padding, className })}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        {...props}
      >
        {badge && (
          <div className="absolute right-4 top-4 z-10 rounded-full bg-dark-accent-blue px-3 py-1 text-xs font-medium text-white">
            {badge}
          </div>
        )}
        
        {image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width || 600}
              height={image.height || 400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}
        
        <div className={image && padding !== 'none' ? 'p-6' : ''}>
          {title && (
            <h3 className="mb-2 text-xl font-semibold text-white">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="mb-4 text-dark-text-secondary">
              {description}
            </p>
          )}
          
          {children}
          
          {footer && (
            <div className="mt-4 flex items-center justify-between border-t border-dark-glass-light pt-4">
              {footer}
            </div>
          )}
          
          {isClickable && !footer && (
            <div className="mt-4 flex items-center text-dark-accent-blue transition-all duration-200 group-hover:translate-x-1">
              <span className="text-sm font-medium">더 보기</span>
              <IconArrowRight className="ml-1 h-4 w-4" />
            </div>
          )}
        </div>
      </div>
    )
  }
)

Card.displayName = 'Card'

// Card 하위 컴포넌트들
const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`mb-4 ${className}`} {...props} />
)

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props} />
)

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`mt-4 flex items-center justify-between border-t border-dark-glass-light pt-4 ${className}`}
    {...props}
  />
)

export { Card, CardHeader, CardContent, CardFooter, cardVariants }