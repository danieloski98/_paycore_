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

export const addEmployeeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required"),

  position: z
    .string()
    .trim()
    .min(1, "Position is required"),

  department: z
    .string()
    .trim()
    .min(1, "Department is required"),

  salary: z.coerce
    .number({ message: "Salary must be a number" })
    .positive("Salary must be greater than zero"),

  startDate: z.string().min(1, "Start date is required"),
});

export const uploadEmployeesSchema = z.object({
  employees: z.array(addEmployeeSchema).min(1, "Please upload at least one employee"),
});

export const departmentSchema = z.object({
  name: z.string().min(1, "Department is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) => data.newPassword !== data.currentPassword,
    {
      message:
        "New password must be different from current password",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => data.confirmPassword === data.newPassword,
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

export const companySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Company name is required"),

  RCNumber: z
    .string()
    .trim()
    .min(1, "RC Number is required"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required"),

  industry: z
    .string()
    .trim()
    .min(1, "Industry is required"),

  phone: z
    .string()
    .trim()
    .nullable()
    .optional(),

  taxId: z
    .string()
    .trim()
    .nullable()
    .optional(),

  logo: z
    .string()
    .nullable()
    .optional(),
});

export const userRoleEnum = z.enum([
  "SUPER_ADMIN",
  "ADMIN",
  "USER",
  "EMPLOYEE",
]);

export const userSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  role: z.string(),
  picture: z.string().nullable(),
  isActive: z.boolean(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export type CompanyFormValues = z.infer<typeof companySchema>;

export type ChangePasswordFormValues = z.infer<
  typeof changePasswordSchema
>;

export type AddEmployeeFormValues = z.infer<typeof addEmployeeSchema>;
export type UploadEmployeesFormValues = z.infer<
  typeof uploadEmployeesSchema
>;

export type DepartmentFormValues = z.infer<typeof departmentSchema>
export type CreateCompanyUserAccountFormValues = z.infer<typeof createCompanyUserAccountSchema>;
export type CompanyUserLoginFormValues = z.infer<typeof companyUserLoginSchema>;
export type EmployeeLoginFormValues = z.infer<typeof employeeLoginSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type CompanyUserSetupFormValues = z.infer<typeof companyUserSetupSchema>
export type VerifyOTPFormValues = z.infer<typeof verifyOTPSchema>
