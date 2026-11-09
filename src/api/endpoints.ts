/**
 * ===================================================================
 * ĐỊNH NGHĨA CÁC ĐƯỜNG DẪN API (ENDPOINTS) CỦA HỆ THỐNG
 * ===================================================================
 *
 * Tất cả các URL endpoint của Backend được quản lý tập trung tại đây.
 * Nếu Backend của bạn thay đổi path (ví dụ: đổi sang /api/v1/auth/login),
 * bạn chỉ cần chỉnh sửa tại file này mà không cần sửa ở nhiều nơi.
 */

export const API_ENDPOINTS = {
  /** Phân hệ Xác thực & Tài khoản */
  AUTH: {
    /** Đăng nhập hệ thống (POST) */
    LOGIN: '/api/login/account',
    /** Đăng ký tài khoản mới (POST) */
    REGISTER: '/api/register',
    /** Lấy thông tin người dùng hiện tại theo Token (GET) */
    CURRENT_USER: '/api/currentUser',
    /** Đăng xuất hệ thống (POST) */
    LOGOUT: '/api/login/outLogin',
    /** Lấy mã xác thực Captcha/SMS (GET) */
    CAPTCHA: '/api/login/captcha',
  },

  /** Phân hệ Thông báo */
  NOTICES: {
    /** Lấy danh sách thông báo của người dùng (GET) */
    LIST: '/api/notices',
  },

  /** Phân hệ Quy tắc / Quản trị */
  RULES: {
    /** Danh sách quy tắc (GET) */
    LIST: '/api/rule',
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
