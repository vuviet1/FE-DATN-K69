/**
 * @file requester.ts
 * @description HTTP Client Wrapper (Axios) theo chuẩn cấu hình mes-client-es
 */

import { message } from 'antd';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { getToken } from './api/system/auth';

// Global response interceptor — ngăn chặn crash và xử lý mã lỗi tập trung
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
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
      message.error('Lỗi kết nối mạng. Vui lòng kiểm tra lại.');
    } else if (error.response?.data?.message) {
      message.error(error.response.data.message);
    }
    return Promise.reject(error);
  },
);

// Interceptor tự động bổ sung Bearer Token nếu chưa có trong headers
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && config.headers && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const responseBody = <T = any>(response: AxiosResponse<T>): T => response.data;

export const requester = {
  get: <T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => axios.get(url, { params, ...config }).then(responseBody),

  post: <T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => axios.post(url, data, config).then(responseBody),

  put: <T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => axios.put(url, data, config).then(responseBody),

  delete: <T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<T> => axios.delete(url, { params, ...config }).then(responseBody),

  export: (
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<Blob> =>
    axios
      .post(url, data, { responseType: 'blob', ...config })
      .then(responseBody),

  postForm: <T = any>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> =>
    axios
      .postForm(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        ...config,
      })
      .then(responseBody),
};

export default requester;
