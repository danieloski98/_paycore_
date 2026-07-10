import { AddEmployeePayload } from "@/lib/employee/payload";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";
import { EmployeeType } from "@/models/employee-models";

export function add_employee(payload: AddEmployeePayload) {
    return httpClient.post(URLS.employees.add_employee, payload);
}

export function upload_employees(data: { employees: EmployeeType[] }) {
    return httpClient.post(URLS.employees.upload_employees, data)
}

export function get_employees() {
    return httpClient.get(URLS.employees.get_employees)
}