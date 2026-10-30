/**
 * @file IRole.ts
 * @description Domain Model Vai trò & Phân quyền chức năng theo chuẩn Mes-Client-ES Becoxy
 */

export interface IPermissionAction {
  actionKey: string; // 'VIEW', 'CREATE', 'EDIT', 'DELETE', 'EXPORT', 'APPROVE'
  actionName: string; // 'Xem', 'Thêm mới', 'Chỉnh sửa', 'Xóa', 'Xuất Excel', 'Phê duyệt'
  description?: string;
}

export interface IPermissionModule {
  moduleKey: string; // 'students', 'classes', 'grades', 'attendance', 'system', 'notifications'
  moduleName: string; // 'Quản lý Sinh viên', 'Lớp học', ...
  description?: string;
  actions: IPermissionAction[];
}

export interface IRoleMember {
  id: string;
  userId: string;
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
  roleId: string;
  roleCode?: string;
}

export interface IRole {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 1 | 0; // 1: Sử dụng, 0: Không sử dụng
  userCount: number;
  isSystem: boolean; // Vai trò hệ thống không được xóa (Admin)
  permissions: Record<string, string[]>; // moduleKey -> actionKey[]
  members?: IRoleMember[];
  updatedAt?: string;
}

export interface IRoleSubmit {
  id?: string;
  code: string;
  name: string;
  description: string;
  status?: 1 | 0;
  permissions?: Record<string, string[]>;
}
