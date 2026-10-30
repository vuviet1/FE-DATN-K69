/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Tài khoản người dùng theo chuẩn Mes-Client-ES
 */

import type {
  ISystemUser,
  ISystemUserQuery,
  ISystemUserSubmit,
} from '@domain/models';
import api from '@infra/api';
import {
  notificationError,
  notificationSuccess,
  showConfirmDelete,
  showConfirmDialog,
} from '@utils/Common';
import { useCallback, useState } from 'react';

export const useSystemUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<ISystemUser[]>([]);
  const [total, setTotal] = useState<number>(0);

  /**
   * Tải danh sách người dùng phân trang
   */
  const getUsers = useCallback(async (params?: ISystemUserQuery) => {
    setLoading(true);
    try {
      const response = await api.systemUserApi.getPagingApi(params);
      if (response && Array.isArray(response.data)) {
        setUsers(response.data);
        setTotal(response.total ?? response.data.length);
        return {
          data: response.data,
          success: true,
          total: response.total ?? response.data.length,
        };
      }
      return { data: [], success: false, total: 0 };
    } catch {
      notificationError('Không thể tải danh sách tài khoản!');
      return { data: [], success: false, total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Thêm mới tài khoản
   */
  const addUser = async (
    payload: ISystemUserSubmit,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.systemUserApi.addApi(payload);
      notificationSuccess('Thêm mới tài khoản thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi thêm mới tài khoản!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật thông tin tài khoản
   */
  const updateUser = async (
    id: string,
    payload: Partial<ISystemUserSubmit>,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.systemUserApi.updateApi(id, payload);
      notificationSuccess('Cập nhật thông tin tài khoản thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi cập nhật tài khoản!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Khóa hoặc mở khóa tài khoản
   */
  const toggleUserStatus = (record: ISystemUser, onSuccess?: () => void) => {
    const nextStatus = record.status === 'active' ? 'locked' : 'active';
    const actionText = nextStatus === 'locked' ? 'Khóa' : 'Kích hoạt lại';

    showConfirmDialog({
      title: `${actionText} tài khoản`,
      content: `Bạn có chắc muốn ${actionText.toLowerCase()} tài khoản ${record.fullName} (@${record.username})?`,
      danger: nextStatus === 'locked',
      onOk: async () => {
        try {
          await api.systemUserApi.toggleStatusApi(record.id, nextStatus);
          notificationSuccess(
            `Đã ${actionText.toLowerCase()} tài khoản thành công!`,
          );
          onSuccess?.();
        } catch {
          notificationError(`Lỗi khi ${actionText.toLowerCase()} tài khoản!`);
        }
      },
    });
  };

  /**
   * Đặt lại mật khẩu
   */
  const resetPassword = (record: ISystemUser) => {
    showConfirmDialog({
      title: 'Đặt lại mật khẩu',
      content: `Mật khẩu của tài khoản @${record.username} sẽ được đưa về mật khẩu mặc định (123456@sis). Bạn có muốn tiếp tục?`,
      onOk: async () => {
        try {
          await api.systemUserApi.resetPasswordApi(record.id);
          notificationSuccess('Đã đặt lại mật khẩu về mặc định (123456@sis)!');
        } catch {
          notificationError('Lỗi khi đặt lại mật khẩu!');
        }
      },
    });
  };

  /**
   * Xóa tài khoản
   */
  const deleteUser = (id: string, username: string, onSuccess?: () => void) => {
    showConfirmDelete({
      title: 'Xóa tài khoản',
      content: `Bạn có chắc chắn muốn xóa tài khoản @${username}? Người dùng này sẽ không thể đăng nhập vào hệ thống nữa.`,
      onOk: async () => {
        try {
          await api.systemUserApi.deleteApi(id);
          notificationSuccess('Đã xóa tài khoản thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi xóa tài khoản!');
        }
      },
    });
  };

  return {
    loading,
    users,
    total,
    getUsers,
    addUser,
    updateUser,
    toggleUserStatus,
    resetPassword,
    deleteUser,
  };
};

export default useSystemUser;
