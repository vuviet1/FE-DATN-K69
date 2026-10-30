/**
 * @file table.tsx
 * @description Bảng dữ liệu Thông báo hệ thống (ProTable) theo chuẩn Mes-Client-ES
 */

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { INotificationQuery, ISystemNotification } from '@domain/models';
import { Button } from 'antd';
import React, { useContext, useRef } from 'react';
import { getNotificationColumns } from './columns';
import { useSystemNotification } from './hooks';
import { NotificationContext } from './useContext';

export const Table: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const { handleModal, handleModalDetail } = useContext(NotificationContext);
  const {
    getNotifications,
    deleteNotification,
    publishNotification,
    revokeNotification,
  } = useSystemNotification();

  const handleView = (record: ISystemNotification) => {
    handleModalDetail?.(record);
  };

  const handleEdit = (record: ISystemNotification) => {
    handleModal?.(record, { value: 'EDIT', title: 'Chỉnh sửa thông báo' });
  };

  const handlePublish = (record: ISystemNotification) => {
    publishNotification(record.id, record.title, () => {
      actionRef.current?.reload();
    });
  };

  const handleRevoke = (record: ISystemNotification) => {
    revokeNotification(record.id, record.title, () => {
      actionRef.current?.reload();
    });
  };

  const handleDelete = (record: ISystemNotification) => {
    deleteNotification(record.id, record.title, () => {
      actionRef.current?.reload();
    });
  };

  const columns = getNotificationColumns({
    onView: handleView,
    onEdit: handleEdit,
    onPublish: handlePublish,
    onRevoke: handleRevoke,
    onDelete: handleDelete,
  });

  return (
    <ProTable<ISystemNotification, INotificationQuery>
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={async (params) => {
        const query: INotificationQuery = {
          pageNumber: params.current || 1,
          pageSize: params.pageSize || 10,
          keyword: params.keyword || (params as any).title,
          type: params.type,
          priority: params.priority,
          status: params.status,
          targetType: params.targetType,
        };
        const result = await getNotifications(query);
        return {
          data: result.data,
          success: result.success,
          total: result.total,
        };
      }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} trên tổng số ${total} thông báo`,
      }}
      search={{
        labelWidth: 'auto',
        searchText: 'Tìm kiếm',
        resetText: 'Làm lại',
      }}
      toolBarRender={() => [
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            handleModal?.(null, { value: 'CREATE', title: 'Soạn thông báo' })
          }
        >
          Tạo thông báo mới
        </Button>,
      ]}
    />
  );
};

export default Table;
