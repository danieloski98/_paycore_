import { CreatePayrollPayload, UpdatePayrollPayload } from "@/states/payroll-state";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";



export function create_payroll(payload: CreatePayrollPayload) {
    return httpClient.post(URLS.payroll.create_payroll, payload);
}


export function edit_payroll(payload: UpdatePayrollPayload) {
    return httpClient.patch(URLS.payroll.edit_payroll(payload.id), payload);
}


export function get_payrolls(page: number = 1, limit: number = 10) {
    return httpClient.get(URLS.payroll.get_payroll, { params: { limit, page } });
}

export function delete_payroll(id: string) {
    return httpClient.delete(URLS.payroll.delete_payroll(id));
}

export const startPayslipProcessing = async (payrollId: string) => {
  try {
    const { data } = await httpClient.patch(URLS.payroll.start_payroll_processing(payrollId));

    return data;
  } catch (error: any) {
    console.error(
      "Failed to start payroll processing",
      error.response?.data || error.message
    );

    throw error.response?.data ?? error;
  }
};