/**
 * @file useContext.ts
 * @description UI Context cho module Quản lý Tài khoản theo mô hình Becoxy
 */

import type { ISystemUser, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface ISystemUserContext extends IUseContext {
  dataItem?: ISystemUser | null;
  setDataItem?: (item: ISystemUser | null) => void;
  actionRef?: any;
}

export const SystemUserContext = createContext<ISystemUserContext>({});
