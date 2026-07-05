import { CreateCompanyUserAccountPayload } from '@/lib/auth/payload'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { create_company_account } from '@/services/auth/auth-service';
import { GeneralResponse } from '@/lib/types';
import { AxiosResponse } from 'axios';

export const useCreateCompanyUserAccount = (payload: CreateCompanyUserAccountPayload) => {
    // you can now make use of this hook in your components to create a company user account
    const { isPending, mutate, error } = useMutation<AxiosResponse<GeneralResponse<any>>>({
        mutationFn: async () => create_company_account(payload),
        mutationKey: ['create_company_user_account', payload],
    });
    return {
        isPending,
        mutate,
        error
    }
}