import { CreatePayrollPayload } from "@/states/payroll-state";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";



export function create_payroll(payload: CreatePayrollPayload) {
    return httpClient.post(URLS.payroll.create_payroll, payload);
}

export function get_payrolls(page: number = 1, limit: number = 10) {
    return httpClient.get(URLS.payroll.get_payroll, { params: { limit, page } });
}

export function delete_payroll(id: string) {
    return httpClient.delete(URLS.payroll.delete_payroll(id));
}
