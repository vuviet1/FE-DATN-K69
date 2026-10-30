/**
 * @file useContext.ts
 * @description UI Context cho module Cấu hình thông báo theo mô hình Becoxy
 */

import type { ISystemNotification, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface INotificationContext extends IUseContext {
  dataItem?: ISystemNotification | null;
  setDataItem?: (item: ISystemNotification | null) => void;
  actionRef?: any;
}

export const NotificationContext = createContext<INotificationContext>({});
