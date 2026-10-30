/**
 * @file index.ts
 * @description API Service Bảng điểm theo chuẩn Mes-Client-ES
 */

import { GRADE } from '@domain/constants';
import type { IGradeItem, IGradeSubmit } from '@domain/models';
import requester from '../../requester';

const { URL_API } = GRADE;

export const gradeApi = {
  /**
   * Lấy bảng điểm theo mã lớp học
   */
  getByClassIdApi: (classCode: string): Promise<IGradeItem[]> =>
    requester.get(URL_API.GET_BY_CLASS_ID_API, { classCode }),

  /**
   * Lưu cập nhật bảng điểm hàng loạt
   */
  saveBatchApi: (
    payload: IGradeSubmit,
  ): Promise<{ success: boolean; message?: string }> =>
    requester.post(URL_API.SAVE_BATCH_API, payload),

  /**
   * Xuất bảng điểm lớp ra file Excel
   */
  exportExcelApi: (classCode: string): Promise<Blob> =>
    requester.export(URL_API.EXPORT_API, { classCode }),
};

export default gradeApi;
