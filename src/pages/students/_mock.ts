/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Sinh viên
 */

import type { IStudent } from '@domain/models';
import type { Request, Response } from 'express';

let studentDatabase: IStudent[] = [
  {
    id: '1',
    studentCode: '2021001',
    fullName: 'Nguyễn Hoàng Nam',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
    gender: 'Nam',
    birthDate: '2003-05-15',
    className: 'CNTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0981122334',
    email: 'nam.nh21001@sis.edu.vn',
    trainingPoint: 88,
    gpa: 3.45,
    status: 'studying',
    address: 'Cầu Giấy, Hà Nội',
  },
  {
    id: '2',
    studentCode: '2021002',
    fullName: 'Trần Thị Mai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai',
    gender: 'Nữ',
    birthDate: '2003-09-20',
    className: 'CNTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0972233445',
    email: 'mai.tt21002@sis.edu.vn',
    trainingPoint: 92,
    gpa: 3.72,
    status: 'studying',
    address: 'Đống Đa, Hà Nội',
  },
  {
    id: '3',
    studentCode: '2021003',
    fullName: 'Lê Văn Cường',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
    gender: 'Nam',
    birthDate: '2003-02-10',
    className: 'KTPM2-K65',
    course: 'Cơ sở dữ liệu phân tán',
    phone: '0963344556',
    email: 'cuong.lv21003@sis.edu.vn',
    trainingPoint: 65,
    gpa: 1.95,
    status: 'warning',
    address: 'Hà Đông, Hà Nội',
  },
  {
    id: '4',
    studentCode: '2021004',
    fullName: 'Phạm Minh Tuấn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan',
    gender: 'Nam',
    birthDate: '2003-11-28',
    className: 'KTPM2-K65',
    course: 'Cơ sở dữ liệu phân tán',
    phone: '0954455667',
    email: 'tuan.pm21004@sis.edu.vn',
    trainingPoint: 78,
    gpa: 2.85,
    status: 'studying',
    address: 'Thanh Xuân, Hà Nội',
  },
  {
    id: '5',
    studentCode: '2021005',
    fullName: 'Hoàng Diệu Linh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh',
    gender: 'Nữ',
    birthDate: '2003-07-04',
    className: 'HTTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0945566778',
    email: 'linh.hd21005@sis.edu.vn',
    trainingPoint: 95,
    gpa: 3.88,
    status: 'studying',
    address: 'Hai Bà Trưng, Hà Nội',
  },
  {
    id: '6',
    studentCode: '2021006',
    fullName: 'Đỗ Đức Thắng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thang',
    gender: 'Nam',
    birthDate: '2003-04-18',
    className: 'CNTT2-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0936677889',
    email: 'thang.dd21006@sis.edu.vn',
    trainingPoint: 52,
    gpa: 1.65,
    status: 'suspended',
    address: 'Ba Đình, Hà Nội',
  },
  {
    id: '7',
    studentCode: '2021007',
    fullName: 'Vũ Thu Trang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trang',
    gender: 'Nữ',
    birthDate: '2003-12-05',
    className: 'CNTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0927788990',
    email: 'trang.vt21007@sis.edu.vn',
    trainingPoint: 89,
    gpa: 3.52,
    status: 'studying',
    address: 'Hoàn Kiếm, Hà Nội',
  },
  {
    id: '8',
    studentCode: '2021008',
    fullName: 'Bùi Anh Quân',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quan',
    gender: 'Nam',
    birthDate: '2003-08-22',
    className: 'CNTT3-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0918899001',
    email: 'quan.ba21008@sis.edu.vn',
    trainingPoint: 72,
    gpa: 2.65,
    status: 'studying',
    address: 'Bắc Từ Liêm, Hà Nội',
  },
];

export default {
  'GET /api/students': (req: Request, res: Response) => {
    const {
      keyword,
      className,
      status,
      gender,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;

    let filtered = [...studentDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.fullName.toLowerCase().includes(kw) ||
          s.studentCode.toLowerCase().includes(kw) ||
          s.email.toLowerCase().includes(kw),
      );
    }

    if (className) {
      filtered = filtered.filter((s) =>
        s.className.toLowerCase().includes(String(className).toLowerCase()),
      );
    }

    if (status) {
      filtered = filtered.filter((s) => s.status === status);
    }

    if (gender) {
      filtered = filtered.filter((s) => s.gender === gender);
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

  'GET /api/students/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const student = studentDatabase.find((s) => s.id === id);
    if (!student) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy sinh viên', success: false });
      return;
    }
    res.json({ data: student, success: true });
  },

  'POST /api/students': (req: Request, res: Response) => {
    const newStudent: IStudent = {
      ...req.body,
      id: String(Date.now()),
      avatar:
        req.body.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(req.body.fullName || 'User')}`,
    };
    studentDatabase.unshift(newStudent);
    res.json({
      data: newStudent,
      success: true,
      message: 'Thêm mới sinh viên thành công!',
    });
  },

  'PUT /api/students/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = studentDatabase.findIndex((s) => s.id === id);
    if (index === -1) {
      res.status(404).json({
        message: 'Không tìm thấy sinh viên để cập nhật',
        success: false,
      });
      return;
    }
    studentDatabase[index] = {
      ...studentDatabase[index],
      ...req.body,
    };
    res.json({
      data: studentDatabase[index],
      success: true,
      message: 'Cập nhật thành công!',
    });
  },

  'DELETE /api/students/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    studentDatabase = studentDatabase.filter((s) => s.id !== id);
    res.json({ success: true, message: 'Đã xóa sinh viên thành công!' });
  },

  'POST /api/students/export': (_req: Request, res: Response) => {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="students.xlsx"',
    );
    res.send(Buffer.from('MOCK EXCEL CONTENT'));
  },
};
