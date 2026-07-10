// sample-data/employees.ts

export type Employee = {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: "Active" | "On Leave" | "Inactive"
  avatar: string
}

export const employees: Employee[] = [
  {
    id: "1",
    name: "Amina Jibril",
    email: "amina.j@paystream.ng",
    department: "Engineering",
    role: "Lead Backend Developer",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Emeka Okafor",
    email: "e.okafor@paystream.ng",
    department: "Finance",
    role: "Senior Accountant",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    name: "Tunde Balogun",
    email: "t.balogun@paystream.ng",
    department: "Operations",
    role: "Operations Manager",
    status: "On Leave",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    name: "Chidi Nwosu",
    email: "c.nwosu@paystream.ng",
    department: "Sales",
    role: "Regional Head",
    status: "Active",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
]