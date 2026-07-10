export const URLS = {
    auth: {
        company_signup: '',
        create_company_user_account: '/user-auth/create-company-user',
        company_user_login: '/user-auth/login',
        company_user_setup: (userId: string) => `/company/${userId}`,
        employee_login: '/employees/login',
        forgot_password: '/user-auth/password-reset',
        verify_otp: ""
    },
    employees:{
        add_employee: '/employees',
        upload_employees: '/employees/bulk'
    },
    company: {
        create_company_account: (userId: string) => `/company/${userId}`
    },
    wallet: {
        get_wallet_balance: (company_id: string) => `/wallet/${company_id}`,
        create_payment: (company_id: string) => `/payment/${company_id}`,
        validate_payment: `/payment/validate/status`,
        get_payment_history: (company_id: string) => `/payment/company/${company_id}`,
    }
}