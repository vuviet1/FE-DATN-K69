/**
 * @file finance.ts
 * @description Định nghĩa hằng số phân hệ Học phí & Công nợ sinh viên
 */

export const FINANCE = {
  URL_API: {
    TUITION_GET_PAGING_API: '/api/finance/tuition',
    TUITION_GET_BY_ID_API: '/api/finance/tuition/:id',
    TUITION_PAY_API: '/api/finance/tuition/:id/pay',
    TUITION_EXPORT_API: '/api/finance/tuition/export',
  },

  PAYMENT_STATUSES: {
    PAID: { label: 'Đã hoàn thành', color: 'success' },
    PARTIAL: { label: 'Nộp một phần', color: 'warning' },
    UNPAID: { label: 'Còn nợ học phí', color: 'error' },
    EXEMPT: { label: 'Miễn giảm 100%', color: 'purple' },
  },

  DEFAULT_CREDIT_PRICE: 480000, // Đơn giá tín chỉ cơ bản VND
};
