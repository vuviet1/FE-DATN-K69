// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Lấy thông tin người dùng hiện tại GET */
export async function currentUser(options?: { [key: string]: any }) {
  const path = process.env.UMI_APP_API_CURRENT_USER_PATH || '/api/currentUser';
  return request<{
    data: API.CurrentUser;
  }>(path, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Đăng xuất tài khoản POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Đăng nhập tài khoản POST */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  const path = process.env.UMI_APP_API_LOGIN_PATH || '/api/login/account';
  return request<API.LoginResult>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Đăng ký tài khoản POST */
export async function register(body: Record<string, any>, options?: { [key: string]: any }) {
  const path = process.env.UMI_APP_API_REGISTER_PATH || '/api/register';
  return request<Record<string, any>>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Lấy danh sách thông báo GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Lấy danh sách quy tắc GET /api/rule */
export async function rule(
  params: {
    // query
    /** Trang hiện tại */
    current?: number;
    /** Kích thước trang */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Cập nhật quy tắc PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** Tạo mới quy tắc POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** Xóa quy tắc DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
