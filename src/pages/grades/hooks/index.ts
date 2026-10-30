/**
 * @file hooks/index.ts
 * @description Hook quản lý nghiệp vụ Bảng điểm theo chuẩn Mes-Client-ES
 */

import { GRADE } from '@domain/constants';
import type { IGradeItem } from '@domain/models';
import api from '@infra/api';
import { notificationError, notificationSuccess } from '@utils/Common';
import { calculateGradeScale, downloadBlob, roundNumber } from '@utils/Utils';
import { useCallback, useState } from 'react';

/**
 * Tính tổng điểm theo trọng số chuẩn
 */
export const calculateTotalScore = (item: IGradeItem): number => {
  const { WEIGHTS } = GRADE;
  const total =
    item.attendanceScore * WEIGHTS.ATTENDANCE +
    item.assignmentScore * WEIGHTS.ASSIGNMENT +
    item.midtermScore * WEIGHTS.MIDTERM +
    item.finalScore * WEIGHTS.FINAL;
  return roundNumber(total, 2);
};

export const useGrade = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [grades, setGrades] = useState<IGradeItem[]>([]);

  /**
   * Tải bảng điểm của lớp
   */
  const getGradesByClass = useCallback(async (classCode: string) => {
    setLoading(true);
    try {
      const response = await api.gradeApi.getByClassIdApi(classCode);
      if (Array.isArray(response)) {
        const enriched = response.map((item) => {
          const totalScore = calculateTotalScore(item);
          const scale = calculateGradeScale(totalScore);
          return {
            ...item,
            totalScore,
            letterGrade: scale.letter,
            isPassed: scale.isPassed,
          };
        });
        setGrades(enriched);
        return enriched;
      }
      return [];
    } catch {
      notificationError('Không thể tải bảng điểm của lớp!');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Lưu bảng điểm hàng loạt
   */
  const saveBatchGrades = async (
    classCode: string,
    gradeItems: IGradeItem[],
  ) => {
    setLoading(true);
    try {
      await api.gradeApi.saveBatchApi({
        classId: classCode,
        grades: gradeItems,
      });
      notificationSuccess('Lưu bảng điểm thành công!');
      return true;
    } catch {
      notificationError('Lỗi khi lưu bảng điểm!');
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Xuất bảng điểm Excel
   */
  const exportGrades = async (classCode: string) => {
    try {
      const blob = await api.gradeApi.exportExcelApi(classCode);
      downloadBlob(blob, `Bang_diem_${classCode}_${Date.now()}.xlsx`);
      notificationSuccess('Xuất file bảng điểm thành công!');
    } catch {
      notificationError('Lỗi khi xuất bảng điểm!');
    }
  };

  return {
    loading,
    grades,
    setGrades,
    getGradesByClass,
    saveBatchGrades,
    exportGrades,
  };
};

export default useGrade;
