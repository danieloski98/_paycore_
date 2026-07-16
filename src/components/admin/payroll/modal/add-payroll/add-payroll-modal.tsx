"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";

// import { payrollAtom } from "@/states/payrollState";
// import { useCreatePayroll } from "@/hooks/usePayroll";
import { useModal } from "@/hooks/use-modal";

import { Button } from "@/components/ui/button";

import { AppDialog } from "@/components/shared/app-dialog";
import { payrollAtom } from "@/states/payroll-state";
import { EmployeeDetailsStep, PayrollInfoStep } from "./steps";
import { PayrollStepper } from "./payroll-stepper";
import { useCreatePayroll } from "@/hooks/use-payroll";

const steps = [
  {
    title: "Employee Details",
    component: EmployeeDetailsStep,
  },
  {
    title: "Payroll Info",
    component: PayrollInfoStep,
  },
];

export function AddPayrollModal() {
  const payroll = useAtomValue(payrollAtom);

  const { openModal, closeModal, isOpen } = useModal();

  const { mutate, isPending } = useCreatePayroll();

  const [step, setStep] = useState(0);

  const CurrentStep = steps[step].component;

  function reset() {
    setStep(0);
    closeModal();
  }

  function submit() {
    mutate(payroll, {
      onSuccess() {
        reset();

        // openModal("success-payroll");
      },
    });
  }

  return (
    <AppDialog
      open={isOpen("add-payroll")}
      onOpenChange={reset}
      title="Add Payroll"
      size="lg"
    >
      <div className="space-y-8">

        <PayrollStepper
          currentStep={step}
          steps={steps.map(s => s.title)}
        />

        <CurrentStep />

        <div className="flex justify-end gap-3">

          {step > 0 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}

          {step < steps.length - 1 ? (
            <Button
              disabled={!payroll.employeeIds.length}
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={isPending}
              onClick={submit}
            >
              {isPending ? "Creating..." : "Create Payroll"}
            </Button>
          )}
        </div>

      </div>
    </AppDialog>
  );
}