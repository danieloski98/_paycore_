import { GeneralResponse } from "@/lib/types"
import { PayslipResponse } from "@/models/payslip-model"
import { getPayslipByPayrollId } from "@/services/payroll/payslip-service"
import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

export const useGetPayslipByPayrollId = (
    payrollId: string,
    page?: number,
    limit?: number
) => {
    const { data, isLoading, error } = useQuery<AxiosResponse<PayslipResponse>>({
        queryKey: ["payrolls"],
        queryFn: () => getPayslipByPayrollId(payrollId, page, limit),
        placeholderData: (previous) => previous
    })

    return {
        payslip: data?.data.data.data,
        pagination: data?.data.data.pagination,
        isLoading,
        error
    }
}