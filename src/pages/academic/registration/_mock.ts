/**
 * @file _mock.ts
 * @description Mock API endpoints cho Đăng ký học phần tín chỉ chuẩn HUST
 */

import type {
  ICourseClassRegistration,
  IRegistrationPeriod,
} from '@domain/models';
import type { Request, Response } from 'express';

const defaultPeriod: IRegistrationPeriod = {
  id: 'period-2026.1',
  semester: '2026.1',
  name: 'Đăng ký học phần chính thức Học kỳ 2026.1 (Thu)',
  startDate: '01/11/2026 08:00',
  endDate: '15/11/2026 23:59',
  minCredits: 12,
  maxCredits: 24,
  status: 'open',
  allowedCohorts: ['K66', 'K67', 'K68', 'K69'],
};

const classesDatabase: ICourseClassRegistration[] = [
  {
    id: 'c1',
    classCode: '145892',
    courseCode: 'IT3011',
    courseName: 'Cấu trúc dữ liệu và giải thuật',
    credits: 3,
    lecturerName: 'TS. Nguyễn Văn Hùng',
    schedule: 'Thứ 2 (Kíp 2: 09h20 - 11h45)',
    room: 'B1-302',
    capacity: 60,
    enrolled: 52,
    isRegistered: true,
  },
  {
    id: 'c2',
    classCode: '145893',
    courseCode: 'IT3011',
    courseName: 'Cấu trúc dữ liệu và giải thuật',
    credits: 3,
    lecturerName: 'ThS. Trần Thị Mai',
    schedule: 'Thứ 4 (Kíp 4: 15h05 - 17h30)',
    room: 'D9-401',
    capacity: 60,
    enrolled: 60,
    isRegistered: false,
  },
  {
    id: 'c3',
    classCode: '146201',
    courseCode: 'IT3020',
    courseName: 'Toán rời rạc',
    credits: 3,
    lecturerName: 'PGS.TS Lê Hoàng Nam',
    schedule: 'Thứ 3 (Kíp 1: 06h45 - 09h10)',
    room: 'TC-205',
    capacity: 80,
    enrolled: 71,
    isRegistered: true,
  },
  {
    id: 'c4',
    classCode: '147118',
    courseCode: 'IT3040',
    courseName: 'Kỹ thuật lập trình',
    credits: 3,
    lecturerName: 'TS. Phạm Minh Tuấn',
    schedule: 'Thứ 5 (Kíp 3: 12h30 - 14h55)',
    room: 'B1-201',
    capacity: 55,
    enrolled: 44,
    isRegistered: true,
  },
  {
    id: 'c5',
    classCode: '148090',
    courseCode: 'IT3080',
    courseName: 'Mạng máy tính',
    credits: 3,
    lecturerName: 'TS. Vũ Đức Ngọc',
    schedule: 'Thứ 6 (Kíp 2: 09h20 - 11h45)',
    room: 'D3-502',
    capacity: 60,
    enrolled: 58,
    isRegistered: false,
  },
  {
    id: 'c6',
    classCode: '149302',
    courseCode: 'IT4409',
    courseName: 'Công nghệ Web và dịch vụ trực tuyến',
    credits: 3,
    lecturerName: 'TS. Đỗ Mạnh Bình',
    schedule: 'Thứ 7 (Kíp 1: 06h45 - 09h10)',
    room: 'B1-304',
    capacity: 50,
    enrolled: 39,
    isRegistered: true,
  },
];

export default {
  'GET /api/academic/registration/periods': (_req: Request, res: Response) => {
    res.json([defaultPeriod]);
  },

  'GET /api/academic/registration/classes': (req: Request, res: Response) => {
    const { courseCode, keyword } = req.query as any;
    let list = [...classesDatabase];

    if (courseCode) {
      list = list.filter((c) => c.courseCode === courseCode);
    }
    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (c) =>
          c.classCode.toLowerCase().includes(kw) ||
          c.courseCode.toLowerCase().includes(kw) ||
          c.courseName.toLowerCase().includes(kw) ||
          c.lecturerName.toLowerCase().includes(kw),
      );
    }

    res.json(list);
  },

  'POST /api/academic/registration/enroll': (req: Request, res: Response) => {
    const { classId } = req.body;
    const target = classesDatabase.find(
      (c) => c.id === classId || c.classCode === classId,
    );
    if (!target) {
      res
        .status(404)
        .json({ success: false, message: 'Lớp học phần không tồn tại' });
      return;
    }
    if (target.enrolled >= target.capacity) {
      res
        .status(400)
        .json({ success: false, message: 'Lớp học phần đã đầy sĩ số!' });
      return;
    }
    target.isRegistered = true;
    target.enrolled += 1;
    res.json({
      success: true,
      message: `Đăng ký thành công lớp [${target.classCode}] ${target.courseName}!`,
    });
  },

  'POST /api/academic/registration/drop': (req: Request, res: Response) => {
    const { classId } = req.body;
    const target = classesDatabase.find(
      (c) => c.id === classId || c.classCode === classId,
    );
    if (!target) {
      res
        .status(404)
        .json({ success: false, message: 'Lớp học phần không tồn tại' });
      return;
    }
    target.isRegistered = false;
    target.enrolled = Math.max(0, target.enrolled - 1);
    res.json({
      success: true,
      message: `Đã hủy đăng ký lớp [${target.classCode}]!`,
    });
  },
};
