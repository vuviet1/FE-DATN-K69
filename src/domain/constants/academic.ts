/**
 * @file academic.ts
 * @description Định nghĩa hằng số phân hệ Đào tạo & Học vụ theo chuẩn HUST & mes-client-es
 */

import { BASE_URL } from './base';

export const ACADEMIC = {
  ACTION_TYPES: {
    GET_CURRICULUM_PAGING: 'ACADEMIC/GET_CURRICULUM_PAGING',
    GET_CURRICULUM_BY_ID: 'ACADEMIC/GET_CURRICULUM_BY_ID',
    CREATE_CURRICULUM: 'ACADEMIC/CREATE_CURRICULUM',
    UPDATE_CURRICULUM: 'ACADEMIC/UPDATE_CURRICULUM',
    DELETE_CURRICULUM: 'ACADEMIC/DELETE_CURRICULUM',
    GET_REGISTRATION_PERIODS: 'ACADEMIC/GET_REGISTRATION_PERIODS',
    GET_AVAILABLE_CLASSES: 'ACADEMIC/GET_AVAILABLE_CLASSES',
    ENROLL_CLASS: 'ACADEMIC/ENROLL_CLASS',
    DROP_CLASS: 'ACADEMIC/DROP_CLASS',
    GET_ALERTS_PAGING: 'ACADEMIC/GET_ALERTS_PAGING',
    PROCESS_ALERTS: 'ACADEMIC/PROCESS_ALERTS',
  },
  URL_API: {
    CURRICULUM_GET_PAGING_API: `${BASE_URL}/api/academic/courses`,
    CURRICULUM_GET_BY_ID_API: `${BASE_URL}/api/academic/courses/:id`,
    CURRICULUM_CREATE_API: `${BASE_URL}/api/academic/courses`,
    CURRICULUM_UPDATE_API: `${BASE_URL}/api/academic/courses/:id`,
    CURRICULUM_DELETE_API: `${BASE_URL}/api/academic/courses/:id`,

    REGISTRATION_GET_PERIODS_API: `${BASE_URL}/api/academic/registration/periods`,
    REGISTRATION_GET_CLASSES_API: `${BASE_URL}/api/academic/registration/classes`,
    REGISTRATION_ENROLL_API: `${BASE_URL}/api/academic/registration/enroll`,
    REGISTRATION_DROP_API: `${BASE_URL}/api/academic/registration/drop`,

    ALERTS_GET_PAGING_API: `${BASE_URL}/api/academic/alerts`,
    ALERTS_EXPORT_API: `${BASE_URL}/api/academic/alerts/export`,
    ALERTS_PROCESS_API: `${BASE_URL}/api/academic/alerts/process`,
  },

  COURSE_TYPES: [
    { label: 'Đại cương', value: 'general', color: 'blue' },
    { label: 'Cơ sở ngành', value: 'fundamental', color: 'cyan' },
    { label: 'Chuyên ngành', value: 'specialized', color: 'purple' },
    { label: 'Tốt nghiệp', value: 'graduation', color: 'gold' },
  ],

  ALERT_LEVELS: {
    LEVEL_1: {
      label: 'Cảnh báo mức 1',
      color: '#fa8c16',
      description: 'CPA < 1.0 hoặc nợ > 8 tín chỉ',
    },
    LEVEL_2: {
      label: 'Cảnh báo mức 2',
      color: '#f5222d',
      description: '2 kỳ liên tiếp mức 1 hoặc nợ > 16 tín chỉ',
    },
    LEVEL_3: {
      label: 'Mức 3 - Buộc thôi học',
      color: '#780650',
      description: 'Đình chỉ học tập theo quy chế HUST',
    },
    NORMAL: {
      label: 'Bình thường',
      color: '#52c41a',
      description: 'Học lực đạt chuẩn',
    },
  },

  SEMESTERS: [
    { label: 'Học kỳ 2026.1 (Thu)', value: '2026.1' },
    { label: 'Học kỳ 2026.2 (Xuân)', value: '2026.2' },
    { label: 'Học kỳ 2026.3 (Hè)', value: '2026.3' },
  ],
};
