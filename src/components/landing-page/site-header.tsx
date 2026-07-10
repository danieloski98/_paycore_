"use client"

import React, { useState } from 'react'
import { Wallet, Menu, X } from 'lucide-react'
import Link from 'next/link'

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-12 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
            <Wallet className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Paycore</span>
          <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full font-medium">Nigeria</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">Platform</Link>
          <div className="group relative">
            <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Company</span>
            <div className="absolute left-0 top-full hidden pt-4 group-hover:block">
              <div className="w-48 rounded-md border border-border bg-background p-2 shadow-md">
                <Link href="/#about" className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">About Us</Link>
                <Link href="/terms" className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">Terms of Use</Link>
                <Link href="/privacy" className="block rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">Privacy Policy</Link>
              </div>
            </div>
          </div>
          <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Resources</Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/company-login" className="text-sm font-medium hover:text-zinc-600 transition-colors">Log In</Link>
          <Link
            href="/create-account"
            className="inline-flex h-10 items-center justify-center rounded-md bg-black px-6 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex size-10 items-center justify-center rounded-md border border-border"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 border-b border-border bg-background p-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium">
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Platform</Link>
            <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">About Us</Link>
            <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Terms of Use</Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Resources</Link>
            <hr className="border-border my-2" />
            <Link href="/company-login" className="py-2 text-center text-sm font-medium text-foreground">Log In</Link>
            <Link
              href="/create-account"
              className="flex h-11 items-center justify-center rounded-md bg-black text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
