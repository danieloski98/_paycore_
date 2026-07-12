import { URLS } from "@/lib/urls";
import { DepartmentPayload } from "@/models/departments";
import httpClient from "@/services/api-service";

export function add_department(payload: DepartmentPayload) {
    return httpClient.post(URLS.department.add_department, payload);
}


export function get_departments() {
    return httpClient.get(URLS.department.add_department);
}

interface UpdateDepartmentProps {
    id: string;
    payload: DepartmentPayload;
}

export function update_department({ id, payload }: UpdateDepartmentProps) {
    return httpClient.patch(URLS.department.update_department(id), payload);
}

export function delete_department(id: string) {
    return httpClient.delete(URLS.department.delete_department(id));
}

