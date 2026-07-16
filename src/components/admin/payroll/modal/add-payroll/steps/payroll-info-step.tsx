"use client";

import { useAtomValue, useSetAtom } from "jotai";

import { payrollAtom, updatePayrollAtom } from "@/states/payroll-state";
import { PayrollNameInput } from "../payroll-name-input";
import PayrollMonthPicker from "../payroll-month-picker";


export default function PayrollInfoStep() {
  const payroll = useAtomValue(payrollAtom);

  const updatePayroll = useSetAtom(updatePayrollAtom);

  return (
    <div className="space-y-6">

      <PayrollNameInput
        value={payroll.name}
        onChange={(name) =>
          updatePayroll({
            name,
          })
        }
      />

      <PayrollMonthPicker
        month={payroll.month}
        year={payroll.year}
        onChange={(month, year) =>
          updatePayroll({
            month,
            year,
          })
        }
      />

    </div>
  );
}