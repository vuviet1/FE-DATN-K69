/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Chương trình đào tạo & Học phần
 */

import type { ICourse, ICourseQuery, ICourseSubmit } from '@domain/models';
import api from '@infra/api';
import {
  notificationError,
  notificationSuccess,
  showConfirmDelete,
} from '@utils/Common';
import { useCallback, useState } from 'react';

export const useCurriculum = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getCourses = useCallback(async (params?: ICourseQuery) => {
    setLoading(true);
    try {
      const response = await api.academicApi.curriculum.getPagingApi(params);
      if (response?.data) {
        setCourses(response.data);
        setTotal(response.total);
        return response;
      }
      return null;
    } catch {
      notificationError('Lỗi khi tải danh sách học phần!');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const addCourse = async (payload: ICourseSubmit, onSuccess?: () => void) => {
    setLoading(true);
    try {
      await api.academicApi.curriculum.createApi(payload);
      notificationSuccess('Thêm học phần thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi thêm học phần!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (
    id: string,
    payload: Partial<ICourseSubmit>,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.academicApi.curriculum.updateApi(id, payload);
      notificationSuccess('Cập nhật học phần thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi cập nhật học phần!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = (id: string, name: string, onSuccess?: () => void) => {
    showConfirmDelete({
      title: 'Xóa học phần',
      content: `Xác nhận xóa học phần "${name}"? Các lớp học phần liên quan sẽ bị ảnh hưởng.`,
      onOk: async () => {
        try {
          await api.academicApi.curriculum.deleteApi(id);
          notificationSuccess('Đã xóa học phần thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi xóa học phần!');
        }
      },
    });
  };

  return {
    loading,
    courses,
    setCourses,
    total,
    setTotal,
    getCourses,
    addCourse,
    updateCourse,
    deleteCourse,
  };
};

export default useCurriculum;
