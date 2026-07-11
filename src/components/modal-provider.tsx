import { DeleteEmployeeModal } from "@/app/(dashboard)/admin/employees/_components/modal/delete-employee";
import { EditEmployeeModal } from "@/app/(dashboard)/admin/employees/_components/modal/edit-employee";
import NewEmployee from "@/app/(dashboard)/admin/overview/_components/modal/new-employee";
import { AddPayrollModal } from "@/app/(dashboard)/admin/payroll/_components/modal/add-payroll/add-payroll-modal";
import DeletePayrollModal from "@/app/(dashboard)/admin/payroll/_components/modal/delete-payroll-modal";
import PayrollDetailsSheet from "@/app/(dashboard)/admin/payroll/_components/modal/view-payroll-sheet";


export function ModalProvider() {
  return (
    <>
      <NewEmployee />
      <DeleteEmployeeModal />
      <EditEmployeeModal />
      <AddPayrollModal />
      <DeletePayrollModal />
      <PayrollDetailsSheet />
      {/* <Success */}
    </>
  );
}
