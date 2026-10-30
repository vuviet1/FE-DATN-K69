/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Điểm danh theo chuẩn Mes-Client-ES
 */

import type { AttendanceStatus, IAttendanceRecord } from '@domain/models';
import api from '@infra/api';
import { notificationError, notificationSuccess } from '@utils/Common';
import { formatDate } from '@utils/Utils';
import type dayjs from 'dayjs';
import { useCallback, useState } from 'react';

export const useAttendance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<IAttendanceRecord[]>([]);

  /**
   * Lấy danh sách điểm danh theo lớp và ngày
   */
  const getAttendance = useCallback(
    async (classCode: string, date: dayjs.Dayjs) => {
      setLoading(true);
      try {
        const dateStr = formatDate(date, 'YYYY-MM-DD');
        const response = await api.attendanceApi.getByDateAndClassApi(
          classCode,
          dateStr,
        );
        if (Array.isArray(response)) {
          setRecords(response);
          return response;
        }
        return [];
      } catch {
        notificationError('Không thể tải dữ liệu điểm danh!');
        return [];
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /**
   * Lưu thông tin điểm danh của buổi học
   */
  const saveAttendance = async (
    classCode: string,
    date: dayjs.Dayjs,
    dataRecords: IAttendanceRecord[],
  ) => {
    setLoading(true);
    try {
      const dateStr = formatDate(date, 'YYYY-MM-DD');
      await api.attendanceApi.saveAttendanceApi({
        classId: classCode,
        date: dateStr,
        records: dataRecords,
      });
      notificationSuccess('Lưu kết quả điểm danh thành công!');
      return true;
    } catch {
      notificationError('Lỗi khi lưu điểm danh!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật trạng thái điểm danh cho 1 sinh viên
   */
  const changeStudentStatus = (id: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  };

  /**
   * Đánh dấu toàn bộ sinh viên có mặt
   */
  const markAllPresent = () => {
    setRecords((prev) => prev.map((item) => ({ ...item, status: 'present' })));
    notificationSuccess('Đã cập nhật: Toàn bộ sinh viên có mặt!');
  };

  return {
    loading,
    records,
    setRecords,
    getAttendance,
    saveAttendance,
    changeStudentStatus,
    markAllPresent,
  };
};

export default useAttendance;
