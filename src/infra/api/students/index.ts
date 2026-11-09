/**
 * @file index.ts
 * @description API Service Sinh viên theo chuẩn Mes-Client-ES
 */

import { STUDENT } from '@domain/constants';
import type {
  IFResponseListApi,
  IStudent,
  IStudentQuery,
  IStudentSubmit,
} from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../requester';
import { getToken } from '../system/auth';

const { URL_API } = STUDENT;

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

export const studentApi = {
  /**
   * Lấy danh sách sinh viên phân trang và tìm kiếm
   */
  getPagingApi: (
    params?: IStudentQuery,
  ): Promise<IFResponseListApi<IStudent>> =>
    requester.get(URL_API.GET_PAGING_API, params, config),

  /**
   * Lấy chi tiết sinh viên theo ID
   */
  getByIdApi: (id: string): Promise<IStudent> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id), {}, config),

  /**
   * Thêm mới sinh viên
   */
  addApi: (data: IStudentSubmit): Promise<IStudent> =>
    requester.post(URL_API.ADD_API, data, config),

  /**
   * Cập nhật thông tin sinh viên
   */
  updateApi: (id: string, data: Partial<IStudentSubmit>): Promise<IStudent> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data, config),

  /**
   * Xóa sinh viên
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id), {}, config),

  /**
   * Xuất danh sách sinh viên ra file Excel
   */
  exportExcelApi: (params?: IStudentQuery): Promise<Blob> =>
    requester.export(URL_API.EXPORT_API, params || {}, configExport),
};

export default { studentApi };
