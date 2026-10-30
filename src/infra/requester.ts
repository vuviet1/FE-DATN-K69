/**
 * @file requester.ts
 * @description HTTP Client Wrapper (Axios) theo chuẩn mes-client-es becoxy
 */

import { message } from 'antd';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

// Lấy token xác thực từ LocalStorage
export const getToken = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    return token ? token : null;
  } catch {
    return null;
  }
};

const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: tự động đính kèm Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: xử lý mã lỗi toàn cục
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
        window.location.href = '/user/login';
      }
    } else if (!error.response) {
      message.error(
        'Lỗi kết nối mạng máy chủ. Vui lòng kiểm tra lại đường truyền!',
      );
    } else if (error.response?.data?.message) {
      message.error(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

const responseBody = <T = any>(response: AxiosResponse<T>): T => response.data;

export const requester = {
  get: <T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> =>
    axiosInstance.get(url, { params, ...config }).then(responseBody),

  post: <T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => axiosInstance.post(url, data, config).then(responseBody),

  put: <T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => axiosInstance.put(url, data, config).then(responseBody),

  delete: <T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> =>
    axiosInstance.delete(url, { params, ...config }).then(responseBody),

  export: (
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<Blob> =>
    axiosInstance
      .post(url, data, { responseType: 'blob', ...config })
      .then(responseBody),

  postForm: <T = any>(
    url: string,
    data: FormData,
    config: AxiosRequestConfig = {},
  ): Promise<T> =>
    axiosInstance
      .post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        ...config,
      })
      .then(responseBody),
};

export default requester;
