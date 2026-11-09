/**
 * @file finance.ts
 * @description Định nghĩa hằng số phân hệ Học phí & Công nợ sinh viên theo chuẩn mes-client-es
 */

import { BASE_URL } from './base';

export const FINANCE = {
  ACTION_TYPES: {
    GET_TUITION_PAGING: 'FINANCE/GET_TUITION_PAGING',
    GET_TUITION_BY_ID: 'FINANCE/GET_TUITION_BY_ID',
    PAY_TUITION: 'FINANCE/PAY_TUITION',
    EXPORT_TUITION: 'FINANCE/EXPORT_TUITION',
  },
  URL_API: {
    TUITION_GET_PAGING_API: `${BASE_URL}/api/finance/tuition`,
    TUITION_GET_BY_ID_API: `${BASE_URL}/api/finance/tuition/:id`,
    TUITION_PAY_API: `${BASE_URL}/api/finance/tuition/:id/pay`,
    TUITION_EXPORT_API: `${BASE_URL}/api/finance/tuition/export`,
  },

  PAYMENT_STATUSES: {
    PAID: { label: 'Đã hoàn thành', color: 'success' },
    PARTIAL: { label: 'Nộp một phần', color: 'warning' },
    UNPAID: { label: 'Còn nợ học phí', color: 'error' },
    EXEMPT: { label: 'Miễn giảm 100%', color: 'purple' },
  },

  DEFAULT_CREDIT_PRICE: 480000, // Đơn giá tín chỉ cơ bản VND
};
