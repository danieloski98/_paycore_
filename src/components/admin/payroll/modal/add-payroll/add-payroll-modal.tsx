"use client";

import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { useModal } from "@/hooks/use-modal";

import { Button } from "@/components/ui/button";

import { AppDialog } from "@/components/shared/app-dialog";
import { payrollAtom, PayrollDraft, resetPayrollAtom } from "@/states/payroll-state";
import { EmployeeDetailsStep, PayrollInfoStep } from "./steps";
import { PayrollStepper } from "./payroll-stepper";
import { useCreatePayroll, useEditPayroll } from "@/hooks/use-payroll";

// const steps = [
//   {
//     title: "Employee Details",
//     component: EmployeeDetailsStep,
//   },
//   {
//     title: "Payroll Info",
//     component: PayrollInfoStep,
//   },
// ];

const stepTitles = ["Employee Details", "Payroll Info"];
const stepComponents = [EmployeeDetailsStep, PayrollInfoStep];

interface AddPayrollModalData {
  payroll?: PayrollDraft;
}

export function AddPayrollModal() {
  const payroll = useAtomValue(payrollAtom);
  const resetPayroll = useSetAtom(resetPayrollAtom);

  const { closeModal, isOpen, data } = useModal();
  const modalOpen = isOpen("add-payroll") || isOpen("edit-payroll");
  const editingPayroll = (data as AddPayrollModalData | undefined)?.payroll
  const isEditMode = Boolean(editingPayroll?.id);


  const [step, setStep] = useState(0);
  const CurrentStep = stepComponents[step];

  const { mutate: createPayroll, isPending: creating } = useCreatePayroll();
  const { mutate: updatePayroll, isPending: updating } = useEditPayroll();

  const isPending = creating || updating

  useEffect(() => {
    if (modalOpen) {
      resetPayroll(editingPayroll);
      setStep(0);
    }
  }, [modalOpen, editingPayroll, resetPayroll]);


  function reset() {
    setStep(0);
    closeModal();
  }


  function submit() {
    if (isEditMode && editingPayroll?.id) {
      updatePayroll(
        { ...payroll, id: editingPayroll.id },
        {
          onSuccess() {
            reset();
          },
        }
      );
    } else {
      createPayroll(payroll, {
        onSuccess() {
          reset();
        },
      });
    }
  }



  return (
    <AppDialog
      open={modalOpen}
      onOpenChange={reset}
      title={isEditMode ? "Edit Payroll" : "Add Payroll"}
      size="lg"
    >
      <div className="space-y-8">


        <PayrollStepper
          currentStep={step}
          steps={stepTitles}
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

          {step < stepComponents.length - 1 ? (
            <Button
              disabled={!payroll.employeeIds.length}
              onClick={() => {
                setStep((prev) => {
                  return prev + 1;
                });
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={isPending}
              onClick={submit}
            >

              {isPending
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                  ? "Save Changes"
                  : "Create Payroll"}

            </Button>
          )}
        </div>

      </div>
    </AppDialog>
  );
}