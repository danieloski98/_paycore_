import { create_payroll, delete_payroll, edit_payroll, get_payrolls, startPayslipProcessing } from "@/services/payroll/payroll-service";
import { CreatePayrollPayload, UpdatePayrollPayload } from "@/states/payroll-state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useCreatePayroll = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate, error } = useMutation({
        mutationFn: (payload: CreatePayrollPayload) => create_payroll(payload),
        mutationKey: ["create_payroll"],
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["payrolls"]
            })
        }
    });

    return {
        isPending,
        mutate,
        error
    }
}

export const useEditPayroll = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate, error } = useMutation({
        mutationFn: (payload: UpdatePayrollPayload) => edit_payroll(payload),
        mutationKey: ["edit_payroll"],
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["payrolls"]
            })
        }
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

export const useStartPayrollProcessing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payrollId: string) =>
      startPayslipProcessing(payrollId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payrolls"],
      });

      queryClient.invalidateQueries({
        queryKey: ["payroll"],
      });
    },

    onError: (error: any) => {
      console.error(
        "Payroll processing failed:",
        error.message
      );
    },
  });
};