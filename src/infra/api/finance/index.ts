/**
 * @file index.ts
 * @description API Services phân hệ Học phí & Công nợ sinh viên
 */

import { FINANCE } from '@domain/constants';
import type {
  IFResponseListApi,
  ITuitionFee,
  ITuitionQuery,
} from '@domain/models';
import requester from '../../requester';

const { URL_API } = FINANCE;

export const financeApi = {
  tuition: {
    getPagingApi: (
      params?: ITuitionQuery,
    ): Promise<IFResponseListApi<ITuitionFee>> =>
      requester.get(URL_API.TUITION_GET_PAGING_API, params),

    getByIdApi: (id: string): Promise<ITuitionFee> =>
      requester.get(URL_API.TUITION_GET_BY_ID_API.replace(':id', id)),

    payApi: (
      id: string,
      amount: number,
      transactionRef?: string,
    ): Promise<{ success: boolean; message: string }> =>
      requester.post(URL_API.TUITION_PAY_API.replace(':id', id), {
        amount,
        transactionRef,
      }),
  },
};

export default financeApi;
