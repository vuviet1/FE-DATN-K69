/**
 * @file grade.ts
 * @description Định nghĩa các hằng số nghiệp vụ Bảng điểm theo chuẩn Mes-Client-ES
 */

export const GRADE = {
  ACTION_TYPES: {
    GET_BY_CLASS_ID: 'GRADE/GET_BY_CLASS_ID',
    SAVE_BATCH: 'GRADE/SAVE_BATCH',
    EXPORT: 'GRADE/EXPORT',
  },
  URL_API: {
    GET_BY_CLASS_ID_API: '/api/grades',
    SAVE_BATCH_API: '/api/grades/batch',
    EXPORT_API: '/api/grades/export',
  },
  WEIGHTS: {
    ATTENDANCE: 0.1, // 10% Chuyên cần
    ASSIGNMENT: 0.2, // 20% Bài tập
    MIDTERM: 0.2, // 20% Giữa kỳ
    FINAL: 0.5, // 50% Cuối kỳ
  },
};
