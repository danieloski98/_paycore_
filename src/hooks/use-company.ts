
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { CompanyFormValues } from "@/lib/schemas";
import { Company } from "@/models/company";
import { get_company, update_company } from "@/services/settings/company/company-service";
import { AxiosResponse } from "axios";
import { GeneralResponse } from "@/lib/types";
import { upload_image } from "@/services/upload/upload-service";

export const useGetCompany = (id: string) => {
    const query = useQuery<
        AxiosResponse<GeneralResponse<Company>>
    >({
        queryKey: ["company", id],
        queryFn: () => get_company(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });

    return {
        ...query,
        company: query.data?.data.data,
    };
};

export const useUpdateCompany = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update_company", id],

        mutationFn: (payload: Partial<CompanyFormValues>) =>
            update_company({
                id,
                payload,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["company", id],
            });
        },
    });
};

// use-company.ts

interface UpdateCompanyLogoPayload {
    companyId: string;
    file: File;
}

export const useUpdateCompanyLogo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["update-company-logo"],

        mutationFn: async ({ companyId, file }: UpdateCompanyLogoPayload) => {
            const uploadRes = await upload_image(file);
            const logo = uploadRes?.data; // per your console.log, this is already the URL string

            if (!logo) {
                throw new Error("No image URL returned");
            }

            const result = await update_company({
                id: companyId,
                payload: { logo },
            });

            console.log(result)

            return logo as string;
        },

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["company", variables.companyId],
            });
        },
    });
};

