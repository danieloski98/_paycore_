import { URLS } from "@/lib/urls";
import httpClient from "../api-service";

export const getPayrollEarnings = (payrollId: string) => {
  return httpClient.get(URLS.earnings.get_payroll_earnings(payrollId));
};

export const getEmployeeEarnings = (employeeId: string) => {
  return httpClient.get(URLS.earnings.get_employee_earnings(employeeId));
};

export const createPayrollEarning = (payrollId: string, payload: { type: string; amount: number; description?: string }) => {
  return httpClient.post(URLS.earnings.create_payroll_earning(payrollId), payload);
};

export const createEmployeeEarning = (employeeId: string, payload: { type: string; amount: number; description?: string }) => {
  return httpClient.post(URLS.earnings.create_employee_earning(employeeId), payload);
};

export const deleteEmployeeEarning = ({ employeeId, earningId }: { employeeId: string; earningId: string }) => {
  return httpClient.delete(URLS.earnings.delete_employee_earning(employeeId, earningId));
};

export const deletePayrollEarning = ({ payrollId, earningId }: { payrollId: string; earningId: string }) => {
  return httpClient.delete(URLS.earnings.delete_payroll_earning(payrollId, earningId));
};

export const getPayrollDeductions = (payrollId: string) => {
  return httpClient.get(URLS.deductions.get_payroll_deductions(payrollId));
};

export const getEmployeeDeductions = (employeeId: string) => {
  return httpClient.get(URLS.deductions.get_employee_deductions(employeeId));
};

export const createPayrollDeduction = (payrollId: string, payload: { type: string; amount: number; description?: string }) => {
  return httpClient.post(URLS.deductions.create_payroll_deduction(payrollId), payload);
};

export const createEmployeeDeduction = (employeeId: string, payload: { type: string; amount: number; description?: string }) => {
  return httpClient.post(URLS.deductions.create_employee_deduction(employeeId), payload);
};

export const deleteEmployeeDeduction = ({ employeeId, deductionId }: { employeeId: string; deductionId: string }) => {
  return httpClient.delete(URLS.deductions.delete_employee_deduction(employeeId, deductionId));
};

export const deletePayrollDeduction = ({ payrollId, deductionId }: { payrollId: string; deductionId: string }) => {
  return httpClient.delete(URLS.deductions.delete_payroll_deduction(payrollId, deductionId));
};
