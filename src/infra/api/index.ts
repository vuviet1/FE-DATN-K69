/**
 * @file index.ts
 * @description Export tập hợp tất cả các API Services trong hệ thống theo chuẩn mes-client-es
 */

import academicApi from './academic';
import attendanceApi from './attendance';
import classApi from './classes';
import ctsvApi from './ctsv';
import dashboardApi from './dashboard';
import financeApi from './finance';
import gradeApi from './grades';
import studentApi from './students';
import authApi from './system/auth';
import systemNotificationApi from './system/notifications';
import roleApi from './system/roles';
import systemUserApi from './system/users';

const api = {
  ...academicApi,
  ...attendanceApi,
  ...classApi,
  ...ctsvApi,
  ...dashboardApi,
  ...financeApi,
  ...gradeApi,
  ...studentApi,
  ...authApi,
  ...systemNotificationApi,
  ...roleApi,
  ...systemUserApi,
};

export {
  academicApi,
  attendanceApi,
  authApi,
  classApi,
  ctsvApi,
  dashboardApi,
  financeApi,
  gradeApi,
  roleApi,
  studentApi,
  systemNotificationApi,
  systemUserApi,
};

export default api;
