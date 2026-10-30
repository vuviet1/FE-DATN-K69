/**
 * @file index.tsx
 * @description Màn hình Cấu hình & Phát thông báo hệ thống theo chuẩn Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { INotificationSubmit, ISystemNotification } from '@domain/models';
import { useModal, useWindowSize } from '@utils/hooks';
import React, { useRef } from 'react';
import { useSystemNotification } from './hooks';
import ModalComponent from './modal';
import ModalDetail from './modal-detail';
import Table from './table';
import { NotificationContext } from './useContext';

export const AdminNotificationsPage: React.FC = () => {
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
  } = useModal<ISystemNotification>();

  const { createNotification, updateNotification } = useSystemNotification();
  const tableActionRef = useRef<any>(null);

  const handleFinishModal = async (
    values: INotificationSubmit,
  ): Promise<boolean> => {
    if (typeModal.value === 'EDIT' && dataItem) {
      return await updateNotification(dataItem.id, values, () => {
        tableActionRef.current?.reload();
      });
    }
    return await createNotification(values, () => {
      tableActionRef.current?.reload();
    });
  };

  return (
    <NotificationContext.Provider
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
        <title>Cấu hình & Phát hành Thông báo Hệ thống</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Cấu hình & Phát thông báo hệ thống',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Quản trị hệ thống', path: '/admin' },
              { title: 'Cấu hình thông báo', path: '/admin/notifications' },
            ],
          },
        }}
      >
        <Table />
        <ModalComponent onFinish={handleFinishModal} />
        <ModalDetail />
      </PageContainer>
    </NotificationContext.Provider>
  );
};

export default AdminNotificationsPage;
