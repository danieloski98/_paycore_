// payroll-state.ts

import { atom } from "jotai";

export interface CreatePayrollPayload {
  employeeIds: string[];
  name: string;
  month: number;
  year: number;
}

export interface UpdatePayrollPayload extends Partial<CreatePayrollPayload>{
  id: string;
}

export interface PayrollDraft {
  id?: string; // present only when editing an existing payroll
  name: string;
  month: number;
  year: number;
  employeeIds: string[];
}

export const defaultPayrollDraft: PayrollDraft = {
  name: "",
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  employeeIds: [],
};

export const payrollAtom = atom<PayrollDraft>(defaultPayrollDraft)

export const updatePayrollAtom = atom(
  null,
  (get, set, update: Partial<PayrollDraft>) => {
    set(payrollAtom, { ...get(payrollAtom), ...update });
  }
);

export const resetPayrollAtom = atom<null, [PayrollDraft | undefined], void>(
  null,
  (_get, set, payroll) => {
    set(payrollAtom, payroll ?? defaultPayrollDraft);
  }
);