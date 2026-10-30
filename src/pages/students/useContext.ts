/**
 * @file useContext.ts
 * @description UI Context cho module Sinh viên theo mô hình Becoxy
 */

import type { IStudent, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface IStudentContext extends IUseContext {
  dataItem?: IStudent | null;
  setDataItem?: (item: IStudent | null) => void;
  selectedRowKeys?: React.Key[];
  setSelectedRowKeys?: (keys: React.Key[]) => void;
  actionRef?: any;
}

export const StudentContext = createContext<IStudentContext>({});
