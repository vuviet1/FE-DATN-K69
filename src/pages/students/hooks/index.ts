/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Sinh viên (gọi API, xử lý state) theo chuẩn Mes-Client-ES
 */

import type {
  IFPagingApiParams,
  IStudent,
  IStudentQuery,
  IStudentSubmit,
} from '@domain/models';
import api from '@infra/api';
import {
  notificationError,
  notificationSuccess,
  showConfirmDelete,
} from '@utils/Common';
import { downloadBlob } from '@utils/Utils';
import { useCallback, useState } from 'react';

export const useStudent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IStudent[]>([]);
  const [total, setTotal] = useState<number>(0);

  /**
   * Tải danh sách sinh viên theo bộ lọc và phân trang
   */
  const getStudents = useCallback(async (params?: IStudentQuery) => {
    setLoading(true);
    try {
      const response = await api.studentApi.getPagingApi(params);
      if (response && Array.isArray(response.data)) {
        setData(response.data);
        setTotal(response.total ?? response.data.length);
        return {
          data: response.data,
          success: true,
          total: response.total ?? response.data.length,
        };
      }
      return { data: [], success: false, total: 0 };
    } catch {
      notificationError('Không thể tải danh sách sinh viên. Vui lòng thử lại!');
      return { data: [], success: false, total: 0 };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Thêm mới sinh viên
   */
  const addStudent = async (
    payload: IStudentSubmit,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.studentApi.addApi(payload);
      notificationSuccess('Thêm mới sinh viên thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi thêm mới sinh viên!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật sinh viên
   */
  const updateStudent = async (
    id: string,
    payload: Partial<IStudentSubmit>,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    try {
      await api.studentApi.updateApi(id, payload);
      notificationSuccess('Cập nhật hồ sơ sinh viên thành công!');
      onSuccess?.();
      return true;
    } catch {
      notificationError('Lỗi khi cập nhật sinh viên!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xóa sinh viên với hộp thoại xác nhận
   */
  const deleteStudent = (
    id: string,
    fullName: string,
    onSuccess?: () => void,
  ) => {
    showConfirmDelete({
      title: 'Xóa sinh viên',
      content: `Bạn có chắc chắn muốn xóa sinh viên ${fullName} (${id})? Dữ liệu điểm và điểm danh liên quan có thể bị ảnh hưởng.`,
      onOk: async () => {
        setLoading(true);
        try {
          await api.studentApi.deleteApi(id);
          notificationSuccess('Đã xóa sinh viên thành công!');
          onSuccess?.();
        } catch {
          notificationError('Lỗi khi xóa sinh viên!');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  /**
   * Xuất danh sách sinh viên ra Excel
   */
  const exportStudents = async (params?: IFPagingApiParams) => {
    try {
      const blob = await api.studentApi.exportExcelApi(params);
      downloadBlob(blob, `Danh_sach_sinh_vien_${Date.now()}.xlsx`);
      notificationSuccess('Xuất file Excel thành công!');
    } catch {
      notificationError('Lỗi khi xuất danh sách sinh viên!');
    }
  };

  return {
    loading,
    data,
    total,
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    exportStudents,
  };
};

export default useStudent;
