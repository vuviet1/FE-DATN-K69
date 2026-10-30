/**
 * @file ITuition.ts
 * @description Domain Model Học phí & Công nợ sinh viên theo tín chỉ chuẩn HUST
 */

import type { IFPagingApiParams } from './IPaging';

export type PaymentStatus = 'PAID' | 'PARTIAL' | 'UNPAID' | 'EXEMPT';

export interface ITuitionFee {
  id: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classCode: string;
  department: string;
  cohort: string;
  semester: string;
  totalRegisteredCredits: number; // Số tín chỉ đăng ký
  unitPricePerCredit: number; // Đơn giá / tín chỉ (VD: 450,000 VND)
  totalAmount: number; // Tổng học phí
  exemptionAmount: number; // Miễn giảm chính sách
  amountToPay: number; // Phải nộp
  paidAmount: number; // Đã nộp
  remainingAmount: number; // Còn nợ
  status: PaymentStatus;
  dueDate: string; // Hạn nộp
  paidAt?: string;
  transactionRef?: string;
}

export interface ITuitionQuery extends IFPagingApiParams {
  semester?: string;
  status?: PaymentStatus;
  cohort?: string;
  department?: string;
}
