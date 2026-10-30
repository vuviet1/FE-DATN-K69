/**
 * @file index.tsx
 * @description Màn hình Quản lý Bảng điểm chuẩn theo kiến trúc Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { IGradeItem } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import { calculateGradeScale } from '@utils/Utils';
import React, { useState } from 'react';
import { calculateTotalScore, useGrade } from './hooks';
import ModalComponent from './modal';
import Table from './table';
import { GradeContext } from './useContext';

export const GradesPage: React.FC = () => {
  const windowSize = useWindowSize();
  const [selectedClassCode, setSelectedClassCode] = useState<string>('IT4409');
  const [grades, setGrades] = useState<IGradeItem[]>([]);

  const {
    openModal,
    handleModal,
    dataItem,
    setDataItem,
    typeModal,
    setTypeModal,
  } = useModal<IGradeItem>();

  const { saveBatchGrades } = useGrade();

  const handleFinishModal = async (
    updatedItem: IGradeItem,
  ): Promise<boolean> => {
    const totalScore = calculateTotalScore(updatedItem);
    const scale = calculateGradeScale(totalScore);
    const enriched: IGradeItem = {
      ...updatedItem,
      totalScore,
      letterGrade: scale.letter,
      isPassed: scale.isPassed,
    };

    const nextGrades = grades.map((g) => (g.id === enriched.id ? enriched : g));
    setGrades(nextGrades);
    return await saveBatchGrades(selectedClassCode, nextGrades);
  };

  return (
    <GradeContext.Provider
      value={{
        windowSize,
        openModal,
        handleModal,
        dataItem,
        setDataItem,
        typeModal,
        setTypeModal,
        selectedClassCode,
        setSelectedClassCode,
        grades,
        setGrades,
      }}
    >
      <Helmet>
        <title>Quản lý Bảng điểm & Học tập</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Quản lý bảng điểm học phần',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Bảng điểm', path: '/grades' },
            ],
          },
        }}
      >
        <Table />
        <ModalComponent onFinish={handleFinishModal} />
      </PageContainer>
    </GradeContext.Provider>
  );
};

export default GradesPage;
