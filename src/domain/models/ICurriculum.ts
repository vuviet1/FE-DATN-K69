/**
 * @file ICurriculum.ts
 * @description Domain Model Chương trình đào tạo & Danh mục học phần theo chuẩn HUST
 */

import type { IFPagingApiParams } from './IPaging';

export type CourseType =
  | 'general'
  | 'fundamental'
  | 'specialized'
  | 'graduation'; // Đại cương, Cơ sở ngành, Chuyên ngành, Tốt nghiệp

export interface ICourse {
  id: string;
  code: string; // VD: IT3011, IT3020, MI1111, PH1110
  name: string; // Tên học phần
  credits: number; // Số tín chỉ học tập
  tuitionCredits: number; // Số tín chỉ học phí
  theoryHours: number; // Giờ lý thuyết
  exerciseHours: number; // Giờ bài tập
  labHours: number; // Giờ thí nghiệm / thực hành
  courseType: CourseType;
  department: string; // Khoa / Viện quản lý (VD: Viện CNTT&TT, Khoa Toán-Tin)
  prerequisiteCodes?: string[]; // Học phần tiên quyết
  previousCourseCodes?: string[]; // Học phần học trước
  description?: string;
  status: 1 | 0; // Sử dụng / Không sử dụng
}

export interface ICourseQuery extends IFPagingApiParams {
  courseType?: CourseType;
  department?: string;
  status?: number;
}

export interface ICourseSubmit {
  id?: string;
  code: string;
  name: string;
  credits: number;
  tuitionCredits: number;
  theoryHours: number;
  exerciseHours: number;
  labHours: number;
  courseType: CourseType;
  department: string;
  prerequisiteCodes?: string[];
  previousCourseCodes?: string[];
  description?: string;
  status: 1 | 0;
}
