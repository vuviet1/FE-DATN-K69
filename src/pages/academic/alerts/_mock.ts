/**
 * @file _mock.ts
 * @description Mock API endpoints cho Xử lý học vụ & Cảnh báo học tập mức 1, 2, 3 chuẩn HUST
 */

import type { IAcademicRecord } from '@domain/models';
import type { Request, Response } from 'express';

const recordsDatabase: IAcademicRecord[] = [
  {
    id: '1',
    studentId: 's1',
    studentCode: '2021001',
    studentName: 'Nguyễn Hoàng Nam',
    classCode: 'IT1-02 K66',
    department: 'Trường CNTT&TT',
    cohort: 'K66',
    semester: '2026.1',
    gpa: 3.45,
    cpa: 3.52,
    accumulatedCredits: 135,
    failedCreditsThisSemester: 0,
    totalFailedCredits: 0,
    alertLevel: 'NORMAL',
    isEligibleForGraduation: true,
    note: 'Đạt chuẩn tốt nghiệp loại Giỏi',
  },
  {
    id: '2',
    studentId: 's2',
    studentCode: '2022451',
    studentName: 'Trần Minh Đức',
    classCode: 'IT2-01 K67',
    department: 'Trường CNTT&TT',
    cohort: 'K67',
    semester: '2026.1',
    gpa: 1.15,
    cpa: 1.28,
    accumulatedCredits: 78,
    failedCreditsThisSemester: 6,
    totalFailedCredits: 10,
    alertLevel: 'LEVEL_1',
    previousAlertLevel: 'NORMAL',
    note: 'Cảnh báo mức 1 do nợ > 8 tín chỉ và CPA thấp',
  },
  {
    id: '3',
    studentId: 's3',
    studentCode: '2022789',
    studentName: 'Lê Tuấn Anh',
    classCode: 'ET1-03 K67',
    department: 'Trường Điện - Điện tử',
    cohort: 'K67',
    semester: '2026.1',
    gpa: 0.85,
    cpa: 1.12,
    accumulatedCredits: 62,
    failedCreditsThisSemester: 9,
    totalFailedCredits: 18,
    alertLevel: 'LEVEL_2',
    previousAlertLevel: 'LEVEL_1',
    note: '2 kỳ liên tiếp không đạt chuẩn học vụ, nợ 18 TC',
  },
  {
    id: '4',
    studentId: 's4',
    studentCode: '2020332',
    studentName: 'Hoàng Văn Sơn',
    classCode: 'ME-02 K65',
    department: 'Trường Cơ khí',
    cohort: 'K65',
    semester: '2026.1',
    gpa: 0.5,
    cpa: 0.95,
    accumulatedCredits: 85,
    failedCreditsThisSemester: 12,
    totalFailedCredits: 28,
    alertLevel: 'LEVEL_3',
    previousAlertLevel: 'LEVEL_2',
    note: 'Thuộc diện buộc thôi học theo quy chế HUST (nợ > 24 TC và CPA < 1.0)',
  },
  {
    id: '5',
    studentId: 's5',
    studentCode: '2023102',
    studentName: 'Vũ Thị Phương Thảo',
    classCode: 'MI2-01 K68',
    department: 'Khoa Toán - Tin',
    cohort: 'K68',
    semester: '2026.1',
    gpa: 3.82,
    cpa: 3.76,
    accumulatedCredits: 60,
    failedCreditsThisSemester: 0,
    totalFailedCredits: 0,
    alertLevel: 'NORMAL',
    note: 'Học lực Xuất sắc',
  },
];

export default {
  'GET /api/academic/alerts': (req: Request, res: Response) => {
    const {
      keyword,
      alertLevel,
      semester,
      cohort,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;
    let list = [...recordsDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (r) =>
          r.studentCode.toLowerCase().includes(kw) ||
          r.studentName.toLowerCase().includes(kw) ||
          r.classCode.toLowerCase().includes(kw),
      );
    }
    if (alertLevel) list = list.filter((r) => r.alertLevel === alertLevel);
    if (semester) list = list.filter((r) => r.semester === semester);
    if (cohort) list = list.filter((r) => r.cohort === cohort);

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

  'POST /api/academic/alerts/process': (req: Request, res: Response) => {
    const { semester } = req.body;
    res.json({
      success: true,
      count: recordsDatabase.filter((r) => r.alertLevel !== 'NORMAL').length,
      message: `Đã hoàn tất rà soát và xử lý học vụ cho Kỳ ${semester || '2026.1'} theo quy chế đào tạo HUST!`,
    });
  },
};
