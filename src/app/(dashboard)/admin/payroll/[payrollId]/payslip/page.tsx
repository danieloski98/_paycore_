'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import { Card } from '@/components/ui/card';
import { useGetPayslipByPayrollId } from '@/hooks/use-payslip';
import { useParams } from 'next/navigation';
import { payslipColumns } from '@/components/admin/payslip/column/payslip-columns';
import { useModal } from '@/hooks/use-modal';
import { createPayrollEarning, createPayrollDeduction } from '@/services/payroll/earnings-deductions-service';

export default function PayslipPage() {
  const params = useParams<{ payrollId: string }>();
  const { openModal } = useModal();

  const { payslip, isLoading } = useGetPayslipByPayrollId(params.payrollId);
  const payslipData = payslip ?? [];

  console.log(payslip)

  if (!payslipData) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            className="gap-2 cursor-pointer" 
            onClick={() => 
              openModal("add-earning", {
                type: "payroll",
                payrollId: params.payrollId,
                submitEarning: (payload: any) => createPayrollEarning(params.payrollId, payload),
                submitDeduction: (payload: any) => createPayrollDeduction(params.payrollId, payload),
                invalidateKeys: [
                  ["payroll-earnings", params.payrollId],
                  ["payroll-deductions", params.payrollId]
                ]
              })
            }
          >
            <Plus className="h-4 w-4" />
            Add Earnings & Deductions
          </Button>
        </div>

        <Card>
          <DataTable
            columns={payslipColumns}
            data={payslipData}
            isLoading={isLoading}
          />
        </Card>
      </div>
    </div>
  );
}
