// sample-data/departments.ts

export interface Department {
  id: string;
  name: string;
}

export interface DepartmentPayload {
  name: string;
}

export const departmentData: Department[] = [
  {
    id: "1",
    name: "Engineering",
  },
  {
    id: "2",
    name: "Finance",
  },
  {
    id: "3",
    name: "Human Resources",
  },
  {
    id: "4",
    name: "Marketing",
  },
];