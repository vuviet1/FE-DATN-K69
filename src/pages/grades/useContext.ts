/**
 * @file useContext.ts
 * @description UI Context cho module Bảng điểm theo mô hình Becoxy
 */

import type { IGradeItem, IUseContext } from '@domain/models';
import { createContext } from 'react';

export interface IGradeContext extends IUseContext {
  selectedClassCode: string;
  setSelectedClassCode: (code: string) => void;
  grades: IGradeItem[];
  setGrades: React.Dispatch<React.SetStateAction<IGradeItem[]>>;
  dataItem?: IGradeItem | null;
  setDataItem?: (item: IGradeItem | null) => void;
  isEditingAll?: boolean;
  setIsEditingAll?: (isEditing: boolean) => void;
}

export const GradeContext = createContext<IGradeContext>({
  selectedClassCode: 'IT4409',
  setSelectedClassCode: () => {},
  grades: [],
  setGrades: () => {},
});
