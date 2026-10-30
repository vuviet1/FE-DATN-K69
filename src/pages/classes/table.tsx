/**
 * @file table.tsx
 * @description Bảng dữ liệu Lớp học (ProTable) theo chuẩn Mes-Client-ES
 */

import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { IClass, IClassQuery } from '@domain/models';
import { Button } from 'antd';
import React, { useContext, useRef } from 'react';
import { getClassColumns } from './columns';
import { useClass } from './hooks';
import { ClassContext } from './useContext';

export const Table: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const { handleModal, handleModalDetail } = useContext(ClassContext);
  const { getClasses, deleteClass } = useClass();

  const handleView = (record: IClass) => {
    handleModalDetail?.(record);
  };

  const handleEdit = (record: IClass) => {
    handleModal?.(record, { value: 'EDIT', title: 'Chỉnh sửa' });
  };

  const handleDelete = (record: IClass) => {
    deleteClass(record.id, record.name, () => {
      actionRef.current?.reload();
    });
  };

  const columns = getClassColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <ProTable<IClass, IClassQuery>
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={async (params) => {
        const query: IClassQuery = {
          pageNumber: params.current || 1,
          pageSize: params.pageSize || 10,
          keyword: params.keyword || (params as any).name,
          semester: params.semester,
        };
        const result = await getClasses(query);
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
          `${range[0]}-${range[1]} trên tổng số ${total} lớp học`,
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
            handleModal?.(null, { value: 'CREATE', title: 'Tạo lớp' })
          }
        >
          Mở lớp mới
        </Button>,
      ]}
    />
  );
};

export default Table;
