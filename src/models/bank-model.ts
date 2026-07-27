
export interface Bank {
    id: string;
    bankName: string;
    accountNumber: number;
    accountName: string;
    bankCode: number;
    employeeId: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: undefined;
    isDeleted?: boolean;
    isPrimary?: boolean;
}