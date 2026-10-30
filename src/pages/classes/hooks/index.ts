/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Lớp học theo chuẩn Mes-Client-ES
 */

import type { IClass, IClassQuery, IClassSubmit } from '@domain/models';
import api from '@infra/api';
import {
  notificationError,
  notificationSuccess,
  showConfirmDelete,
} from '@utils/Common';
import { useCallback, useState } from 'react';

export const useClass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [total, setTotal] = useState<number>(0);

  /**
   * Lấy danh sách lớp học
   */
  const getClasses = useCallback(async (params?: IClassQuery) => {
    setLoading(true);
    try {
      const response = await api.classApi.getPagingApi(params);
      if (response && Array.isArray(response.data)) {
        setClasses(response.data);
        setTotal(response.total ?? response.data.length);
        return {
          data: response.data,
          success: true,
          total: response.total ?? response.data.length,
        };
      }
      return { data: [], success: false, total: 0 };
    } catch {
      notificationError('Không thể tải danh sách lớp học!');
      return { data: [], success: false, total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Thêm mới lớp học
   */
  const addClass = async (payload: IClassSubmit, onSuccess?: () => void) => {
    setLoading(true);
    try {
      await api.classApi.addApi(payload);
      notificationSuccess('Thêm mới lớp học thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi thêm mới lớp học!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật thông tin lớp học
   */
  const updateClass = async (
    id: string,
    payload: Partial<IClassSubmit>,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.classApi.updateApi(id, payload);
      notificationSuccess('Cập nhật lớp học thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi cập nhật lớp học!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xóa lớp học
   */
  const deleteClass = (id: string, name: string, onSuccess?: () => void) => {
    showConfirmDelete({
      title: 'Xóa lớp học',
      content: `Bạn có chắc chắn muốn xóa lớp học "${name}"? Tất cả thông tin điểm số và điểm danh của lớp này sẽ bị xóa bỏ.`,
      onOk: async () => {
        setLoading(true);
        try {
          await api.classApi.deleteApi(id);
          notificationSuccess('Đã xóa lớp học thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi xóa lớp học!');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return {
    loading,
    classes,
    total,
    getClasses,
    addClass,
    updateClass,
    deleteClass,
  };
};

export default useClass;
