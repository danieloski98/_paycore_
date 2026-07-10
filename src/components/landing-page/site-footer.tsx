"use client"

import React from 'react'
import { Wallet, Globe, Share2, Mail } from 'lucide-react'
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-border">

        {/* Brand Info */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black">
              <Wallet className="size-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">Paycore Nigeria</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            The complete workforce management platform for the Nigerian market.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-muted-foreground pt-2">
            <Link href="#" aria-label="Website" className="hover:text-foreground transition-colors"><Globe className="size-4" /></Link>
            <Link href="#" aria-label="Share" className="hover:text-foreground transition-colors"><Share2 className="size-4" /></Link>
            <Link href="#" aria-label="Mail" className="hover:text-foreground transition-colors"><Mail className="size-4" /></Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-7 grid grid-cols-3 gap-8">
          {/* Product */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Product</span>
            <nav className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Payroll Management</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Tax Compliance</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Employee Portal</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Bank Integrations</Link>
            </nav>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Company</span>
            <nav className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <Link href="/#about" className="hover:text-foreground transition-colors">About Us</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Careers</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Blog</Link>
              <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">Legal</span>
            <nav className="flex flex-col gap-2.5 text-xs text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">NDPR Compliance</Link>
              <Link href="#" className="hover:text-foreground transition-colors">License Information</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom copyright & notice */}
      <div className="container mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
        <span>© {new Date().getFullYear()} Paycore Workforce Nigeria Limited. Licensed by CBN.</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  )
}
