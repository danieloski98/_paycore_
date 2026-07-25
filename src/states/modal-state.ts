import { atom } from "jotai";

export type ModalType =
  | "new-employee"
  | "edit-employee"
  | "delete-employee"
  | "notification"
  | "add-payroll"
  | "edit-payroll"
  | "success-payroll"
  | "delete-payroll"
  | "payroll-details"
  | "edit-user"
  | "add-department"
  | "fund-wallet"
  | "payslip-details"
  | "manage-leave"
  | "add-bank"
  | "leave-request"
  | "update-employee"
  | null;

export interface ModalState<T = unknown> {
  type: ModalType;
  data?: T;
}

export const modalAtom = atom<ModalState>({
  type: null,
});