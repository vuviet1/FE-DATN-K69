/**
 * @file index.ts
 * @description Authentication & Token Helper theo chuẩn mes-client-es
 */

import type { AxiosRequestConfig } from 'axios';
import requester from '../../requester';

export const getToken = (): string | null => {
  let accessToken =
    localStorage.getItem('access_token') || localStorage.getItem('token');
  if (!accessToken) {
    const userData: string | null = localStorage.getItem('userData');
    if (userData?.length) {
      try {
        const parsed = JSON.parse(userData);
        accessToken =
          parsed.id_token || parsed.token || parsed.accessToken || null;
      } catch {
        return null;
      }
    }
  }
  return accessToken;
};

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const authApi = {
  getToken,
  getCurrentUserApi: () => requester.get('/api/currentUser', {}, config),
  loginApi: (data: any) => requester.post('/api/login/account', data),
  logoutApi: () => requester.post('/api/login/outLogin', {}, config),
};

export default { authApi };
