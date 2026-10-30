/**
 * @file dashboard.ts
 * @description Định nghĩa các hằng số nghiệp vụ Dashboard theo chuẩn Mes-Client-ES
 */

export const DASHBOARD = {
  ACTION_TYPES: {
    GET_OVERVIEW: 'DASHBOARD/GET_OVERVIEW',
    GET_ACTIVITIES: 'DASHBOARD/GET_ACTIVITIES',
    GET_ALERTS: 'DASHBOARD/GET_ALERTS',
  },
  URL_API: {
    GET_OVERVIEW_API: '/api/dashboard/overview',
    GET_ACTIVITIES_API: '/api/dashboard/activities',
    GET_ALERTS_API: '/api/dashboard/alerts',
  },
};
