
import { URLS } from "@/lib/urls";
import { CompanyFormValues } from "@/lib/schemas";
import httpClient from "@/services/api-service";

export const get_company = (id: string) => {
    return httpClient.get(URLS.company.get_company(id));
};

type UpdateCompanyPayload = {
    id: string;
    payload: Partial<CompanyFormValues>
}

export const update_company = (
    { id, payload }: UpdateCompanyPayload
) => {
    return httpClient.patch(
        URLS.company.update_company(id),
        payload
    );
};


// export const upload_company_logo = (file: File) => {
//   const formData = new FormData();

//   formData.append("file", file);

//   return httpClient.post(
//     URLS.company.upload_logo,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );
// };

// export const update_company_logo = (
//   logo: string
// ) => {
//   return httpClient.patch(
//     URLS.company.update_company,
//     {
//       logo,
//     }
//   );
// };