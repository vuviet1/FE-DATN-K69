/**
 * @file index.ts
 * @description API Services phân hệ Đào tạo & Học vụ theo chuẩn HUST & mes-client-es
 */

import { ACADEMIC } from '@domain/constants';
import type {
  IAcademicAlertQuery,
  IAcademicRecord,
  ICourse,
  ICourseClassRegistration,
  ICourseQuery,
  ICourseSubmit,
  IFResponseListApi,
  IRegistrationPeriod,
  IRegistrationQuery,
} from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../requester';
import { getToken } from '../system/auth';

const { URL_API } = ACADEMIC;

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const academicApi = {
  // 1. Quản lý Chương trình đào tạo & Học phần
  getCurriculumPagingApi: (
    params?: ICourseQuery,
  ): Promise<IFResponseListApi<ICourse>> =>
    requester.get(URL_API.CURRICULUM_GET_PAGING_API, params, config),

  getCurriculumByIdApi: (id: string): Promise<ICourse> =>
    requester.get(
      URL_API.CURRICULUM_GET_BY_ID_API.replace(':id', id),
      {},
      config,
    ),

  createCurriculumApi: (data: ICourseSubmit): Promise<ICourse> =>
    requester.post(URL_API.CURRICULUM_CREATE_API, data, config),

  updateCurriculumApi: (
    id: string,
    data: Partial<ICourseSubmit>,
  ): Promise<ICourse> =>
    requester.put(
      URL_API.CURRICULUM_UPDATE_API.replace(':id', id),
      data,
      config,
    ),

  deleteCurriculumApi: (id: string): Promise<{ success: boolean }> =>
    requester.delete(
      URL_API.CURRICULUM_DELETE_API.replace(':id', id),
      {},
      config,
    ),

  // 2. Đăng ký học phần tín chỉ
  getRegistrationPeriodsApi: (): Promise<IRegistrationPeriod[]> =>
    requester.get(URL_API.REGISTRATION_GET_PERIODS_API, {}, config),

  getAvailableClassesApi: (
    params?: IRegistrationQuery,
  ): Promise<ICourseClassRegistration[]> =>
    requester.get(URL_API.REGISTRATION_GET_CLASSES_API, params, config),

  enrollClassApi: (
    classId: string,
    studentId?: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(
      URL_API.REGISTRATION_ENROLL_API,
      { classId, studentId },
      config,
    ),

  dropClassApi: (
    classId: string,
    studentId?: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(
      URL_API.REGISTRATION_DROP_API,
      { classId, studentId },
      config,
    ),

  // 3. Xử lý học vụ & Cảnh báo học tập (Mức 1, 2, 3 Buộc thôi học)
  getAlertsPagingApi: (
    params?: IAcademicAlertQuery,
  ): Promise<IFResponseListApi<IAcademicRecord>> =>
    requester.get(URL_API.ALERTS_GET_PAGING_API, params, config),

  processAlertsApi: (
    semester: string,
  ): Promise<{ success: boolean; message: string; count: number }> =>
    requester.post(URL_API.ALERTS_PROCESS_API, { semester }, config),

  // Sub-groups hỗ trợ backward compatibility
  curriculum: {
    getPagingApi: (
      params?: ICourseQuery,
    ): Promise<IFResponseListApi<ICourse>> =>
      requester.get(URL_API.CURRICULUM_GET_PAGING_API, params, config),

    getByIdApi: (id: string): Promise<ICourse> =>
      requester.get(
        URL_API.CURRICULUM_GET_BY_ID_API.replace(':id', id),
        {},
        config,
      ),

    createApi: (data: ICourseSubmit): Promise<ICourse> =>
      requester.post(URL_API.CURRICULUM_CREATE_API, data, config),

    updateApi: (id: string, data: Partial<ICourseSubmit>): Promise<ICourse> =>
      requester.put(
        URL_API.CURRICULUM_UPDATE_API.replace(':id', id),
        data,
        config,
      ),

    deleteApi: (id: string): Promise<{ success: boolean }> =>
      requester.delete(
        URL_API.CURRICULUM_DELETE_API.replace(':id', id),
        {},
        config,
      ),
  },

  registration: {
    getPeriodsApi: (): Promise<IRegistrationPeriod[]> =>
      requester.get(URL_API.REGISTRATION_GET_PERIODS_API, {}, config),

    getAvailableClassesApi: (
      params?: IRegistrationQuery,
    ): Promise<ICourseClassRegistration[]> =>
      requester.get(URL_API.REGISTRATION_GET_CLASSES_API, params, config),

    enrollClassApi: (
      classId: string,
      studentId?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(
        URL_API.REGISTRATION_ENROLL_API,
        { classId, studentId },
        config,
      ),

    dropClassApi: (
      classId: string,
      studentId?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(
        URL_API.REGISTRATION_DROP_API,
        { classId, studentId },
        config,
      ),
  },

  alerts: {
    getPagingApi: (
      params?: IAcademicAlertQuery,
    ): Promise<IFResponseListApi<IAcademicRecord>> =>
      requester.get(URL_API.ALERTS_GET_PAGING_API, params, config),

    processAlertsApi: (
      semester: string,
    ): Promise<{ success: boolean; message: string; count: number }> =>
      requester.post(URL_API.ALERTS_PROCESS_API, { semester }, config),
  },
};

export default { academicApi };
