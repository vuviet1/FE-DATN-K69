/**
 * @file useContext.ts
 * @description UI Context cho module Phân quyền chức năng theo mô hình Becoxy
 */

import type { IRole, IRoleMember, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface IRoleContext extends IUseContext {
  roles: IRole[];
  setRoles: React.Dispatch<React.SetStateAction<IRole[]>>;
  selectedRole: IRole | null;
  setSelectedRole: (role: IRole | null) => void;
  members: IRoleMember[];
  setMembers: React.Dispatch<React.SetStateAction<IRoleMember[]>>;
  permissions: Record<string, string[]>;
  setPermissions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  openModalAddMember?: boolean;
  handleModalAddMember?: () => void;
  selectedScope: string;
  setSelectedScope: (scope: string) => void;
  selectedStatus?: number;
  setSelectedStatus: (status?: number) => void;
  activeTab: 'members' | 'permissions';
  setActiveTab: (tab: 'members' | 'permissions') => void;
}

export const RoleContext = createContext<IRoleContext>({
  roles: [],
  setRoles: () => {},
  selectedRole: null,
  setSelectedRole: () => {},
  members: [],
  setMembers: () => {},
  permissions: {},
  setPermissions: () => {},
  selectedScope: 'GLOBAL',
  setSelectedScope: () => {},
  setSelectedStatus: () => {},
  activeTab: 'members',
  setActiveTab: () => {},
});
