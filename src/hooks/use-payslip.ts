import { GeneralResponse } from "@/lib/types"
import { PayslipResponse } from "@/models/payslip-model"
import { getEmployeePayslips, getPayslipByPayrollId } from "@/services/payroll/payslip-service"
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

export const useGetEmployeePayslips = (
    employeeId: string,
    page?: number,
    limit?: number
) => {
    const { data, isLoading, error } = useQuery<AxiosResponse<any>>({
        queryKey: ["employee-payslips", employeeId, page, limit],
        queryFn: () => getEmployeePayslips(employeeId, limit, page),
        enabled: !!employeeId,
        placeholderData: (previous) => previous
    })

    const resData = data?.data?.data;

    return {
        payslips: resData?.data,
        pagination: {
            total: resData?.total || 0,
            page: resData?.page || 1,
            totalPages: resData?.totalPages || 1,
            limit: resData?.limit || 10
        },
        isLoading,
        error
    }
}