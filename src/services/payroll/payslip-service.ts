import { URLS } from "@/lib/urls";
import httpClient from "../api-service";

export const getPayslipByPayrollId = (payrollId: string, limit?: number, page?: number) => {
    return httpClient.get(URLS.payslip.get_payslip_by_payroll_id(payrollId), { params: { page, limit } });
}