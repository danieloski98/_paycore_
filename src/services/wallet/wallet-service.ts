import { URLS } from "@/lib/urls";
import httpClient from "../api-service";

export function get_wallet_balanxe(companyId: string) {
    return httpClient.get(URLS.wallet.get_wallet_balance(companyId))
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