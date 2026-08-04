"use client"


import {
  Plus,
  TrendingUpIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

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
import { useGetPayrolls, useStartPayrollProcessing } from "@/hooks/use-payroll"
import { payrollColumns } from "@/components/data-table/columns/payroll-column"
import { PayrollItem, Status, payrollStatusConfig } from "@/models/payroll-model"
import { useState } from "react"
import { FilterOption } from "@/components/data-table/data-table-filter"
import { toast } from "sonner"
import { useAuthUser } from "@/hooks/use-auth-user"
import { useGetActivePayslipsAnalytics } from "@/hooks/use-analytics"
import { cn, getPayrollStatusStyle } from "@/lib/utils"

function PayrollPage() {
  const { openModal } = useModal()
  const user = useAuthUser();
  const companyId = user?.companyId || "";
  const { analytics: activePayslips, isLoading: isActivePayslipsLoading } = useGetActivePayslipsAnalytics(companyId);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data: payrollData = [], isLoading } = useGetPayrolls(
    pagination.pageIndex + 1,
    pagination.pageSize
  )
  const payrolls = (payrollData ?? []) as PayrollItem[];

  const summaryCards = [
    {
      title: "Active Payroll",
      value: activePayslips?.activePayroll?.name || "No active payroll",
      description: activePayslips?.activePayroll 
        ? `Status: ${payrollStatusConfig[activePayslips.activePayroll.status as Status]?.label || activePayslips.activePayroll.status}` 
        : "Next scheduled disbursement",
      accent: activePayslips?.activePayroll?.status === "PROCESSING" ? "text-blue-600" : "text-muted-foreground",
      icon: TrendingUpIcon,
      status: activePayslips?.activePayroll?.status as Status,
    },
    {
      title: "Processed Payslips",
      value: String(activePayslips?.processedPayslipsCount ?? 0),
      description: "Successfully processed",
      accent: "text-green-600",
      icon: CheckCircle2,
    },
    {
      title: "Pending / Failed Payslips",
      value: `${activePayslips?.pendingPayslipsCount ?? 0} / ${activePayslips?.failedPayslipsCount ?? 0}`,
      description: `Pending: ${activePayslips?.pendingPayslipsCount ?? 0} | Failed: ${activePayslips?.failedPayslipsCount ?? 0}`,
      accent: (activePayslips?.failedPayslipsCount ?? 0) > 0 ? "text-red-500" : "text-orange-500",
      icon: AlertCircle,
    },
  ]

  const yearOptions: FilterOption[] = [
    ...new Set(payrolls.map((x) => x.year)),
  ]
    // @ts-ignore
    .sort((a, b) => b - a)
    .map((year) => ({
      label: year?.toString(),
      value: year?.toString(),
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
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        <section className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">Payroll Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track company-wide salary distributions.
          </p>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {summaryCards.map((item) => {
            const styles = item.status ? getPayrollStatusStyle(item.status) : null;
            let iconWrapperClass = "bg-muted text-muted-foreground border-transparent";
            if (item.title === "Active Payroll" && styles) {
              iconWrapperClass = cn(styles.bgColor, styles.textColor, "border");
            } else if (item.title === "Processed Payslips") {
              iconWrapperClass = "bg-green-100 text-green-700 border border-green-200";
            } else if (item.title === "Pending / Failed Payslips") {
              const hasFailed = (activePayslips?.failedPayslipsCount ?? 0) > 0;
              iconWrapperClass = hasFailed 
                ? "bg-red-100 text-red-700 border border-red-200" 
                : "bg-yellow-100 text-yellow-700 border border-yellow-200";
            }

            return (
              <Card key={item.title} className="shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardDescription className="text-xs uppercase tracking-[0.18em]">{item.title}</CardDescription>
                    <CardTitle className="text-4xl font-semibold">
                      {isActivePayslipsLoading ? (
                        <span className="h-10 w-24 rounded bg-muted/40 animate-pulse inline-block" />
                      ) : (
                        item.value
                      )}
                    </CardTitle>
                  </div>
                  {item.icon && (
                    <div className={cn("h-10 w-10 rounded flex items-center justify-center shrink-0", iconWrapperClass)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className={cn("text-sm font-medium", item.accent ?? "text-muted-foreground")}>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
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
                action={<Button size="lg" onClick={() => openModal("add-payroll")}>
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
