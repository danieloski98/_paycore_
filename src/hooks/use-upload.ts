import httpClient from "@/services/api-service";
import { upload_image } from "@/services/upload/upload-service";
import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (file: File) => upload_image(file)
    });
};

// export const useUploadImage = () => {
//     return useMutation({
//         mutationFn: async (file: File) => {
//             const formData = new FormData();

//             formData.append("files", file);

//             return httpClient.post(
//                 "/upload/single",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": undefined,
//                     },
//                 }
//             );
//         },
//     });
// };