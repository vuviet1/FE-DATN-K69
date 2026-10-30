/**
 * @file attendance.ts
 * @description Định nghĩa các hằng số nghiệp vụ Điểm danh theo chuẩn Mes-Client-ES
 */

export const ATTENDANCE = {
  ACTION_TYPES: {
    GET_BY_DATE_CLASS: 'ATTENDANCE/GET_BY_DATE_CLASS',
    SAVE_ATTENDANCE: 'ATTENDANCE/SAVE_ATTENDANCE',
  },
  URL_API: {
    GET_BY_DATE_CLASS_API: '/api/attendance',
    SAVE_ATTENDANCE_API: '/api/attendance/save',
  },
  STATUS: {
    PRESENT: 'present',
    LATE: 'late',
    EXCUSED: 'excused',
    ABSENT: 'absent',
  } as const,
  STATUS_OPTIONS: [
    { label: 'Có mặt', value: 'present', color: 'success' },
    { label: 'Đi muộn', value: 'late', color: 'warning' },
    { label: 'Có phép', value: 'excused', color: 'processing' },
    { label: 'Vắng', value: 'absent', color: 'error' },
  ],
};
