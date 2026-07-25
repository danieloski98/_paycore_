import { AddEmployeePayload } from "@/lib/employee/payload";
import { EmployeeSetupFormValues } from "@/lib/schemas";
import { GeneralResponse } from "@/lib/types";
import { Employee, EmployeeType } from "@/models/employee-models";
import { add_employee, delete_employee, edit_employee, get_employee_by_company, get_employee_by_id, get_employees, setup_employee_password, update_employee, upload_employees } from "@/services/employees/employee-services";
import { upload_image } from "@/services/upload/upload-service";
import { employeeAtom } from "@/states/auth-user-state";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useAtom } from "jotai";

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const useAddEmployee = () => {
    const queryClient = useQueryClient()
    const { isPending, mutate, error } = useMutation({
        mutationFn: (payload: AddEmployeePayload) => add_employee(payload),
        mutationKey: ["add_employee"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
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


export const useGetCompanyEmployeeById = (id: string) => {
    const query = useQuery<
        AxiosResponse<GeneralResponse<Employee>>
    >({
        queryKey: ["company", id],
        queryFn: () => get_employee_by_company(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });

    return {
        ...query,
        employee: query.data?.data.data,
    };
};


export const useGetEmployeeById = (id: string) => {
    const query = useQuery<
        AxiosResponse<GeneralResponse<EmployeeType>>
    >({
        queryKey: ["company", id],
        queryFn: () => get_employee_by_id(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });

    return {
        ...query,
        employee: query.data?.data.data,
    };
};

export const useSetupEmployeePassword = (
    employeeId: string
) => {
    return useMutation({
        mutationKey: ["employee-password", employeeId],

        mutationFn: (
            payload: EmployeeSetupFormValues
        ) =>
            setup_employee_password({
                employeeId,
                payload,
            }),
    });
};

export const useUpdateEmployeePicture = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            file,
        }: {
            id: string;
            file: File;
        }) => {
            // upload first
            const upload = await upload_image(file);

            // depends on your upload response
            const imageUrl = upload.data;
            console.log(imageUrl)

            // update employee
            return update_employee({
                id,
                payload: { picture: imageUrl }
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employee"],
            });

            queryClient.invalidateQueries({
                queryKey: ["employees"],
            });
        },
    });
};