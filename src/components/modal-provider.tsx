"use client";

import { DeleteEmployeeModal } from "@/components/admin/employees/modal/delete-employee";
import { EditEmployeeModal } from "@/components/admin/employees/modal/edit-employee";
import NewEmployee from "@/components/admin/overview/modal/new-employee";
import AddDepartmentModal from "@/components/admin/settings/department/modal/add-department-modal";
import { EditUserModal } from "@/components/admin/settings/general/edit-user-modal";
import dynamic from "next/dynamic";
import { AddPayrollModal } from "./admin/payroll/modal/add-payroll/add-payroll-modal";
import DeletePayrollModal from "./admin/payroll/modal/delete-payroll-modal";
import PayrollDetailsSheet from "./admin/payroll/modal/view-payroll-sheet";
import PayslipModal from "./admin/payslip/modal/payslip-modal";
import LeaveModal from "./admin/leave/modal/leave-modal";

const FundWalletModal = dynamic(() => import("./admin/wallet/modals/fund-wallet-modal"), {
  ssr: false,
});


export function ModalProvider() {
  return (
    <>
      <NewEmployee />
      <DeleteEmployeeModal />
      <EditEmployeeModal />
      <AddPayrollModal />
      <DeletePayrollModal />
      <PayrollDetailsSheet />
      <EditUserModal />
      <AddDepartmentModal />
      <FundWalletModal />
      <PayslipModal />
      <LeaveModal />
      {/* <Success */}
    </>
  );
}
