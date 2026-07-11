// payroll-state.ts

import { atom } from "jotai";

export interface CreatePayrollPayload {
  employeeIds: string[];
  name: string;
  month: number;
  year: number;
}

export const payrollAtom = atom<CreatePayrollPayload>({
  employeeIds: [],
  name: "",
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
});

export const updatePayrollAtom = atom(
  null,
  (
    get,
    set,
    payload: Partial<CreatePayrollPayload>
  ) => {
    set(payrollAtom, {
      ...get(payrollAtom),
      ...payload,
    });
  }
);