export const StatusProp = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCESSFULL: "SUCCESSFULL",
  FAILED: "FAILED"
} as const;

export type Status = keyof typeof StatusProp;

export const payrollStatusConfig: Record<
  Status,
  {
    bgColor: string;
    textColor: string;
    label: string;
  }
> = {
  PENDING: {
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-700",
    label: "Pending",
  },
  PROCESSING: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    label: "Processing",
  },
  SUCCESSFULL: {
    bgColor: "bg-green-100",
    textColor: "text-green-700",
    label: "Successful",
  },
  FAILED: {
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    label: "Failed",
  },
};

export interface PayrollItem {
  companyId?: string;
  id: string;
  isDeleted?: boolean;
  month: number;
  year: number;
  name: string;
  status: Status;
  payslips?: any[];
  updatedAt?: string;
  createdAt?: string;
}

