import { AddEmployeePayload } from "@/lib/employee/payload";
import { add_employee, upload_employees } from "@/services/employees/employee-services";
import { useMutation } from "@tanstack/react-query";

export const useAddEmployee = () => {
    const {isPending, mutate, error } = useMutation({
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
    const {isPending, mutate, error } = useMutation({
        mutationFn: upload_employees,
        mutationKey: ["upload_employees"]
    });

    return {
        isPending,
        mutate,
        error
    }
};


