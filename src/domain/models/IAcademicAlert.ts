/**
 * @file IAcademicAlert.ts
 * @description Domain Model Xử lý học vụ & Cảnh báo học tập mức 1, 2, 3 theo Quy chế đào tạo HUST
 */

import type { IFPagingApiParams } from './IPaging';

export type AlertLevel = 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'NORMAL'; // LEVEL_3 = Buộc thôi học
export type AcademicClassification =
  | 'XUAT_SAC'
  | 'GIOI'
  | 'KHA'
  | 'TRUNG_BINH'
  | 'YEU'
  | 'KEM';

export interface IAcademicRecord {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classCode: string; // Lớp sinh hoạt: VD IT1-02 K67
  department: string; // Viện CNTT&TT
  cohort: string; // K67
  semester: string; // 2026.1
  gpa: number; // Điểm TB học kỳ thang 4
  cpa: number; // Điểm TB tích lũy thang 4
  accumulatedCredits: number; // Tín chỉ tích lũy đạt
  failedCreditsThisSemester: number; // Số tín chỉ trượt kỳ này
  totalFailedCredits: number; // Tổng số tín chỉ nợ tích lũy
  alertLevel: AlertLevel; // Cảnh báo mức 1, 2, 3
  previousAlertLevel?: AlertLevel;
  note?: string;
  isEligibleForGraduation?: boolean; // Đủ điều kiện tốt nghiệp
}

export interface IAcademicAlertQuery extends IFPagingApiParams {
  semester?: string;
  alertLevel?: AlertLevel;
  cohort?: string;
  department?: string;
}
