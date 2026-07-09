export type GeneralResponse<T = unknown> = {
    success: boolean;
    message: string;
    data?: T;
    page?: number;
    total?: number;
}
