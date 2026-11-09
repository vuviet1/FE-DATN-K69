/**
 * ===================================================================
 * ĐỊNH NGHĨA KIỂU DỮ LIỆU DÙNG CHO CÁC API
 * ===================================================================
 */

/** Dữ liệu gửi lên khi đăng nhập */
export interface LoginParams {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
  [key: string]: any;
}

/** Kết quả trả về khi đăng nhập thành công */
export interface LoginResult {
  status?: string;
  type?: string;
  currentAuthority?: string;
  token?: string;
  accessToken?: string;
  data?: {
    token?: string;
    accessToken?: string;
    role?: string;
    currentAuthority?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/** Dữ liệu gửi lên khi đăng ký */
export interface RegisterParams {
  mail?: string;
  email?: string;
  username?: string;
  password?: string;
  confirm?: string;
  mobile?: string;
  prefix?: string;
  captcha?: string;
  role?: string;
  fullName?: string;
  [key: string]: any;
}

/** Kết quả trả về khi đăng ký */
export interface RegisterResult {
  status?: 'ok' | 'error' | string;
  currentAuthority?: string;
  data?: any;
  message?: string;
  [key: string]: any;
}

/** Thông tin người dùng hiện tại */
export interface CurrentUser {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: { key?: string; label?: string }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  role?: string;
  phone?: string;
  [key: string]: any;
}
