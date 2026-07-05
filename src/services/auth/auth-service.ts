import { CreateCompanyUserAccountPayload } from "@/lib/auth/payload";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";

export function create_company_account(payload: CreateCompanyUserAccountPayload) {
    return httpClient.post(URLS.auth.create_company_user_account, payload);
}
