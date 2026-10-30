/**
 * @file IRegistration.ts
 * @description Domain Model Đăng ký học phần tín chỉ theo chuẩn HUST
 */

import type { IFPagingApiParams } from './IPaging';

export type RegistrationPeriodStatus = 'upcoming' | 'open' | 'closed';

export interface IRegistrationPeriod {
  id: string;
  semester: string; // VD: 2026.1, 2026.2
  name: string; // VD: Đăng ký tín chỉ chính thức Kỳ 2026.1
  startDate: string;
  endDate: string;
  minCredits: number; // Mặc định 12
  maxCredits: number; // Mặc định 24
  status: RegistrationPeriodStatus;
  allowedCohorts: string[]; // Khóa được đăng ký, VD: K66, K67, K68, K69
}

export interface ICourseClassRegistration {
  id: string;
  classCode: string; // Mã lớp học phần (VD: 145892)
  courseCode: string; // Mã học phần (VD: IT3011)
  courseName: string;
  credits: number;
  lecturerName: string;
  schedule: string; // Thứ 2 (Kíp 2: 9h20 - 11h45)
  room: string; // B1-302
  capacity: number; // 60
  enrolled: number; // 48
  isRegistered?: boolean;
}

export interface IStudentRegistration {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  semester: string;
  courseClasses: ICourseClassRegistration[];
  totalCredits: number;
  updatedAt: string;
}

export interface IRegistrationQuery extends IFPagingApiParams {
  semester?: string;
  courseCode?: string;
}
