export type EmployeeType = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    picture: string;
    department: string;
    salary: number;
    startDate: string;
    updatedAt?: string;
    createdAt?: string;
  }
  

  

  export interface Employee {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    picture: string;
    department: string;
    address: string;
    salary: number;
    startDate: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface EditEmployeeForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    salary: string;
    startDate: string;
  }
  
  export interface EmployeeResponse {
    data: Employee[];
    limit: number;
    page: number;
    total: number;
    totalPages: number;
    message: string;
    success: boolean;
  }
