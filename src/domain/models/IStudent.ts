/**
 * @file IStudent.ts
 * @description Domain Model Sinh viên
 */

import type { IFPagingApiParams } from './IPaging';

export type StudentStatus = 'studying' | 'warning' | 'suspended' | 'dropped';
export type StudentGender = 'Nam' | 'Nữ';

export interface IStudent {
  id: string;
  studentCode: string;
  fullName: string;
  avatar?: string;
  gender: StudentGender;
  birthDate: string;
  className: string;
  course: string;
  phone: string;
  email: string;
  trainingPoint: number;
  gpa: number;
  status: StudentStatus;
  address?: string;
  note?: string;
}

export interface IStudentQuery extends IFPagingApiParams {
  className?: string;
  course?: string;
  gender?: StudentGender;
}

export interface IStudentSubmit extends Omit<IStudent, 'id'> {
  id?: string;
}
