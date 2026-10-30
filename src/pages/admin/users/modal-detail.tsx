/**
 * @file modal-detail.tsx
 * @description Drawer xem chi tiết hồ sơ tài khoản theo chuẩn Mes-Client-ES
 */

import { UserOutlined } from '@ant-design/icons';
import { SYSTEM_USER } from '@domain/constants';
import type { ISystemUser } from '@domain/models';
import { Avatar, Badge, Button, Descriptions, Drawer, Space, Tag } from 'antd';
import React, { useContext } from 'react';
import { SystemUserContext } from './useContext';

export const ModalDetail: React.FC = () => {
  const { openModalDetail, handleModalDetail, dataItem } =
    useContext(SystemUserContext);
  const user = dataItem as ISystemUser | null;

  if (!user) return null;

  const roleConfig = SYSTEM_USER.ROLES.find((r) => r.value === user.role);

  return (
    <Drawer
      title="Thông tin chi tiết tài khoản"
      open={openModalDetail}
      onClose={handleModalDetail}
      width={560}
      extra={<Button onClick={handleModalDetail}>Đóng</Button>}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar
          size={72}
          src={user.avatar}
          icon={<UserOutlined />}
          style={{ marginBottom: 12 }}
        />
        <h3 style={{ margin: 0 }}>{user.fullName}</h3>
        <p style={{ color: '#8c8c8c', margin: '4px 0 8px' }}>
          @{user.username}
        </p>
        <Space>
          <Tag color={roleConfig?.color || 'blue'}>
            {user.roleName || roleConfig?.label}
          </Tag>
          <Badge
            status={user.status === 'active' ? 'success' : 'error'}
            text={
              user.status === 'active' ? 'Đang hoạt động' : 'Tài khoản bị khóa'
            }
          />
        </Space>
      </div>

      <Descriptions title="Hồ sơ tài khoản" bordered column={1} size="small">
        <Descriptions.Item label="Mã định danh (ID)">
          {user.id}
        </Descriptions.Item>
        <Descriptions.Item label="Tên tài khoản (Username)">
          {user.username}
        </Descriptions.Item>
        <Descriptions.Item label="Email liên hệ">
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {user.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Đơn vị / Khoa">
          {user.department || 'Chưa cập nhật'}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo tài khoản">
          {user.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label="Lần đăng nhập gần nhất">
          {user.lastLogin || 'Chưa từng đăng nhập'}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ModalDetail;
