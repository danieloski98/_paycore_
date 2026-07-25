import { Bank } from "@/models/bank-model";
import { Company } from "@/models/company";
import { Employee } from "@/models/employee-models";
import { PayrollItem } from "@/models/payroll-model";
import { Payslip } from "@/models/payslip-model";

const company: Company = {
  id: "COMP-001",
  name: "Paycore Technologies",
  address: "12 Admiralty Way, Lekki, Lagos",
  phone: "08030000000",
  taxId: "TIN-123456789",
  RCNumber: "RC123456",
  industry: "Technology",
  logo: null,
  creatorId: "USER-001",
  isActive: true,
  isDeleted: false,
  deletedAt: null,
  createdAt: "2026-01-01",
  updatedAt: "2026-01-01",
};

const departments = [
  "Engineering",
  "Finance",
  "HR",
  "Design",
  "Marketing",
  "Operations",
];

const positions = [
  "Frontend Developer",
  "Backend Developer",
  "UI Designer",
  "HR Manager",
  "Accountant",
  "Product Manager",
];

const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "David",
  "Emily",
  "Daniel",
  "Grace",
  "Samuel",
  "Victoria",
  "James",
  "Sophia",
  "Henry",
  "Ruth",
  "Peter",
  "Olivia",
  "Joseph",
  "Blessing",
];

const lastNames = [
  "Doe",
  "Smith",
  "Johnson",
  "Wilson",
  "Brown",
  "Davis",
  "Miller",
  "Anderson",
  "Taylor",
  "Thomas",
  "Jackson",
  "White",
  "Lewis",
  "Young",
  "King",
  "Hall",
  "Scott",
  "Walker",
];

const statuses: Payslip["status"][] = [
  "PAID","FAILED"
];

const payrollStatus: PayrollItem["status"][] = [
  "SUCCESSFULL",
  "PROCESSING",
  "PENDING",
  "FAILED",
];

function makeEmployee(index: number): Employee {
  return {
    id: `EMP-${String(index).padStart(3, "0")}`,
    companyId: company.id,
    firstName: firstNames[index % firstNames.length],
    lastName: lastNames[index % lastNames.length],
    email: `employee${index}@paycore.dev`,
    phone: `0803${String(1000000 + index).slice(0, 7)}`,
    emailVerified: true,
    isActive: true,
    isDeleted: false,
    leaveEndDate: new Date(),
    leaveStartDate: new Date(),
    leaveStatus: "NONE",
    taxId: `TIN-${index}`,
    position: positions[index % positions.length],
    picture: "/images/user.png",
    department: departments[index % departments.length],
    salary: 200000 + index * 10000,
    startDate: "2025-01-01",
  };
}

function makeBank(employeeId: string, index: number): Bank {
  return {
    id: `BANK-${String(index).padStart(3, "0")}`,
    bankName: [
      "GTBank",
      "Access Bank",
      "UBA",
      "Zenith Bank",
      "First Bank",
      "Sterling Bank",
    ][index % 6],
    accountName: `${firstNames[index % firstNames.length]} ${
      lastNames[index % lastNames.length]
    }`,
    accountNumber: 1000000000 + index,
    bankCode: 58,
    employeeId,
    isPrimary: true,
  };
}

function makePayroll(index: number): PayrollItem {
  return {
    id: `PAYROLL-${String(index).padStart(3, "0")}`,
    companyId: company.id,
    name: `${new Date(2026, index % 12).toLocaleString("default", {
      month: "long",
    })} Payroll`,
    month: index % 12,
    year: 2026,
    status: payrollStatus[index % payrollStatus.length],
    isDeleted: false,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  };
}

function makePayslip(index: number): Payslip {
  const employee = makeEmployee(index);
  const bank = makeBank(employee.id!, index);
  const payroll = makePayroll(index);

  const basicSalary = employee.salary;
  const allowance = 20000 + index * 1000;
  const pension = Math.round(basicSalary * 0.08);
  const tax = Math.round(basicSalary * 0.05);

  const totalEarnings = basicSalary + allowance;
  const totalDeductions = pension + tax;
  const netSalary = totalEarnings - totalDeductions;

  return {
    id: `PAY-${String(index).padStart(3, "0")}`,

    employeeId: employee.id!,
    payrollId: payroll.id,
    companyId: company.id,
    bankId: bank.id,

    basicSalary,
    allowances: allowance,

    // earnings: [
    //   {
    //     title: "Housing Allowance",
    //     amount: allowance,
    //   },
    // ],

    // deductions: [
    //   {
    //     title: "Pension",
    //     amount: pension,
    //   },
    //   {
    //     title: "PAYE",
    //     amount: tax,
    //   },
    // ],

    tax,

    totalEarnings,
    totalDeductions,
    payoutAmount: netSalary,
    netSalary,

    status: statuses[index % statuses.length],

    paymentDate:
      statuses[index % statuses.length] === "PAID"
        ? `2026-${String((index % 12) + 1).padStart(2, "0")}-28`
        : "",

    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
    deletedAt: null,
    isDeleted: false,

    Employee: employee,
    Bank: bank,
    Company: company,
    Payroll: payroll,
  };
}

export const payslipData: Payslip[] = Array.from(
  { length: 30 },
  (_, index) => makePayslip(index + 1)
);