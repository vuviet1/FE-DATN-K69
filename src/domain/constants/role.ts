/**
 * @file role.ts
 * @description Định nghĩa các hằng số Phân quyền & Vai trò theo chuẩn Mes-Client-ES
 */

import type { IPermissionModule } from '../models/IRole';

export const ROLE = {
  ACTION_TYPES: {
    GET_ALL: 'ROLE/GET_ALL',
    GET_BY_ID: 'ROLE/GET_BY_ID',
    ADD: 'ROLE/ADD',
    UPDATE: 'ROLE/UPDATE',
    DELETE: 'ROLE/DELETE',
    UPDATE_PERMISSIONS: 'ROLE/UPDATE_PERMISSIONS',
  },
  URL_API: {
    GET_ALL_API: '/api/system/roles',
    GET_BY_ID_API: '/api/system/roles/:id',
    ADD_API: '/api/system/roles',
    UPDATE_API: '/api/system/roles/:id',
    DELETE_API: '/api/system/roles/:id',
    UPDATE_PERMISSIONS_API: '/api/system/roles/:id/permissions',
  },
};

export const PERMISSION_ACTIONS = [
  { actionKey: 'VIEW', actionName: 'Xem dữ liệu' },
  { actionKey: 'CREATE', actionName: 'Thêm mới' },
  { actionKey: 'EDIT', actionName: 'Chỉnh sửa' },
  { actionKey: 'DELETE', actionName: 'Xóa bỏ' },
  { actionKey: 'EXPORT', actionName: 'Xuất Excel' },
  { actionKey: 'APPROVE', actionName: 'Phê duyệt / Chốt' },
];

export const PERMISSION_MODULES: IPermissionModule[] = [
  {
    moduleKey: 'students',
    moduleName: 'Quản lý Sinh viên',
    description: 'Hồ sơ sinh viên, thông tin liên lạc, điểm rèn luyện, học bạ',
    actions: PERMISSION_ACTIONS.filter((a) => a.actionKey !== 'APPROVE'),
  },
  {
    moduleKey: 'classes',
    moduleName: 'Quản lý Lớp học phần',
    description: 'Danh sách lớp, phân công giảng dạy, lịch học, thời khóa biểu',
    actions: PERMISSION_ACTIONS,
  },
  {
    moduleKey: 'grades',
    moduleName: 'Quản lý Bảng điểm',
    description:
      'Nhập điểm thành phần, tính GPA, xếp loại học lực, chốt sổ điểm',
    actions: PERMISSION_ACTIONS,
  },
  {
    moduleKey: 'attendance',
    moduleName: 'Điểm danh & Chuyên cần',
    description: 'Theo dõi điểm danh từng buổi, cảnh báo nguy cơ cấm thi',
    actions: PERMISSION_ACTIONS.filter((a) => a.actionKey !== 'APPROVE'),
  },
  {
    moduleKey: 'notifications',
    moduleName: 'Thông báo & Tin tức',
    description: 'Soạn thảo, lập lịch phát và quản lý thông báo toàn trường',
    actions: PERMISSION_ACTIONS,
  },
  {
    moduleKey: 'system',
    moduleName: 'Quản trị hệ thống',
    description:
      'Quản lý tài khoản, gán vai trò, phân quyền truy cập tính năng',
    actions: PERMISSION_ACTIONS,
  },
];
