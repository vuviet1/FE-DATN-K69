/**
 * @file index.tsx
 * @description Màn hình Quản lý Sinh viên chuẩn theo kiến trúc Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { IStudent, IStudentSubmit } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import React, { useRef } from 'react';
import { useStudent } from './hooks';
import ModalComponent from './modal';
import ModalDetail from './modal-detail';
import Table from './table';
import { StudentContext } from './useContext';

export const StudentsPage: React.FC = () => {
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
  } = useModal<IStudent>();

  const { addStudent, updateStudent } = useStudent();
  const tableActionRef = useRef<any>(null);

  const handleFinishModal = async (
    values: IStudentSubmit,
  ): Promise<boolean> => {
    if (typeModal.value === 'EDIT' && dataItem) {
      return await updateStudent(dataItem.id, values, () => {
        tableActionRef.current?.reload();
      });
    }
    return await addStudent(values, () => {
      tableActionRef.current?.reload();
    });
  };

  return (
    <StudentContext.Provider
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
        <title>Quản lý Hồ sơ Sinh viên</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Danh sách hồ sơ sinh viên',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Quản lý sinh viên', path: '/students' },
            ],
          },
        }}
      >
        <Table />
        <ModalComponent onFinish={handleFinishModal} />
        <ModalDetail />
      </PageContainer>
    </StudentContext.Provider>
  );
};

export default StudentsPage;
