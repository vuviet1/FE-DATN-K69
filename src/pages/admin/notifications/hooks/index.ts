/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Thông báo hệ thống theo chuẩn Mes-Client-ES
 */

import type {
  INotificationQuery,
  INotificationSubmit,
  ISystemNotification,
} from '@domain/models';
import api from '@infra/api';
import {
  notificationError,
  notificationSuccess,
  showConfirmDelete,
  showConfirmDialog,
} from '@utils/Common';
import { useCallback, useState } from 'react';

export const useSystemNotification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<ISystemNotification[]>([]);
  const [total, setTotal] = useState<number>(0);

  /**
   * Tải danh sách thông báo phân trang
   */
  const getNotifications = useCallback(async (params?: INotificationQuery) => {
    setLoading(true);
    try {
      const response = await api.systemNotificationApi.getPagingApi(params);
      if (response && Array.isArray(response.data)) {
        setNotifications(response.data);
        setTotal(response.total ?? response.data.length);
        return {
          data: response.data,
          success: true,
          total: response.total ?? response.data.length,
        };
      }
      return { data: [], success: false, total: 0 };
    } catch {
      notificationError('Không thể tải danh sách thông báo!');
      return { data: [], success: false, total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Tạo thông báo mới
   */
  const createNotification = async (
    payload: INotificationSubmit,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.systemNotificationApi.createApi(payload);
      notificationSuccess('Tạo thông báo thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi tạo thông báo!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật thông báo
   */
  const updateNotification = async (
    id: string,
    payload: Partial<INotificationSubmit>,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.systemNotificationApi.updateApi(id, payload);
      notificationSuccess('Cập nhật thông báo thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi cập nhật thông báo!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Phát hành thông báo ngay lập tức
   */
  const publishNotification = (
    id: string,
    title: string,
    onSuccess?: () => void,
  ) => {
    showConfirmDialog({
      title: 'Phát hành thông báo',
      content: `Bạn có chắc muốn phát hành ngay thông báo "${title}" tới đối tượng người nhận?`,
      onOk: async () => {
        try {
          await api.systemNotificationApi.publishApi(id);
          notificationSuccess('Đã phát hành thông báo thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi phát hành thông báo!');
        }
      },
    });
  };

  /**
   * Thu hồi thông báo
   */
  const revokeNotification = (
    id: string,
    title: string,
    onSuccess?: () => void,
  ) => {
    showConfirmDialog({
      title: 'Thu hồi thông báo',
      content: `Bạn có chắc muốn thu hồi thông báo "${title}"? Người dùng sẽ không thể xem thông báo này trên bảng tin nữa.`,
      danger: true,
      onOk: async () => {
        try {
          await api.systemNotificationApi.revokeApi(id);
          notificationSuccess('Đã thu hồi thông báo thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi thu hồi thông báo!');
        }
      },
    });
  };

  /**
   * Xóa thông báo
   */
  const deleteNotification = (
    id: string,
    title: string,
    onSuccess?: () => void,
  ) => {
    showConfirmDelete({
      title: 'Xóa thông báo',
      content: `Bạn có chắc muốn xóa thông báo "${title}"?`,
      onOk: async () => {
        try {
          await api.systemNotificationApi.deleteApi(id);
          notificationSuccess('Đã xóa thông báo thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi xóa thông báo!');
        }
      },
    });
  };

  return {
    loading,
    notifications,
    total,
    getNotifications,
    createNotification,
    updateNotification,
    publishNotification,
    revokeNotification,
    deleteNotification,
  };
};

export default useSystemNotification;
