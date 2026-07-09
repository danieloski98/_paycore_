import { z } from 'zod'

export const createCompanyUserAccountSchema = z.object({
    first_name: z.string().trim().min(1, 'First name is required'),
    last_name: z.string().trim().min(1, 'Last name is required'),
    email: z.string().trim().email('Enter a valid email address'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    phone: z
        .string()
        .trim()
        .regex(
            /^\+[1-9]\d{6,14}$/,
            "Enter a valid phone number (e.g. +2348044645758)"
        ),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "USER"], {
        error: "Please select a valid role",
    }),
});

export const companyUserLoginSchema = z.object({
    email: z.string().trim().email('Enter a valid email address'),
    password: z.string().min(8, 'Must be at least 8 characters'),
});

export const employeeLoginSchema = z.object({
    email: z.string().trim().email('Enter a valid email address'),
    password: z.string().min(8, 'Must be at least 8 characters'),
});

export const forgotPasswordSchema = z.object({
    email: z.email('Enter a valid email address').trim(),
    type: z.string()
});

export const verifyOTPSchema = z.object({
    otp: z.int('Enter a valid email address').min(6),
});

export const companyUserSetupSchema = z.object({
    name: z.string().trim().min(1, "Company name is required"),

    RCNumber: z.string().trim().min(1, "RC Number is required"),

    address: z.string().trim().min(1, "Company address is required"),

    industry: z.string().trim().min(1, "Please select an industry"),

    logo: z.string()
});

export type CreateCompanyUserAccountFormValues = z.infer<typeof createCompanyUserAccountSchema>;
export type CompanyUserLoginFormValues = z.infer<typeof companyUserLoginSchema>;
export type EmployeeLoginFormValues = z.infer<typeof employeeLoginSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type CompanyUserSetupFormValues = z.infer<typeof companyUserSetupSchema>
export type VerifyOTPFormValues = z.infer<typeof verifyOTPSchema>
