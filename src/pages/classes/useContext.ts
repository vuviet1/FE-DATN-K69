/**
 * @file useContext.ts
 * @description UI Context cho module Lớp học theo mô hình Becoxy
 */

import type { IClass, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface IClassContext extends IUseContext {
  dataItem?: IClass | null;
  setDataItem?: (item: IClass | null) => void;
  actionRef?: any;
}

export const ClassContext = createContext<IClassContext>({});
