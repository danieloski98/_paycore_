import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SidebarItemProps } from "./constants";
import { ApprovalStep } from "@/models/leave-model";
import { format, isValid, parse, parseISO } from "date-fns";
import { EmployeeType } from "@/models/employee-models";
import { payrollStatusConfig, Status } from "@/models/payroll-model";
import { payslipStatusConfig } from "@/models/payslip-model";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getEmployeeFullname = (
  employee?: Pick<EmployeeType, "firstName" | "lastName"> | null
) => {
  if (!employee) return "";
  const first = employee.firstName ?? "";
  const last = employee.lastName ?? "";
  const full = `${first} ${last}`.trim();
  return full;
}

export const formatDate = (date: string | Date, fmt: string = "P"): string => {
  let d: Date | null = null;

  if (date instanceof Date) {
    d = date;
  } else if (typeof date === "string") {
    // Try ISO first
    const iso = parseISO(date);
    if (isValid(iso)) {
      d = iso;
    } else {
      // Try common non-ISO patterns
      const patterns = ["dd-MM-yyyy", "dd/MM/yyyy", "yyyy-MM-dd", "yyyy/MM/dd"] as const;
      for (const p of patterns) {
        const parsed = parse(date, p, new Date());
        if (isValid(parsed)) {
          d = parsed;
          break;
        }
      }
    }
  }

  if (!d || !isValid(d)) return "";
  return format(d, fmt);
};

export const formatDays = (input: string | number) => {
  const days = typeof input === 'string' ? parseInt(input.replace(/\D/g, '')) : input;
  return `${days} day${days !== 1 ? 's' : ''}`;
};

export const formatDateRangeInline = (startDate: string, endDate: string): string => {
  return `${formatDate(startDate)} to ${"\n"} ${formatDate(endDate)}`;
};


export function getActiveSidebarItem(
  pathname: string,
  items: SidebarItemProps[]
): SidebarItemProps | undefined {
  return items.find((item) => pathname.startsWith(item.href));
}

export const formatMonthYear = (month: number, year: number): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[month]} ${year}`;
};

// export const leaveStatusConfig = {
//   PENDING: {
//     bgColor: "#FEF9C2",
//     color: "#FDC700",
//     label: "pending"
//   },
//   ACCEPTED: {
//     bgColor: "#DCFCE7",
//     color: "#00A63E",
//     label: "approved"
//   },
//   REJECTED: {
//     bgColor: "#FFE2E2",
//     color: "#E7000B",
//     label: "rejected"
//   },
//   CANCELLED: {
//     bgColor: "#F3F4F6",
//     color: "#6B7280",
//     label: "cancelled"
//   }
// } as const;

export const statusColorConfig = {
  PENDING: {
    bgColor: "#FEF9C2",
    color: "#FDC700",
    label: "pending"
  },
  PAID: {
    bgColor: "#DCFCE7",
    color: "#00A63E",
    label: "approved"
  },
  FAILED: {
    bgColor: "#FFE2E2",
    color: "#E7000B",
    label: "rejected"
  },
} as const;

// export const getLeaveStatusStyle = (status: string) => {
//   console.log(status)
//   const normalized = status?.toUpperCase() as keyof typeof leaveStatusConfig;
//   const config = leaveStatusConfig[normalized] ?? leaveStatusConfig.PENDING;
//   return { bgColor: config.bgColor, color: config.color };
// };


export const getStatusColorStyle = (status: string) => {
  const normalized = status?.toUpperCase() as keyof typeof statusColorConfig;
  const config = statusColorConfig[normalized] ?? statusColorConfig.PENDING;
  return { bgColor: config.bgColor, color: config.color };
};

export const getApprovalSteps = (
  status: LeaveStatus,
  createdAt: string,
  updatedAt?: string
): ApprovalStep[] => {
  const submitted = format(new Date(createdAt), "PPP 'at' p");

  const reviewed = updatedAt
    ? format(new Date(updatedAt), "PPP 'at' p")
    : "";

  switch (status) {
    case "PENDING":
      return [
        {
          id: "1",
          title: "Request Submitted",
          description: submitted,
          state: "completed",
        },
        {
          id: "2",
          title: "Line Manager Review",
          description: "Awaiting manager approval",
          state: "active",
        },
        {
          id: "3",
          title: "HR Approval",
          description: "Waiting for manager approval",
          state: "pending",
        },
      ];

    case "ACCEPTED":
      return [
        {
          id: "1",
          title: "Request Submitted",
          description: submitted,
          state: "completed",
        },
        {
          id: "2",
          title: "Line Manager Approved",
          description: reviewed,
          state: "completed",
        },
        {
          id: "3",
          title: "HR Approved",
          description: reviewed,
          state: "completed",
        },
      ];

    case "REJECTED":
      return [
        {
          id: "1",
          title: "Request Submitted",
          description: submitted,
          state: "completed",
        },
        {
          id: "2",
          title: "Line Manager Rejected",
          description: reviewed,
          state: "rejected",
        },
        {
          id: "3",
          title: "HR Approval",
          description: "Not processed",
          state: "pending",
        },
      ];
    default:
      return [];
  }
};


export const leaveStatusConfig = {
  PENDING: {
    className:
      "bg-yellow-100 text-yellow-700 border-yellow-200",
    label: "Pending",
  },
  ACCEPTED: {
    className:
      "bg-green-100 text-green-700 border-green-200",
    label: "Approved",
  },
  REJECTED: {
    className:
      "bg-red-100 text-red-700 border-red-200",
    label: "Rejected",
  },
} as const;

export type LeaveStatus = keyof typeof leaveStatusConfig;

export const getLeaveStatusStyle = (
  status?: string | null
) => {
  const normalized =
    status?.toUpperCase() as LeaveStatus | undefined;

  return (
    leaveStatusConfig[normalized ?? "PENDING"] ??
    leaveStatusConfig.PENDING
  );
};



export const getPayslipStatusStyle = (status: string) => {
  const key = status?.toUpperCase() as keyof typeof payslipStatusConfig;
  return payslipStatusConfig[key] ?? payslipStatusConfig.PENDING;
};


export const getPayrollStatusStyle = (status: Status) => {
  return payrollStatusConfig[status];
};

