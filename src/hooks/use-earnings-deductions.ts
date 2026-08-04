import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useModal } from "./use-modal";
import {
  getPayrollEarnings,
  getEmployeeEarnings,
  deleteEmployeeEarning,
  deletePayrollEarning,
  getPayrollDeductions,
  getEmployeeDeductions,
  deleteEmployeeDeduction,
  deletePayrollDeduction,
} from "@/services/payroll/earnings-deductions-service";

// View State management
export type EarningsDeductionsScreen = "main-view" | "earnings" | "deductions";
export const earningsDeductionsScreenAtom = atom<EarningsDeductionsScreen>("main-view");

export const useEarningsDeductions = () => {
  const [screen, setScreen] = useAtom(earningsDeductionsScreenAtom);
  const { closeModal } = useModal();

  const switchTo = (nextScreen: EarningsDeductionsScreen) => {
    setScreen(nextScreen);
  };

  const close = () => {
    setScreen("main-view");
    closeModal();
  };

  return {
    screen,
    switchTo,
    close,
  };
};

// API Query & Mutation Hooks
export const useGetPayrollEarnings = (payrollId: string) => {
  return useQuery({
    queryKey: ["payroll-earnings", payrollId],
    queryFn: () => getPayrollEarnings(payrollId),
    enabled: !!payrollId,
  });
};

export const useGetPayrollDeductions = (payrollId: string) => {
  return useQuery({
    queryKey: ["payroll-deductions", payrollId],
    queryFn: () => getPayrollDeductions(payrollId),
    enabled: !!payrollId,
  });
};

export const useGetEmployeeEarningsInPayroll = (employeeId: string) => {
  return useQuery({
    queryKey: ["employee-earnings", employeeId],
    queryFn: () => getEmployeeEarnings(employeeId),
    enabled: !!employeeId,
  });
};

export const useGetEmployeeDeductionsInPayroll = (employeeId: string) => {
  return useQuery({
    queryKey: ["employee-deductions", employeeId],
    queryFn: () => getEmployeeDeductions(employeeId),
    enabled: !!employeeId,
  });
};

export const useDeleteEmployeeEarning = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployeeEarning,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["employee-earnings", variables.employeeId],
      });
    },
  });
};

export const useDeleteEmployeeDeduction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployeeDeduction,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["employee-deductions", variables.employeeId],
      });
    },
  });
};

export const useDeletePayrollEarningForPayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePayrollEarning,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payroll-earnings", variables.payrollId],
      });
    },
  });
};

export const useDeletePayrollDeductionForPayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePayrollDeduction,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["payroll-deductions", variables.payrollId],
      });
    },
  });
};
