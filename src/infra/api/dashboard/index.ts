/**
 * @file index.ts
 * @description API Service Dashboard theo chuẩn Mes-Client-ES
 */

import { DASHBOARD } from '@domain/constants';
import type {
  IDashboardOverview,
  IStudentAlertItem,
  ITeachingActivity,
} from '@domain/models';
import requester from '../../requester';

const { URL_API } = DASHBOARD;

export const dashboardApi = {
  /**
   * Lấy số liệu tổng quan Dashboard giảng viên
   */
  getOverviewApi: (): Promise<IDashboardOverview> =>
    requester.get(URL_API.GET_OVERVIEW_API),

  /**
   * Lấy danh sách lịch giảng dạy & hoạt động sắp diễn ra
   */
  getActivitiesApi: (): Promise<ITeachingActivity[]> =>
    requester.get(URL_API.GET_ACTIVITIES_API),

  /**
   * Lấy danh sách cảnh báo học vụ của sinh viên
   */
  getAlertsApi: (): Promise<IStudentAlertItem[]> =>
    requester.get(URL_API.GET_ALERTS_API),
};

export default dashboardApi;
