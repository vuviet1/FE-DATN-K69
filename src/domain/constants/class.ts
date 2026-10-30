/**
 * @file class.ts
 * @description Định nghĩa các hằng số nghiệp vụ Lớp học theo chuẩn Mes-Client-ES
 */

export const CLASS = {
  ACTION_TYPES: {
    GET_PAGING: 'CLASS/GET_PAGING',
    GET_BY_ID: 'CLASS/GET_BY_ID',
    ADD: 'CLASS/ADD',
    UPDATE: 'CLASS/UPDATE',
    DELETE: 'CLASS/DELETE',
  },
  URL_API: {
    GET_PAGING_API: '/api/classes',
    GET_BY_ID_API: '/api/classes/:id',
    ADD_API: '/api/classes',
    UPDATE_API: '/api/classes/:id',
    DELETE_API: '/api/classes/:id',
  },
  STATUS: {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  } as const,
  STATUS_OPTIONS: [
    { label: 'Đang giảng dạy', value: 'active', color: 'processing' },
    { label: 'Đã hoàn thành', value: 'completed', color: 'success' },
    { label: 'Đã hủy', value: 'cancelled', color: 'default' },
  ],
  SEMESTER_OPTIONS: [
    { label: 'HK1 (2025-2026)', value: 'HK1 (2025-2026)' },
    { label: 'HK2 (2025-2026)', value: 'HK2 (2025-2026)' },
    { label: 'HK Hè (2024-2025)', value: 'HK Hè (2024-2025)' },
  ],
};
