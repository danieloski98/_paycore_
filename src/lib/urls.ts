export const URLS = {
    auth: {
        company_signup: '',
        create_company_user_account: '/user-auth/create-company-user',
        company_user_login: '/user-auth/login',
        company_user_setup: (userId: string) => `/company/${userId}`,
        employee_login: '/employees/login',
        forgot_password: '/user-auth/password-reset',
        verify_otp: "",
        change_password: "/user-auth/change-password",
    },
    users: {
        update_user: (id: string) => `/CompanyUsers/${id}`
    },
    employees: {
        add_employee: '/employees',
        upload_employees: '/employees/bulk',
        get_employees: '/employees/company/all',
        edit_employee: (id: string) => `/employees/${id}`,
        delete_employee: (id: string) => `/employees/${id}`
    },
    payroll: {
        create_payroll: "/payroll",
        get_payroll: "/payroll/company",
        delete_payroll: (id: string) => `/payroll/${id}`
    },
    department: {
        add_department: "/departments",
        get_department: "/departments",
        update_department: (id: string) => `/departments/${id}`,
        delete_department: (id: string) => `/departments/${id}`,
    },
    company: {
        create_company_account: (userId: string) => `/company/${userId}`,
        get_company: (id: string) => `/company/${id}`,
        update_company: (id: string) => `company/${id}`,
    },
    upload: {
        upload_file: ""
    },
    wallet: {
        get_wallet_balance: (company_id: string) => `/wallet/${company_id}`,
        create_payment: (company_id: string) => `/payment/${company_id}`,
        validate_payment: `/payment/validate/status`,
        get_payment_history: (company_id: string) => `/payment/company/${company_id}`,
    }
}