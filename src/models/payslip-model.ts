import { Bank } from "./bank-model";
import { Company } from "./company";
import { Employee, EmployeeType } from "./employee-models";
import { PayrollItem } from "./payroll-model";

const StatusProp = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCESSFULL: "SUCCESSFULL",
  FAILED: "FAILED"
} as const;

type Status = keyof typeof StatusProp;

const PayslipStatusProp = {
  PAID: "PAID",
  FAILED: "FAILED"
} as const;

type PayslipStatus = keyof typeof PayslipStatusProp;

export const payslipStatusConfig = {
  PAID: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  PENDING: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  PROCESSING: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  FAILED: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
  CANCELLED: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
  },
} as const;

// export interface Payslip {
//   id: string;
//   allowances: number;
//   bankId: string;
//   basicSalary: number;
//   companyId: string;
//   createdAt: string;
//   deductions: number;
//   deletedAt: string | null;
//   employee?: EmployeeType;
//   employeeId?: string;
//   isDeleted: boolean;
//   netSalary: number;
//   paymentDate: string | null;
//   payroll: {
//     id: string;
//     name: string;
//     month: number;
//     year: number;
//   };
//   payrollId: string;
//   status: Status;
//   tax: number;
//   totalDeductions: number;
//   totalEarnings: number;
//   updatedAt: string;
// }

export interface Payslip {
  id: string;
  employeeId: string,
  payrollId: string,
  basicSalary: number,
  allowances: number,
  deductions?: [],
  tax: number,
  netSalary: number,
  status: PayslipStatus;
  paymentDate: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: null,
  isDeleted: false,
  bankId: string,
  companyId: string,
  Bank: Bank;
  Employee: Employee;
  Company: Company;
  Payroll: PayrollItem;
  earnings?: [];
  totalEarnings: number;
  totalDeductions: number;
  payoutAmount: number
}


export interface Pagination {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

// API Response for payslips
export interface PayslipResponse {
  data: {
    data: Payslip[]
    pagination: Pagination;
  };
}