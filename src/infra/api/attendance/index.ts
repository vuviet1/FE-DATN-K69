/**
 * @file index.ts
 * @description API Service Điểm danh theo chuẩn Mes-Client-ES
 */

import { ATTENDANCE } from '@domain/constants';
import type { IAttendanceRecord, IAttendanceSubmit } from '@domain/models';
import requester from '../../requester';

const { URL_API } = ATTENDANCE;

export const attendanceApi = {
  /**
   * Lấy danh sách điểm danh theo mã lớp và ngày
   */
  getByDateAndClassApi: (
    classCode: string,
    date: string,
  ): Promise<IAttendanceRecord[]> =>
    requester.get(URL_API.GET_BY_DATE_CLASS_API, { classCode, date }),

  /**
   * Lưu thông tin điểm danh
   */
  saveAttendanceApi: (
    payload: IAttendanceSubmit,
  ): Promise<{ success: boolean; message?: string }> =>
    requester.post(URL_API.SAVE_ATTENDANCE_API, payload),
};

export default attendanceApi;
