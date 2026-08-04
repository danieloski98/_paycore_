"use client";

import React, { useState } from "react";
import { AppSheet } from "@/components/shared/app-sheet";
import { Row } from "@/components/shared/row";
import { useModal } from "@/hooks/use-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Landmark, Calendar, DollarSign, Download } from "lucide-react";
import { generatePayslipPDF } from "@/lib/pdfGenerator";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { employeeAtom } from "@/states/auth-user-state";
import { useEmployeeBanks } from "@/hooks/use-bank";

export default function EmployeePayslipModal() {
  const { isOpen, closeModal, data } = useModal();
  const [isGenerating, setIsGenerating] = useState(false);
  const [employee] = useAtom(employeeAtom);
  const modalOpen = isOpen("employee-payslip-details");
  const { banks } = useEmployeeBanks(modalOpen);

  const payslip = data as any;

  if (!payslip) return null;

  // Find matching bank by ID
  const matchedBank = banks?.find((b: any) => b.id === payslip.bankId);

  // Construct complete Payslip structure to match pdfGenerator specs
  const fullPayslip = {
    ...payslip,
    Employee: {
      firstName: employee?.firstName || payslip.Employee?.firstName || "",
      lastName: employee?.lastName || payslip.Employee?.lastName || "",
      position: employee?.position || payslip.Employee?.position || "N/A",
      email: employee?.email || payslip.Employee?.email || "",
    },
    Bank: {
      bankName: matchedBank?.bankName || payslip.Bank?.bankName || payslip.bankName || "N/A",
      accountName: matchedBank?.accountName || payslip.Bank?.accountName || payslip.accountName || "N/A",
      accountNumber: matchedBank?.accountNumber || payslip.Bank?.accountNumber || payslip.accountNumber || "N/A",
    }
  };

  // Format currency helper
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(val || 0);
  };

  // Format date helper
  const formatDate = (val: string) => {
    if (!val) return "—";
    return new Date(val).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSaveAsPDF = async () => {
    try {
      setIsGenerating(true);
      await generatePayslipPDF(fullPayslip);
      toast.success("Payslip PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating payslip PDF:", error);
      toast.error("Failed to generate payslip PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const statusColors: Record<string, string> = {
    PAID: "bg-green-100 text-green-700 hover:bg-green-100 border-0",
    PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-0",
    PROCESSING: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-0",
    FAILED: "bg-red-100 text-red-700 hover:bg-red-100 border-0",
  };

  return (
    <AppSheet
      open={isOpen("employee-payslip-details")}
      onOpenChange={(open) => !open && closeModal()}
      title="Payslip Details"
      description="Detailed breakdown of your processed salary payment."
      size="xl"
      side="right"
    >
      <div className="px-4 pb-10 space-y-6 overflow-y-auto max-h-[85vh] flex flex-col justify-between h-full">
        <div className="space-y-6">
          {/* Status & Net Salary Card */}
          <div className="rounded-xl border bg-primary/5 p-6 flex flex-col items-center text-center space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Amount Paid</p>
            <p className="text-3xl font-extrabold text-primary">{formatCurrency(fullPayslip.netSalary)}</p>
            <Badge className={statusColors[fullPayslip.status] || "bg-gray-100 text-gray-700 border-0"}>
              {fullPayslip.status}
            </Badge>
          </div>

          {/* General Info Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Payroll Period
            </h3>
            <div className="rounded-xl border bg-background divide-y">
              <Row label="Payroll Cycle" value={fullPayslip.Payroll?.name || "Salary Payroll"} />
              <Row label="Payment Date" value={formatDate(fullPayslip.paymentDate || fullPayslip.createdAt)} />
              <Row label="Company Name" value={fullPayslip.Company?.name || "—"} />
            </div>
          </div>

          {/* Bank Details Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5" />
              Destination Account
            </h3>
            <div className="rounded-xl border bg-background divide-y">
              <Row label="Bank Name" value={fullPayslip.Bank.bankName} />
              <Row label="Account Name" value={fullPayslip.Bank.accountName} />
              <Row label="Account Number" value={fullPayslip.Bank.accountNumber} />
            </div>
          </div>

          {/* Breakdown Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              Earning & Deduction Breakdown
            </h3>
            <div className="rounded-xl border bg-background divide-y">
              <Row label="Basic Salary" value={formatCurrency(fullPayslip.basicSalary)} />
              <Row label="Allowances" value={formatCurrency(fullPayslip.allowances)} className="text-green-600 font-medium" />
              <Row label="Tax Remitted" value={formatCurrency(fullPayslip.tax)} className="text-red-500 font-medium" />
              <Row label="Other Deductions" value={formatCurrency(fullPayslip.deductions)} className="text-red-500 font-medium" />
              <Row label="Gross Earnings" value={formatCurrency((fullPayslip.basicSalary || 0) + (fullPayslip.allowances || 0))} className="font-semibold" />
              <Row label="Total Deductions" value={formatCurrency((fullPayslip.tax || 0) + (fullPayslip.deductions || 0))} className="font-semibold text-red-500" />
            </div>
          </div>
        </div>

        {/* Download Action Footer */}
        <div className="flex items-center justify-end pt-6 border-t mt-auto">
          <Button 
            className="w-full sm:w-auto cursor-pointer flex items-center gap-2" 
            onClick={handleSaveAsPDF} 
            disabled={isGenerating}
          >
            <Download className="h-4 w-4" />
            {isGenerating ? "Generating PDF..." : "Download Payslip PDF"}
          </Button>
        </div>
      </div>
    </AppSheet>
  );
}
