/**
 * @file index.ts
 * @description API Services phân hệ Đào tạo & Học vụ theo chuẩn HUST
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
import requester from '../../requester';

const { URL_API } = ACADEMIC;

export const academicApi = {
  // 1. Quản lý Chương trình đào tạo & Học phần
  curriculum: {
    getPagingApi: (
      params?: ICourseQuery,
    ): Promise<IFResponseListApi<ICourse>> =>
      requester.get(URL_API.CURRICULUM_GET_PAGING_API, params),

    getByIdApi: (id: string): Promise<ICourse> =>
      requester.get(URL_API.CURRICULUM_GET_BY_ID_API.replace(':id', id)),

    createApi: (data: ICourseSubmit): Promise<ICourse> =>
      requester.post(URL_API.CURRICULUM_CREATE_API, data),

    updateApi: (id: string, data: Partial<ICourseSubmit>): Promise<ICourse> =>
      requester.put(URL_API.CURRICULUM_UPDATE_API.replace(':id', id), data),

    deleteApi: (id: string): Promise<{ success: boolean }> =>
      requester.delete(URL_API.CURRICULUM_DELETE_API.replace(':id', id)),
  },

  // 2. Đăng ký học phần tín chỉ
  registration: {
    getPeriodsApi: (): Promise<IRegistrationPeriod[]> =>
      requester.get(URL_API.REGISTRATION_GET_PERIODS_API),

    getAvailableClassesApi: (
      params?: IRegistrationQuery,
    ): Promise<ICourseClassRegistration[]> =>
      requester.get(URL_API.REGISTRATION_GET_CLASSES_API, params),

    enrollClassApi: (
      classId: string,
      studentId?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.REGISTRATION_ENROLL_API, { classId, studentId }),

    dropClassApi: (
      classId: string,
      studentId?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.REGISTRATION_DROP_API, { classId, studentId }),
  },

  // 3. Xử lý học vụ & Cảnh báo học tập (Mức 1, 2, 3 Buộc thôi học)
  alerts: {
    getPagingApi: (
      params?: IAcademicAlertQuery,
    ): Promise<IFResponseListApi<IAcademicRecord>> =>
      requester.get(URL_API.ALERTS_GET_PAGING_API, params),

    processAlertsApi: (
      semester: string,
    ): Promise<{ success: boolean; message: string; count: number }> =>
      requester.post(URL_API.ALERTS_PROCESS_API, { semester }),
  },
};

export default academicApi;
