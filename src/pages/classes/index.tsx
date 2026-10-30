/**
 * @file index.tsx
 * @description Màn hình Quản lý Lớp học chuẩn theo kiến trúc Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { IClass, IClassSubmit } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import React, { useRef } from 'react';
import { useClass } from './hooks';
import ModalComponent from './modal';
import ModalDetail from './modal-detail';
import Table from './table';
import { ClassContext } from './useContext';

export const ClassesPage: React.FC = () => {
  const windowSize = useWindowSize();
  const {
    openModal,
    handleModal,
    openModalDetail,
    handleModalDetail,
    dataItem,
    setDataItem,
    typeModal,
    setTypeModal,
  } = useModal<IClass>();

  const { addClass, updateClass } = useClass();
  const tableActionRef = useRef<any>(null);

  const handleFinishModal = async (values: IClassSubmit): Promise<boolean> => {
    if (typeModal.value === 'EDIT' && dataItem) {
      return await updateClass(dataItem.id, values, () => {
        tableActionRef.current?.reload();
      });
    }
    return await addClass(values, () => {
      tableActionRef.current?.reload();
    });
  };

  return (
    <ClassContext.Provider
      value={{
        windowSize,
        openModal,
        handleModal,
        openModalDetail,
        handleModalDetail,
        dataItem,
        setDataItem,
        typeModal,
        setTypeModal,
        actionRef: tableActionRef,
      }}
    >
      <Helmet>
        <title>Quản lý Lớp học phần</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Danh sách lớp học phần giảng dạy',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Lớp học phần', path: '/classes' },
            ],
          },
        }}
      >
        <Table />
        <ModalComponent onFinish={handleFinishModal} />
        <ModalDetail />
      </PageContainer>
    </ClassContext.Provider>
  );
};

export default ClassesPage;
