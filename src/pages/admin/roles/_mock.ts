/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Vai trò & Phân quyền chuẩn Becoxy
 */

import type { IRole, IRoleMember } from '@domain/models';
import type { Request, Response } from 'express';

const defaultAdminMembers: IRoleMember[] = [
  {
    id: 'm1',
    userId: 'u1',
    username: 'quynhttd',
    fullName: 'Trần Diễm Quỳnh',
    email: 'quynhttd@esvn.com.vn',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quynhttd',
  },
  {
    id: 'm2',
    userId: 'u2',
    username: 'quantm',
    fullName: 'Trần Minh Quân',
    email: 'test123@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=quantm',
  },
  {
    id: 'm3',
    userId: 'u3',
    username: 'binhdm',
    fullName: 'Đỗ Mạnh Bình',
    email: 'binhdm@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=binhdm',
  },
  {
    id: 'm4',
    userId: 'u4',
    username: 'Ngocvd',
    fullName: 'Vũ Đức Ngọc',
    email: 'ngocvd6008@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngocvd',
  },
  {
    id: 'm5',
    userId: 'u5',
    username: 'tuannt',
    fullName: 'tuan Nguyen',
    email: 'tuannt@esvn.com.vn',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tuannt',
  },
  {
    id: 'm6',
    userId: 'u6',
    username: 'sontd',
    fullName: 'son Tran',
    email: 'sontd@esvn.com.vn',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sontd',
  },
  {
    id: 'm7',
    userId: 'u7',
    username: 'thangnd',
    fullName: 'Nguyen4 Thang',
    email: 'thangnd1209@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thangnd',
  },
  {
    id: 'm8',
    userId: 'u8',
    username: 'thull',
    fullName: 'Lý Lâm Thư',
    email: 'thull@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thull',
  },
  {
    id: 'm9',
    userId: 'u9',
    username: 'hapt',
    fullName: 'Phí Hà',
    email: 'hapt@esvn.com.vn',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hapt',
  },
  {
    id: 'm10',
    userId: 'u10',
    username: '250423-0243',
    fullName: '250423-0243',
    email: 'mail@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=250423',
  },
  {
    id: 'm11',
    userId: 'u11',
    username: 'giaonv',
    fullName: 'Giao Nguyen',
    email: 'giaonv@esvn.com.vn',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=giaonv',
  },
  {
    id: 'm12',
    userId: 'u12',
    username: 'Longlt',
    fullName: 'Lê Long',
    email: 'tlongksa@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Longlt',
  },
  {
    id: 'm13',
    userId: 'u13',
    username: 'khsx',
    fullName: 'Thu Hằng',
    email: 'khsx@ecovn.vn',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=khsx',
  },
  {
    id: 'm14',
    userId: 'u14',
    username: 'chivu',
    fullName: 'Chi Vũ',
    email: 'chivu@gmail.com',
    roleId: '1',
    roleCode: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chivu',
  },
];

