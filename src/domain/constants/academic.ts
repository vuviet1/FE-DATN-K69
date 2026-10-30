/**
 * @file academic.ts
 * @description Định nghĩa hằng số phân hệ Đào tạo & Học vụ theo chuẩn HUST
 */

export const ACADEMIC = {
  URL_API: {
    CURRICULUM_GET_PAGING_API: '/api/academic/courses',
    CURRICULUM_GET_BY_ID_API: '/api/academic/courses/:id',
    CURRICULUM_CREATE_API: '/api/academic/courses',
    CURRICULUM_UPDATE_API: '/api/academic/courses/:id',
    CURRICULUM_DELETE_API: '/api/academic/courses/:id',

    REGISTRATION_GET_PERIODS_API: '/api/academic/registration/periods',
    REGISTRATION_GET_CLASSES_API: '/api/academic/registration/classes',
    REGISTRATION_ENROLL_API: '/api/academic/registration/enroll',
    REGISTRATION_DROP_API: '/api/academic/registration/drop',

    ALERTS_GET_PAGING_API: '/api/academic/alerts',
    ALERTS_EXPORT_API: '/api/academic/alerts/export',
    ALERTS_PROCESS_API: '/api/academic/alerts/process',
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
