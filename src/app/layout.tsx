import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip"
import { ModalProvider } from "@/components/modal-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "PayStream | Payroll & Compliance for Nigerian Businesses",
  description: "Simplify complex tax laws, automate NHF/pension contributions, and pay your team in minutes. Built specifically for the Nigerian regulatory landscape.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Provider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
          <ModalProvider />
        </Provider>
      </body>
    </html>
  );
}