let rolesDatabase: IRole[] = [
  {
    id: '1',
    code: 'ADMIN',
    name: 'Administrator',
    description:
      'Toàn quyền cấu hình, phân quyền, quản trị tài khoản và dữ liệu toàn trường',
    status: 1,
    userCount: 45,
    isSystem: true,
    permissions: {
      students: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT'],
      classes: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT', 'APPROVE'],
      grades: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT', 'APPROVE'],
      attendance: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT'],
      notifications: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT', 'APPROVE'],
      system: ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT', 'APPROVE'],
    },
    members: defaultAdminMembers,
    updatedAt: '30/10/2026',
  },
  {
    id: '2',
    code: 'GUEST',
    name: 'Guest',
    description:
      'Tài khoản khách mời tra cứu thông tin tuyển sinh và thông báo chung',
    status: 1,
    userCount: 12,
    isSystem: false,
    permissions: {
      students: ['VIEW'],
      classes: ['VIEW'],
      grades: [],
      attendance: [],
      notifications: ['VIEW'],
      system: [],
    },
    members: [
      {
        id: 'g1',
        userId: 'ug1',
        username: 'khach.moi',
        fullName: 'Khách Tra Cứu',
        email: 'guest@gmail.com',
        roleId: '2',
      },
    ],
    updatedAt: '25/10/2026',
  },
  {
    id: '3',
    code: 'SUPPORTER',
    name: 'Supporter',
    description: 'Hỗ trợ kỹ thuật và giải đáp thắc mắc người dùng',
    status: 0,
    userCount: 3,
    isSystem: false,
    permissions: {
      students: ['VIEW'],
      classes: ['VIEW'],
      grades: ['VIEW'],
      attendance: ['VIEW'],
      notifications: ['VIEW'],
      system: ['VIEW'],
    },
    members: [],
    updatedAt: '20/10/2026',
  },
  {
    id: '4',
    code: 'MANAGER',
    name: 'Manager',
    description: 'Quản lý đào tạo, phân công giảng dạy và phê duyệt bảng điểm',
    status: 1,
    userCount: 8,
    isSystem: false,
    permissions: {
      students: ['VIEW', 'CREATE', 'EDIT', 'EXPORT'],
      classes: ['VIEW', 'CREATE', 'EDIT', 'EXPORT', 'APPROVE'],
      grades: ['VIEW', 'EXPORT', 'APPROVE'],
      attendance: ['VIEW', 'EXPORT'],
      notifications: ['VIEW', 'CREATE', 'EDIT', 'EXPORT'],
      system: ['VIEW'],
    },
    members: [
      {
        id: 'm20',
        userId: 'u20',
        username: 'manager_dao_tao',
        fullName: 'Ban Quản lý Đào tạo',
        email: 'daotao@sis.edu.vn',
        roleId: '4',
      },
    ],
    updatedAt: '28/10/2026',
  },
  {
    id: '5',
    code: 'LECTURER',
    name: 'Giảng viên',
    description:
      'Giảng dạy, quản lý lớp được phân công, điểm danh buổi học và nhập điểm học phần',
    status: 1,
    userCount: 28,
    isSystem: false,
    permissions: {
      students: ['VIEW', 'EXPORT'],
      classes: ['VIEW'],
      grades: ['VIEW', 'CREATE', 'EDIT', 'EXPORT'],
      attendance: ['VIEW', 'CREATE', 'EDIT', 'EXPORT'],
      notifications: ['VIEW'],
      system: [],
    },
    members: [
      {
        id: 'l1',
        userId: 'ul1',
        username: 'hung.nv',
        fullName: 'TS. Nguyễn Văn Hùng',
        email: 'hung.nv@sis.edu.vn',
        roleId: '5',
      },
      {
        id: 'l2',
        userId: 'ul2',
        username: 'mai.tt',
        fullName: 'ThS. Trần Thị Mai',
        email: 'mai.tt@sis.edu.vn',
        roleId: '5',
      },
    ],
    updatedAt: '20/10/2026',
  },
  {
    id: '6',
    code: 'STUDENT',
    name: 'Sinh viên',
    description:
      'Xem kết quả học tập, thời khóa biểu, lịch thi và điểm danh của cá nhân',
    status: 1,
    userCount: 350,
    isSystem: false,
    permissions: {
      students: ['VIEW'],
      classes: ['VIEW'],
      grades: ['VIEW'],
      attendance: ['VIEW'],
      notifications: ['VIEW'],
      system: [],
    },
    members: [
      {
        id: 's1',
        userId: 'us1',
        username: '2021001',
        fullName: 'Nguyễn Hoàng Nam',
        email: 'nam.nh21001@sis.edu.vn',
        roleId: '6',
      },
      {
        id: 's2',
        userId: 'us2',
        username: '2021002',
        fullName: 'Trần Thị Mai',
        email: 'mai.tt21002@sis.edu.vn',
        roleId: '6',
      },
    ],
    updatedAt: '15/10/2026',
  },
];

