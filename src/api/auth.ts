import { request } from '@umijs/max';
import { API_ENDPOINTS } from './endpoints';
import type {
  CurrentUser,
  LoginParams,
  LoginResult,
  RegisterParams,
  RegisterResult,
} from './types';

/**
 * API Đăng nhập tài khoản
 * @param body Thông tin đăng nhập (username/email, password, type)
 * @param options Tùy chọn request bổ sung
 */
export async function login(
  body: LoginParams,
  options?: Record<string, unknown>,
) {
  return request<LoginResult>(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * API Đăng ký tài khoản người dùng
 * @param body Thông tin đăng ký (email, password, role, mobile, ...)
 * @param options Tùy chọn request bổ sung
 */
export async function register(
  body: RegisterParams,
  options?: Record<string, unknown>,
) {
  return request<RegisterResult>(API_ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * API Lấy thông tin người dùng hiện tại theo Token đăng nhập
 * @param options Tùy chọn request bổ sung
 */
export async function currentUser(options?: Record<string, unknown>) {
  return request<{ data: CurrentUser | API.CurrentUser }>(
    API_ENDPOINTS.AUTH.CURRENT_USER,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/**
 * API Đăng xuất tài khoản
 * @param options Tùy chọn request bổ sung
 */
export async function outLogin(options?: Record<string, unknown>) {
  return request<Record<string, unknown>>(API_ENDPOINTS.AUTH.LOGOUT, {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * API Lấy mã xác thực Captcha / SMS
 * @param params Tham số gồm số điện thoại
 * @param options Tùy chọn request bổ sung
 */
export async function getFakeCaptcha(
  params: { phone?: string },
  options?: Record<string, unknown>,
) {
  return request<API.FakeCaptcha>(API_ENDPOINTS.AUTH.CAPTCHA, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// Xuất các alias rõ nghĩa để lập trình viên có thể tùy chọn import theo thói quen
export const loginApi = login;
export const registerApi = register;
export const getCurrentUserApi = currentUser;
export const logoutApi = outLogin;
export const getCaptchaApi = getFakeCaptcha;
