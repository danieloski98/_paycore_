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
        change_employee_password: (id: string) => `/employees/${id}/password`,
    },
    users: {
        update_user: (id: string) => `/CompanyUsers/${id}`
    },
    employees: {
        add_employee: '/employees',
        upload_employees: '/employees/bulk',
        get_employees: '/employees/company/all',
        get_employee: (id: string) => `/employees/company/${id}`,
        get_employee_id: (id: string) => `/employees/${id}`,
        setup_password: (id: string) => `/employees/${id}/password`,
        edit_employee: (id: string) => `/employees/${id}`,
        delete_employee: (id: string) => `/employees/${id}`
    },
    payroll: {
        create_payroll: "/payroll",
        get_payroll: "/payroll/company",
        edit_payroll: (id: string) => `/payroll/${id}`,
        delete_payroll: (id: string) => `/payroll/${id}`,
        start_payroll_processing: (id: string) => `/payroll/${id}/start-processing`
        // `${URLS.payroll}/${payrollId}/start-processing`
    },
    payslip: {
        get_payslip_by_payroll_id: (payrollId: string) => `/payslips/payroll/${payrollId}`
    },
    leave: {
        create_leave: "/leave",
        get_leave_for_employee: (employeeId: string) => `/leave/employee/${employeeId}`,
        get_leave_by_id: (leaveId: string) => `/leave/${leaveId}`,
        get_company_leaves: '/leave/company',
        update_leave_status: (leaveId: string) => `/leave/${leaveId}/status`,

    },
    bank: {
        get_banks: '/bank',
        create_bank: '/bank',
        validate_bank: '/bank/validate',
        primary_bank: (bankId: string) => `/bank/${bankId}/primary`,
        delete_bank: (bankId: string) => `/bank/${bankId}`
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
        update_company: (id: string) => `/company/${id}`,
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