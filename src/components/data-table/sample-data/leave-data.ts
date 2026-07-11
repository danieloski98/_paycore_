export type Leave = {
  id: string
  employee: string
  department: string
  days: number
  status: "Pending" | "Approved"
}

export const leaves: Leave[] = [
  {
    id: "1",
    employee: "Amina Jibril",
    department: "Engineering",
    days: 14,
    status: "Approved",
  },
  {
    id: "2",
    employee: "Emeka Okafor",
    department: "Finance",
    days: 7,
    status: "Pending",
  },
]