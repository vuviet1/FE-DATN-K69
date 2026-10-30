/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Quản lý Tài khoản người dùng
 */

import type { ISystemUser } from '@domain/models';
import type { Request, Response } from 'express';

let usersDatabase: ISystemUser[] = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Quản trị viên Hệ thống',
    email: 'admin@sis.edu.vn',
    phone: '0988001122',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminRoot',
    role: 'admin',
    roleName: 'Quản trị viên (Admin)',
    status: 'active',
    lastLogin: '30/10/2026 09:15',
    createdAt: '01/01/2026',
    department: 'Phòng Đào tạo & Quản lý sinh viên',
  },
  {
    id: '2',
    username: 'hung.nv',
    fullName: 'TS. Nguyễn Văn Hùng',
    email: 'hung.nv@sis.edu.vn',
    phone: '0912345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HungNV',
    role: 'lecturer',
    roleName: 'Giảng viên',
    status: 'active',
    lastLogin: '30/10/2026 08:30',
    createdAt: '15/01/2026',
    department: 'Khoa Công nghệ thông tin',
  },
  {
    id: '3',
    username: 'mai.tt',
    fullName: 'ThS. Trần Thị Mai',
    email: 'mai.tt@sis.edu.vn',
    phone: '0923456789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaiTT',
    role: 'lecturer',
    roleName: 'Giảng viên',
    status: 'active',
    lastLogin: '29/10/2026 14:20',
    createdAt: '15/01/2026',
    department: 'Khoa Kỹ thuật phần mềm',
  },
  {
    id: '4',
    username: 'manager_dao_tao',
    fullName: 'Ban Quản lý Đào tạo',
    email: 'daotao@sis.edu.vn',
    phone: '02438686868',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DaoTao',
    role: 'manager',
    roleName: 'Quản lý đào tạo',
    status: 'active',
    lastLogin: '30/10/2026 08:00',
    createdAt: '10/01/2026',
    department: 'Phòng Đào tạo & Quản lý sinh viên',
  },
  {
    id: '5',
    username: '2021001',
    fullName: 'Nguyễn Hoàng Nam',
    email: 'nam.nh21001@sis.edu.vn',
    phone: '0981122334',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
    role: 'student',
    roleName: 'Sinh viên',
    status: 'active',
    lastLogin: '28/10/2026 19:45',
    createdAt: '01/09/2026',
    department: 'Khoa Công nghệ thông tin',
  },
  {
    id: '6',
    username: '2021006',
    fullName: 'Đỗ Đức Thắng',
    email: 'thang.dd21006@sis.edu.vn',
    phone: '0936677889',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thang',
    role: 'student',
    roleName: 'Sinh viên',
    status: 'locked',
    lastLogin: '20/10/2026 11:10',
    createdAt: '01/09/2026',
    department: 'Khoa Công nghệ thông tin',
  },
];

export default {
  'GET /api/system/users': (req: Request, res: Response) => {
    const {
      keyword,
      role,
      status,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;

    let filtered = [...usersDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.fullName.toLowerCase().includes(kw) ||
          u.username.toLowerCase().includes(kw) ||
          u.email.toLowerCase().includes(kw),
      );
    }

    if (role) {
      filtered = filtered.filter((u) => u.role === role);
    }

    if (status) {
      filtered = filtered.filter((u) => u.status === status);
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

  'GET /api/system/users/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const user = usersDatabase.find((u) => u.id === id);
    if (!user) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy tài khoản', success: false });
      return;
    }
    res.json({ data: user, success: true });
  },

  'POST /api/system/users': (req: Request, res: Response) => {
    const roleNames: Record<string, string> = {
      admin: 'Quản trị viên (Admin)',
      manager: 'Quản lý đào tạo',
      lecturer: 'Giảng viên',
      student: 'Sinh viên',
    };

    const newUser: ISystemUser = {
      ...req.body,
      id: String(Date.now()),
      roleName: roleNames[req.body.role] || req.body.role,
      status: req.body.status || 'active',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(req.body.username || 'User')}`,
      createdAt: '30/10/2026',
    };
    usersDatabase.unshift(newUser);
    res.json({
      data: newUser,
      success: true,
      message: 'Tạo tài khoản thành công!',
    });
  },

  'PUT /api/system/users/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = usersDatabase.findIndex((u) => u.id === id);
    if (index === -1) {
      res.status(404).json({
        message: 'Không tìm thấy tài khoản để cập nhật',
        success: false,
      });
      return;
    }
    const roleNames: Record<string, string> = {
      admin: 'Quản trị viên (Admin)',
      manager: 'Quản lý đào tạo',
      lecturer: 'Giảng viên',
      student: 'Sinh viên',
    };

    usersDatabase[index] = {
      ...usersDatabase[index],
      ...req.body,
      roleName: req.body.role
        ? roleNames[req.body.role]
        : usersDatabase[index].roleName,
    };
    res.json({
      data: usersDatabase[index],
      success: true,
      message: 'Cập nhật tài khoản thành công!',
    });
  },

  'PUT /api/system/users/:id/toggle-status': (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = usersDatabase.find((u) => u.id === id);
    if (user) {
      user.status = status;
      res.json({ success: true, status });
      return;
    }
    res
      .status(404)
      .json({ success: false, message: 'Không tìm thấy người dùng' });
  },

  'POST /api/system/users/:id/reset-password': (
    _req: Request,
    res: Response,
  ) => {
    res.json({
      success: true,
      message: 'Mật khẩu đã được đặt lại về 123456@sis',
    });
  },

  'DELETE /api/system/users/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    usersDatabase = usersDatabase.filter((u) => u.id !== id);
    res.json({ success: true, message: 'Đã xóa tài khoản thành công!' });
  },
};
