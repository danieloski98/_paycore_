import { AddEmployeePayload } from "@/lib/employee/payload";
import { EmployeeType } from "@/models/employee-models";
import { add_employee, delete_employee, edit_employee, get_employees, upload_employees } from "@/services/employees/employee-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useEditEmployee = (id: string) => {
    const { isPending, mutate, error } = useMutation({
        mutationKey: ["edit_employee", id],
        mutationFn: (payload: AddEmployeePayload) => edit_employee({ id, payload }),
    });

    return {
        isPending,
        mutate,
        error
    }
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: delete_employee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employees"],
            });
        },
    });
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


// export const useGetEmployees = (
//     limit: number,
//     page: number,
// ) => {
//     const query = useQuery<
//         AxiosResponse<GeneralResponse<PaginatedResponse<EmployeeType>>>
//     >({
//         queryKey: ["employees"],
//         queryFn: () => get_employees(page, limit),
//     });

//     // add revalidation

//     return {
//         ...query,
//         // @ts-ignore
//         employees: query.data?.data.data.data ?? [],
//         pagination: query.data?.data.data,
//     };
// };

// export const useGetEmployees = (limit: number, page: number) => {
//     const query = useQuery<AxiosResponse<GeneralResponse<PaginatedResponse<EmployeeType>>>
//     >({
//         queryKey: ["employees", page, limit], // 👈 was just ["employees"] — refetches now happen on page/limit change
//         queryFn: () => get_employees(page, limit),
//         placeholderData: keepPreviousData, // 👈 keeps current rows on screen while the next page loads
//     });

//     const paginated = query.data?.data.data;

//     return {
//         ...query,
//         employees: paginated?.data ?? [],
//         pageCount: paginated?.totalPages ?? 0, // 👈 exposed directly so the page component doesn't have to dig into `pagination`
//         total: paginated?.total ?? 0,
//     };
// };

async function get_all_employees(limit = 100) {
    const first = await get_employees(1, limit);
    const firstPage = first.data.data;
    const totalPages = firstPage.totalPages;

    if (totalPages <= 1) return firstPage.data;

    const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => get_employees(i + 2, limit))
    );

    return [...firstPage.data, ...rest.map((r) => r.data.data.data).flat()];
}

export const useGetEmployees = () => {
    const query = useQuery<EmployeeType[]>({
        queryKey: ["employees", "all"],
        queryFn: () => get_all_employees(),
        staleTime: 5 * 60 * 1000,
    });

    return { ...query, employees: query.data ?? [] };
};