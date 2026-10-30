/**
 * @file index.ts
 * @description API Service Vai trò & Phân quyền chức năng theo chuẩn Mes-Client-ES
 */

import { ROLE } from '@domain/constants';
import type { IRole, IRoleMember, IRoleSubmit } from '@domain/models';
import requester from '../../../requester';

const { URL_API } = ROLE;

export const roleApi = {
  /**
   * Lấy toàn bộ danh sách vai trò
   */
  getAllApi: (params?: {
    keyword?: string;
    status?: number;
    scope?: string;
  }): Promise<IRole[]> => requester.get(URL_API.GET_ALL_API, params),

  /**
   * Lấy chi tiết vai trò theo ID
   */
  getByIdApi: (id: string): Promise<IRole> =>
    requester.get(URL_API.GET_BY_ID_API.replace(':id', id)),

  /**
   * Lấy danh sách thành viên thuộc vai trò
   */
  getMembersApi: (roleId: string, keyword?: string): Promise<IRoleMember[]> =>
    requester.get(`${URL_API.GET_BY_ID_API.replace(':id', roleId)}/members`, {
      keyword,
    }),

  /**
   * Thêm thành viên vào vai trò
   */
  addMembersApi: (
    roleId: string,
    userIds: string[],
  ): Promise<{ success: boolean; count: number }> =>
    requester.post(`${URL_API.GET_BY_ID_API.replace(':id', roleId)}/members`, {
      userIds,
    }),

  /**
   * Gỡ thành viên khỏi vai trò
   */
  removeMemberApi: (
    roleId: string,
    memberId: string,
  ): Promise<{ success: boolean }> =>
    requester.delete(
      `${URL_API.GET_BY_ID_API.replace(':id', roleId)}/members/${memberId}`,
    ),

  /**
   * Lấy danh sách người dùng khả dụng để thêm vào nhóm
   */
  getAvailableUsersApi: (roleId: string, keyword?: string): Promise<any[]> =>
    requester.get(
      `${URL_API.GET_BY_ID_API.replace(':id', roleId)}/available-users`,
      { keyword },
    ),

  /**
   * Thêm vai trò mới
   */
  addApi: (data: IRoleSubmit): Promise<IRole> =>
    requester.post(URL_API.ADD_API, data),

  /**
   * Cập nhật thông tin vai trò
   */
  updateApi: (id: string, data: Partial<IRoleSubmit>): Promise<IRole> =>
    requester.put(URL_API.UPDATE_API.replace(':id', id), data),

  /**
   * Cập nhật ma trận phân quyền cho vai trò
   */
  updatePermissionsApi: (
    id: string,
    permissions: Record<string, string[]>,
  ): Promise<IRole> =>
    requester.put(URL_API.UPDATE_PERMISSIONS_API.replace(':id', id), {
      permissions,
    }),

  /**
   * Xóa vai trò
   */
  deleteApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(URL_API.DELETE_API.replace(':id', id)),
};

export default roleApi;
