/**
 * @file IClass.ts
 * @description Domain Model Lớp học & Học phần
 */

import type { IFPagingApiParams } from './IPaging';

export type ClassStatus = 'active' | 'completed' | 'cancelled';

export interface IClass {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: string;
  studentCount: number;
  schedule: string;
  room: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  status: ClassStatus;
  description?: string;
  lecturerName?: string;
}

export interface IClassQuery extends IFPagingApiParams {
  semester?: string;
}

export interface IClassSubmit extends Omit<IClass, 'id'> {
  id?: string;
}
