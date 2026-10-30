/**
 * @file ctsv.ts
 * @description Định nghĩa hằng số phân hệ Công tác sinh viên (CTSV HUST)
 */

export const CTSV = {
  URL_API: {
    CONDUCT_GET_PAGING_API: '/api/ctsv/conduct',
    CONDUCT_UPDATE_API: '/api/ctsv/conduct/:id',
    CONDUCT_APPROVE_API: '/api/ctsv/conduct/approve',

    SCHOLARSHIPS_GET_PAGING_API: '/api/ctsv/scholarships',
    SCHOLARSHIPS_APPROVE_API: '/api/ctsv/scholarships/approve',

    SERVICES_GET_PAGING_API: '/api/ctsv/services',
    SERVICES_CREATE_API: '/api/ctsv/services',
    SERVICES_PROCESS_API: '/api/ctsv/services/:id/process',
  },

  CONDUCT_CLASSIFICATIONS: {
    XUAT_SAC: {
      label: 'Xuất sắc (90 - 100)',
      color: '#52c41a',
      min: 90,
      max: 100,
    },
    TOT: { label: 'Tốt (80 - 89)', color: '#1677ff', min: 80, max: 89 },
    KHA: { label: 'Khá (65 - 79)', color: '#13c2c2', min: 65, max: 79 },
    TRUNG_BINH: {
      label: 'Trung bình (50 - 64)',
      color: '#faad14',
      min: 50,
      max: 64,
    },
    YEU: { label: 'Yếu (< 50)', color: '#ff4d4f', min: 0, max: 49 },
    KEM: { label: 'Kém (< 35)', color: '#cf1322', min: 0, max: 34 },
  },

  SCHOLARSHIP_TYPES: {
    XUAT_SAC: {
      label: 'Học bổng Xuất sắc',
      color: 'gold',
      defaultAmount: 18000000,
    },
    GIOI: { label: 'Học bổng Giỏi', color: 'blue', defaultAmount: 14000000 },
    KHA: { label: 'Học bổng Khá', color: 'cyan', defaultAmount: 10000000 },
  },

  REQUEST_TYPES: {
    ENROLLMENT_CERTIFICATE: {
      label: 'Giấy xác nhận sinh viên (Vay vốn CSXH, thủ tục khác)',
      code: 'ENROLLMENT',
    },
    MILITARY_DEFERMENT: {
      label: 'Giấy chứng nhận tạm hoãn Nghĩa vụ quân sự',
      code: 'MILITARY',
    },
    TRANSCRIPT: {
      label: 'Cấp bảng điểm quá trình học tập',
      code: 'TRANSCRIPT',
    },
    ACADEMIC_LEAVE: {
      label: 'Đơn xin nghỉ học tạm thời / Bảo lưu kết quả',
      code: 'LEAVE',
    },
    GRADE_APPEAL: {
      label: 'Đơn xin phúc khảo bài thi kết thúc học phần',
      code: 'APPEAL',
    },
  },

  REQUEST_STATUSES: {
    pending: { label: 'Chờ tiếp nhận', color: 'default' },
    processing: { label: 'Đang xử lý', color: 'processing' },
    approved: { label: 'Đã duyệt & Cấp giấy', color: 'success' },
    rejected: { label: 'Từ chối giải quyết', color: 'error' },
  },
};
