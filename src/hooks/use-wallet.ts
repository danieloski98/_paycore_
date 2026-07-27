import { ForgotPasswordPayload } from "@/lib/auth/payload"
import { GeneralResponse, WalletReturnType } from "@/lib/types"
import { create_payment, get_employee_payment_history, get_employee_wallet_balance, get_payment_history, get_wallet_balance, validate_payment, withdraw_balance } from "@/services/wallet/wallet-service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export const useGetBalance = (companyId: string) => {
    return useQuery<AxiosResponse<GeneralResponse<WalletReturnType>>, AxiosError<GeneralResponse<any>>, any>({
        queryKey: ['wallet-balance', companyId],
        queryFn: () => get_wallet_balance(companyId)
    })
}

export const useGetEmployeeBalance = (employeeId: string) => {
    return useQuery<AxiosResponse<GeneralResponse<WalletReturnType>>, AxiosError<GeneralResponse<any>>, any>({
        queryKey: ['employee-wallet-balance', employeeId],
        queryFn: () => get_employee_wallet_balance(employeeId)
    })
}

export const useCreatePayment = (companyId: string) => {
    return useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse<any>>, { amount: number }>({
        mutationFn: (data: { amount: number }) => create_payment(companyId, data)
    })
}

export const useValidatePayment = (companyId: string) => {
    return useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse<any>>, { reference: string }>({
        mutationFn: (payload: { reference: string }) => validate_payment({ companyId, ...payload })
    })
}

export const useGetPaymentHistory = (companyId: string, page: number = 1, limit: number = 10) => {
    return useQuery<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse<any>>, any>({
        queryKey: ['payment-history', companyId, page, limit],
        queryFn: () => get_payment_history(companyId, page, limit)
    })
}

export const useGetEmployeePaymentHistory = (employeeId?: string, page: number = 1, limit: number = 10) => {
    return useQuery<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse<any>>, any>({
        queryKey: ['employee-payment-history', employeeId, page, limit],
        queryFn: () => get_employee_payment_history(employeeId!, page, limit),
        enabled: !!employeeId,
    })
}

// export const useGetEmployeePaymentHistory = (
//     employeeId?: string,
//     page = 1,
//     limit = 10
// ) => {
//     return useQuery<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse<any>>, any>({
//         queryKey: ["employee-payment-history", employeeId, page, limit],
//         queryFn: async () => {
//             const res = await get_employee_payment_history(employeeId!, page, limit);
//             return res.data.data;
//         },
//         enabled: !!employeeId,
//     });
// };

export const useWithdrawBalance = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse<any>>, { amount: number; bankDetailsId: string }>({
    mutationKey: ["withdraw-balance-mutation"],
    mutationFn: withdraw_balance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employee-wallet-balance"],
      });
      queryClient.invalidateQueries({
        queryKey: ["employee-payment-history"],
      });
    },
  });
};