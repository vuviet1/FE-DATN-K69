/**
 * @file Utils.ts
 * @description Các hàm tiện ích dùng chung theo chuẩn Mes-Client-ES Becoxy
 */

import dayjs from 'dayjs';

/**
 * Kiểm tra giá trị có null hoặc undefined hay không
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * Kiểm tra chuỗi rỗng hoặc chỉ có khoảng trắng
 */
export const isStringNullOrEmpty = (value: unknown): boolean =>
  isNullOrUndefined(value) ||
  (typeof value === 'string' && value.trim() === '');

/**
 * Làm tròn số với số chữ số thập phân chỉ định
 */
export const roundNumber = (num?: number | null, fraction = 2): number => {
  if (isNullOrUndefined(num) || Number.isNaN(num)) return 0;
  return Number(`${Math.round(Number(`${num}e${fraction}`))}e-${fraction}`);
};

/**
 * Định dạng số hiển thị (ngăn cách phần nghìn, thập phân)
 */
export const numberFormat = (val?: number | null, fraction = 2): string => {
  if (isNullOrUndefined(val) || Number.isNaN(val)) return '0';
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fraction,
  }).format(val);
};

/**
 * Định dạng điểm GPA (luôn có 2 chữ số thập phân)
 */
export const formatGPA = (gpa?: number | null): string => {
  if (isNullOrUndefined(gpa) || Number.isNaN(gpa)) return '0.00';
  return gpa.toFixed(2);
};

/**
 * Định dạng ngày tháng
 */
export const formatDate = (
  date?: string | Date | dayjs.Dayjs | null,
  format = 'DD/MM/YYYY',
): string => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

/**
 * Tính toán điểm chữ và xếp loại theo thang điểm 10 chuẩn đại học
 */
export const calculateGradeScale = (
  score: number,
): {
  letter: string;
  gpa4: number;
  isPassed: boolean;
  classification: string;
} => {
  if (score >= 9.0)
    return {
      letter: 'A+',
      gpa4: 4.0,
      isPassed: true,
      classification: 'Xuất sắc',
    };
  if (score >= 8.5)
    return { letter: 'A', gpa4: 3.8, isPassed: true, classification: 'Giỏi' };
  if (score >= 8.0)
    return {
      letter: 'B+',
      gpa4: 3.5,
      isPassed: true,
      classification: 'Khá giỏi',
    };
  if (score >= 7.0)
    return { letter: 'B', gpa4: 3.0, isPassed: true, classification: 'Khá' };
  if (score >= 6.5)
    return {
      letter: 'C+',
      gpa4: 2.5,
      isPassed: true,
      classification: 'Trung bình khá',
    };
  if (score >= 5.5)
    return {
      letter: 'C',
      gpa4: 2.0,
      isPassed: true,
      classification: 'Trung bình',
    };
  if (score >= 5.0)
    return {
      letter: 'D+',
      gpa4: 1.5,
      isPassed: true,
      classification: 'Trung bình yếu',
    };
  if (score >= 4.0)
    return { letter: 'D', gpa4: 1.0, isPassed: true, classification: 'Yếu' };
  return {
    letter: 'F',
    gpa4: 0.0,
    isPassed: false,
    classification: 'Kém (Thi lại)',
  };
};

/**
 * Tải file Blob về máy client (thường dùng cho Excel export)
 */
export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
};
