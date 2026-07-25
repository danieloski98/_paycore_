
// PayrollItem doesn't carry employeeIds directly — it's derived from the
// payslips already generated for that run. If a payroll can exist before any

import { PayrollItem } from "@/models/payroll-model";
import { PayrollDraft } from "@/states/payroll-state";

// payslips are generated, payslips will be [] and employeeIds falls back to [].
export function toPayrollDraft(payroll: PayrollItem): PayrollDraft {
  return {
    id: payroll.id,
    name: payroll.name,
    month: payroll.month,
    year: payroll.year,
    employeeIds: payroll.payslips?.map((p) => p.employeeId) ?? [],
  };
}
 
