/**
 * @file index.tsx
 * @description Màn hình Quản lý Chương trình đào tạo & Danh mục môn học theo chuẩn HUST
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { ICourse, ICourseSubmit } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import React, { useEffect, useState } from 'react';
import { useCurriculum } from './hooks';
import ModalComponent from './modal';
import Table from './table';
import { CurriculumContext } from './useContext';

export const CurriculumPage: React.FC = () => {
  const windowSize = useWindowSize();
  const [keyword, setKeyword] = useState<string>('');
  const [courseType, setCourseType] = useState<string | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const {
    openModal,
    handleModal,
    dataItem,
    setDataItem,
    typeModal,
    setTypeModal,
  } = useModal<ICourse>();

  const {
    courses,
    setCourses,
    total,
    setTotal,
    getCourses,
    addCourse,
    updateCourse,
  } = useCurriculum();

  useEffect(() => {
    getCourses({
      keyword,
      courseType: courseType as any,
      pageNumber,
      pageSize,
    });
  }, [getCourses, keyword, courseType, pageNumber, pageSize]);

  const handleFinishModal = async (values: ICourseSubmit): Promise<boolean> => {
    if (typeModal.value === 'EDIT' && dataItem) {
      return await updateCourse(dataItem.id, values, () => {
        getCourses({
          keyword,
          courseType: courseType as any,
          pageNumber,
          pageSize,
        });
      });
    }
    return await addCourse(values, () => {
      getCourses({
        keyword,
        courseType: courseType as any,
        pageNumber: 1,
        pageSize,
      });
    });
  };

  return (
    <CurriculumContext.Provider
      value={{
        windowSize,
        openModal,
        handleModal,
        dataItem,
        setDataItem,
        typeModal,
        setTypeModal,
        courses,
        setCourses,
        total,
        setTotal,
        pageNumber,
        setPageNumber,
        pageSize,
        setPageSize,
        keyword,
        setKeyword,
        courseType,
        setCourseType,
      }}
    >
      <Helmet>
        <title>Chương trình đào tạo & Danh mục học phần | SIS HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Chương trình đào tạo & Danh mục học phần',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Đào tạo & Học vụ', path: '/academic/curriculum' },
              { title: 'Chương trình đào tạo', path: '/academic/curriculum' },
            ],
          },
        }}
      >
        <Table />
        <ModalComponent onFinish={handleFinishModal} />
      </PageContainer>
    </CurriculumContext.Provider>
  );
};

export default CurriculumPage;
