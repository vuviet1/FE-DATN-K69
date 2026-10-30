/**
 * @file notification.ts
 * @description Định nghĩa các hằng số Cấu hình thông báo theo chuẩn Mes-Client-ES
 */

export const NOTIFICATION = {
  ACTION_TYPES: {
    GET_PAGING: 'NOTIFICATION/GET_PAGING',
    GET_BY_ID: 'NOTIFICATION/GET_BY_ID',
    CREATE: 'NOTIFICATION/CREATE',
    UPDATE: 'NOTIFICATION/UPDATE',
    DELETE: 'NOTIFICATION/DELETE',
    PUBLISH: 'NOTIFICATION/PUBLISH',
    REVOKE: 'NOTIFICATION/REVOKE',
  },
  URL_API: {
    GET_PAGING_API: '/api/system/notifications',
    GET_BY_ID_API: '/api/system/notifications/:id',
    CREATE_API: '/api/system/notifications',
    UPDATE_API: '/api/system/notifications/:id',
    DELETE_API: '/api/system/notifications/:id',
    PUBLISH_API: '/api/system/notifications/:id/publish',
    REVOKE_API: '/api/system/notifications/:id/revoke',
  },
  TYPES: [
    { label: 'Hệ thống & Kỹ thuật', value: 'system', color: 'blue' },
    { label: 'Học vụ & Lịch học', value: 'academic', color: 'green' },
    { label: 'Học phí & Tài chính', value: 'fee', color: 'orange' },
    { label: 'Khẩn cấp / Quan trọng', value: 'urgent', color: 'red' },
  ],
  PRIORITIES: [
    { label: 'Bình thường', value: 'normal', color: 'default' },
    { label: 'Quan trọng', value: 'high', color: 'warning' },
    { label: 'Khẩn cấp', value: 'urgent', color: 'error' },
  ],
  TARGETS: [
    { label: 'Toàn bộ người dùng', value: 'all' },
    { label: 'Tất cả Giảng viên', value: 'lecturers' },
    { label: 'Tất cả Sinh viên', value: 'students' },
    { label: 'Theo lớp học phần', value: 'class' },
  ],
  STATUSES: [
    { label: 'Bản nháp', value: 'draft', status: 'Default' },
    { label: 'Đã phát hành', value: 'published', status: 'Success' },
    { label: 'Đã lên lịch', value: 'scheduled', status: 'Processing' },
    { label: 'Đã thu hồi', value: 'revoked', status: 'Warning' },
  ],
};
