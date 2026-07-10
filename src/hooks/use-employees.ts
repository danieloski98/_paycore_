import { AddEmployeePayload } from "@/lib/employee/payload";
import { GeneralResponse } from "@/lib/types";
import { EmployeeResponse, EmployeeType } from "@/models/employee-models";
import { add_employee, get_employees, upload_employees } from "@/services/employees/employee-services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const useAddEmployee = () => {
    const { isPending, mutate, error } = useMutation({
        mutationFn: (payload: AddEmployeePayload) => add_employee(payload),
        mutationKey: ["add_employee"]
    });

    return {
        isPending,
        mutate,
        error
    }
};


export const useUploadEmployees = () => {
    const { isPending, mutate, error } = useMutation({
        mutationFn: upload_employees,
        mutationKey: ["upload_employees"]
    });

    return {
        isPending,
        mutate,
        error
    }
};


// export const useGetEmployees = () => {
//     const { data, isLoading, error } = useQuery({
//         queryKey: ['employees'],
//         queryFn: get_employees
//     })

//     return {
//         data, isLoading, error
//     }
// }

export const useGetEmployees = () => {
    return useQuery<
        AxiosResponse<GeneralResponse<PaginatedResponse<EmployeeType>>>
    >({
        queryKey: ["employees"],
        queryFn: get_employees,
    });
};