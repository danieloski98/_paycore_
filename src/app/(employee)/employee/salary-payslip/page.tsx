"use client";

import React, { useState } from "react";
import { Landmark, FileText, LandmarkIcon, Wallet, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAtom } from "jotai";
import { employeeAtom } from "@/states/auth-user-state";
import { useGetEmployeePayslips } from "@/hooks/use-payslip";
import { payslipColumns } from "@/components/data-table/columns/payslip-colums";
import { DataTable } from "@/components/data-table/data-table";
import { Spinner } from "@/components/ui/spinner";
import { EmptyView } from "@/components/customs/empty-view";

const StatCard = ({
  title,
  value,
  icon,
  iconWrapperClass,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  iconWrapperClass?: string;
}) => (
  <Card className="[--card-spacing:--spacing(6)]">
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1.5">{value}</p>
        </div>
        {icon && (
          <div className={cn("p-2.5 rounded-lg shrink-0", iconWrapperClass || "bg-muted text-muted-foreground")}>
            {icon}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function EmployeePayslips() {
  const [user] = useAtom(employeeAtom);
  const [page, setPage] = useState(1);

  const { payslips, pagination, isLoading, error } = useGetEmployeePayslips(user?.id!, page, 10);

  const total = pagination?.total || 0;
  const totalPages = pagination?.totalPages || 0;
  const limit = pagination?.limit || 10;
  const currentPage = pagination?.page || page;

  const startIndex = total > 0 ? (currentPage - 1) * limit + 1 : 0;
  const endIndex = Math.min(currentPage * limit, total);

  // Stats calculation
  const totalPayslips = total;
  const paidPayslipsCount = payslips?.filter((p: any) => p.status === "PAID")?.length || 0;
  const latestNetPay = payslips?.[0]?.netSalary
    ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(payslips[0].netSalary))
    : "₦0.00";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Welcome & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Total Payslips" 
          value={String(totalPayslips)} 
          icon={<FileText className="h-5 w-5" />} 
          iconWrapperClass="bg-blue-100 text-blue-700 border border-blue-200"
        />
        <StatCard 
          title="Paid Payslips" 
          value={String(paidPayslipsCount)} 
          icon={<Landmark className="h-5 w-5" />} 
          iconWrapperClass="bg-green-100 text-green-700 border border-green-200"
        />
        <StatCard 
          title="Latest Net Pay" 
          value={latestNetPay} 
          icon={<Wallet className="h-5 w-5" />} 
          iconWrapperClass="bg-green-100 text-green-700 border border-green-200"
        />
      </div>

      <Card>
        <CardHeader className="">
          <div>
            <CardTitle>Recent Payslips</CardTitle>
            <CardDescription>Manage and view your payslip history</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : !payslips || payslips.length === 0 ? (
            <div className="py-12">
              <EmptyView
                title="No Payslips Found"
                description="Your payroll history will show up here once processed."
                icon={<LandmarkIcon />}
              />
            </div>
          ) : (
            <>
              <DataTable columns={payslipColumns} data={payslips} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
