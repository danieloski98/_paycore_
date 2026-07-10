import { ForgotPasswordPayload } from "@/lib/auth/payload"
import { GeneralResponse, WalletReturnType } from "@/lib/types"
import { create_payment, get_payment_history, get_wallet_balanxe, validate_payment } from "@/services/wallet/wallet-service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"

export const useGetBalance = (companyId: string) => {
    return useQuery<AxiosResponse<GeneralResponse<WalletReturnType>>, AxiosError<GeneralResponse<any>>, any>({
        queryKey: ['wallet-balance', companyId],
        queryFn: () => get_wallet_balanxe(companyId)
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
        queryKey: ['payment-history', companyId],
        queryFn: () => get_payment_history(companyId, page, limit)
    })
}