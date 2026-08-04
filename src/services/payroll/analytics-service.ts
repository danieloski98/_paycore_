import { URLS } from "@/lib/urls";
import httpClient from "../api-service";

export interface CompanyAnalytics {
  totalEmployees: number;
  totalPayrolls: number;
  activePayroll?: {
    id: string;
    month: number;
    year: number;
    status: string;
    name: string;
    [key: string]: any;
  } | null;
  lastPayroll?: {
    id: string;
    month: number;
    year: number;
    status: string;
    name: string;
    [key: string]: any;
  } | null;
  activePayrollMonth: number;
  nextPayrollMonth: number;
  totalLeaveRequests: number;
  pendingLeaveRequests: number;
  approvedLeaveRequests: number;
}

export interface LeaveAnalytics {
  totalLeaveRequests: number;
  approvedLeaveRequests: number;
  rejectedLeaveRequests: number;
  pendingLeaveRequests: number;
}

export interface EmployeeDashboardAnalytics {
  ytdEarnings: number;
  nextPaymentDate: string | null;
  [key: string]: any;
}

export interface PayslipsAnalytics {
  activePayroll?: {
    id: string;
    month: number;
    year: number;
    status: string;
    name: string;
    [key: string]: any;
  } | null;
  processedPayslipsCount: number;
  pendingPayslipsCount: number;
  failedPayslipsCount: number;
  processed?: number;
  pending?: number;
  failed?: number;
}

export const getCompanyAnalytics = (companyId: string) => {
  return httpClient.get(URLS.analytics.get_company_overview(companyId));
};

export const getCompanyLeaveAnalytics = (companyId: string) => {
  return httpClient.get(URLS.analytics.get_company_leave(companyId));
};

export const getEmployeeLeaveAnalytics = (employeeId: string) => {
  return httpClient.get(URLS.analytics.get_employee_leave(employeeId));
};

export const getEmployeeDashboardAnalytics = (employeeId: string) => {
  return httpClient.get(URLS.analytics.get_employee_dashboard(employeeId));
};

export const getActivePayslipsAnalytics = (companyId: string) => {
  return httpClient.get(URLS.analytics.get_active_payslips(companyId));
};

export const getPayrollPayslipAnalytics = (payrollId: string) => {
  return httpClient.get(URLS.analytics.get_payroll_payslips(payrollId));
};
