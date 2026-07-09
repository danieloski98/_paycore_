import React from "react"
import {
  BadgeCheckIcon,
  BriefcaseBusinessIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserRoundPlusIcon,
  Users2Icon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Members",
    value: "12",
    description: "3 HR, 2 Finance, 7 Custom",
    icon: Users2Icon,
    badge: "Active",
  },
  {
    title: "Pending Invites",
    value: "04",
    description: "Expires within 48 hours",
    icon: UserRoundPlusIcon,
  },
  {
    title: "Security Status",
    value: "Compliant",
    description: "2FA enabled for all admins",
    icon: ShieldCheckIcon,
  },
]

const members = [
  {
    initials: "AO",
    name: "Adesola Oni",
    email: "adesola.oni@techcorp.ng",
    role: "HR Manager",
    status: "Active",
    action: "menu",
  },
  {
    initials: "IE",
    name: "Ifeanyi Eze",
    email: "i.eze@techcorp.ng",
    role: "Finance Lead",
    status: "Active",
    action: "menu",
  },
  {
    initials: "⋯",
    name: "Waiting for response...",
    email: "tunde.b@techcorp.ng",
    role: "Payroll Specialist",
    status: "Invited",
    action: "resend",
  },
  {
    initials: "KA",
    name: "Kemi Adebayo",
    email: "kemi.ade@techcorp.ng",
    role: "Compliance Officer",
    status: "Active",
    action: "menu",
  },
]

const roles = [
  {
    name: "HR Manager",
    description: "Manage employees, leave, and teams.",
  },
  {
    name: "Finance Lead",
    description: "Oversee payroll, wallets, and approvals.",
  },
  {
    name: "Compliance Officer",
    description: "Handle tax filings, policy checks, and audits.",
  },
]

function TeamsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">Teams &amp; Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Organize internal access, assign responsibilities, and manage invites.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader>
              <CardAction>
                {stat.badge ? <Badge variant="secondary">{stat.badge}</Badge> : <stat.icon />}
              </CardAction>
              <CardDescription className="text-xs uppercase tracking-[0.18em]">
                {stat.title}
              </CardDescription>
              <CardTitle className="text-4xl font-semibold">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {!stat.badge ? (
                  <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <stat.icon />
                  </span>
                ) : null}
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <SearchIcon
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input placeholder="Search by name or email..." className="pl-9" />
          </div>

          <Button>
            <UserRoundPlusIcon data-icon="inline-start" />
            Invite Team Member
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">Team Member</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.email}>
                    <TableCell className="px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground">
                          {member.initials}
                        </div>
                        <span className="font-semibold">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full">
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full border-0",
                          member.status === "Active"
                            ? "bg-red-50 text-red-700"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {member.status === "Active" ? "• Active" : "• Invited"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      {member.action === "resend" ? (
                        <Button variant="link" className="h-auto p-0 text-foreground">
                          Resend
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${member.name}`}>
                          <MoreVerticalIcon />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

          <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Showing 4 of 12 members</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Standard Roles</CardTitle>
            <CardDescription>
              Reusable permission sets for your most common admin functions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {roles.map((role) => (
              <div
                key={role.name}
                className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{role.name}</p>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <ChevronRightIcon className="text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-dashed shadow-sm">
          <CardHeader className="items-center text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <BriefcaseBusinessIcon />
            </div>
            <CardTitle>Need a Custom Role?</CardTitle>
            <CardDescription>
              Define granular permissions for operations, finance, or compliance teams.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-xl bg-muted/50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BadgeCheckIcon className="text-muted-foreground" />
                Suggested Permissions
              </div>
              <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <p>Approve payroll disbursements</p>
                <p>Manage tax submissions</p>
                <p>View wallet funding records</p>
              </div>
            </div>

            <Button className="w-full">
              <PlusIcon data-icon="inline-start" />
              Create Custom Role
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default TeamsPage
