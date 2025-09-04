'use client'

import Link from 'next/link'
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram } from '@tabler/icons-react'

interface FooterProps {
  variant?: 'default' | 'simple'
}

export function Footer({ variant = 'default' }: FooterProps) {
  if (variant === 'simple') {
    return (
      <footer className="w-full bg-black border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">
              © 2024 UI Best. Built with React and Tailwind CSS.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/docs" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="https://github.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                GitHub
              </Link>
              <Link href="https://twitter.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="w-full bg-gradient-to-b from-zinc-900/50 to-black border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">UI</span>
              </div>
              <span className="text-xl font-semibold text-white">UI Best</span>
            </Link>
            <p className="text-zinc-400 mb-6 max-w-sm">
              2025년 최신 트렌드를 반영한 모던 웹 애플리케이션을 위한 완벽한 UI 솔루션입니다.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://twitter.com"
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
              >
                <IconBrandTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com"
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
              >
                <IconBrandGithub className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
              >
                <IconBrandLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
              >
                <IconBrandInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-zinc-400 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-zinc-400 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-zinc-400 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-zinc-400 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-zinc-400 hover:text-white transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-zinc-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-zinc-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-400">
              © 2024 UI Best. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-zinc-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}