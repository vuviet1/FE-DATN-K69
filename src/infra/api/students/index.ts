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
import requester from '../../requester';

const { URL_API } = STUDENT;

export const studentApi = {
  /**
   * Lấy danh sách sinh viên phân trang và tìm kiếm
   */
  getPagingApi: (
    params?: IStudentQuery,
  ): Promise<IFResponseListApi<IStudent>> =>
    requester.get(URL_API.GET_PAGING_API, params),

  /**
   * Lấy chi tiết sinh viên theo ID
   */
  getByIdApi: (id: string): Promise<IStudent> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id)),

  /**
   * Thêm mới sinh viên
   */
  addApi: (data: IStudentSubmit): Promise<IStudent> =>
    requester.post(URL_API.ADD_API, data),

  /**
   * Cập nhật thông tin sinh viên
   */
  updateApi: (id: string, data: Partial<IStudentSubmit>): Promise<IStudent> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data),

  /**
   * Xóa sinh viên
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id)),

  /**
   * Xuất danh sách sinh viên ra file Excel
   */
  exportExcelApi: (params?: IStudentQuery): Promise<Blob> =>
    requester.export(URL_API.EXPORT_API, params || {}),
};

export default studentApi;
