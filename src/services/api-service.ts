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
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('token');
      }
    }

    return Promise.reject(error);
  },
);

export default httpClient;