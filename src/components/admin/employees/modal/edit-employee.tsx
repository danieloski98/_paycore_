"use client";

import { AppDialog } from "@/components/shared/app-dialog";
import { useModal } from "@/hooks/use-modal";
import EditEmployeeForm from "../forms/edit-employee-form";
import { EmployeeType } from "@/models/employee-models";

export function EditEmployeeModal() {
  const { isOpen, closeModal, data } = useModal<EmployeeType>();

  return (
    <AppDialog
      open={isOpen("edit-employee")}
      onOpenChange={(open) => !open && closeModal()}
      title="Edit Employee"
      description="Update employee information"
      size="md"
    >
      <div className="space-y-8">
        <EditEmployeeForm data={data} />
      </div>
    </AppDialog>
  );
}