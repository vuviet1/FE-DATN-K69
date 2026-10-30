/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Bảng điểm
 */

import type { IGradeItem } from '@domain/models';
import type { Request, Response } from 'express';

const gradesData: Record<string, IGradeItem[]> = {
  IT4409: [
    {
      id: '1',
      studentCode: '2021001',
      fullName: 'Nguyễn Hoàng Nam',
      attendanceScore: 9,
      assignmentScore: 8.5,
      midtermScore: 8.0,
      finalScore: 8.5,
    },
    {
      id: '2',
      studentCode: '2021002',
      fullName: 'Trần Thị Mai',
      attendanceScore: 10,
      assignmentScore: 9.5,
      midtermScore: 9.0,
      finalScore: 9.5,
    },
    {
      id: '3',
      studentCode: '2021003',
      fullName: 'Lê Văn Cường',
      attendanceScore: 5,
      assignmentScore: 4.0,
      midtermScore: 3.5,
      finalScore: 4.0,
    },
    {
      id: '4',
      studentCode: '2021004',
      fullName: 'Phạm Minh Tuấn',
      attendanceScore: 8,
      assignmentScore: 7.0,
      midtermScore: 6.5,
      finalScore: 7.0,
    },
    {
      id: '5',
      studentCode: '2021005',
      fullName: 'Hoàng Diệu Linh',
      attendanceScore: 9,
      assignmentScore: 8.0,
      midtermScore: 8.5,
      finalScore: 8.0,
    },
    {
      id: '6',
      studentCode: '2021006',
      fullName: 'Đỗ Đức Thắng',
      attendanceScore: 4,
      assignmentScore: 3.5,
      midtermScore: 4.0,
      finalScore: 3.5,
    },
    {
      id: '7',
      studentCode: '2021007',
      fullName: 'Vũ Thu Trang',
      attendanceScore: 10,
      assignmentScore: 9.0,
      midtermScore: 9.5,
      finalScore: 9.0,
    },
    {
      id: '8',
      studentCode: '2021008',
      fullName: 'Bùi Anh Quân',
      attendanceScore: 7,
      assignmentScore: 6.0,
      midtermScore: 5.5,
      finalScore: 6.0,
    },
  ],
  IT3090: [
    {
      id: '101',
      studentCode: '2021010',
      fullName: 'Ngô Bá Hùng',
      attendanceScore: 8,
      assignmentScore: 8.0,
      midtermScore: 7.5,
      finalScore: 8.0,
    },
    {
      id: '102',
      studentCode: '2021011',
      fullName: 'Lê Lan Anh',
      attendanceScore: 9,
      assignmentScore: 8.5,
      midtermScore: 9.0,
      finalScore: 8.5,
    },
    {
      id: '103',
      studentCode: '2021012',
      fullName: 'Trịnh Công Sơn',
      attendanceScore: 7,
      assignmentScore: 6.5,
      midtermScore: 7.0,
      finalScore: 6.5,
    },
  ],
  IT4010: [
    {
      id: '201',
      studentCode: '2021020',
      fullName: 'Đoàn Văn Hậu',
      attendanceScore: 9,
      assignmentScore: 9.0,
      midtermScore: 8.5,
      finalScore: 9.0,
    },
    {
      id: '202',
      studentCode: '2021021',
      fullName: 'Nguyễn Quang Hải',
      attendanceScore: 8,
      assignmentScore: 7.5,
      midtermScore: 8.0,
      finalScore: 7.5,
    },
  ],
};

export default {
  'GET /api/grades': (req: Request, res: Response) => {
    const { classCode = 'IT4409' } = req.query as any;
    const list = gradesData[classCode] || gradesData.IT4409;
    res.json(list);
  },

  'POST /api/grades/batch': (req: Request, res: Response) => {
    const { classId, grades } = req.body;
    if (classId && Array.isArray(grades)) {
      gradesData[classId] = grades;
    }
    res.json({ success: true, message: 'Lưu bảng điểm thành công!' });
  },

  'POST /api/grades/export': (_req: Request, res: Response) => {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename="grades.xlsx"');
    res.send(Buffer.from('MOCK EXCEL GRADES CONTENT'));
  },
};
