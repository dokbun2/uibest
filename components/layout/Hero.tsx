'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { IconArrowRight, IconSparkles, IconRocket, IconCode } from '@tabler/icons-react'

interface HeroProps {
  variant?: 'default' | 'centered' | 'split' | 'cta'
  badge?: string
  title: string
  subtitle?: string
  description?: string
  primaryCTA?: {
    label: string
    href: string
  }
  secondaryCTA?: {
    label: string
    href: string
  }
  image?: {
    src: string
    alt: string
  }
}

export function Hero({
  variant = 'default',
  badge,
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  image,
}: HeroProps) {
  if (variant === 'centered') {
    return (
      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <IconSparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">{badge}</span>
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-2xl md:text-3xl font-light text-zinc-300 mb-4">
              {subtitle}
            </p>
          )}
          
          {description && (
            <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-center gap-4">
            {primaryCTA && (
              <Link href={primaryCTA.href}>
                <Button size="lg" className="gap-2">
                  {primaryCTA.label}
                  <IconArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button variant="outline" size="lg">
                  {secondaryCTA.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'split') {
    return (
      <section className="relative w-full min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-black" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              {badge && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-purple-500/10 border border-purple-500/20 rounded-full">
                  <IconRocket className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">{badge}</span>
                </div>
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {title}
              </h1>
              
              {description && (
                <p className="text-lg text-zinc-400 mb-8">
                  {description}
                </p>
              )}
              
              <div className="flex items-center gap-4">
                {primaryCTA && (
                  <Link href={primaryCTA.href}>
                    <Button size="lg" className="gap-2">
                      {primaryCTA.label}
                      <IconArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                )}
                {secondaryCTA && (
                  <Link href={secondaryCTA.href}>
                    <Button variant="ghost" size="lg">
                      {secondaryCTA.label}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            
            {image && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
                <img
                  src={image.src}
                  alt={image.alt}
                  className="relative z-10 w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'cta') {
    return (
      <section className="relative w-full py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <IconCode className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          
          {description && (
            <p className="text-xl text-zinc-300 mb-8">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-center gap-4">
            {primaryCTA && (
              <Link href={primaryCTA.href}>
                <Button size="lg" className="gap-2">
                  {primaryCTA.label}
                  <IconArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            )}
            {secondaryCTA && (
              <Link href={secondaryCTA.href}>
                <Button variant="secondary" size="lg">
                  {secondaryCTA.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className="relative w-full min-h-[700px] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full">
            <IconSparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              {badge}
            </span>
          </div>
        )}
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-2xl md:text-3xl font-light text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
            {description}
          </p>
        )}
        
        <div className="flex items-center gap-4">
          {primaryCTA && (
            <Link href={primaryCTA.href}>
              <Button size="lg" className="gap-2">
                {primaryCTA.label}
                <IconArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          )}
          {secondaryCTA && (
            <Link href={secondaryCTA.href}>
              <Button variant="outline" size="lg">
                {secondaryCTA.label}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}