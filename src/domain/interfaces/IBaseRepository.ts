/**
 * @file IBaseRepository.ts
 * @description Contract chuẩn cho các Repository / Service
 */

import type { IFPagingApiParams, IFResponseListApi } from '../models/IPaging';

export interface IBaseRepository<
  T,
  TSubmit,
  TQuery extends IFPagingApiParams = IFPagingApiParams,
> {
  getPaging(params: TQuery): Promise<IFResponseListApi<T>>;
  getById(id: string): Promise<T>;
  add(data: TSubmit): Promise<T>;
  update(id: string, data: Partial<TSubmit>): Promise<T>;
  delete(id: string): Promise<boolean>;
}
