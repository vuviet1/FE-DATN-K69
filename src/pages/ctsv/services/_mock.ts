/**
 * @file _mock.ts
 * @description Mock API endpoints cho Dịch vụ Một cửa sinh viên (CTSV HUST)
 */

import type { IStudentServiceRequest } from '@domain/models';
import type { Request, Response } from 'express';

const serviceRequestsDatabase: IStudentServiceRequest[] = [
  {
    id: 'req1',
    studentId: 's1',
    studentCode: '2021001',
    studentName: 'Nguyễn Hoàng Nam',
    classCode: 'IT1-02 K66',
    email: 'nam.nh21001@sis.hust.edu.vn',
    phone: '0981234567',
    requestType: 'ENROLLMENT_CERTIFICATE',
    title:
      'Xin cấp Giấy xác nhận sinh viên để vay vốn Ngân hàng Chính sách Xã hội',
    reason:
      'Gia đình thuộc diện có hoàn cảnh khó khăn ở địa phương, cần giấy xác nhận đang theo học để hoàn thiện hồ sơ vay vốn tín dụng sinh viên năm học 2026-2027.',
    status: 'pending',
    createdAt: '30/10/2026 09:15',
  },
  {
    id: 'req2',
    studentId: 's3',
    studentCode: '2022451',
    studentName: 'Trần Minh Đức',
    classCode: 'IT2-01 K67',
    email: 'duc.tm22451@sis.hust.edu.vn',
    phone: '0978999888',
    requestType: 'MILITARY_DEFERMENT',
    title: 'Xin cấp Giấy xác nhận tạm hoãn thực hiện Nghĩa vụ quân sự năm 2027',
    reason:
      'Ban chỉ huy quân sự quận Hai Bà Trưng yêu cầu nộp giấy chứng nhận sinh viên để xét tạm hoãn gọi nhập ngũ đợt đầu năm 2027.',
    status: 'approved',
    responseNote:
      'Đã ký số và gửi bản PDF có mã QR xác thực về email sinh viên.',
    createdAt: '28/10/2026 14:20',
    processedAt: '29/10/2026 10:00',
    processedBy: 'Cán bộ CTSV - Nguyễn Thu Hương',
  },
  {
    id: 'req3',
    studentId: 's5',
    studentCode: '2020332',
    studentName: 'Hoàng Văn Sơn',
    classCode: 'ME-02 K65',
    email: 'son.hv20332@sis.hust.edu.vn',
    phone: '0912345678',
    requestType: 'ACADEMIC_LEAVE',
    title: 'Đơn xin nghỉ học tạm thời (bảo lưu kết quả) 1 học kỳ',
    reason:
      'Do tình trạng sức khỏe cần điều trị dài ngày tại bệnh viện Bạch Mai, em xin phép Nhà trường cho bảo lưu kết quả học tập Học kỳ 2026.1.',
    status: 'processing',
    createdAt: '26/10/2026 11:30',
  },
  {
    id: 'req4',
    studentId: 's2',
    studentCode: '2021002',
    studentName: 'Trần Thị Mai',
    classCode: 'IT1-02 K66',
    email: 'mai.tt21002@sis.hust.edu.vn',
    phone: '0965554433',
    requestType: 'GRADE_APPEAL',
    title:
      'Đơn xin phúc khảo bài thi kết thúc học phần môn Giải tích 1 (MI1111)',
    reason:
      'Điểm thi cuối kỳ môn Giải tích 1 công bố là 5.5, em nhận thấy đối chiếu đáp án đạt khoảng 7.5-8.0, kính đề nghị Hội đồng chấm thi xem xét lại bài làm.',
    status: 'approved',
    responseNote:
      'Đã chuyển đơn tới Ban Khảo thí, kết quả chấm lại tăng lên 7.5 (B).',
    createdAt: '22/10/2026 16:45',
    processedAt: '25/10/2026 15:30',
    processedBy: 'Phòng Khảo thí & CTSV',
  },
];

export default {
  'GET /api/ctsv/services': (req: Request, res: Response) => {
    const {
      keyword,
      requestType,
      status,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;
    let list = [...serviceRequestsDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (r) =>
          r.studentCode.toLowerCase().includes(kw) ||
          r.studentName.toLowerCase().includes(kw) ||
          r.title.toLowerCase().includes(kw),
      );
    }
    if (requestType) list = list.filter((r) => r.requestType === requestType);
    if (status) list = list.filter((r) => r.status === status);

    const start = (Number(pageNumber) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    const paged = list.slice(start, end);

    res.json({
      data: paged,
      total: list.length,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      success: true,
    });
  },

  'POST /api/ctsv/services/:id/process': (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, responseNote } = req.body;
    const index = serviceRequestsDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      res
        .status(404)
        .json({ success: false, message: 'Không tìm thấy yêu cầu' });
      return;
    }
    serviceRequestsDatabase[index] = {
      ...serviceRequestsDatabase[index],
      status,
      responseNote:
        responseNote ||
        (status === 'approved'
          ? 'Yêu cầu đã được phê duyệt thành công.'
          : 'Từ chối giải quyết.'),
      processedAt: '30/10/2026 11:30',
      processedBy: 'Cán bộ CTSV HUST',
    };
    res.json({
      data: serviceRequestsDatabase[index],
      success: true,
      message:
        status === 'approved'
          ? 'Đã phê duyệt và xuất giấy xác nhận điện tử!'
          : 'Đã từ chối yêu cầu.',
    });
  },
};
