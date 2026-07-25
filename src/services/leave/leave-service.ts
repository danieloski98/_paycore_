
import { LeaveRequest, LeaveRequestPayload } from "@/models/leave-model";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";
import { LeaveStatus } from "@/lib/utils";

export interface GetLeaveByIdResponse {
    success: boolean;
    message: string;
    data: LeaveRequest;
}

export const getLeaveRequests = async (
    employeeId: string,
    page = 1,
    limit = 10
) => {
    const { data } = await httpClient.get(URLS.leave.get_leave_for_employee(employeeId), { params: { page, limit } })

    return data
};

export const getLeaveById = async (id: string) => {
    const { data } = await httpClient.get<GetLeaveByIdResponse>(
        `/leave/${id}`
    );

    return data;
};

export const getCompanyLeaveRequests = async (
    page = 1,
    limit = 10
) => {
    const { data } = await httpClient.get(URLS.leave.get_company_leaves, { params: { page, limit } })

    return data
};


export const requestLeave = async (
    payload: LeaveRequestPayload
) => {
    const { data } = await httpClient.post(
        URLS.leave.create_leave,
        payload,
    );

    return data;
};


export interface UpdateLeaveStatusPayload {
    id: string;
    status: LeaveStatus;
}

export const updateLeaveStatus = async (
    payload: UpdateLeaveStatusPayload
) => {
    const { data } = await httpClient.patch(
        URLS.leave.update_leave_status(payload.id),
        {
            status: payload.status,
        }
    );

    return data;
};