import { GeneralResponse } from "@/lib/types";
import { Department, DepartmentPayload } from "@/models/departments";
import { add_department, delete_department, get_departments, update_department } from "@/services/settings/department/department-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const DEPARTMENT_QUERY_KEY = ["departments"];

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export const useAddDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add_department"],

    mutationFn: add_department,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEPARTMENT_QUERY_KEY,
      });
    },
  });
};

export const useEditDepartment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit_department", id],

    mutationFn: (payload: DepartmentPayload) =>
      update_department({
        id,
        payload,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEPARTMENT_QUERY_KEY,
      });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete_department"],

    mutationFn: delete_department,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DEPARTMENT_QUERY_KEY,
      });
    },
  });
};

export const useGetDepartments = () => {
  const query = useQuery<AxiosResponse<GeneralResponse<PaginatedResponse<Department>>>>({
    queryKey: ["departments"],
    queryFn: () => get_departments(),
    staleTime: 5 * 60 * 1000,
  });

  const paginated = query.data?.data.data;

  return {
    ...query,
    departments: paginated?.data ?? [],      // Department[], not the wrapper
    totalDepartments: paginated?.total ?? 0, // real pagination metadata, if you need it
  };
};