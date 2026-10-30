/**
 * @file index.ts
 * @description API Services phân hệ Công tác sinh viên (CTSV HUST)
 */

import { CTSV } from '@domain/constants';
import type {
  IConductScore,
  ICtsvQuery,
  IFResponseListApi,
  IScholarshipRecipient,
  IStudentServiceRequest,
} from '@domain/models';
import requester from '../../requester';

const { URL_API } = CTSV;

export const ctsvApi = {
  // 1. Điểm rèn luyện (ĐRL)
  conduct: {
    getPagingApi: (
      params?: ICtsvQuery,
    ): Promise<IFResponseListApi<IConductScore>> =>
      requester.get(URL_API.CONDUCT_GET_PAGING_API, params),

    updateApi: (
      id: string,
      data: Partial<IConductScore>,
    ): Promise<IConductScore> =>
      requester.put(URL_API.CONDUCT_UPDATE_API.replace(':id', id), data),

    approveApi: (
      semester: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.CONDUCT_APPROVE_API, { semester }),
  },

  // 2. Xét Học bổng Khuyến khích học tập (KKHT)
  scholarships: {
    getPagingApi: (
      params?: ICtsvQuery,
    ): Promise<IFResponseListApi<IScholarshipRecipient>> =>
      requester.get(URL_API.SCHOLARSHIPS_GET_PAGING_API, params),

    approveApi: (id: string): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.SCHOLARSHIPS_APPROVE_API, { id }),
  },

  // 3. Dịch vụ Một cửa sinh viên
  services: {
    getPagingApi: (
      params?: ICtsvQuery,
    ): Promise<IFResponseListApi<IStudentServiceRequest>> =>
      requester.get(URL_API.SERVICES_GET_PAGING_API, params),

    createApi: (
      data: Partial<IStudentServiceRequest>,
    ): Promise<IStudentServiceRequest> =>
      requester.post(URL_API.SERVICES_CREATE_API, data),

    processApi: (
      id: string,
      status: 'approved' | 'rejected',
      responseNote?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.SERVICES_PROCESS_API.replace(':id', id), {
        status,
        responseNote,
      }),
  },
};

export default ctsvApi;
