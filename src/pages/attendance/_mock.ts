/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Điểm danh
 */

import type { IAttendanceRecord } from '@domain/models';
import type { Request, Response } from 'express';

const attendanceData: Record<string, IAttendanceRecord[]> = {
  IT4409: [
    {
      id: '1',
      studentCode: '2021001',
      fullName: 'Nguyễn Hoàng Nam',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
      totalAbsences: 0,
      status: 'present',
    },
    {
      id: '2',
      studentCode: '2021002',
      fullName: 'Trần Thị Mai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai',
      totalAbsences: 0,
      status: 'present',
    },
    {
      id: '3',
      studentCode: '2021003',
      fullName: 'Lê Văn Cường',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
      totalAbsences: 3,
      status: 'absent',
      note: 'Ốm có giấy xin phép',
    },
    {
      id: '4',
      studentCode: '2021004',
      fullName: 'Phạm Minh Tuấn',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan',
      totalAbsences: 1,
      status: 'present',
    },
    {
      id: '5',
      studentCode: '2021005',
      fullName: 'Hoàng Diệu Linh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh',
      totalAbsences: 0,
      status: 'present',
    },
    {
      id: '6',
      studentCode: '2021006',
      fullName: 'Đỗ Đức Thắng',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thang',
      totalAbsences: 4,
      status: 'absent',
    },
    {
      id: '7',
      studentCode: '2021007',
      fullName: 'Vũ Thu Trang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trang',
      totalAbsences: 0,
      status: 'present',
    },
    {
      id: '8',
      studentCode: '2021008',
      fullName: 'Bùi Anh Quân',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quan',
      totalAbsences: 2,
      status: 'late',
    },
  ],
  IT3090: [
    {
      id: '101',
      studentCode: '2021010',
      fullName: 'Ngô Bá Hùng',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung',
      totalAbsences: 1,
      status: 'present',
    },
    {
      id: '102',
      studentCode: '2021011',
      fullName: 'Lê Lan Anh',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LanAnh',
      totalAbsences: 0,
      status: 'present',
    },
  ],
  IT4010: [
    {
      id: '201',
      studentCode: '2021020',
      fullName: 'Đoàn Văn Hậu',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hau',
      totalAbsences: 0,
      status: 'present',
    },
    {
      id: '202',
      studentCode: '2021021',
      fullName: 'Nguyễn Quang Hải',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hai',
      totalAbsences: 1,
      status: 'present',
    },
  ],
};

export default {
  'GET /api/attendance': (req: Request, res: Response) => {
    const { classCode = 'IT4409' } = req.query as any;
    const list = attendanceData[classCode] || attendanceData.IT4409;
    res.json(list);
  },

  'POST /api/attendance/save': (req: Request, res: Response) => {
    const { classId, records } = req.body;
    if (classId && Array.isArray(records)) {
      attendanceData[classId] = records;
    }
    res.json({ success: true, message: 'Lưu điểm danh thành công!' });
  },
};
