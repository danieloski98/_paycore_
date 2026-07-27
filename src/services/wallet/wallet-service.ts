import { URLS } from "@/lib/urls";
import httpClient from "../api-service";

export function get_wallet_balance(companyId: string) {
    return httpClient.get(URLS.wallet.get_wallet_balance(companyId))
}

export function get_employee_wallet_balance(employeeId: string) {
    return httpClient.get(URLS.wallet.get_employee_wallet_balance(employeeId))
}

export function create_payment(companyId: string, payload: { amount: number }) {
    return httpClient.post(URLS.wallet.create_payment(companyId), payload)
}

export function validate_payment(payload: { companyId: string, reference: string }) {
    return httpClient.post(URLS.wallet.validate_payment, payload)
}

export function get_payment_history(companyId: string, page: number = 1, limit: number = 10) {
    return httpClient.get(URLS.wallet.get_payment_history(companyId), { params: { page, limit } })
}

export function get_employee_payment_history(employeeId: string, page: number = 1, limit: number = 10) {
    return httpClient.get(URLS.wallet.get_employee_payment_history(employeeId), { params: { page, limit } })
}

export function withdraw_balance(payload: { amount: number; bankDetailsId: string }) {
    return httpClient.post(URLS.wallet.withdraw, payload)
}