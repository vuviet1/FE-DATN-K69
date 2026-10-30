/**
 * @file modal-add-member.tsx
 * @description Modal Thêm thành viên vào nhóm phân quyền theo chuẩn Mes-Client-ES Becoxy
 */

import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import type { ISystemUser } from '@domain/models';
import { Avatar, Button, Empty, Input, Modal, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useState } from 'react';
import { useRole } from './hooks';
import { RoleContext } from './useContext';

export interface IModalAddMemberProps {
  onSuccess?: () => void;
}

export const ModalAddMemberComponent: React.FC<IModalAddMemberProps> = ({
  onSuccess,
}) => {
  const { openModalAddMember, handleModalAddMember, selectedRole } =
    useContext(RoleContext);
  const { getAvailableUsers, addMembersToRole, memberLoading } = useRole();

  const [users, setUsers] = useState<ISystemUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<React.Key[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (openModalAddMember && selectedRole) {
      setLoading(true);
      setSelectedUserIds([]);
      getAvailableUsers(selectedRole.id, keyword).then((res) => {
        setUsers(res);
        setLoading(false);
      });
    }
  }, [openModalAddMember, selectedRole, keyword]);

  const handleSearch = (val: string) => {
    setKeyword(val);
  };

  const handleConfirmAdd = async () => {
    if (!selectedRole || selectedUserIds.length === 0) return;
    const success = await addMembersToRole(
      selectedRole.id,
      selectedUserIds as string[],
    );
    if (success) {
      handleModalAddMember?.();
      onSuccess?.();
    }
  };

  const columns: ColumnsType<ISystemUser> = [
    {
      title: 'Người dùng',
      dataIndex: 'username',
      key: 'username',
      width: 170,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} size="small" />
          <strong style={{ color: '#1677ff' }}>{record.username}</strong>
        </Space>
      ),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Khoa / Đơn vị',
      dataIndex: 'department',
      key: 'department',
      width: 180,
      render: (val) => val || 'Chưa cập nhật',
    },
  ];

  return (
    <Modal
      title={
        <span>
          Thêm thành viên vào vai trò:{' '}
          <strong style={{ color: '#ea5455' }}>{selectedRole?.name}</strong>
        </span>
      }
      open={openModalAddMember}
      onCancel={handleModalAddMember}
      width={780}
      centered
      destroyOnClose
      footer={[
        <Button key="cancel" onClick={handleModalAddMember}>
          Hủy bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          style={{ backgroundColor: '#ea5455', borderColor: '#ea5455' }}
          disabled={selectedUserIds.length === 0}
          loading={memberLoading}
          onClick={handleConfirmAdd}
        >
          Thêm vào nhóm ({selectedUserIds.length})
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <Input
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          placeholder="Tìm kiếm người dùng theo tên, username, email..."
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ borderRadius: 6 }}
        />
      </div>

      <Table<ISystemUser>
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        rowSelection={{
          selectedRowKeys: selectedUserIds,
          onChange: (keys) => setSelectedUserIds(keys),
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
          showTotal: (total) => `Tổng cộng ${total} tài khoản khả dụng`,
        }}
        size="small"
        bordered
        locale={{
          emptyText: (
            <Empty description="Không có người dùng nào khả dụng hoặc tất cả đã thuộc nhóm này" />
          ),
        }}
      />
    </Modal>
  );
};

export default ModalAddMemberComponent;
