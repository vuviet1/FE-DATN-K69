/**
 * @file index.ts
 * @description API Service Tài khoản người dùng hệ thống theo chuẩn Mes-Client-ES
 */

import { SYSTEM_USER } from '@domain/constants';
import type {
  IFResponseListApi,
  ISystemUser,
  ISystemUserQuery,
  ISystemUserSubmit,
} from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../../requester';
import { getToken } from '../auth';

const { URL_API } = SYSTEM_USER;

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const systemUserApi = {
  /**
   * Lấy danh sách tài khoản phân trang
   */
  getPagingApi: (
    params?: ISystemUserQuery,
  ): Promise<IFResponseListApi<ISystemUser>> =>
    requester.get(URL_API.GET_PAGING_API, params, config),

  /**
   * Lấy chi tiết tài khoản theo ID
   */
  getByIdApi: (id: string): Promise<ISystemUser> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id), {}, config),

  /**
   * Thêm mới tài khoản
   */
  addApi: (data: ISystemUserSubmit): Promise<ISystemUser> =>
    requester.post(URL_API.ADD_API, data, config),

  /**
   * Cập nhật thông tin tài khoản
   */
  updateApi: (
    id: string,
    data: Partial<ISystemUserSubmit>,
  ): Promise<ISystemUser> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data, config),

  /**
   * Xóa tài khoản
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id), {}, config),

  /**
   * Khóa hoặc kích hoạt lại tài khoản
   */
  toggleStatusApi: (
    id: string,
    status: 'active' | 'locked',
  ): Promise<{ success: boolean; status: string }> =>
    requester.put(
      URL_API.TOGGLE_STATUS_API.replace(':id', id),
      { status },
      config,
    ),

  /**
   * Đặt lại mật khẩu về mặc định
   */
  resetPasswordApi: (
    id: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.RESET_PASSWORD_API.replace(':id', id), {}, config),
};

export default { systemUserApi };
