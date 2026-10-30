/**
 * @file columns.tsx
 * @description Định nghĩa các cột cho bảng Vai trò hệ thống theo chuẩn Mes-Client-ES
 */

import {
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import type { IRole } from '@domain/models';
import { Button, Space, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface IRoleColumnActions {
  onSelectRole: (record: IRole) => void;
  onEdit: (record: IRole) => void;
  onDelete: (record: IRole) => void;
  selectedRoleId?: string;
}

export const getRoleColumns = ({
  onSelectRole,
  onEdit,
  onDelete,
  selectedRoleId,
}: IRoleColumnActions): ColumnsType<IRole> => [
  {
    title: 'Vai trò',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => {
      const isSelected = record.id === selectedRoleId;
      return (
        <div>
          <Space>
            <SafetyCertificateOutlined
              style={{ color: record.isSystem ? '#ff4d4f' : '#1677ff' }}
            />
            <strong
              style={{
                color: isSelected ? '#1677ff' : 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => onSelectRole(record)}
            >
              {record.name}
            </strong>
            {record.isSystem && <Tag color="error">Hệ thống</Tag>}
          </Space>
          <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
            {record.description}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Số người dùng',
    dataIndex: 'userCount',
    key: 'userCount',
    width: 120,
    align: 'center',
    render: (count) => <Tag color="blue">{count} tài khoản</Tag>,
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 120,
    align: 'center',
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Chỉnh sửa phân quyền">
          <Button
            type="text"
            icon={<KeyOutlined style={{ color: '#1677ff' }} />}
            onClick={() => onSelectRole(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Sửa thông tin vai trò">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#52c41a' }} />}
            onClick={() => onEdit(record)}
            size="small"
          />
        </Tooltip>
        {!record.isSystem && (
          <Tooltip title="Xóa vai trò">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
              size="small"
            />
          </Tooltip>
        )}
      </Space>
    ),
  },
];
