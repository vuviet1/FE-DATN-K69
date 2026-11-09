/**
 * @file index.ts
 * @description API Service Cấu hình & Phát thông báo hệ thống theo chuẩn Mes-Client-ES
 */

import { NOTIFICATION } from '@domain/constants';
import type {
  IFResponseListApi,
  INotificationQuery,
  INotificationSubmit,
  ISystemNotification,
} from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../../requester';
import { getToken } from '../auth';

const { URL_API } = NOTIFICATION;

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const systemNotificationApi = {
  /**
   * Lấy danh sách thông báo hệ thống phân trang
   */
  getPagingApi: (
    params?: INotificationQuery,
  ): Promise<IFResponseListApi<ISystemNotification>> =>
    requester.get(URL_API.GET_PAGING_API, params, config),

  /**
   * Lấy chi tiết thông báo
   */
  getByIdApi: (id: string): Promise<ISystemNotification> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id), {}, config),

  /**
   * Tạo thông báo mới (Bản nháp hoặc Lên lịch)
   */
  createApi: (data: INotificationSubmit): Promise<ISystemNotification> =>
    requester.post(URL_API.CREATE_API, data, config),

  /**
   * Cập nhật thông báo
   */
  updateApi: (
    id: string,
    data: Partial<INotificationSubmit>,
  ): Promise<ISystemNotification> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data, config),

  /**
   * Phát hành thông báo ngay lập tức
   */
  publishApi: (id: string): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.PUBLISH_API.replace(':id', id), {}, config),

  /**
   * Thu hồi thông báo
   */
  revokeApi: (id: string): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.REVOKE_API.replace(':id', id), {}, config),

  /**
   * Xóa thông báo
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id), {}, config),
};

export default { systemNotificationApi };
