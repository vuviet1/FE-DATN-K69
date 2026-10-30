/**
 * @file columns.tsx
 * @description Định nghĩa các cột cho bảng Người dùng hệ thống theo chuẩn Mes-Client-ES
 */

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  KeyOutlined,
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { SYSTEM_USER } from '@domain/constants';
import type { ISystemUser } from '@domain/models';
import { Avatar, Badge, Button, Space, Tag, Tooltip } from 'antd';
import React from 'react';

interface ISystemUserColumnActions {
  onView: (record: ISystemUser) => void;
  onEdit: (record: ISystemUser) => void;
  onToggleStatus: (record: ISystemUser) => void;
  onResetPassword: (record: ISystemUser) => void;
  onDelete: (record: ISystemUser) => void;
}

export const getSystemUserColumns = ({
  onView,
  onEdit,
  onToggleStatus,
  onResetPassword,
  onDelete,
}: ISystemUserColumnActions): ProColumns<ISystemUser>[] => [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
    align: 'center',
  },
  {
    title: 'Họ và tên / Tài khoản',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_, record) => (
      <Space>
        <Avatar src={record.avatar} icon={<UserOutlined />} />
        <div>
          <div style={{ fontWeight: 600 }}>{record.fullName}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            @{record.username}
          </div>
        </div>
      </Space>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    copyable: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: 120,
    search: false,
  },
  {
    title: 'Vai trò / Nhóm quyền',
    dataIndex: 'role',
    key: 'role',
    width: 170,
    valueEnum: SYSTEM_USER.ROLES.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.label, status: curr.color };
      return acc;
    }, {} as any),
    render: (_, record) => {
      const roleConfig = SYSTEM_USER.ROLES.find((r) => r.value === record.role);
      return (
        <Tag color={roleConfig?.color || 'blue'}>
          {record.roleName || roleConfig?.label}
        </Tag>
      );
    },
  },
  {
    title: 'Khoa / Đơn vị',
    dataIndex: 'department',
    key: 'department',
    ellipsis: true,
    search: false,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    valueEnum: {
      active: { text: 'Đang hoạt động', status: 'Success' },
      locked: { text: 'Đã khóa', status: 'Error' },
    },
    render: (_, record) => (
      <Badge
        status={record.status === 'active' ? 'success' : 'error'}
        text={record.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
      />
    ),
  },
  {
    title: 'Đăng nhập gần nhất',
    dataIndex: 'lastLogin',
    key: 'lastLogin',
    width: 160,
    search: false,
    render: (val) => val || 'Chưa đăng nhập',
  },
  {
    title: 'Thao tác',
    valueType: 'option',
    key: 'option',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Xem chi tiết">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }} />}
            onClick={() => onView(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#52c41a' }} />}
            onClick={() => onEdit(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip
          title={record.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}
        >
          <Button
            type="text"
            icon={
              record.status === 'active' ? (
                <LockOutlined style={{ color: '#faad14' }} />
              ) : (
                <UnlockOutlined style={{ color: '#52c41a' }} />
              )
            }
            onClick={() => onToggleStatus(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Đặt lại mật khẩu">
          <Button
            type="text"
            icon={<KeyOutlined style={{ color: '#722ed1' }} />}
            onClick={() => onResetPassword(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Xóa tài khoản">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
            size="small"
            disabled={record.role === 'admin'} // Không xóa admin gốc
          />
        </Tooltip>
      </Space>
    ),
  },
];
