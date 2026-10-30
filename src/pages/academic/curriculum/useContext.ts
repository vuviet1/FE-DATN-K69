/**
 * @file useContext.ts
 * @description UI Context cho module Chương trình đào tạo & Danh mục môn học
 */

import type { ICourse, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface ICurriculumContext extends IUseContext {
  courses: ICourse[];
  setCourses: React.Dispatch<React.SetStateAction<ICourse[]>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  courseType?: string;
  setCourseType: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CurriculumContext = createContext<ICurriculumContext>({
  courses: [],
  setCourses: () => {},
  total: 0,
  setTotal: () => {},
  pageNumber: 1,
  setPageNumber: () => {},
  pageSize: 10,
  setPageSize: () => {},
  keyword: '',
  setKeyword: () => {},
  courseType: undefined,
  setCourseType: () => {},
});
