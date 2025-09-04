'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  IconBell,
  IconSearch,
  IconUser,
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUserCircle,
  IconPlus,
  IconMenu2,
  IconX,
} from '@tabler/icons-react'

interface NavbarProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">UI</span>
              </div>
              <span className="text-white font-semibold text-lg">UI Best</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/components"
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all flex items-center gap-2"
              >
                컴포넌트
                <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">12</span>
              </Link>
              <Link
                href="/demo"
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
              >
                데모
              </Link>
              <Link
                href="https://github.com/dokbun2/uibest"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
              >
                GitHub
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all">
              <IconSearch className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all">
              <IconBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* New Project Button */}
            <Button size="sm" className="hidden md:flex items-center gap-2">
              <IconPlus className="w-4 h-4" />
              New Project
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      user.name.split(' ').map(n => n[0]).join('')
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                  <IconChevronDown className="w-4 h-4 text-zinc-400 hidden md:block" />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all"
                    >
                      <IconUserCircle className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all"
                    >
                      <IconSettings className="w-4 h-4" />
                      Settings
                    </Link>
                    <hr className="my-1 border-zinc-800" />
                    <button className="flex items-center gap-3 px-4 py-2.5 w-full text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all">
                      <IconLogout className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
                <Button size="sm">
                  Sign up
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
            >
              {mobileMenuOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/50 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/components"
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                컴포넌트
                <span className="px-1.5 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded-full">12</span>
              </Link>
              <Link
                href="/demo"
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                데모
              </Link>
              <Link
                href="https://github.com/dokbun2/uibest"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub
              </Link>
            </nav>
          </div>
        )}
      </div>
    </nav>
  )
}