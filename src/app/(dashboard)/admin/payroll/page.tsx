"use client"


import {
  BellIcon,
  Plus,
  TrendingUpIcon,
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
import { DataTable, TableFilter } from "@/components/data-table/data-table"
import { useModal } from "@/hooks/use-modal"
import { useGetPayrolls } from "@/hooks/use-payroll"
import { payrollData } from "@/components/data-table/sample-data/payroll-data"
import { payrollColumns } from "@/components/data-table/columns/payroll-column"
import { PayrollItem } from "@/models/payroll-model"
import { useState } from "react"

const summaryCards = [
  {
    title: "Total Payout (YTD)",
    value: "₦42,850,000.00",
    description: "+12% vs last year",
    accent: "text-green-600",
    icon: TrendingUpIcon,
  },
  {
    title: "Employees Paid",
    value: "124",
    description: "Across all active teams",
    avatars: ["AO", "IE", "KA", "+21"],
  },
  {
    title: "Next Remittance",
    value: "Oct 31",
    description: "4 days left",
    accent: "text-red-500",
    icon: BellIcon,
  },
]

const yearOptions = [
  ...new Set(payrollData.map((x) => x.year)),
]
  .sort((a, b) => Number(b) - Number(a))
  .map((year) => ({
    label: year,
    value: year,
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

function PayrollPage() {
  const { openModal } = useModal()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading, pagination: pageInfo } = useGetPayrolls(
    pagination.pageIndex + 1,
    pagination.pageSize
  )

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Payroll Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track company-wide salary distributions.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]">
          {summaryCards.map((item) => (
            <Card key={item.title} className="shadow-sm">
              <CardHeader>
                <CardAction>
                  {item.icon ? <item.icon className="text-muted-foreground" /> : null}
                </CardAction>
                <CardDescription>{item.title}</CardDescription>
                <CardTitle className="text-4xl font-semibold">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                {item.avatars ? (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {item.avatars.map((avatar) => (
                        <div
                          key={avatar}
                          className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold text-muted-foreground"
                        >
                          {avatar}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className={`text-sm font-medium ${item.accent ?? "text-muted-foreground"}`}>
                    {item.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4">
          <Card className="shadow-sm">
            <CardContent className="px-0">
              <DataTable
                // data={data gotten from api}
                data={payrollData}
                columns={payrollColumns}
                searchColumn="name"
                isLoading={isLoading}
                filters={payrollFilters}
                searchPlaceholder="Search payroll..."
                getRowLink={(payroll) => `/admin/payroll/${payroll.id}/payslip`}
                action={<Button onClick={() => openModal("add-payroll")}>
                  <Plus /> Start New Payroll
                </Button>}
              />
            </CardContent>
          </Card>

        </section>
      </div>
    </div>
  )
}

export default PayrollPage
