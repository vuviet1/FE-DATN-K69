// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { API_ENDPOINTS } from '@/api/endpoints';

// Tái xuất (re-export) các API xác thực từ thư mục chuẩn src/api
export {
  currentUser,
  getCurrentUserApi,
  getCaptchaApi,
  getFakeCaptcha,
  login,
  loginApi,
  logoutApi,
  outLogin,
  register,
  registerApi,
} from '@/api';

/** Lấy danh sách thông báo GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>(API_ENDPOINTS.NOTICES.LIST, {
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
  return request<API.RuleList>(API_ENDPOINTS.RULES.LIST, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Cập nhật quy tắc PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(API_ENDPOINTS.RULES.LIST, {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** Tạo mới quy tắc POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>(API_ENDPOINTS.RULES.LIST, {
    method: 'POST',
    data: {
      method: 'post',
      ...(options || {}),
    },
  });
}

/** Xóa quy tắc DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>(API_ENDPOINTS.RULES.LIST, {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
