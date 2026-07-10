import {
    BanknoteIcon,
    BriefcaseBusinessIcon,
    CreditCardIcon,
    FileBarChart2Icon,
    FileTextIcon,
    LayoutDashboardIcon,
    ReceiptTextIcon,
    SettingsIcon,
    Users2Icon,
    UsersIcon,
} from "lucide-react"

import type {
    LucideIcon
} from "lucide-react"


export const IMAGE_ACCEPT = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/svg+xml": [".svg"],
};

export const CSV_ACCEPT = {
  "text/csv": [".csv"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
};


export type SidebarItemProps = {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string | number
}

export const SidebarLinks: SidebarItemProps[] = [
    {
        label: "Overview",
        href: "/admin/overview",
        icon: LayoutDashboardIcon,
    },
    {
        label: "Employees",
        href: "/admin/employees",
        icon: UsersIcon,
    },
    {
        label: "Payroll",
        href: "/admin/payroll",
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
    {
        label: "Tax",
        href: "#",
        icon: ReceiptTextIcon,
    },
    {
        label: "Leave",
        href: "/admin/leave",
        icon: FileTextIcon,
    },
    {
        label: "Teams",
        href: "/admin/teams",
        icon: Users2Icon,
    },
    {
        label: "Reports",
        href: "#",
        icon: FileBarChart2Icon,
        badge: "3",
    },
    {
        label: "Settings",
        href: "#",
        icon: SettingsIcon,
    },
]