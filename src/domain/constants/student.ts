/**
 * @file student.ts
 * @description Định nghĩa các hằng số nghiệp vụ Sinh viên theo chuẩn Mes-Client-ES
 */

import { BASE_URL } from './base';

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
    GET_PAGING_API: `${BASE_URL}/api/students`,
    GET_BY_ID_API: `${BASE_URL}/api/students/:id`,
    ADD_API: `${BASE_URL}/api/students`,
    UPDATE_API: `${BASE_URL}/api/students/:id`,
    DELETE_API: `${BASE_URL}/api/students/:id`,
    EXPORT_API: `${BASE_URL}/api/students/export`,
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
