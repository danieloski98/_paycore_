// hooks/use-leave.ts

import { getLeaveById, getLeaveRequests, requestLeave, getCompanyLeaveRequests, updateLeaveStatus, UpdateLeaveStatusPayload } from "@/services/leave/leave-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetEmployeeLeave = (
    employeeId: string,
    page?: number,
    limit?: number
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["leave-requests", employeeId],

        queryFn: () => getLeaveRequests(employeeId, page, limit),
    });

    return {
        leave: data?.data?.data ?? [],
        pagination: data?.pagination,
        isLoading,
        error,
    };
};

export const useGetCompanyLeaves = (
    page?: number,
    limit?: number
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["company-leaves"],

        queryFn: () => getCompanyLeaveRequests(page, limit),
    });

    return {
        leaves: data?.data?.data ?? [],
        pagination: data?.pagination,
        isLoading,
        error,
    };
};


export const useGetLeaveById = (
    leaveId: string,
) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["leave-requests", leaveId],

        queryFn: () => getLeaveById(leaveId),
    });

    return {
        leave: data,
        isLoading,
        error,
    };
};

export const useRequestLeave = () => {
    const query = useQueryClient()
    const mutation = useMutation({
        mutationKey: ["request_leave"],
        mutationFn: requestLeave,
        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["leave-requests"]
            })
        }
    });

    return mutation;
};



export const useUpdateLeaveStatus = () => {
    const query = useQueryClient()

    return useMutation({
        mutationFn: (payload: UpdateLeaveStatusPayload) =>
            updateLeaveStatus(payload),

        onSuccess: () => {
            query.invalidateQueries({
                queryKey: ["company-leaves"],
            });

            query.invalidateQueries({
                queryKey: ["leave-details"],
            });

            query.invalidateQueries({
                queryKey: ["leave-analytics"],
            });
        },
    });
};