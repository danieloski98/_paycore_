export const URLS = {
    auth: {
        company_signup: '',
        create_company_user_account: '/user-auth/create-company-user'
    },
    company: {
        create_company_account: (userId: string) => `/company/${userId}`
    }
}