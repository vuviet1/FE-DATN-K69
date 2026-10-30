/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Phân quyền chức năng theo chuẩn Mes-Client-ES Becoxy
 */

import type { IRole, IRoleMember, IRoleSubmit } from '@domain/models';
import api from '@infra/api';
import {
  notificationError,
  notificationSuccess,
  showConfirmDelete,
} from '@utils/Common';
import { useCallback, useState } from 'react';

export const useRole = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [memberLoading, setMemberLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [members, setMembers] = useState<IRoleMember[]>([]);

  /**
   * Lấy danh sách toàn bộ vai trò
   */
  const getRoles = useCallback(
    async (params?: { keyword?: string; status?: number; scope?: string }) => {
      setLoading(true);
      try {
        const response = await api.roleApi.getAllApi(params);
        if (Array.isArray(response)) {
          setRoles(response);
          return response;
        }
        return [];
      } catch {
        notificationError('Không thể tải danh sách vai trò!');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /**
   * Lấy danh sách thành viên thuộc vai trò
   */
  const getMembers = useCallback(async (roleId: string, keyword?: string) => {
    setMemberLoading(true);
    try {
      const response = await api.roleApi.getMembersApi(roleId, keyword);
      if (Array.isArray(response)) {
        setMembers(response);
        return response;
      }
      return [];
    } catch {
      notificationError('Không thể tải danh sách thành viên của vai trò!');
      return [];
    } finally {
      setMemberLoading(false);
    }
  }, []);

  /**
   * Thêm thành viên vào vai trò
   */
  const addMembersToRole = async (
    roleId: string,
    userIds: string[],
    onSuccess?: () => void,
  ) => {
    setMemberLoading(true);
    try {
      await api.roleApi.addMembersApi(roleId, userIds);
      notificationSuccess(
        `Đã thêm ${userIds.length} thành viên vào nhóm thành công!`,
      );
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi thêm thành viên vào nhóm!');
      return false;
    } finally {
      setMemberLoading(false);
    }
  };

  /**
   * Xóa thành viên khỏi vai trò
   */
  const removeMember = (
    roleId: string,
    memberId: string,
    memberName: string,
    onSuccess?: () => void,
  ) => {
    showConfirmDelete({
      title: 'Gỡ thành viên khỏi vai trò',
      content: `Bạn có chắc muốn gỡ người dùng "${memberName}" khỏi vai trò này?`,
      onOk: async () => {
        try {
          await api.roleApi.removeMemberApi(roleId, memberId);
          notificationSuccess(`Đã gỡ ${memberName} khỏi nhóm thành công!`);
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi gỡ thành viên khỏi nhóm!');
        }
      },
    });
  };

  /**
   * Lấy danh sách người dùng khả dụng để thêm vào nhóm
   */
  const getAvailableUsers = async (roleId: string, keyword?: string) => {
    try {
      return await api.roleApi.getAvailableUsersApi(roleId, keyword);
    } catch {
      return [];
    }
  };

  /**
   * Thêm vai trò mới
   */
  const addRole = async (payload: IRoleSubmit, onSuccess?: () => void) => {
    setLoading(true);
    try {
      await api.roleApi.addApi(payload);
      notificationSuccess('Thêm vai trò mới thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi thêm vai trò!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật thông tin vai trò
   */
  const updateRole = async (
    id: string,
    payload: Partial<IRoleSubmit>,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.roleApi.updateApi(id, payload);
      notificationSuccess('Cập nhật vai trò thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi cập nhật vai trò!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật ma trận phân quyền cho vai trò
   */
  const saveRolePermissions = async (
    roleId: string,
    permissions: Record<string, string[]>,
  ) => {
    setLoading(true);
    try {
      await api.roleApi.updatePermissionsApi(roleId, permissions);
      notificationSuccess('Lưu ma trận phân quyền thành công!');
      return true;
    } catch {
      notificationError('Lỗi khi lưu phân quyền!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xóa vai trò
   */
  const deleteRole = (id: string, name: string, onSuccess?: () => void) => {
    showConfirmDelete({
      title: 'Xóa vai trò',
      content: `Bạn có chắc muốn xóa vai trò "${name}"? Các tài khoản thuộc vai trò này sẽ mất các quyền truy cập tương ứng.`,
      onOk: async () => {
        try {
          await api.roleApi.deleteApi(id);
          notificationSuccess('Đã xóa vai trò thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi xóa vai trò!');
        }
      },
    });
  };

  return {
    loading,
    memberLoading,
    roles,
    setRoles,
    members,
    setMembers,
    getRoles,
    getMembers,
    addMembersToRole,
    removeMember,
    getAvailableUsers,
    addRole,
    updateRole,
    saveRolePermissions,
    deleteRole,
  };
};

export default useRole;