export default {
  'GET /api/system/roles': (req: Request, res: Response) => {
    const { keyword, status } = req.query as any;
    let list = [...rolesDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(kw) ||
          r.code.toLowerCase().includes(kw),
      );
    }

    if (status !== undefined && status !== '') {
      list = list.filter((r) => r.status === Number(status));
    }

    res.json(list);
  },

  'GET /api/system/roles/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const role = rolesDatabase.find((r) => r.id === id || r.code === id);
    if (!role) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy vai trò', success: false });
      return;
    }
    res.json(role);
  },

  'GET /api/system/roles/:id/members': (req: Request, res: Response) => {
    const { id } = req.params;
    const { keyword } = req.query as any;
    const role = rolesDatabase.find((r) => r.id === id || r.code === id);
    if (!role) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy vai trò', success: false });
      return;
    }
    let members = role.members || [];
    if (keyword) {
      const kw = String(keyword).toLowerCase();
      members = members.filter(
        (m) =>
          m.username.toLowerCase().includes(kw) ||
          m.fullName.toLowerCase().includes(kw) ||
          m.email.toLowerCase().includes(kw),
      );
    }
    res.json(members);
  },

  'POST /api/system/roles/:id/members': (req: Request, res: Response) => {
    const { id } = req.params;
    const { userIds } = req.body;
    const role = rolesDatabase.find((r) => r.id === id || r.code === id);
    if (!role) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy vai trò', success: false });
      return;
    }
    if (Array.isArray(userIds)) {
      const newMembers: IRoleMember[] = userIds.map((uid) => ({
        id: `m_${Date.now()}_${uid}`,
        userId: uid,
        username: `user_${uid}`,
        fullName: `Người dùng ${uid}`,
        email: `user${uid}@sis.edu.vn`,
        roleId: role.id,
        roleCode: role.code,
      }));
      role.members = [...(role.members || []), ...newMembers];
      role.userCount = role.members.length;
    }
    res.json({ success: true, count: userIds?.length || 0 });
  },

  'DELETE /api/system/roles/:id/members/:memberId': (
    req: Request,
    res: Response,
  ) => {
    const { id, memberId } = req.params;
    const role = rolesDatabase.find((r) => r.id === id || r.code === id);
    if (!role) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy vai trò', success: false });
      return;
    }
    role.members = (role.members || []).filter(
      (m) => m.id !== memberId && m.userId !== memberId,
    );
    role.userCount = role.members.length;
    res.json({ success: true, message: 'Đã gỡ thành viên khỏi nhóm' });
  },

  'GET /api/system/roles/:id/available-users': (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const role = rolesDatabase.find((r) => r.id === id || r.code === id);
    const existingUsernames = (role?.members || []).map((m) => m.username);

    const candidates = [
      {
        id: 'c1',
        username: 'hoang.an',
        fullName: 'Nguyễn Hoàng An',
        email: 'an.nh@sis.edu.vn',
        department: 'Khoa CNTT',
      },
      {
        id: 'c2',
        username: 'thuy.le',
        fullName: 'Lê Thị Thu Thủy',
        email: 'thuy.lt@sis.edu.vn',
        department: 'Khoa KTPM',
      },
      {
        id: 'c3',
        username: 'nam.pham',
        fullName: 'Phạm Hải Nam',
        email: 'nam.ph@sis.edu.vn',
        department: 'Phòng Đào tạo',
      },
      {
        id: 'c4',
        username: 'minh.duc',
        fullName: 'Trần Minh Đức',
        email: 'duc.tm@sis.edu.vn',
        department: 'Khoa CNTT',
      },
    ].filter((u) => !existingUsernames.includes(u.username));

    res.json(candidates);
  },

  'POST /api/system/roles': (req: Request, res: Response) => {
    const newRole: IRole = {
      ...req.body,
      id: String(Date.now()),
      status: req.body.status ?? 1,
      userCount: 0,
      isSystem: false,
      members: [],
      permissions: req.body.permissions || {
        students: ['VIEW'],
        classes: ['VIEW'],
        grades: ['VIEW'],
        attendance: ['VIEW'],
        notifications: ['VIEW'],
        system: [],
      },
      updatedAt: '30/10/2026',
    };
    rolesDatabase.push(newRole);
    res.json({
      data: newRole,
      success: true,
      message: 'Tạo vai trò thành công!',
    });
  },

  'PUT /api/system/roles/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = rolesDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy vai trò', success: false });
      return;
    }
    rolesDatabase[index] = {
      ...rolesDatabase[index],
      ...req.body,
      updatedAt: '30/10/2026',
    };
    res.json({
      data: rolesDatabase[index],
      success: true,
      message: 'Cập nhật thành công!',
    });
  },

  'PUT /api/system/roles/:id/permissions': (req: Request, res: Response) => {
    const { id } = req.params;
    const { permissions } = req.body;
    const index = rolesDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy vai trò', success: false });
      return;
    }
    rolesDatabase[index].permissions = permissions;
    rolesDatabase[index].updatedAt = '30/10/2026';
    res.json({
      data: rolesDatabase[index],
      success: true,
      message: 'Lưu phân quyền thành công!',
    });
  },

  'DELETE /api/system/roles/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    rolesDatabase = rolesDatabase.filter((r) => r.id !== id);
    res.json({ success: true, message: 'Xóa vai trò thành công!' });
  },
};
