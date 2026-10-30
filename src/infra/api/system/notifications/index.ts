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
import requester from '../../../requester';

const { URL_API } = NOTIFICATION;

export const systemNotificationApi = {
  /**
   * Lấy danh sách thông báo hệ thống phân trang
   */
  getPagingApi: (
    params?: INotificationQuery,
  ): Promise<IFResponseListApi<ISystemNotification>> =>
    requester.get(URL_API.GET_PAGING_API, params),

  /**
   * Lấy chi tiết thông báo
   */
  getByIdApi: (id: string): Promise<ISystemNotification> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id)),

  /**
   * Tạo thông báo mới (Bản nháp hoặc Lên lịch)
   */
  createApi: (data: INotificationSubmit): Promise<ISystemNotification> =>
    requester.post(URL_API.CREATE_API, data),

  /**
   * Cập nhật thông báo
   */
  updateApi: (
    id: string,
    data: Partial<INotificationSubmit>,
  ): Promise<ISystemNotification> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data),

  /**
   * Phát hành thông báo ngay lập tức
   */
  publishApi: (id: string): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.PUBLISH_API.replace(':id', id)),

  /**
   * Thu hồi thông báo
   */
  revokeApi: (id: string): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.REVOKE_API.replace(':id', id)),

  /**
   * Xóa thông báo
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id)),
};

export default systemNotificationApi;
