"use client"
import Link from "next/link"
import {
  AlertCircleIcon,
  CalendarClockIcon,
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

import { PayrollTrendChart } from "@/components/charts/payroll-charts"
import { useModal } from "@/hooks/use-modal"
import { DataTable, TableFilter } from "@/components/data-table/data-table"
import { payrollColumns } from "@/components/data-table/columns/payroll-column"
import { useGetPayrolls } from "@/hooks/use-payroll"
import { PayrollItem } from "@/models/payroll-model"
import { FilterOption } from "@/components/data-table/data-table-filter"

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


function OverviewPage() {
  const { openModal } = useModal();

  const { data: payrollData = [], isLoading } = useGetPayrolls()

  const payrolls = (payrollData ?? []) as PayrollItem[];

  const yearOptions: FilterOption[] = [
    ...new Set(
      payrolls
        .map((p) => p.year)
        .filter((year): year is number => year != null)
    ),
  ]
    .sort((a, b) => b - a)
    .map((year) => ({
      label: String(year),
      value: String(year),
    }));


  const payrollFilters: TableFilter<PayrollItem>[] = [
    {
      label: "Year",
      column: "year",
      options: yearOptions,
    },
    {
      label: "Month",
      column: "month",
      options: [
        { label: "January", value: "0" },
        { label: "February", value: "1" },
        { label: "March", value: "2" },
        { label: "April", value: "3" },
        { label: "May", value: "4" },
        { label: "June", value: "5" },
        { label: "July", value: "6" },
        { label: "August", value: "7" },
        { label: "September", value: "8" },
        { label: "October", value: "9" },
        { label: "November", value: "10" },
        { label: "December", value: "11" },
      ],
    },
    {
      label: "Status",
      column: "status",
      options: [
        { label: "PENDING", value: "PENDING" },
        { label: "PROCESSING", value: "PROCESSING" },
        { label: "SUCCESSFULL", value: "SUCCESSFULL" },
      ],
    },
  ];

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
          {/* <Button>
            <HandCoinsIcon data-icon="inline-start" />
            Run Payroll
          </Button> */}
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
          <PayrollTrendChart payrolls={payrollData} />

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Recent Payroll Activity</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <DataTable
                data={payrollData}
                columns={payrollColumns}
                isLoading={isLoading}
                searchColumn="name"
                searchPlaceholder="Search payroll..."
                filters={payrollFilters}
              />
            </CardContent>
          </Card>
        </div>

      </section>
    </div>
  )
}

export default OverviewPage
