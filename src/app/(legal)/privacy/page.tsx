import React from 'react'
import { ShieldCheck, Lock, CheckCircle2, ShieldOff } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Paycore Nigeria',
  description: 'Privacy Policy for Paycore Nigeria workforce management platform.',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-7xl">
      
      {/* Top Header Row for Privacy Page */}
      <div className="mb-12 md:mb-16">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Legal & Trust</h3>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm flex items-center gap-2">
          <span>Last Updated: November 14, 2024</span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span>Version 2.1.0</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Left Sidebar Menu */}
        <div className="md:col-span-3 hidden md:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">On This Page</h3>
              <nav className="flex flex-col text-sm border-l border-border">
                <a href="#data-collection" className="pl-4 py-2 border-l-2 border-black font-semibold text-foreground -ml-px transition-colors">Data Collection</a>
                <a href="#how-we-use-data" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">How We Use Data</a>
                <a href="#security-measures" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">Security Measures</a>
                <a href="#user-rights" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">User Rights</a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 max-w-4xl">
          
          {/* Trust Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">
            
            {/* Our Commitment Card */}
            <div className="lg:col-span-3 rounded-2xl border border-border bg-zinc-50/50 dark:bg-zinc-900/10 p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-foreground" />
                <h2 className="text-xl font-bold tracking-tight">Our Commitment to Transparency</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                At Paycore Nigeria, we recognize that your financial data is more than just numbers—it is the lifeblood of your workforce and your business integrity. Our "Invisible Infrastructure" philosophy extends to your privacy: we protect your information silently and rigorously, ensuring that compliance and security are woven into every transaction.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="rounded-xl bg-background border border-border p-5 flex flex-col gap-3">
                  <Lock className="size-5 text-foreground" />
                  <h4 className="text-sm font-bold text-foreground">Bank-Grade Encryption</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">All sensitive data is encrypted using AES-256 standards both at rest and in transit.</p>
                </div>
                <div className="rounded-xl bg-background border border-border p-5 flex flex-col gap-3">
                  <ShieldOff className="size-5 text-foreground" />
                  <h4 className="text-sm font-bold text-foreground">NDPR Compliant</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">Fully aligned with the Nigeria Data Protection Regulation (NDPR) and international standards.</p>
                </div>
              </div>
            </div>

            {/* Trust Dashboard Dark Card */}
            <div className="lg:col-span-2 rounded-2xl bg-black dark:bg-zinc-950 border border-zinc-800 text-white p-8 flex flex-col justify-between shadow-xl">
              <div className="flex flex-col gap-6">
                <h3 className="text-sm font-bold tracking-wide">Trust Dashboard</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    <span className="text-sm text-zinc-300">No third-party data selling</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    <span className="text-sm text-zinc-300">Instant data portability</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="size-4 text-emerald-400" />
                    <span className="text-sm text-zinc-300">Transparent audit logs</span>
                  </li>
                </ul>
              </div>
              <button className="mt-8 w-full rounded-md bg-white py-3 text-sm font-bold text-black transition-colors hover:bg-zinc-200">
                Download PDF Version
              </button>
            </div>
            
          </div>

          <div className="prose prose-zinc dark:prose-invert max-w-none flex flex-col gap-12">
            
            <section id="data-collection" className="scroll-mt-32">
              <h2 className="text-2xl font-bold tracking-tight mb-4">1. Data Collection</h2>
              <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed">
                <p>
                  We collect information necessary to provide seamless workforce management services. This information falls into three categories:
                </p>
                
                <div className="rounded-xl border border-border bg-background p-6">
                  <h4 className="text-sm font-bold text-foreground mb-2">Employer Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Company legal name, Tax Identification Number (TIN), business address, and corporate bank details for remittance scheduling.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-background p-6">
                  <h4 className="text-sm font-bold text-foreground mb-2">Employee Information</h4>
                  <p className="text-sm text-muted-foreground">
                    Full name, Date of Birth, Bank Verification Number (BVN), National Identification Number (NIN), bank account details, and salary information required for PAYE and pension processing.
                  </p>
                </div>
              </div>
            </section>

            <section id="how-we-use-data" className="scroll-mt-32">
              <h2 className="text-2xl font-bold tracking-tight mb-4">2. How We Use Data</h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>Your data is used exclusively to:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-zinc-400">
                  <li>Process payroll and disburse salaries accurately via our banking partners.</li>
                  <li>Calculate, file, and remit statutory deductions (PAYE, NHF, Pension) to respective state and federal agencies.</li>
                  <li>Provide customer support and respond to technical issues.</li>
                  <li>Comply with Nigerian financial regulations and anti-money laundering (AML) laws.</li>
                </ul>
              </div>
            </section>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}
