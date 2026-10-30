/**
 * @file index.ts
 * @description Export tập hợp tất cả các API Services trong hệ thống
 */

import academicApi from './academic';
import attendanceApi from './attendance';
import classApi from './classes';
import ctsvApi from './ctsv';
import dashboardApi from './dashboard';
import financeApi from './finance';
import gradeApi from './grades';
import studentApi from './students';
import systemNotificationApi from './system/notifications';
import roleApi from './system/roles';
import systemUserApi from './system/users';

export const api = {
  studentApi,
  classApi,
  gradeApi,
  attendanceApi,
  dashboardApi,
  systemUserApi,
  roleApi,
  systemNotificationApi,
  academicApi,
  ctsvApi,
  financeApi,
};

export default api;
