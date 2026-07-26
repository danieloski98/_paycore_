import { Company } from "./company";

export type EmployeeType = {
  id?: string;
  Company?: Company;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  emailVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  leaveEndDate: Date;
  leaveStartDate: Date;
  leaveStatus: string;
  taxId: string;
  position: string;
  picture: string;
  department: string;
  salary: number;
  startDate: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Employee {
  id?: string;
  Company?: Company;
  companyId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  emailVerified?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  leaveEndDate?: Date;
  leaveStartDate?: Date;
  leaveStatus?: string;
  taxId?: string;
  position?: string;
  picture?: string;
  department: string;
  salary: number;
  startDate: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface EditEmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: string;
  startDate: string;
}

export interface EmployeeResponse {
  data: Employee[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  message: string;
  success: boolean;
}
