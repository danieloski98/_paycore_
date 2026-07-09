import httpClient from "@/services/api-service";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();

            formData.append("files", file);

            return httpClient.post(
                "/upload/single",
                formData,
                {
                    headers: {
                        "Content-Type": undefined,
                    },
                }
            );
        },
    });
};