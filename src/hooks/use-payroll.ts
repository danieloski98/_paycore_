import { create_payroll, delete_payroll, get_payrolls } from "@/services/payroll/payroll-service";
import { CreatePayrollPayload } from "@/states/payroll-state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreatePayroll = () => {
    const { isPending, mutate, error } = useMutation({
        mutationFn: (payload: CreatePayrollPayload) => create_payroll(payload),
        mutationKey: ["create_payroll"]
    });

    return {
        isPending,
        mutate,
        error
    }
}


export const useGetPayrolls = (
    page?: number,
    limit?: number
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["payrolls"],
        queryFn: () => get_payrolls(page, limit),
        placeholderData: (previous) => previous
    })

    return {
        data: data?.data.data.data ?? [],
        pagination: data?.data.data,
        isLoading,
        error
    }
}

export const useDeletePayroll = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: delete_payroll,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["payrolls"],
            });
        },
    });
};

