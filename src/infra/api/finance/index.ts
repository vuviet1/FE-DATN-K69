/**
 * @file index.ts
 * @description API Services phân hệ Học phí & Công nợ sinh viên theo chuẩn mes-client-es
 */

import { FINANCE } from '@domain/constants';
import type {
  IFResponseListApi,
  ITuitionFee,
  ITuitionQuery,
} from '@domain/models';
import type { AxiosRequestConfig } from 'axios';
import requester from '../../requester';
import { getToken } from '../system/auth';

const { URL_API } = FINANCE;

const config: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

const configExport: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  responseType: 'blob',
};

export const financeApi = {
  getPagingApi: (
    params?: ITuitionQuery,
  ): Promise<IFResponseListApi<ITuitionFee>> =>
    requester.get(URL_API.TUITION_GET_PAGING_API, params, config),

  getByIdApi: (id: string): Promise<ITuitionFee> =>
    requester.get(URL_API.TUITION_GET_BY_ID_API.replace(':id', id), {}, config),

  payApi: (
    id: string,
    amount: number,
    transactionRef?: string,
  ): Promise<{ success: boolean; message: string }> =>
    requester.post(
      URL_API.TUITION_PAY_API.replace(':id', id),
      {
        amount,
        transactionRef,
      },
      config,
    ),

  exportExcelApi: (params?: ITuitionQuery): Promise<Blob> =>
    requester.export(URL_API.TUITION_EXPORT_API, params || {}, configExport),

  // Sub-groups hỗ trợ backward compatibility
  tuition: {
    getPagingApi: (
      params?: ITuitionQuery,
    ): Promise<IFResponseListApi<ITuitionFee>> =>
      requester.get(URL_API.TUITION_GET_PAGING_API, params, config),

    getByIdApi: (id: string): Promise<ITuitionFee> =>
      requester.get(
        URL_API.TUITION_GET_BY_ID_API.replace(':id', id),
        {},
        config,
      ),

    payApi: (
      id: string,
      amount: number,
      transactionRef?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(
        URL_API.TUITION_PAY_API.replace(':id', id),
        {
          amount,
          transactionRef,
        },
        config,
      ),
  },
};

export default { financeApi };
