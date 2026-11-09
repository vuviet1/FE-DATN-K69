/**
 * @file index.ts
 * @description API Services phân hệ Công tác sinh viên (CTSV HUST) theo chuẩn mes-client-es
 */

import { CTSV } from '@domain/constants';
import type {
  IConductScore,
  ICtsvQuery,
  IFResponseListApi,
  IScholarshipRecipient,
  IStudentServiceRequest,
} from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../requester';
import { getToken } from '../system/auth';

const { URL_API } = CTSV;

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const configExport: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  responseType: 'blob',
};

export const ctsvApi = {
  // 1. Điểm rèn luyện (ĐRL)
  getConductPagingApi: (
    params?: ICtsvQuery,
  ): Promise<IFResponseListApi<IConductScore>> =>
    requester.get(URL_API.CONDUCT_GET_PAGING_API, params, config),

  updateConductApi: (
    id: string,
    data: Partial<IConductScore>,
  ): Promise<IConductScore> =>
    requester.put(URL_API.CONDUCT_UPDATE_API.replace(':id', id), data, config),

  approveConductApi: (
    semester: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.CONDUCT_APPROVE_API, { semester }, config),

  // 2. Xét Học bổng Khuyến khích học tập (KKHT)
  getScholarshipsPagingApi: (
    params?: ICtsvQuery,
  ): Promise<IFResponseListApi<IScholarshipRecipient>> =>
    requester.get(URL_API.SCHOLARSHIPS_GET_PAGING_API, params, config),

  approveScholarshipApi: (
    id: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(URL_API.SCHOLARSHIPS_APPROVE_API, { id }, config),

  // 3. Dịch vụ Một cửa sinh viên
  getServicesPagingApi: (
    params?: ICtsvQuery,
  ): Promise<IFResponseListApi<IStudentServiceRequest>> =>
    requester.get(URL_API.SERVICES_GET_PAGING_API, params, config),

  createServiceApi: (
    data: Partial<IStudentServiceRequest>,
  ): Promise<IStudentServiceRequest> =>
    requester.post(URL_API.SERVICES_CREATE_API, data, config),

  processServiceApi: (
    id: string,
    status: 'approved' | 'rejected',
    responseNote?: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(
      URL_API.SERVICES_PROCESS_API.replace(':id', id),
      {
        status,
        responseNote,
      },
      config,
    ),

  // Sub-groups hỗ trợ backward compatibility
  conduct: {
    getPagingApi: (
      params?: ICtsvQuery,
    ): Promise<IFResponseListApi<IConductScore>> =>
      requester.get(URL_API.CONDUCT_GET_PAGING_API, params, config),

    updateApi: (
      id: string,
      data: Partial<IConductScore>,
    ): Promise<IConductScore> =>
      requester.put(
        URL_API.CONDUCT_UPDATE_API.replace(':id', id),
        data,
        config,
      ),

    approveApi: (
      semester: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.CONDUCT_APPROVE_API, { semester }, config),
  },

  scholarships: {
    getPagingApi: (
      params?: ICtsvQuery,
    ): Promise<IFResponseListApi<IScholarshipRecipient>> =>
      requester.get(URL_API.SCHOLARSHIPS_GET_PAGING_API, params, config),

    approveApi: (id: string): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.SCHOLARSHIPS_APPROVE_API, { id }, config),
  },

  services: {
    getPagingApi: (
      params?: ICtsvQuery,
    ): Promise<IFResponseListApi<IStudentServiceRequest>> =>
      requester.get(URL_API.SERVICES_GET_PAGING_API, params, config),

    createApi: (
      data: Partial<IStudentServiceRequest>,
    ): Promise<IStudentServiceRequest> =>
      requester.post(URL_API.SERVICES_CREATE_API, data, config),

    processApi: (
      id: string,
      status: 'approved' | 'rejected',
      responseNote?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(
        URL_API.SERVICES_PROCESS_API.replace(':id', id),
        {
          status,
          responseNote,
        },
        config,
      ),
  },
};

export default { ctsvApi };
