/**
 * @file index.ts
 * @description API Service Bảng điểm theo chuẩn Mes-Client-ES
 */

import { GRADE } from '@domain/constants';
import type { IGradeItem, IGradeSubmit } from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../requester';
import { getToken } from '../system/auth';

const { URL_API } = GRADE;

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

const configExport: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  responseType: 'blob',
};

export const gradeApi = {
  /**
   * Lấy bảng điểm theo mã lớp học
   */
  getByClassIdApi: (classCode: string): Promise<IGradeItem[]> =>
    requester.get(URL_API.GET_BY_CLASS_ID_API, { classCode }, config),

  /**
   * Lưu cập nhật bảng điểm hàng loạt
   */
  saveBatchApi: (
    payload: IGradeSubmit,
  ): Promise<{ success: boolean; message?: string }> =>
    requester.post(URL_API.SAVE_BATCH_API, payload, config),

  /**
   * Xuất bảng điểm lớp ra file Excel
   */
  exportExcelApi: (classCode: string): Promise<Blob> =>
    requester.export(URL_API.EXPORT_API, { classCode }, configExport),
};

export default { gradeApi };
