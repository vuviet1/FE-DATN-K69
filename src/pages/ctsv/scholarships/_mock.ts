/**
 * @file _mock.ts
 * @description Mock API endpoints cho Xét duyệt Học bổng Khuyến khích học tập (KKHT) chuẩn HUST
 */

import type { IScholarshipRecipient } from '@domain/models';
import type { Request, Response } from 'express';

let scholarshipsDatabase: IScholarshipRecipient[] = [
  {
    id: '1',
    studentId: 's1',
    studentCode: '2021001',
    studentName: 'Nguyễn Hoàng Nam',
    classCode: 'IT1-02 K66',
    department: 'Trường CNTT&TT',
    cohort: 'K66',
    semester: '2026.1',
    cpa: 3.85,
    conductScore: 92,
    scholarshipType: 'XUAT_SAC',
    rewardAmount: 18000000,
    status: 'approved',
  },
  {
    id: '2',
    studentId: 's4',
    studentCode: '2023102',
    studentName: 'Vũ Thị Phương Thảo',
    classCode: 'MI2-01 K68',
    department: 'Khoa Toán - Tin',
    cohort: 'K68',
    semester: '2026.1',
    cpa: 3.76,
    conductScore: 95,
    scholarshipType: 'XUAT_SAC',
    rewardAmount: 18000000,
    status: 'approved',
  },
  {
    id: '3',
    studentId: 's2',
    studentCode: '2021002',
    studentName: 'Trần Thị Mai',
    classCode: 'IT1-02 K66',
    department: 'Trường CNTT&TT',
    cohort: 'K66',
    semester: '2026.1',
    cpa: 3.42,
    conductScore: 84,
    scholarshipType: 'GIOI',
    rewardAmount: 14000000,
    status: 'approved',
  },
  {
    id: '4',
    studentId: 's6',
    studentCode: '2022198',
    studentName: 'Đặng Tuấn Kiệt',
    classCode: 'EE1-01 K67',
    department: 'Trường Điện - Điện tử',
    cohort: 'K67',
    semester: '2026.1',
    cpa: 3.15,
    conductScore: 80,
    scholarshipType: 'KHA',
    rewardAmount: 10000000,
    status: 'nominated',
  },
];

export default {
  'GET /api/ctsv/scholarships': (req: Request, res: Response) => {
    const {
      keyword,
      scholarshipType,
      semester,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;
    let list = [...scholarshipsDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (s) =>
          s.studentCode.toLowerCase().includes(kw) ||
          s.studentName.toLowerCase().includes(kw) ||
          s.classCode.toLowerCase().includes(kw),
      );
    }
    if (scholarshipType)
      list = list.filter((s) => s.scholarshipType === scholarshipType);
    if (semester) list = list.filter((s) => s.semester === semester);

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

  'POST /api/ctsv/scholarships/approve': (req: Request, res: Response) => {
    const { id } = req.body;
    scholarshipsDatabase = scholarshipsDatabase.map((s) =>
      s.id === id || !id ? { ...s, status: 'approved' } : s,
    );
    res.json({ success: true, message: 'Phê duyệt học bổng thành công!' });
  },
};
