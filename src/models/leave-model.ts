import { EmployeeType } from "./employee-models";


export const LEAVE_TYPES = [
  "ANNUAL",
  "SICK",
  "MATERNITY",
  "PATERNITY",
  "CASUAL",
  "STUDY",
  "PUBLIC_HOLIDAY",
  "UNPAID",
  "MARRIAGE"
] as const;

export type LeaveType = (typeof LEAVE_TYPES)[number];
export const LeaveStatus = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CANCELLED: "CANCELLED"
} as const;

export type LeaveStatus =
  (typeof LeaveStatus)[keyof typeof LeaveStatus];

export interface LeaveRequestPayload {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  description: string;
}

export interface LeaveRequest {
  id: string;
  type: string;
  description: string;

  startDate: string;
  endDate: string;

  totalDays: number;

  Status: LeaveStatus;

  employeeId: string;
  Employee: EmployeeType;

  createdAt: string;
  updatedAt: string;
}

export type ApprovalState =
  | "completed"
  | "active"
  | "pending"
  | "rejected";

export interface ApprovalStep {
  id: string;
  title: string;
  description: string;
  state: ApprovalState;
}