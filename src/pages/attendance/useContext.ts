/**
 * @file useContext.ts
 * @description UI Context cho module Điểm danh theo mô hình Becoxy
 */

import type {
  AttendanceStatus,
  IAttendanceRecord,
  IUseContext,
} from '@domain/models';
import type dayjs from 'dayjs';
import { createContext } from 'react';

export interface IAttendanceContext extends IUseContext {
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  selectedDate: dayjs.Dayjs;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  records: IAttendanceRecord[];
  setRecords: React.Dispatch<React.SetStateAction<IAttendanceRecord[]>>;
  handleStatusChange: (id: string, status: AttendanceStatus) => void;
}

export const AttendanceContext = createContext<IAttendanceContext>({
  selectedCourse: 'IT4409',
  setSelectedCourse: () => {},
  selectedDate: null as any,
  setSelectedDate: () => {},
  records: [],
  setRecords: () => {},
  handleStatusChange: () => {},
});
