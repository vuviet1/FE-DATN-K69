/**
 * @file index.tsx
 * @description Màn hình Quản lý Tài khoản & Người dùng theo chuẩn Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { ISystemUser, ISystemUserSubmit } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import React, { useRef } from 'react';
import { useSystemUser } from './hooks';
import ModalComponent from './modal';
import ModalDetail from './modal-detail';
import Table from './table';
import { SystemUserContext } from './useContext';

export const AdminUsersPage: React.FC = () => {
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
  } = useModal<ISystemUser>();

  const { addUser, updateUser } = useSystemUser();
  const tableActionRef = useRef<any>(null);

  const handleFinishModal = async (
    values: ISystemUserSubmit,
  ): Promise<boolean> => {
    if (typeModal.value === 'EDIT' && dataItem) {
      return await updateUser(dataItem.id, values, () => {
        tableActionRef.current?.reload();
      });
    }
    return await addUser(values, () => {
      tableActionRef.current?.reload();
    });
  };

  return (
    <SystemUserContext.Provider
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
        <title>Quản lý Tài khoản & Phân quyền Người dùng</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Quản lý tài khoản người dùng',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Quản trị hệ thống', path: '/admin' },
              { title: 'Tài khoản người dùng', path: '/admin/users' },
            ],
          },
        }}
      >
        <Table />
        <ModalComponent onFinish={handleFinishModal} />
        <ModalDetail />
      </PageContainer>
    </SystemUserContext.Provider>
  );
};

export default AdminUsersPage;
