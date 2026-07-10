"use client"
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
import { cn } from "@/lib/utils"
import { PayrollTrendChart } from "@/components/charts"
import { useModal } from "@/hooks/useModal"
import { DataTable } from "@/components/data-table/data-table"
import { employeeColumns } from "@/components/data-table/columns/employee-columns"
import { Employee, employees } from "@/components/data-table/sample-data/employee-data"
import { payrollData } from "@/components/data-table/sample-data/payroll-data"
import { payrollColumns } from "@/components/data-table/columns/payroll-column"

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
  const { openModal } = useModal();


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
          <Button variant="outline" onClick={() => openModal("new-employee")}>
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

      <section className="grid gap-4">
        <div className="grid gap-4">
          <PayrollTrendChart />

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Payroll Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <DataTable
                data={payrollData}
                columns={payrollColumns}
                searchColumn="employee"
                searchPlaceholder="Search payroll..."
              />
            </CardContent>
          </Card>
        </div>

      </section>
    </div>
  )
}

export default OverviewPage
