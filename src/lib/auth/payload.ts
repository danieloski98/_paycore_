export interface CreateCompanyUserAccountPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: string
}

export interface CompanyUserLoginPayload {
    email: string;
    password: string;
}

export interface EmployeeLoginPayload {
    email: string;
    password: string;
}


export interface ForgotPasswordPayload {
    email: string;
    type: string
}


export interface VerifyOTPPayload {
    otp: number;
}

export interface ChangePasswordPayload {
  userId: string;
  newPassword: string;
  type: string;
}

export interface CompanyUserSetupPayload {
    name: string;
    RCNumber: string;
    address: string;
    industry: string;
    logo?: string
}
