/**
 * @file ICtsv.ts
 * @description Domain Model Công tác sinh viên (CTSV HUST): Điểm rèn luyện, Học bổng KKHT, Dịch vụ một cửa
 */

import type { IFPagingApiParams } from './IPaging';

// 1. Điểm rèn luyện (ĐRL)
export type ConductClassification =
  | 'XUAT_SAC'
  | 'TOT'
  | 'KHA'
  | 'TRUNG_BINH'
  | 'YEU'
  | 'KEM';

export interface IConductScore {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classCode: string;
  cohort: string;
  semester: string;
  criteria1Score: number; // Ý thức học tập (max 20)
  criteria2Score: number; // Ý thức chấp hành nội quy (max 25)
  criteria3Score: number; // Hoạt động đoàn thể/xã hội (max 20)
  criteria4Score: number; // Phẩm chất công dân (max 25)
  criteria5Score: number; // Khen thưởng/kỷ luật (max 10)
  totalScore: number; // Tổng điểm (0-100)
  classification: ConductClassification;
  status: 'draft' | 'approved';
}

// 2. Học bổng Khuyến khích học tập (KKHT)
export type ScholarshipType = 'XUAT_SAC' | 'GIOI' | 'KHA';

export interface IScholarshipRecipient {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classCode: string;
  department: string;
  cohort: string;
  semester: string;
  cpa: number;
  conductScore: number;
  scholarshipType: ScholarshipType;
  rewardAmount: number; // Số tiền học bổng (VND)
  status: 'nominated' | 'approved' | 'paid';
}

// 3. Dịch vụ một cửa (Tiếp nhận đơn trực tuyến)
export type RequestType =
  | 'ENROLLMENT_CERTIFICATE'
  | 'MILITARY_DEFERMENT'
  | 'TRANSCRIPT'
  | 'ACADEMIC_LEAVE'
  | 'GRADE_APPEAL';
export type RequestStatus = 'pending' | 'processing' | 'approved' | 'rejected';

export interface IStudentServiceRequest {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classCode: string;
  email: string;
  phone: string;
  requestType: RequestType;
  title: string;
  reason: string;
  attachmentUrls?: string[];
  status: RequestStatus;
  responseNote?: string;
  createdAt: string;
  processedAt?: string;
  processedBy?: string;
}

export interface ICtsvQuery extends IFPagingApiParams {
  semester?: string;
  classification?: string;
  scholarshipType?: string;
  requestType?: string;
  status?: string;
}
