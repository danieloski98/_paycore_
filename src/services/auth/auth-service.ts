import { CompanyUserLoginPayload, CompanyUserSetupPayload, CreateCompanyUserAccountPayload, EmployeeLoginPayload, ForgotPasswordPayload, VerifyOTPPayload } from "@/lib/auth/payload";
import httpClient from "../api-service";
import { URLS } from "@/lib/urls";

export function create_company_account(payload: CreateCompanyUserAccountPayload) {
    return httpClient.post(URLS.auth.create_company_user_account, payload);
}

export function company_user_login(payload: CompanyUserLoginPayload) {
    return httpClient.post(URLS.auth.company_user_login, payload);
}

export function employee_login(payload: EmployeeLoginPayload) {
    return httpClient.post(URLS.auth.employee_login, payload);
}


export function company_user_setup(userId: string, payload: CompanyUserSetupPayload) {
    return httpClient.post(URLS.auth.company_user_setup(userId), payload);
}


export function forgot_passord(payload: ForgotPasswordPayload) {
    return httpClient.post(URLS.auth.forgot_password, payload);
}

export function verify_otp(payload: VerifyOTPPayload) {
    return httpClient.post(URLS.auth.forgot_password, payload);
}


