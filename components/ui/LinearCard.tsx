'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Image from 'next/image'
import { IconCheck, IconAlertTriangle, IconX, IconClock, IconUsers, IconArrowRight } from '@tabler/icons-react'

const linearCardVariants = cva(
  'group relative overflow-hidden rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700/50 backdrop-blur-sm',
        elevated: 'bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-2xl shadow-black/50 hover:shadow-black/70 hover:-translate-y-0.5',
        glass: 'bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]',
        outline: 'border border-zinc-800 hover:border-zinc-600 bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'glass',
      padding: 'md',
    },
  }
)

const statusColors = {
  onTrack: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    icon: IconCheck,
    label: 'On track'
  },
  atRisk: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    icon: IconAlertTriangle,
    label: 'At risk'
  },
  offTrack: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    icon: IconX,
    label: 'Off track'
  },
  pending: {
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/20',
    text: 'text-zinc-400',
    icon: IconClock,
    label: 'Pending'
  }
}

export interface LinearCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof linearCardVariants> {
  title?: string
  description?: string
  status?: 'onTrack' | 'atRisk' | 'offTrack' | 'pending'
  progress?: number
  assignees?: Array<{ name: string; avatar?: string }>
  dueDate?: string
  tags?: string[]
  metrics?: {
    label: string
    value: string | number
    trend?: 'up' | 'down' | 'neutral'
  }[]
  image?: {
    src: string
    alt: string
  }
  onClick?: () => void
}

const LinearCard = forwardRef<HTMLDivElement, LinearCardProps>(
  (
    {
      className,
      variant,
      padding,
      title,
      description,
      status = 'pending',
      progress,
      assignees = [],
      dueDate,
      tags = [],
      metrics = [],
      image,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const statusConfig = statusColors[status]
    const StatusIcon = statusConfig.icon

    return (
      <div
        ref={ref}
        className={linearCardVariants({ variant, padding, className })}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        {...props}
      >
        {image && (
          <div className="relative -m-5 mb-4 aspect-video overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <div className="mb-4 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${statusConfig.bg} ${statusConfig.border} border ${statusConfig.text}`}
            >
              <StatusIcon className="h-3 w-3" />
              <span>{statusConfig.label}</span>
            </div>
            {dueDate && (
              <span className="text-xs text-zinc-500">Due {dueDate}</span>
            )}
          </div>
        )}

        {/* Title & Description */}
        {title && (
          <h3 className="mb-2 text-base font-semibold text-white/90 group-hover:text-white transition-colors">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="mb-4 text-sm text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs text-zinc-500">Progress</span>
              <span className="text-xs font-medium text-white/70">{progress}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-md bg-zinc-800/50 px-2 py-0.5 text-xs text-zinc-400 hover:bg-zinc-700/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Metrics */}
        {metrics.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <p className="text-xs text-zinc-500">{metric.label}</p>
                <p className="text-sm font-medium text-white/80">
                  {metric.value}
                  {metric.trend && (
                    <span
                      className={`ml-1 text-xs ${
                        metric.trend === 'up'
                          ? 'text-emerald-400'
                          : metric.trend === 'down'
                          ? 'text-red-400'
                          : 'text-zinc-400'
                      }`}
                    >
                      {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Assignees */}
        {assignees.length > 0 && (
          <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4">
            <div className="flex -space-x-2">
              {assignees.slice(0, 3).map((assignee, index) => (
                <div
                  key={index}
                  className="relative h-6 w-6 overflow-hidden rounded-full border border-zinc-700 bg-zinc-800"
                  title={assignee.name}
                >
                  {assignee.avatar ? (
                    <Image
                      src={assignee.avatar}
                      alt={assignee.name}
                      width={24}
                      height={24}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-medium text-zinc-400">
                      {assignee.name[0].toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              {assignees.length > 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-xs text-zinc-400">
                  +{assignees.length - 3}
                </div>
              )}
            </div>
            {onClick && (
              <IconArrowRight className="h-4 w-4 text-zinc-500 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-400" />
            )}
          </div>
        )}

        {children}
      </div>
    )
  }
)

LinearCard.displayName = 'LinearCard'

export { LinearCard, linearCardVariants }