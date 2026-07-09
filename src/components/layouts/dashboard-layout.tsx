
import React from "react"

import DashboardNavbar from "../dashboard/navbar"
import Sidebar from "../dashboard/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar />
      <SidebarInset className="min-h-svh bg-muted/20">
        <DashboardNavbar />
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
