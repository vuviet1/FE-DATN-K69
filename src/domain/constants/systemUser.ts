/**
 * @file systemUser.ts
 * @description Định nghĩa các hằng số Tài khoản hệ thống theo chuẩn Mes-Client-ES
 */

export const SYSTEM_USER = {
  ACTION_TYPES: {
    GET_PAGING: 'SYSTEM_USER/GET_PAGING',
    GET_BY_ID: 'SYSTEM_USER/GET_BY_ID',
    ADD: 'SYSTEM_USER/ADD',
    UPDATE: 'SYSTEM_USER/UPDATE',
    DELETE: 'SYSTEM_USER/DELETE',
    TOGGLE_STATUS: 'SYSTEM_USER/TOGGLE_STATUS',
    RESET_PASSWORD: 'SYSTEM_USER/RESET_PASSWORD',
  },
  URL_API: {
    GET_PAGING_API: '/api/system/users',
    GET_BY_ID_API: '/api/system/users/:id',
    ADD_API: '/api/system/users',
    UPDATE_API: '/api/system/users/:id',
    DELETE_API: '/api/system/users/:id',
    TOGGLE_STATUS_API: '/api/system/users/:id/toggle-status',
    RESET_PASSWORD_API: '/api/system/users/:id/reset-password',
  },
  ROLES: [
    { label: 'Quản trị viên (Admin)', value: 'admin', color: 'red' },
    { label: 'Quản lý đào tạo', value: 'manager', color: 'purple' },
    { label: 'Giảng viên', value: 'lecturer', color: 'blue' },
    { label: 'Sinh viên', value: 'student', color: 'green' },
  ],
  STATUS_OPTIONS: [
    { label: 'Đang hoạt động', value: 'active', status: 'Success' },
    { label: 'Đã khóa', value: 'locked', status: 'Error' },
  ],
  DEPARTMENTS: [
    'Khoa Công nghệ thông tin',
    'Khoa Kỹ thuật phần mềm',
    'Khoa Hệ thống thông tin',
    'Khoa Khoa học máy tính',
    'Phòng Đào tạo & Quản lý sinh viên',
  ],
};
