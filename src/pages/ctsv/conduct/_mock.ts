/**
 * @file _mock.ts
 * @description Mock API endpoints cho Điểm rèn luyện sinh viên theo 5 tiêu chí chuẩn HUST
 */

import type { IConductScore } from '@domain/models';
import type { Request, Response } from 'express';

let conductDatabase: IConductScore[] = [
  {
    id: '1',
    studentId: 's1',
    studentCode: '2021001',
    studentName: 'Nguyễn Hoàng Nam',
    classCode: 'IT1-02 K66',
    cohort: 'K66',
    semester: '2026.1',
    criteria1Score: 19, // Học tập (max 20)
    criteria2Score: 24, // Nội quy (max 25)
    criteria3Score: 18, // Hoạt động ngoại khóa (max 20)
    criteria4Score: 23, // Phẩm chất công dân (max 25)
    criteria5Score: 8, // Khen thưởng / BCS (max 10)
    totalScore: 92,
    classification: 'XUAT_SAC',
    status: 'approved',
  },
  {
    id: '2',
    studentId: 's2',
    studentCode: '2021002',
    studentName: 'Trần Thị Mai',
    classCode: 'IT1-02 K66',
    cohort: 'K66',
    semester: '2026.1',
    criteria1Score: 18,
    criteria2Score: 22,
    criteria3Score: 17,
    criteria4Score: 21,
    criteria5Score: 6,
    totalScore: 84,
    classification: 'TOT',
    status: 'approved',
  },
  {
    id: '3',
    studentId: 's3',
    studentCode: '2022451',
    studentName: 'Trần Minh Đức',
    classCode: 'IT2-01 K67',
    cohort: 'K67',
    semester: '2026.1',
    criteria1Score: 12,
    criteria2Score: 18,
    criteria3Score: 14,
    criteria4Score: 18,
    criteria5Score: 0,
    totalScore: 62,
    classification: 'TRUNG_BINH',
    status: 'draft',
  },
  {
    id: '4',
    studentId: 's4',
    studentCode: '2023102',
    studentName: 'Vũ Thị Phương Thảo',
    classCode: 'MI2-01 K68',
    cohort: 'K68',
    semester: '2026.1',
    criteria1Score: 20,
    criteria2Score: 25,
    criteria3Score: 19,
    criteria4Score: 24,
    criteria5Score: 7,
    totalScore: 95,
    classification: 'XUAT_SAC',
    status: 'approved',
  },
  {
    id: '5',
    studentId: 's5',
    studentCode: '2020332',
    studentName: 'Hoàng Văn Sơn',
    classCode: 'ME-02 K65',
    cohort: 'K65',
    semester: '2026.1',
    criteria1Score: 8,
    criteria2Score: 15,
    criteria3Score: 10,
    criteria4Score: 14,
    criteria5Score: 0,
    totalScore: 47,
    classification: 'YEU',
    status: 'draft',
  },
];

export default {
  'GET /api/ctsv/conduct': (req: Request, res: Response) => {
    const {
      keyword,
      classification,
      semester,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;
    let list = [...conductDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (c) =>
          c.studentCode.toLowerCase().includes(kw) ||
          c.studentName.toLowerCase().includes(kw) ||
          c.classCode.toLowerCase().includes(kw),
      );
    }
    if (classification)
      list = list.filter((c) => c.classification === classification);
    if (semester) list = list.filter((c) => c.semester === semester);

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

  'PUT /api/ctsv/conduct/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = conductDatabase.findIndex((c) => c.id === id);
    if (index === -1) {
      res.status(404).json({ success: false, message: 'Không tìm thấy hồ sơ' });
      return;
    }
    const updated = { ...conductDatabase[index], ...req.body };
    updated.totalScore =
      updated.criteria1Score +
      updated.criteria2Score +
      updated.criteria3Score +
      updated.criteria4Score +
      updated.criteria5Score;
    if (updated.totalScore >= 90) updated.classification = 'XUAT_SAC';
    else if (updated.totalScore >= 80) updated.classification = 'TOT';
    else if (updated.totalScore >= 65) updated.classification = 'KHA';
    else if (updated.totalScore >= 50) updated.classification = 'TRUNG_BINH';
    else updated.classification = 'YEU';

    conductDatabase[index] = updated;
    res.json({
      data: updated,
      success: true,
      message: 'Cập nhật điểm rèn luyện thành công!',
    });
  },

  'POST /api/ctsv/conduct/approve': (_req: Request, res: Response) => {
    conductDatabase = conductDatabase.map((c) => ({
      ...c,
      status: 'approved',
    }));
    res.json({
      success: true,
      message: 'Đã phê duyệt toàn bộ điểm rèn luyện của học kỳ!',
    });
  },
};
