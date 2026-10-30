/**
 * @file table.tsx
 * @description Bảng dữ liệu Người dùng hệ thống (ProTable) theo chuẩn Mes-Client-ES
 */

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { ISystemUser, ISystemUserQuery } from '@domain/models';
import { Button } from 'antd';
import React, { useContext, useRef } from 'react';
import { getSystemUserColumns } from './columns';
import { useSystemUser } from './hooks';
import { SystemUserContext } from './useContext';

export const Table: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const { handleModal, handleModalDetail } = useContext(SystemUserContext);
  const { getUsers, deleteUser, toggleUserStatus, resetPassword } =
    useSystemUser();

  const handleView = (record: ISystemUser) => {
    handleModalDetail?.(record);
  };

  const handleEdit = (record: ISystemUser) => {
    handleModal?.(record, { value: 'EDIT', title: 'Chỉnh sửa tài khoản' });
  };

  const handleDelete = (record: ISystemUser) => {
    deleteUser(record.id, record.username, () => {
      actionRef.current?.reload();
    });
  };

  const handleToggle = (record: ISystemUser) => {
    toggleUserStatus(record, () => {
      actionRef.current?.reload();
    });
  };

  const handleResetPass = (record: ISystemUser) => {
    resetPassword(record);
  };

  const columns = getSystemUserColumns({
    onView: handleView,
    onEdit: handleEdit,
    onToggleStatus: handleToggle,
    onResetPassword: handleResetPass,
    onDelete: handleDelete,
  });

  return (
    <ProTable<ISystemUser, ISystemUserQuery>
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={async (params) => {
        const query: ISystemUserQuery = {
          pageNumber: params.current || 1,
          pageSize: params.pageSize || 10,
          keyword: params.keyword || (params as any).fullName,
          role: params.role,
          status: params.status,
        };
        const result = await getUsers(query);
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
          `${range[0]}-${range[1]} trên tổng số ${total} tài khoản`,
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
            handleModal?.(null, { value: 'CREATE', title: 'Thêm tài khoản' })
          }
        >
          Tạo tài khoản mới
        </Button>,
      ]}
    />
  );
};

export default Table;
