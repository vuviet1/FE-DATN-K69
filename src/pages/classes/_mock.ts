/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Lớp học
 */

import type { IClass } from '@domain/models';
import type { Request, Response } from 'express';

let classDatabase: IClass[] = [
  {
    id: '1',
    code: 'IT4409',
    name: 'Lập trình Web nâng cao',
    credits: 3,
    semester: 'HK1 (2025-2026)',
    studentCount: 45,
    schedule: 'Thứ 3 (Tiết 3 - 5)',
    room: 'Phòng D9-301',
    progress: 68,
    completedLessons: 10,
    totalLessons: 15,
    status: 'active',
    description: 'Học phần chuyên ngành CNTT về React, TypeScript, Node.js',
    lecturerName: 'ThS. Nguyễn Văn Giảng',
  },
  {
    id: '2',
    code: 'IT3090',
    name: 'Cơ sở dữ liệu phân tán',
    credits: 3,
    semester: 'HK1 (2025-2026)',
    studentCount: 52,
    schedule: 'Thứ 4 (Tiết 1 - 3)',
    room: 'Phòng D3-102',
    progress: 45,
    completedLessons: 7,
    totalLessons: 15,
    status: 'active',
    description:
      'Nghiên cứu mô hình NoSQL, Distributed Transactions và Sharding',
    lecturerName: 'ThS. Nguyễn Văn Giảng',
  },
  {
    id: '3',
    code: 'IT4010',
    name: 'Kiến trúc máy tính & Vi xử lý',
    credits: 3,
    semester: 'HK1 (2025-2026)',
    studentCount: 38,
    schedule: 'Thứ 6 (Tiết 6 - 8)',
    room: 'Phòng C1-205',
    progress: 80,
    completedLessons: 12,
    totalLessons: 15,
    status: 'active',
    description: 'Mô hình RISC-V, Cache memory, Pipelining',
    lecturerName: 'ThS. Nguyễn Văn Giảng',
  },
  {
    id: '4',
    code: 'IT2000',
    name: 'Nhập môn lập trình Java',
    credits: 4,
    semester: 'HK Hè (2024-2025)',
    studentCount: 60,
    schedule: 'Thứ 2, 5 (Tiết 1 - 2)',
    room: 'Phòng B1-402',
    progress: 100,
    completedLessons: 15,
    totalLessons: 15,
    status: 'completed',
    description: 'Lập trình hướng đối tượng cơ bản với Java',
    lecturerName: 'ThS. Nguyễn Văn Giảng',
  },
];

export default {
  'GET /api/classes': (req: Request, res: Response) => {
    const {
      keyword,
      semester,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;

    let filtered = [...classDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(kw) ||
          c.code.toLowerCase().includes(kw),
      );
    }

    if (semester) {
      filtered = filtered.filter((c) => c.semester === semester);
    }

    const start = (Number(pageNumber) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    const pagedData = filtered.slice(start, end);

    res.json({
      data: pagedData,
      total: filtered.length,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      success: true,
    });
  },

  'GET /api/classes/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const cls = classDatabase.find((c) => c.id === id || c.code === id);
    if (!cls) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy lớp học', success: false });
      return;
    }
    res.json({ data: cls, success: true });
  },

  'POST /api/classes': (req: Request, res: Response) => {
    const totalLessons = Number(req.body.totalLessons) || 15;
    const completedLessons = Number(req.body.completedLessons) || 0;
    const progress = Math.round((completedLessons / totalLessons) * 100);

    const newClass: IClass = {
      ...req.body,
      id: String(Date.now()),
      progress,
      status: req.body.status || 'active',
      lecturerName: 'ThS. Nguyễn Văn Giảng',
    };
    classDatabase.unshift(newClass);
    res.json({ data: newClass, success: true, message: 'Tạo lớp thành công!' });
  },

  'PUT /api/classes/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = classDatabase.findIndex((c) => c.id === id || c.code === id);
    if (index === -1) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy lớp học', success: false });
      return;
    }
    const current = classDatabase[index];
    const total = Number(req.body.totalLessons ?? current.totalLessons) || 15;
    const completed =
      Number(req.body.completedLessons ?? current.completedLessons) || 0;
    const progress = Math.round((completed / total) * 100);

    classDatabase[index] = {
      ...current,
      ...req.body,
      progress,
    };
    res.json({
      data: classDatabase[index],
      success: true,
      message: 'Cập nhật lớp thành công!',
    });
  },

  'DELETE /api/classes/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    classDatabase = classDatabase.filter((c) => c.id !== id && c.code !== id);
    res.json({ success: true, message: 'Xóa lớp học thành công!' });
  },
};
