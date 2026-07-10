// sample-data/payroll.ts

export type Payroll = {
  id: string
  employee: string
  amount: number
  month: string
  status: "Paid" | "Pending"
}

export const payrollData: Payroll[] = [
  {
    id: "1",
    employee: "Amina Jibril",
    amount: 450000,
    month: "July 2026",
    status: "Paid",
  },
  {
    id: "2",
    employee: "Emeka Okafor",
    amount: 620000,
    month: "July 2024",
    status: "Pending",
  },
  {
    id: "3",
    employee: "John David",
    amount: 300000,
    month: "July 2026",
    status: "Paid",
  },
   {
    id: "3",
    employee: "John David",
    amount: 300000,
    month: "July 2020",
    status: "Paid",
  },
   {
    id: "3",
    employee: "John David",
    amount: 300000,
    month: "July 2026",
    status: "Paid",
  },
   {
    id: "3",
    employee: "John David",
    amount: 300000,
    month: "July 2020",
    status: "Paid",
  },
   {
    id: "3",
    employee: "John David",
    amount: 300000,
    month: "July 2026",
    status: "Paid",
  },
   {
    id: "3",
    employee: "John David",
    amount: 300000,
    month: "July 2026",
    status: "Paid",
  },
]