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
import { Skeleton } from "@/components/ui/skeleton"

import { PayrollTrendChart } from "@/components/charts/payroll-charts"
import { useModal } from "@/hooks/use-modal"
import { DataTable, TableFilter } from "@/components/data-table/data-table"
import { payrollColumns } from "@/components/data-table/columns/payroll-column"
import { useGetPayrolls } from "@/hooks/use-payroll"
import { PayrollItem, Status, payrollStatusConfig } from "@/models/payroll-model"
import { FilterOption } from "@/components/data-table/data-table-filter"

import { useAuthUser } from "@/hooks/use-auth-user"
import { useGetCompanyAnalytics } from "@/hooks/use-analytics"
import { useGetBalance } from "@/hooks/use-wallet"
import { cn, getPayrollStatusStyle } from "@/lib/utils"

function OverviewPage() {
  const { openModal } = useModal();
  const user = useAuthUser();
  const companyId = user?.companyId || "";

  const { analytics, isLoading: isAnalyticsLoading } = useGetCompanyAnalytics(companyId);
  const { data: balanceData, isLoading: isBalanceLoading } = useGetBalance(companyId);
  const { data: payrollData = [], isLoading } = useGetPayrolls()


  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(val || 0);
  };

  const stats = [
    {
      title: "Wallet Balance",
      value: formatCurrency(Number(balanceData?.data?.data?.balance || 0)),
      hint: "",
      subtext: "Available company balance",
      icon: LandmarkIcon,
      tone: "outline" as const,
    },
    {
      title: "Total Employees",
      value: String(analytics?.totalEmployees ?? 0),
      hint: "Active",
      subtext: "Across active departments",
      icon: UsersIcon,
      tone: "secondary" as const,
    },
    {
      title: "Active Payroll",
      value: analytics?.activePayroll?.name || "No active payroll",
      hint: analytics?.activePayroll ? (payrollStatusConfig[analytics.activePayroll.status as Status]?.label || analytics.activePayroll.status) : "None",
      subtext: "Next scheduled disbursement",
      icon: CalendarClockIcon,
      tone: "destructive" as const,
      status: analytics?.activePayroll?.status as Status,
    },
    {
      title: "Pending Leave",
      value: String(analytics?.pendingLeaveRequests ?? 0),
      subtext: "Requests awaiting approval",
      icon: AlertCircleIcon,
      tone: "warning" as const,
    },
  ];

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
          <Button size="lg" onClick={() => openModal("new-employee")}>
            <UserRoundCheckIcon data-icon="inline-start" />
            Add Employee
          </Button>
        </div>
      </section>

      {isAnalyticsLoading || isBalanceLoading ? (
        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="shadow-sm p-4">
              <CardHeader className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <div className="flex items-center gap-2">
                  <Skeleton className="size-9 rounded-lg" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {stats.map((stat) => {
            const styles = stat.status ? getPayrollStatusStyle(stat.status) : null;
            console.log(stat)
            let iconWrapperClass = "bg-muted text-muted-foreground border-transparent";
            if (stat.title === "Total Employees") {
              iconWrapperClass = "bg-blue-100 text-blue-700 border border-blue-200";
            } else if (stat.title === "Active Payroll" && styles) {
              iconWrapperClass = cn(styles.bgColor, styles.textColor, "border");
            } else if (stat.title === "Pending Leave Requests" || stat.tone === "warning") {
              iconWrapperClass = "bg-yellow-100 text-yellow-700 border border-yellow-200";
            } else if (stat.title === "Wallet Balance") {
              iconWrapperClass = "bg-green-100 text-green-700 border border-green-200";
            }

            return (
              <Card key={stat.title} className="shadow-sm p-4">
                <CardHeader>
                  <CardDescription className="text-xs uppercase tracking-[0.18em]">
                    {stat.title}
                  </CardDescription>
                  {stat.hint && (
                    <CardAction>
                      <Badge 
                        variant={stat.status ? undefined : stat.tone} 
                        className={stat.status ? cn(styles?.textColor, styles?.bgColor) : ""}
                      >
                        {(stat.hint)?.toUpperCase()}
                      </Badge>
                    </CardAction>
                  )}
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <span className={cn("flex size-9 items-center justify-center rounded-lg shrink-0", iconWrapperClass)}>
                      <stat.icon className="size-5" />
                    </span>
                    {stat.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{stat.subtext}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>
      )}

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
