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

const authUserStorage = createJSONStorage<AuthUser | null>(
    () => (typeof window !== 'undefined' ? window.localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
    })
);

export const authUserAtom = atomWithStorage<AuthUser | null>(
    "paycore:auth-user",
    null,
    authUserStorage
);