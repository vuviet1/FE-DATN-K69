/**
 * @file index.ts
 * @description API Service Lớp học theo chuẩn Mes-Client-ES
 */

import { CLASS } from '@domain/constants';
import type {
  IClass,
  IClassQuery,
  IClassSubmit,
  IFResponseListApi,
} from '@domain/models';
import requester from '../../requester';

const { URL_API } = CLASS;

export const classApi = {
  /**
   * Lấy danh sách lớp học phân trang
   */
  getPagingApi: (params?: IClassQuery): Promise<IFResponseListApi<IClass>> =>
    requester.get(URL_API.GET_PAGING_API, params),

  /**
   * Lấy chi tiết lớp học theo ID
   */
  getByIdApi: (id: string): Promise<IClass> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id)),

  /**
   * Tạo mới lớp học
   */
  addApi: (data: IClassSubmit): Promise<IClass> =>
    requester.post(URL_API.ADD_API, data),

  /**
   * Cập nhật thông tin lớp học
   */
  updateApi: (id: string, data: Partial<IClassSubmit>): Promise<IClass> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data),

  /**
   * Xóa lớp học
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id)),
};

export default classApi;
