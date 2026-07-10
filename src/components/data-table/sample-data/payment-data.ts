export type Payment = {
  id: string
  beneficiary: string
  amount: number
  date: string
  status: "Completed" | "Pending"
}

export const payments: Payment[] = [
  {
    id: "1",
    beneficiary: "GTBank",
    amount: 2400000,
    date: "Jun 20",
    status: "Completed",
  },
  {
    id: "2",
    beneficiary: "UBA",
    amount: 1800000,
    date: "Jun 22",
    status: "Pending",
  },
]