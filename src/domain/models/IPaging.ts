/**
 * @file IPaging.ts
 * @description Định nghĩa các interface phân trang chuẩn theo hệ thống
 */

export interface IFPagingApiParams {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  order?: string;
  filter?: string;
  status?: string | number;
  startDate?: string;
  endDate?: string;
}

export interface IFResponseListApi<T> {
  data: T[];
  total: number;
  pageNumber: number;
  pageSize: number;
  success: boolean;
  message?: string;
}

export interface IFResponseApi<T> {
  data: T;
  success: boolean;
  message?: string;
  code?: number;
}
