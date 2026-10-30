/**
 * @file ISystemUser.ts
 * @description Domain Model Tài khoản & Người dùng hệ thống theo chuẩn Mes-Client-ES
 */

import type { IFPagingApiParams } from './IPaging';

export type UserRole = 'admin' | 'lecturer' | 'student' | 'manager';
export type UserStatus = 'active' | 'locked';

export interface ISystemUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  role: UserRole;
  roleName: string;
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
  department?: string;
}

export interface ISystemUserQuery extends IFPagingApiParams {
  role?: UserRole;
  status?: UserStatus;
  department?: string;
}

export interface ISystemUserSubmit {
  id?: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  password?: string;
  status?: UserStatus;
  department?: string;
}
