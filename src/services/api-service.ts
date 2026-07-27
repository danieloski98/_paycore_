import { create, type AxiosError } from 'axios';

const httpClient = create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data as any;

    const isForbidden = status === 403 || data?.statusCode === 403 || data?.message === "Forbidden resource";

    if (status === 401 && !isForbidden) {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('token');

        let userType: string | null = null;
        const stored = window.localStorage.getItem('paycore:user-type');
        if (stored) {
          try {
            userType = JSON.parse(stored);
          } catch {
            userType = stored;
          }
        }

        const loginPath = userType === 'EMPLOYEE' ? '/employee-login' : '/company-login';
        window.location.href = loginPath;
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;