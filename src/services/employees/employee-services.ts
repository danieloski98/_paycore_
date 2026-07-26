import { AddEmployeePayload } from "@/lib/employee/payload";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";
import { Employee, EmployeeType } from "@/models/employee-models";
import { EmployeeSetupFormValues } from "@/lib/schemas";

export function add_employee(payload: AddEmployeePayload) {
  return httpClient.post(URLS.employees.add_employee, payload);
}

type EditEmployeeType = {
  id: string;
  payload: AddEmployeePayload
}

export function edit_employee({ id, payload }: EditEmployeeType) {
  return httpClient.patch(URLS.employees.edit_employee(id), payload);
}

export function delete_employee(id: string) {
  return httpClient.delete(URLS.employees.delete_employee(id));
}

export function upload_employees(data: { employees: EmployeeType[] }) {
  return httpClient.post(URLS.employees.upload_employees, data)
}

export function get_employees(page: number = 1, limit: number = 10) {
  return httpClient.get(URLS.employees.get_employees, { params: { page, limit } })
}

export function get_employee_by_company(id: string) {
  return httpClient.get(URLS.employees.get_employee(id))
}

export function get_employee_by_id(id: string) {
  return httpClient.get(URLS.employees.get_employee_id(id))
}

interface SetupEmployeePasswordPayload {
  employeeId: string;
  payload: EmployeeSetupFormValues;
}

export const setup_employee_password = ({
  employeeId,
  payload,
}: SetupEmployeePasswordPayload) => {
  return httpClient.post(
    URLS.employees.setup_password(employeeId),
    payload
  );
};

type UpdateEmployeeType = {
  id: string;
  payload: Partial<Employee>
}

export function update_employee({ id, payload }: UpdateEmployeeType) {
  return httpClient.patch(URLS.employees.edit_employee(id), payload);
}
