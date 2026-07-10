export type GeneralResponse<T = unknown> = {
    // success: boolean;
    // message: string;
    data?: T;
    page?: number;
    total?: number;
}

export type WalletReturnType = {
    balance: number;
    companyId: string;
    createdAt: string;
    currency: string;
    id: string;
    isDeleted: boolean;
    updatedAt: string;
    deletedAt: string;
}
