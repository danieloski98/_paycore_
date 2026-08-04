import { useQuery } from "@tanstack/react-query";
import {
  getCompanyAnalytics,
  getCompanyLeaveAnalytics,
  getEmployeeLeaveAnalytics,
  getEmployeeDashboardAnalytics,
  getActivePayslipsAnalytics,
  getPayrollPayslipAnalytics,
  CompanyAnalytics,
  LeaveAnalytics,
  EmployeeDashboardAnalytics,
  PayslipsAnalytics,
} from "@/services/payroll/analytics-service";
import { AxiosResponse } from "axios";
import { GeneralResponse } from "@/lib/types";

export const useGetCompanyAnalytics = (companyId: string) => {
  const query = useQuery<AxiosResponse<GeneralResponse<CompanyAnalytics>>>({
    queryKey: ["company-analytics", companyId],
    queryFn: () => getCompanyAnalytics(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    analytics: query.data?.data?.data,
  };
};

export const useGetCompanyLeaveAnalytics = (companyId: string) => {
  const query = useQuery<AxiosResponse<GeneralResponse<LeaveAnalytics>>>({
    queryKey: ["company-leave-analytics", companyId],
    queryFn: () => getCompanyLeaveAnalytics(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    analytics: query.data?.data?.data,
  };
};

export const useGetEmployeeLeaveAnalytics = (employeeId: string) => {
  const query = useQuery<AxiosResponse<GeneralResponse<LeaveAnalytics>>>({
    queryKey: ["employee-leave-analytics", employeeId],
    queryFn: () => getEmployeeLeaveAnalytics(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    analytics: query.data?.data?.data,
  };
};

export const useGetEmployeeDashboardAnalytics = (employeeId: string) => {
  const query = useQuery<AxiosResponse<GeneralResponse<EmployeeDashboardAnalytics>>>({
    queryKey: ["employee-dashboard-analytics", employeeId],
    queryFn: () => getEmployeeDashboardAnalytics(employeeId),
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    analytics: query.data?.data?.data,
  };
};

export const useGetActivePayslipsAnalytics = (companyId: string) => {
  const query = useQuery<AxiosResponse<GeneralResponse<PayslipsAnalytics>>>({
    queryKey: ["active-payslips-analytics", companyId],
    queryFn: () => getActivePayslipsAnalytics(companyId),
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    analytics: query.data?.data?.data,
  };
};

export const useGetPayrollPayslipsAnalytics = (payrollId: string) => {
  const query = useQuery<AxiosResponse<GeneralResponse<PayslipsAnalytics>>>({
    queryKey: ["payroll-payslips-analytics", payrollId],
    queryFn: () => getPayrollPayslipAnalytics(payrollId),
    enabled: !!payrollId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    analytics: query.data?.data?.data,
  };
};
