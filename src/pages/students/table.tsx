/**
 * @file table.tsx
 * @description Bảng dữ liệu Sinh viên (ProTable) theo chuẩn Mes-Client-ES
 */

import { DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { IStudent, IStudentQuery } from '@domain/models';
import { Button } from 'antd';
import React, { useContext, useRef } from 'react';
import { getStudentColumns } from './columns';
import { useStudent } from './hooks';
import { StudentContext } from './useContext';

export const Table: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  const { handleModal, handleModalDetail } = useContext(StudentContext);
  const { getStudents, deleteStudent, exportStudents } = useStudent();

  const handleView = (record: IStudent) => {
    handleModalDetail?.(record);
  };

  const handleEdit = (record: IStudent) => {
    handleModal?.(record, { value: 'EDIT', title: 'Chỉnh sửa' });
  };

  const handleDelete = (record: IStudent) => {
    deleteStudent(record.id, record.fullName, () => {
      actionRef.current?.reload();
    });
  };

  const columns = getStudentColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <ProTable<IStudent, IStudentQuery>
      actionRef={actionRef}
      rowKey="id"
      columns={columns}
      request={async (params) => {
        const query: IStudentQuery = {
          pageNumber: params.current || 1,
          pageSize: params.pageSize || 10,
          keyword: params.keyword || (params as any).fullName,
          className: params.className,
          status: params.status,
          gender: params.gender,
        };
        const result = await getStudents(query);
        return {
          data: result.data,
          success: result.success,
          total: result.total,
        };
      }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} trên tổng số ${total} sinh viên`,
      }}
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
        searchText: 'Tìm kiếm',
        resetText: 'Làm lại',
      }}
      toolBarRender={() => [
        <Button
          key="export"
          icon={<DownloadOutlined />}
          onClick={() => exportStudents()}
        >
          Xuất Excel
        </Button>,
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            handleModal?.(null, { value: 'CREATE', title: 'Thêm mới' })
          }
        >
          Thêm sinh viên
        </Button>,
      ]}
    />
  );
};

export default Table;
