export const StatusProp = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCESSFULL: "SUCCESSFULL",
  FAILED: "FAILED"
} as const;

export type Status = keyof typeof StatusProp;


export interface PayrollItem {
  companyId?: string;
  id: string;
  isDeleted?: boolean;
  month: number;
  year: string;
  name: string;
  status: Status;
  payslips?: any[];
  updatedAt?: string;
  createdAt?: string;
}