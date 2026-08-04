"use client";

import React from "react";
import { useEarningsDeductions } from "@/hooks/use-earnings-deductions";
import { useModal } from "@/hooks/use-modal";
import {
  useGetPayrollEarnings,
  useGetPayrollDeductions,
  useGetEmployeeEarningsInPayroll,
  useGetEmployeeDeductionsInPayroll,
  useDeleteEmployeeEarning,
  useDeleteEmployeeDeduction,
  useDeletePayrollEarningForPayroll,
  useDeletePayrollDeductionForPayroll,
} from "@/hooks/use-earnings-deductions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function MainView() {
  const { switchTo } = useEarningsDeductions();
  const { data } = useModal();

  const modalData = (data || {}) as {
    type?: "employee" | "payroll";
    payrollId?: string;
    employeeId?: string;
  };

  const { mutate: deleteEarning } = useDeleteEmployeeEarning();
  const { mutate: deleteDeduction } = useDeleteEmployeeDeduction();
  const { mutate: deletePayrollEarning } = useDeletePayrollEarningForPayroll();
  const { mutate: deletePayrollDeduction } = useDeletePayrollDeductionForPayroll();

  const routeEmployeeId = modalData?.employeeId;
  const resolvedPayrollId = modalData?.payrollId;
  const isEmployeeContext = modalData?.type === "employee";

  const {
    data: earningsData,
    isLoading: isEarningLoading,
    error: earningError,
  } = isEmployeeContext
      ? useGetEmployeeEarningsInPayroll(routeEmployeeId!)
      : useGetPayrollEarnings(resolvedPayrollId!);

  const {
    data: deductionsData,
    isLoading: isDeductionLoading,
    error: deductionError,
  } = isEmployeeContext
      ? useGetEmployeeDeductionsInPayroll(routeEmployeeId!)
      : useGetPayrollDeductions(resolvedPayrollId!);

  // Safe array access from response shape
  const earnings = Array.isArray((earningsData as any)?.data?.data?.data)
    ? (earningsData as any).data.data.data
    : [];
  const deductions = Array.isArray((deductionsData as any)?.data?.data?.data)
    ? (deductionsData as any).data.data.data
    : [];

  // Sort helper
  const sortedEarnings = [...earnings].sort((a: any, b: any) =>
    (a?.type || "").localeCompare(b?.type || "")
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(val || 0);
  };

  return (
    <div className="space-y-6">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-xl font-bold">Earnings & Deductions</DialogTitle>
        <DialogDescription>
          {isEmployeeContext
            ? "Manage custom earnings and deductions for this employee in this payroll."
            : "Manage payroll-wide earnings and deductions."}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
        {/* Earnings Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">Earnings</h3>
          <div className="rounded-lg border bg-muted/40 p-4 space-y-4">
            <div className="rounded-md border bg-background overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-[80px] text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isEarningLoading && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                        Loading earnings...
                      </TableCell>
                    </TableRow>
                  )}
                  {earningError && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-destructive">
                        Failed to load earnings
                      </TableCell>
                    </TableRow>
                  )}
                  {!isEarningLoading && !earningError && sortedEarnings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No earnings found
                      </TableCell>
                    </TableRow>
                  )}
                  {!isEarningLoading &&
                    !earningError &&
                    sortedEarnings.map((item: any, idx: number) => (
                      <TableRow key={item.id || idx}>
                        <TableCell className="font-medium">{item?.type}</TableCell>
                        <TableCell>{formatCurrency(item?.amount)}</TableCell>
                        <TableCell className="text-muted-foreground max-w-[200px] truncate">
                          {item?.description || item?.notes || "—"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              isEmployeeContext
                                ? deleteEarning({
                                    employeeId: routeEmployeeId!,
                                    earningId: item.id,
                                  })
                                : deletePayrollEarning({
                                    payrollId: resolvedPayrollId!,
                                    earningId: item.id,
                                  })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <Button
              onClick={() => switchTo("earnings")}
              size="sm"
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Earning
            </Button>
          </div>
        </div>

        {/* Deductions Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground">Deductions</h3>
          <div className="rounded-lg border bg-muted/40 p-4 space-y-4">
            <div className="rounded-md border bg-background overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="w-[80px] text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isDeductionLoading && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                        Loading deductions...
                      </TableCell>
                    </TableRow>
                  )}
                  {deductionError && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-destructive">
                        Failed to load deductions
                      </TableCell>
                    </TableRow>
                  )}
                  {!isDeductionLoading && !deductionError && deductions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        No deductions found
                      </TableCell>
                    </TableRow>
                  )}
                  {!isDeductionLoading &&
                    !deductionError &&
                    deductions.map((item: any, idx: number) => (
                      <TableRow key={item.id || idx}>
                        <TableCell className="font-medium">{item?.type}</TableCell>
                        <TableCell>{formatCurrency(item?.amount)}</TableCell>
                        <TableCell className="text-muted-foreground max-w-[200px] truncate">
                          {item?.description || item?.notes || "—"}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() =>
                              isEmployeeContext
                                ? deleteDeduction({
                                    employeeId: routeEmployeeId!,
                                    deductionId: item.id,
                                  })
                                : deletePayrollDeduction({
                                    payrollId: resolvedPayrollId!,
                                    deductionId: item.id,
                                  })
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <Button
              onClick={() => switchTo("deductions")}
              size="sm"
              className="gap-1.5"
            >
              <Plus className="h-4 w-4" />
              Add Deductions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
