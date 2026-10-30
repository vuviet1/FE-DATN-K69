/**
 * @file student.ts
 * @description Định nghĩa các hằng số nghiệp vụ Sinh viên theo chuẩn Mes-Client-ES
 */

export const STUDENT = {
  ACTION_TYPES: {
    GET_PAGING: 'STUDENT/GET_PAGING',
    GET_BY_ID: 'STUDENT/GET_BY_ID',
    ADD: 'STUDENT/ADD',
    UPDATE: 'STUDENT/UPDATE',
    DELETE: 'STUDENT/DELETE',
    EXPORT: 'STUDENT/EXPORT',
  },
  URL_API: {
    GET_PAGING_API: '/api/students',
    GET_BY_ID_API: '/api/students/:id',
    ADD_API: '/api/students',
    UPDATE_API: '/api/students/:id',
    DELETE_API: '/api/students/:id',
    EXPORT_API: '/api/students/export',
  },
  STATUS: {
    STUDYING: 'studying',
    WARNING: 'warning',
    SUSPENDED: 'suspended',
    DROPPED: 'dropped',
  } as const,
  STATUS_OPTIONS: [
    { label: 'Đang học', value: 'studying', status: 'Processing' },
    { label: 'Cảnh báo học tập', value: 'warning', status: 'Warning' },
    { label: 'Đình chỉ', value: 'suspended', status: 'Error' },
    { label: 'Buộc thôi học', value: 'dropped', status: 'Default' },
  ],
  GENDER_OPTIONS: [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
  ],
};
