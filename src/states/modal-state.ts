import { atom } from "jotai";

export type ModalType =
  | "recent-payroll-detail"
  | "payroll-details"
  | "payslip-details"
  | "add-payroll"
  | "add-payslip"
  | "edit-payroll"
  | "delete-payroll"
  | "change-password"
  | "new-member"
  | "new-employee"
  | "create-wallet"
  | "fund-wallet"
  | "success-wallet"
  | "success-payroll"
  | "notification"
  | "manage-leave"
  | "edit-employee"
  | "employee-change-passeord"
  | "request-leave"
  | "add-bank-details"
  | "delete-bank"
  | "add-earning"
  | "delete-employee"
  | null;

export type ModalState = {
  type: ModalType;
  data?: any; // generic data you can pass
};

export const modalAtom = atom<ModalState>({ type: null });
