import React from "react"
import Link from "next/link"
import {
  AlertCircleIcon,
  ArrowUpRightIcon,
  CalendarClockIcon,
  HandCoinsIcon,
  LandmarkIcon,
  UserRoundCheckIcon,
  UsersIcon,
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
    title: "Wallet Balance",
    value: "₦12.5M",
    hint: "+₦2.1M Today",
    subtext: "Available company balance",
    icon: LandmarkIcon,
    tone: "outline" as const,
  },
  {
    title: "Total Employees",
    value: "124",
    hint: "Due in 3 days",
    subtext: "Across active departments",
    icon: UsersIcon,
    tone: "secondary" as const,
  },
  {
    title: "Upcoming Payroll",
    value: "₦4.2M",
    // hint: "Due in 3 days",
    subtext: "Next scheduled disbursement",
    icon: CalendarClockIcon,
    tone: "destructive" as const,
  },
  {
    title: "Pending Leave",
    value: "5",
    hint: "Needs review",
    subtext: "Requests awaiting approval",
    icon: AlertCircleIcon,
    tone: "outline" as const,
  },
]

const payrollTrend = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 44 },
  { month: "Apr", value: 69 },
  { month: "May", value: 64 },
  { month: "Jun", value: 88, active: true },
  { month: "Jul", value: 29 },
]

const activities = [
  { batchId: "#PRL-2405", date: "May 28, 2024", amount: "₦4,120,500", employees: 124 },
  { batchId: "#PRL-2404", date: "Apr 27, 2024", amount: "₦3,980,200", employees: 122 },
  { batchId: "#PRL-2403", date: "Mar 28, 2024", amount: "₦3,850,000", employees: 120 },
  { batchId: "#PRL-2402", date: "Feb 27, 2024", amount: "₦3,850,000", employees: 120 },
  { batchId: "#PRL-2401", date: "Jan 29, 2024", amount: "₦3,720,000", employees: 118 },
]

const complianceChecks = [
  { name: "PAYE Remittance", status: "Current" },
  { name: "NHF Schedule", status: "Current" },
  { name: "Pension Fund", status: "Processing" },
]

const quickResources = [
  "User Manual",
  "Nigeria Labor Law Guide",
  "Holiday Calendar 2024",
]

function OverviewPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">
            Manage your workforce and payroll logistics at a glance.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <UserRoundCheckIcon data-icon="inline-start" />
            Add Employee
          </Button>
          <Button>
            <HandCoinsIcon data-icon="inline-start" />
            Run Payroll
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm p-4">
            <CardHeader>
              <CardDescription className="text-xs uppercase tracking-[0.18em]">
                {stat.title}
              </CardDescription>
              {stat.hint && (

                <CardAction>
                  <Badge variant={stat.tone}>{stat.hint}</Badge>
                </CardAction>
              )}
              <CardTitle className="flex items-center gap-2 text-2xl">
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <stat.icon />
                </span>
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Monthly disbursement pattern</CardDescription>
              <CardAction className="flex gap-2">
                <Button variant="outline" size="xs">
                  Monthly
                </Button>
                <Button variant="ghost" size="xs">
                  Yearly
                </Button>
              </CardAction>
              <CardTitle>Payroll Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid min-h-72 grid-cols-7 items-end gap-3 rounded-xl bg-muted/40 p-4">
                {payrollTrend.map((item) => (
                  <div key={item.month} className="flex h-full flex-col justify-end gap-3">
                    <div className="flex flex-1 items-end">
                      <div
                        className={cn(
                          "w-full rounded-md",
                          item.active ? "bg-primary" : "bg-primary/15"
                        )}
                        style={{ height: `${item.value}%` }}
                      />
                    </div>
                    <span className="text-center text-xs font-medium text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Last five payroll batches</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="#">
                    View All
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Link>
                </Button>
              </CardAction>
              <CardTitle>Recent Payroll Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4">Batch ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead className="pr-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((activity) => (
                    <TableRow key={activity.batchId}>
                      <TableCell className="px-4 font-medium">{activity.batchId}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell className="font-medium">{activity.amount}</TableCell>
                      <TableCell>{activity.employees}</TableCell>
                      <TableCell className="pr-4">
                        <Badge variant="secondary">Success</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Regulatory filing summary</CardDescription>
              <CardTitle>Compliance Check</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {complianceChecks.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Latest filing status from PayStream
                    </p>
                  </div>
                  <Badge variant={item.status === "Current" ? "secondary" : "outline"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Download Tax Forms
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/10 bg-primary text-primary-foreground shadow-sm">
            <CardHeader>
              <CardDescription className="text-primary-foreground/70">
                Let PayStream handle your tax filings directly with LIRS. No more manual
                spreadsheets.
              </CardDescription>
              <CardTitle>Automate PAYE</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="secondary">Enable Automation</Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardDescription>Helpful references for administrators</CardDescription>
              <CardTitle>Quick Resources</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {quickResources.map((resource) => (
                <Link
                  key={resource}
                  href="#"
                  className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <span>{resource}</span>
                  <ArrowUpRightIcon size={16} className="text-muted-foreground" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default OverviewPage
