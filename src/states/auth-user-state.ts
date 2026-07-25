import { Employee } from "@/models/employee-models";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface AuthUser {
    id: string;
    companyId: string | null;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    picture: string | null;
    role: "SUPER_ADMIN" | "ADMIN" | "USER" | "EMPLOYEE";
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

// Create a safe storage provider that works with SSR
const createSafeStorage = () => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return window.localStorage;
};

const employeeStorage = createJSONStorage<Employee | null>(() => createSafeStorage());

export const employeeAtom = atomWithStorage<Employee | null>(
  "paycore:employee",
  null,
  employeeStorage
);

const authUserStorage = createJSONStorage<AuthUser | null>(() => createSafeStorage());

export const authUserAtom = atomWithStorage<AuthUser | null>(
    "paycore:auth-user",
    null,
    authUserStorage
);