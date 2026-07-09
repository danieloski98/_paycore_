"use client"

import React, { useState } from 'react'
import {
  Wallet,
  ShieldCheck,
  ArrowRight,
  Lock,
  Scale,
  Users,
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  Check,
  Globe,
  Share2,
  Mail,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react'

// Testimonial Data
const testimonials = [
  {
    quote: "PayStream has saved our HR department over 40 hours a month. The compliance automation alone is worth the investment. No more manual PAYE calculations.",
    author: "Olanrewaju Adeyemi",
    role: "CEO, TechFlow Solutions",
    initials: "OA",
    color: "bg-emerald-105 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
  },
  {
    quote: "The Employee Self-Service portal is a game changer. Our staff can now access their own payslips and tax certificates without emailing HR every week. It creates so much trust.",
    author: "Nneka Nwosu",
    role: "COO, Vanguard Logistics",
    initials: "NN",
    color: "bg-indigo-105 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
  }
]

// FAQ Data
const faqs = [
  {
    question: "Is my data secure?",
    answer: "Yes, PayStream uses bank-grade AES-256 encryption. We are fully compliant with NDPR (Nigeria Data Protection Regulation) and hold all necessary licenses from the Central Bank of Nigeria."
  },
  {
    question: "How do you handle PAYE remittances?",
    answer: "PayStream automatically calculates, deducts, and remits PAYE taxes to the respective State Board of Internal Revenue (such as LIRS in Lagos or FCT-IRS in Abuja) every month, providing you with official receipts."
  },
  {
    question: "Can I integrate with my existing accounting software?",
    answer: "Yes, we offer seamless integrations with popular accounting tools like QuickBooks, Xero, and Sage, allowing you to sync your payroll journal entries automatically."
  }
]

import { SiteHeader } from '../site-header'
import { SiteFooter } from '../site-footer'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0) // Default first one open
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">

      <SiteHeader />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:py-32 overflow-hidden bg-gradient-to-b from-zinc-50/55 to-background dark:from-zinc-950/20 dark:to-background">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">

            {/* CBN Tag */}
            <div className="inline-flex self-start items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>CBN Licensed & Bank-Grade Security</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground">
              Payroll for the <br className="hidden md:inline" />
              future of{' '}
              <span className="relative inline-block">
                Nigerian business.
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-black dark:bg-white rounded" />
              </span>
            </h1>

            {/* Paragraph */}
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Simplify complex tax laws, automate NHF contributions, and pay your team in minutes.
              Built specifically for the Nigerian regulatory landscape.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Start Free Trial
              </a>
              <a
                href="#demo"
                className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                Book a Demo
              </a>
            </div>
          </div>

          {/* Right Product Mockup Column */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Custom High-Fidelity HTML/CSS Mockup */}
            <div className="relative w-full aspect-[4/3] bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-zinc-700" />
                  <span className="size-2.5 rounded-full bg-zinc-700" />
                  <span className="size-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="mx-auto w-1/2 h-5 rounded bg-zinc-800/40 flex items-center justify-center text-[9px] text-zinc-500 font-mono">
                  paystream.ng/dashboard
                </div>
              </div>

              {/* Mockup Workspace */}
              <div className="flex h-full text-zinc-400">
                {/* Sidebar */}
                <div className="w-1/4 border-r border-zinc-900 bg-zinc-950 p-3 hidden sm:flex flex-col gap-4 text-[9px] font-medium font-sans">
                  <div className="flex items-center gap-1.5 px-1 py-1 font-bold text-white">
                    <Wallet className="size-3 text-white" />
                    <span>PayStream</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="bg-zinc-900 text-white px-2.5 py-1.5 rounded-md flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-500" /> Dashboard
                    </span>
                    <span className="px-2.5 py-1.5 flex items-center gap-2">Employees</span>
                    <span className="px-2.5 py-1.5 flex items-center gap-2">Payroll Run</span>
                    <span className="px-2.5 py-1.5 flex items-center gap-2">Compliance</span>
                  </div>
                </div>

                {/* Dashboard Main */}
                <div className="flex-1 bg-zinc-900/30 p-4 flex flex-col gap-4">
                  {/* Top line */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-zinc-500 font-sans">Overview</span>
                      <span className="text-xs font-bold text-white font-sans">Lagos Head Office</span>
                    </div>
                    <div className="size-6 rounded-full bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white font-sans">
                      OA
                    </div>
                  </div>

                  {/* Little Chart Area */}
                  <div className="flex-1 bg-zinc-900/50 rounded-xl border border-zinc-800/80 p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-sans">
                      <span className="text-zinc-500">Payroll Expenditure (Monthly)</span>
                      <span className="text-emerald-400 font-bold">+12.4%</span>
                    </div>
                    <div className="h-16 flex items-end gap-1 px-1">
                      <div className="w-full bg-zinc-850 h-6 rounded-sm" />
                      <div className="w-full bg-zinc-850 h-8 rounded-sm" />
                      <div className="w-full bg-zinc-850 h-10 rounded-sm" />
                      <div className="w-full bg-zinc-850 h-14 rounded-sm" />
                      <div className="w-full bg-white h-20 rounded-sm" />
                    </div>
                  </div>

                  {/* List / Table Area */}
                  <div className="bg-zinc-900/50 rounded-xl border border-zinc-800/80 p-3 flex flex-col gap-1.5">
                    <div className="text-[9px] text-zinc-500 font-medium pb-1 border-b border-zinc-800 flex justify-between font-sans">
                      <span>Employee</span>
                      <span>Status</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-sans">
                      <span className="text-white">Olanrewaju Adeyemi</span>
                      <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full text-[8px]">Paid</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-sans">
                      <span className="text-white">Nneka Nwosu</span>
                      <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-full text-[8px]">Paid</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Processed Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl flex items-center gap-3 z-10 animate-pulse">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Check className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Total Processed</span>
                <span className="text-base font-bold text-foreground">₦4.2B+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Logos Banner */}
      <section className="border-y border-border bg-zinc-50/50 dark:bg-zinc-900/10 py-10">
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-6 items-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 text-center">
            TRUSTED BY NIGERIA'S FAST-GROWING COMPANIES
          </span>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 text-muted-foreground/60 text-lg font-bold">
            <span className="hover:text-foreground transition-colors tracking-widest">KUDABANK</span>
            <span className="hover:text-foreground transition-colors tracking-widest">PAGA</span>
            <span className="hover:text-foreground transition-colors tracking-widest">MONIEPOINT</span>
            <span className="hover:text-foreground transition-colors tracking-widest">HELIUM</span>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-16">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything you need to stay compliant.
            </h2>
            <p className="text-lg text-muted-foreground">
              From direct bank remittances to automatic tax filing, we've automated the entire workforce lifecycle.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

            {/* Feature 1 (Large 5-minute payroll card) */}
            <div className="md:col-span-3 rounded-2xl border border-border bg-background p-8 flex flex-col gap-6 justify-between group hover:border-zinc-400 dark:hover:border-zinc-700 transition-all shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="size-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-foreground">
                  <Activity className="size-5" />
                </div>
                <h3 className="text-xl font-bold">Automate your payroll in 5 minutes</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Import your employee data once and run payroll every month with a single click.
                  No spreadsheets, no manual errors, just precision.
                </p>
              </div>

              {/* Payroll Run Preview Component */}
              <div className="border border-border rounded-xl p-4 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">January 2026 Run</span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                    Successful
                  </span>
                </div>
                <div className="h-[2px] bg-border rounded-full w-full overflow-hidden">
                  <div className="h-full bg-emerald-505 w-[100%] transition-all duration-1000" />
                </div>
                <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-1">
                  <span>Processed: 42 Employees</span>
                  <span>Amount: ₦14,820,500.00</span>
                </div>
              </div>
            </div>

            {/* Feature 2 (Bank grade security card - dark background) */}
            <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-955 text-white p-8 flex flex-col gap-6 justify-between group shadow-lg">
              <div className="flex flex-col gap-3">
                <div className="size-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400">
                  <Lock className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Bank-Grade Security</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Encryption that exceeds the highest financial standards in Nigeria.
                  Your data is protected by AES-256 protocols.
                </p>
              </div>

              {/* Shield Visual Lock */}
              <div className="flex items-center justify-center p-6 border border-zinc-900 rounded-xl bg-zinc-900/40">
                <div className="relative">
                  <Shield className="size-12 text-emerald-500/20 fill-emerald-500/5" />
                  <Lock className="size-5 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Row Below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-border/80">

            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <div className="size-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-foreground">
                <Scale className="size-4.5" />
              </div>
              <h4 className="text-base font-bold">Compliance built-in</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Automatic calculation and remittance of PAYE, NHF, and Pension. Never miss a deadline again.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <div className="size-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-foreground">
                <Users className="size-4.5" />
              </div>
              <h4 className="text-base font-bold">Employee Portal</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Allow employees to download payslips, request leave, and update bank details directly.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3">
              <div className="size-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-foreground">
                <ArrowLeftRight className="size-4.5" />
              </div>
              <h4 className="text-base font-bold">Direct Remittance</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We integrate with all major Nigerian banks to ensure instant salary deposits and tax payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Split Section */}
      <section className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/10 border-y border-border">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background border border-border p-6 rounded-xl flex flex-col gap-1.5 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
              <span className="text-3xl font-extrabold tracking-tight">100%</span>
              <span className="text-xs text-muted-foreground font-semibold">LIRS Compliant</span>
            </div>
            <div className="bg-background border border-border p-6 rounded-xl flex flex-col gap-1.5 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
              <span className="text-3xl font-extrabold tracking-tight">24h</span>
              <span className="text-xs text-muted-foreground font-semibold">Support Response</span>
            </div>
            <div className="bg-background border border-border p-6 rounded-xl flex flex-col gap-1.5 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
              <span className="text-3xl font-extrabold tracking-tight">0</span>
              <span className="text-xs text-muted-foreground font-semibold">Penalty Fees</span>
            </div>
            <div className="bg-background border border-border p-6 rounded-xl flex flex-col gap-1.5 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
              <span className="text-3xl font-extrabold tracking-tight">36</span>
              <span className="text-xs text-muted-foreground font-semibold">States Covered</span>
            </div>
          </div>

          {/* Right Split Text */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Compliant with PAYE, NHF, and Pension.
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Navigating the Nigerian tax system is complex. PayStream automatically calculates
              deductions based on the latest Finance Act, ensuring you stay in the good books of
              every state tax authority.
            </p>

            <ul className="flex flex-col gap-3 pt-2">
              <li className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-955 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm font-medium">Automated Monthly Tax Filing (LIRS, FIRS, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-955 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm font-medium">NSITF and NHF automatic deductions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-955 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm font-medium">Pension contribution management and reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold tracking-tight">Trusted by Nigerian Leaders</h2>
              <p className="text-muted-foreground text-sm">
                See how we're helping CEOs across Lagos, Abuja, and beyond scale their operations.
              </p>
            </div>
            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevTestimonial}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="flex size-10 items-center justify-center rounded-full border border-border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => {
              const isActive = activeTestimonial === idx
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border p-8 flex flex-col gap-6 justify-between transition-all duration-300 ${isActive
                    ? 'border-black dark:border-white shadow-md bg-background'
                    : 'border-border bg-zinc-50/50 dark:bg-zinc-900/10'
                    }`}
                >
                  <p className="italic text-base text-foreground leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-full font-bold text-xs ${t.color}`}>
                      {t.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">{t.author}</span>
                      <span className="text-xs text-muted-foreground">{t.role}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/10 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-12 max-w-3xl">

          {/* Header */}
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          </div>

          {/* Accordion list */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className="bg-background border border-border rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-base transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="size-5 text-muted-foreground" /> : <ChevronDown className="size-5 text-muted-foreground" />}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="bg-black text-white py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-8 items-center text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Ready to automate your payroll?
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
            Join hundreds of Nigerian businesses already saving time and money with PayStream.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Get Started Now
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-800 bg-transparent px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-900"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}