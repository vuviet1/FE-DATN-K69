import type { Request, Response } from 'express';
import { defaultUser, waitTime } from './utils';

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : 'admin';

const mockUserProfiles: Record<string, any> = {
  admin: {
    ...defaultUser,
    name: 'Quản trị viên Hệ thống',
    userid: 'ADMIN001',
    email: 'admin@lms.edu.vn',
    signature: 'Quản trị Hệ thống Mạng xã hội học tập & Quản lý đào tạo',
    title: 'Quản trị viên cao cấp',
    group: 'Ban Quản trị Công nghệ Thông tin',
    access: 'admin',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
  },
  teacher: {
    ...defaultUser,
    name: 'TS. Nguyễn Văn Hùng',
    userid: 'GV202401',
    email: 'hung.nguyen@lms.edu.vn',
    signature: 'Khoa Công Nghệ Thông Tin - Giảng viên Kỹ thuật phần mềm',
    title: 'Giảng viên chính',
    group: 'Bộ môn Kỹ thuật Phần mềm',
    access: 'teacher',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  },
  student: {
    ...defaultUser,
    name: 'Lê Văn Minh',
    userid: 'SV2021001',
    email: 'minh.lv2100@lms.edu.vn',
    signature: 'Sinh viên K66 - Ngành Khoa học Máy tính',
    title: 'Sinh viên chính quy',
    group: 'Lớp Kỹ thuật Lập trình Web - K66',
    access: 'student',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  },
};

const getAccess = () => {
  return access;
};

export default {
  'GET /api/currentUser': (_req: Request, res: Response) => {
    const curAccess = getAccess();
    if (!curAccess) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Vui lòng đăng nhập trước!',
        success: true,
      });
      return;
    }
    const profile = mockUserProfiles[curAccess] || {
      ...defaultUser,
      access: curAccess,
    };
    res.send({
      success: true,
      data: profile,
    });
  },

  'POST /api/user/switch-role': (req: Request, res: Response) => {
    const { role } = req.body;
    if (role && ['admin', 'teacher', 'student'].includes(role)) {
      access = role;
      const profile = mockUserProfiles[role];
      res.send({
        success: true,
        data: profile,
      });
      return;
    }
    res.status(400).send({ success: false, errorMessage: 'Vai trò không hợp lệ' });
  },

  'GET /api/users': [
    {
      key: '1',
      name: 'TS. Nguyễn Văn Hùng',
      role: 'teacher',
      email: 'hung.nguyen@lms.edu.vn',
      status: 'active',
    },
    {
      key: '2',
      name: 'Lê Văn Minh',
      role: 'student',
      email: 'minh.lv2100@lms.edu.vn',
      status: 'active',
    },
    {
      key: '3',
      name: 'Quản trị viên Hệ thống',
      role: 'admin',
      email: 'admin@lms.edu.vn',
      status: 'active',
    },
  ],

  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(500);

    const isMatch = password === '123456' || password === 'ant.design';

    if (username === 'admin' && isMatch) {
      access = 'admin';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (username === 'teacher' && isMatch) {
      access = 'teacher';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'teacher',
      });
      return;
    }

    if ((username === 'student' || username === 'user') && isMatch) {
      access = 'student';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'student',
      });
      return;
    }

    if (type === 'mobile') {
      access = 'admin';
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },

  'POST /api/login/outLogin': (_req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },

  'POST /api/register': (req: Request, res: Response) => {
    const { email, mail, role, name } = req.body;
    res.send({
      success: true,
      status: 'ok',
      currentAuthority: role || 'student',
      data: {
        email: email || mail,
        name: name || 'Người dùng mới',
        role: role || 'student',
      },
    });
  },

  'GET /api/500': (_req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (_req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (_req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (_req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET /api/login/captcha': async (_req: Request, res: Response) => {
    await waitTime(500);
    return res.json('captcha-xxx');
  },
};
