export type GeneralResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
    page?: number;
    total?: number;
}
