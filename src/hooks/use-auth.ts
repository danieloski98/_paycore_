import { CompanyUserLoginPayload, CompanyUserSetupPayload, CreateCompanyUserAccountPayload, ForgotPasswordPayload, VerifyOTPPayload } from '@/lib/auth/payload'
import { useMutation } from '@tanstack/react-query'
import { company_user_login, company_user_setup, create_company_account, forgot_passord, verify_otp } from '@/services/auth/auth-service';
import { GeneralResponse } from '@/lib/types';
import { AxiosError, AxiosResponse } from 'axios';

export const useCreateCompanyUserAccount = () => {
    // you can now make use of this hook in your components to create a company user account
    const { isPending, mutate, error } = useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse>, CreateCompanyUserAccountPayload>({
        mutationFn: async (payload) => create_company_account(payload),
        mutationKey: ['create_company_user_account'],
    });
    return {
        isPending,
        mutate,
        error
    }
}

export const useCompanyLogin = () => {
    // you can now make use of this hook in your components to create a company user account
    const { isPending, mutate, error } = useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse>, CompanyUserLoginPayload>({
        mutationFn: async (payload) => company_user_login(payload),
        mutationKey: ['create_user_login'],
    });
    return {
        isPending,
        mutate,
        error
    }
}

export const useEmployeeLogin = () => {
    // you can now make use of this hook in your components to create a company user account
    const { isPending, mutate, error } = useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse>, CompanyUserLoginPayload>({
        mutationFn: async (payload) => company_user_login(payload),
        mutationKey: ['employee_login'],
    });
    return {
        isPending,
        mutate,
        error
    }
}

type CompanySetupVariables = {
    userId: string;
    payload: CompanyUserSetupPayload;
};

export const useCompanySetup = () => {
    const { isPending, mutate, error } = useMutation<
        AxiosResponse<GeneralResponse<unknown>>,
        AxiosError<GeneralResponse>,
        CompanySetupVariables
    >({
        mutationKey: ["company_setup"],
        mutationFn: ({ userId, payload }) =>
            company_user_setup(userId, payload),
    });

    return {
        isPending,
        mutate,
        error,
    };
};

export const useForgotPassword = () => {
    // you can now make use of this hook in your components to create a company user account
    const { isPending, mutate, error } = useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse>, ForgotPasswordPayload>({
        mutationFn: async (payload) => forgot_passord(payload),
        mutationKey: ['forgot_password'],
    });
    return {
        isPending,
        mutate,
        error
    }
}

export const useVerifyOTP = () => {
    // you can now make use of this hook in your components to create a company user account
    const { isPending, mutate, error } = useMutation<AxiosResponse<GeneralResponse<unknown>>, AxiosError<GeneralResponse>, VerifyOTPPayload>({
        mutationFn: async (payload) => verify_otp(payload),
        mutationKey: ['verify_otp'],
    });
    return {
        isPending,
        mutate,
        error
    }
}
