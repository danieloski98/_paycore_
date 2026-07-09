import React from 'react'

export const metadata = {
  title: 'Terms of Use | Paycore Nigeria',
  description: 'Terms of Use for Paycore Nigeria workforce management platform.',
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Left Sidebar Menu */}
        <div className="md:col-span-3 hidden md:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">On This Page</h3>
              <nav className="flex flex-col text-sm border-l border-border">
                <a href="#introduction" className="pl-4 py-2 border-l-2 border-black font-semibold text-foreground -ml-px transition-colors">Introduction</a>
                <a href="#services" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">Services</a>
                <a href="#user-obligations" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">User Obligations</a>
                <a href="#liability" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">Liability</a>
                <a href="#termination" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">Termination</a>
                <a href="#contact-us" className="pl-4 py-2 border-l-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border -ml-px transition-colors">Contact Us</a>
              </nav>
            </div>

            <div className="rounded-xl border border-border bg-zinc-50/50 dark:bg-zinc-900/10 p-5 flex flex-col gap-3">
              <h4 className="font-bold text-sm text-foreground">Need Help?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If you have questions about these terms, our legal team is available.
              </p>
              <a href="mailto:legal@paystream.ng" className="mt-2 inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900 w-full">
                Contact Legal
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9 max-w-3xl">
          <div className="flex flex-col gap-4 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Use</h1>
            <p className="text-muted-foreground text-lg">Last Updated: October 24, 2024</p>
          </div>
          
          <hr className="border-border mb-12" />

          <div className="prose prose-zinc dark:prose-invert max-w-none flex flex-col gap-12">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-baseline gap-2">
                <span className="text-muted-foreground font-normal">01.</span> Introduction
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Paycore Nigeria. By accessing or using our platform, services, and applications (collectively, the "Service"), you agree to be bound by these Terms of Use ("Terms"). Please read them carefully.
                </p>
                <p>
                  Paycore Nigeria is a workforce management and payroll solution provider incorporated under the laws of the Federal Republic of Nigeria. These terms constitute a legally binding agreement between you, whether personally or on behalf of an entity ("you") and Paycore Nigeria ("we," "us," or "our").
                </p>
                <p>
                  If you do not agree with all of these terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                </p>
              </div>
            </section>

            <section id="services" className="scroll-mt-32">
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-baseline gap-2">
                <span className="text-muted-foreground font-normal">02.</span> Services
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>Our services include, but are not limited to:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-zinc-400">
                  <li>Automated payroll processing for Nigerian businesses.</li>
                  <li>Tax remittance and compliance (PAYE, NHF, NSITF).</li>
                  <li>Employee self-service portals.</li>
                  <li>Statutory reporting and analytics.</li>
                </ul>
                <p>
                  We reserve the right to withdraw or amend our service, and any service or material we provide on the Platform, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
                </p>
              </div>
            </section>

            <section id="user-obligations" className="scroll-mt-32">
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-baseline gap-2">
                <span className="text-muted-foreground font-normal">03.</span> User Obligations
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that all persons who access the Service through your internet connection are aware of these Terms and comply with them.
                </p>
                <p>
                  You agree not to use the Service:
                </p>
                <ul className="list-disc pl-6 space-y-2 marker:text-zinc-400">
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                  <li>To impersonate or attempt to impersonate Paycore Nigeria, a Paycore employee, another user, or any other person or entity.</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Paycore Nigeria or users of the Service or expose them to liability.</li>
                </ul>
              </div>
            </section>
            
            <section id="liability" className="scroll-mt-32">
              <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-baseline gap-2">
                <span className="text-muted-foreground font-normal">04.</span> Liability
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  In no event will Paycore Nigeria, its affiliates, or their licensors, service providers, employees, agents, officers, or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the Service, including any direct, indirect, special, incidental, consequential, or punitive damages.
                </p>
              </div>
            </section>

          </div>
        </div>
        
      </div>
    </div>
  )
}
