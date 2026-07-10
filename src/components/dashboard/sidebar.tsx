"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {

  ShieldCheckIcon,

} from "lucide-react"

import type { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useSetAtom } from "jotai"
import { SidebarLinks } from "@/lib/constants"

const primaryNavigation = [
  {
    label: "Overview",
    href: "/admin/overview",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Employees",
    href: "#",
    icon: UsersIcon,
  },
  {
    label: "Payroll",
    href: "#",
    icon: CreditCardIcon,
  },
  {
    label: "Payments",
    href: "#",
    icon: BriefcaseBusinessIcon,
  },
  {
    label: "Wallet",
    href: "/admin/wallet",
    icon: BanknoteIcon,
  },
  // {
  //   label: "Tax",
  //   href: "#",
  //   icon: ReceiptTextIcon,
  // },
  {
    label: "Leave",
    href: "#",
    icon: FileTextIcon,
  },
  {
    label: "Teams",
    href: "/admin/teams",
    icon: Users2Icon,
  },
  // {
  //   label: "Reports",
  //   href: "#",
  //   icon: FileBarChart2Icon,
  //   badge: "3",
  // },
  {
    label: "Settings",
    href: "#",
    icon: SettingsIcon,
  },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <AppSidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="h-auto">
              <Link href="/admin/overview">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheckIcon />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate text-3xl font-semibold">Paycore</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarLinks.map((item) => {
                const isActive =
                  item.href !== "#" &&
                  (pathname === item.href || pathname.startsWith(`${item.href}/`))

                return (
                  <SidebarMenuItem key={item.label} className="py-1">
                    <SidebarMenuButton asChild tooltip={item.label} className={cn(isActive ? "bg-black hover:bg-black/90 text-white hover:text-white" : "bg-inherit", "")}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </AppSidebar>
  )
}

export default Sidebar
