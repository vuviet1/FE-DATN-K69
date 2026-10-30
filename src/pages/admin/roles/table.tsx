/**
 * @file table.tsx
 * @description Giao diện Phân quyền chức năng chuẩn 100% theo giao diện Becoxy mes-client-es
 */

import {
  CheckCircleFilled,
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  LockOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { IRole, IRoleMember } from '@domain/models';
import {
  Table as AntTable,
  Avatar,
  Button,
  Col,
  Empty,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useContext, useEffect, useState } from 'react';
import { useRole } from './hooks';
import PermissionMatrix from './permission-matrix';
import { RoleContext } from './useContext';

const { Text } = Typography;

export const Table: React.FC = () => {
  const {
    roles,
    selectedRole,
    setSelectedRole,
    members,
    setMembers,
    permissions,
    setPermissions,
    handleModal,
    handleModalAddMember,
    selectedScope,
    setSelectedScope,
    selectedStatus,
    setSelectedStatus,
    activeTab,
    setActiveTab,
  } = useContext(RoleContext);

  const {
    loading,
    memberLoading,
    getRoles,
    getMembers,
    removeMember,
    deleteRole,
    saveRolePermissions,
  } = useRole();

  const [roleSearchTerm, setRoleSearchTerm] = useState<string>('');
  const [memberSearchTerm, setMemberSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(100);

  // Tải danh sách vai trò ban đầu hoặc khi đổi bộ lọc
  useEffect(() => {
    getRoles({
      keyword: roleSearchTerm,
      status: selectedStatus,
      scope: selectedScope,
    }).then((res) => {
      if (res && res.length > 0) {
        if (!selectedRole || !res.some((r) => r.id === selectedRole.id)) {
          setSelectedRole(res[0]);
          setPermissions(res[0].permissions || {});
        }
      }
    });
  }, [getRoles, roleSearchTerm, selectedStatus, selectedScope]);

  // Tải danh sách thành viên khi chọn vai trò
  useEffect(() => {
    if (selectedRole) {
      getMembers(selectedRole.id, memberSearchTerm).then((res) => {
        setMembers(res);
      });
    }
  }, [selectedRole, memberSearchTerm, getMembers, setMembers]);

  const handleSelectRole = (role: IRole) => {
    setSelectedRole(role);
    setPermissions(role.permissions || {});
    setCurrentPage(1);
  };

  const handleEditRole = (e: React.MouseEvent, role: IRole) => {
    e.stopPropagation();
    handleModal?.(role, { value: 'EDIT', title: 'Chỉnh sửa vai trò' });
  };

  const handleDeleteRole = (e: React.MouseEvent, role: IRole) => {
    e.stopPropagation();
    deleteRole(role.id, role.name, () => {
      getRoles({ status: selectedStatus, scope: selectedScope }).then((res) => {
        if (res && res.length > 0) {
          setSelectedRole(res[0]);
        }
      });
    });
  };

  const handleRemoveMember = (member: IRoleMember) => {
    if (!selectedRole) return;
    removeMember(selectedRole.id, member.id, member.fullName, () => {
      getMembers(selectedRole.id, memberSearchTerm).then((res) =>
        setMembers(res),
      );
    });
  };

  const handleSavePerms = async () => {
    if (!selectedRole) return;
    await saveRolePermissions(selectedRole.id, permissions);
  };

  // Render Avatar đúng chuẩn như trong ảnh chụp giao diện Becoxy
  const renderAvatar = (record: IRoleMember) => {
    if (record.username === 'sontd') {
      return (
        <Avatar
          size={28}
          style={{
            backgroundColor: '#0a192f',
            color: '#38bdf8',
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          SON
        </Avatar>
      );
    }
    if (record.username === 'Longlt') {
      return (
        <Avatar
          size={28}
          style={{ backgroundColor: '#000', color: '#22c55e', fontSize: 13 }}
          icon={<CheckCircleFilled style={{ color: '#00bcd4' }} />}
        />
      );
    }
    return (
      <Avatar
        size={28}
        icon={<UserOutlined style={{ color: '#ffffff' }} />}
        style={{ backgroundColor: '#b5b5b5' }}
      />
    );
  };

  // Cột bảng thành viên đúng 100% theo ảnh
  const memberColumns: ColumnsType<IRoleMember> = [
    {
      title: 'Người dùng',
      dataIndex: 'username',
      key: 'username',
      width: 260,
      render: (_, record) => (
        <Space size="middle">
          {renderAvatar(record)}
          <span style={{ fontWeight: 600, color: '#22292f' }}>
            {record.username}
          </span>
        </Space>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (val) => <span style={{ color: '#626262' }}>{val}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (val) => <span style={{ color: '#626262' }}>{val}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="Gỡ thành viên"
          description={`Xác nhận gỡ @${record.username} khỏi nhóm?`}
          onConfirm={() => handleRemoveMember(record)}
          okText="Gỡ"
          cancelText="Hủy"
        >
          <Tooltip title="Gỡ khỏi nhóm">
            <Button
              type="text"
              danger
              icon={
                <DeleteOutlined style={{ color: '#8c8c8c', fontSize: 15 }} />
              }
              size="small"
            />
          </Tooltip>
        </Popconfirm>
      ),
    },
  ];

  // Lọc danh sách vai trò
  const filteredRoles = roles.filter(
    (r) =>
      r.name.toLowerCase().includes(roleSearchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(roleSearchTerm.toLowerCase()),
  );

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      {/* 1. Header Dropdowns theo đúng chuẩn Becoxy (ảnh đính kèm) */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <Select
          value={selectedScope}
          onChange={(val) => setSelectedScope(val)}
          style={{ width: 220 }}
          options={[
            { label: '[GLOBAL] Toàn hệ thống', value: 'GLOBAL' },
            { label: 'Khoa Công nghệ thông tin', value: 'CNTT' },
            { label: 'Khoa Kỹ thuật phần mềm', value: 'KTPM' },
            { label: 'Phòng Đào tạo & Quản lý sinh viên', value: 'DAOTAO' },
          ]}
        />
        <Select
          placeholder="Chọn..."
          value={selectedStatus}
          onChange={(val) => setSelectedStatus(val)}
          allowClear
          style={{ width: 180 }}
          options={[
            { label: 'Sử dụng', value: 1 },
            { label: 'Không sử dụng', value: 0 },
          ]}
        />
      </div>

      {/* 2. Layout 2 Cột: Cột trái (Nhóm vai trò) & Cột phải (Thành viên / Phân quyền chức năng) */}
      <Row
        gutter={0}
        style={{
          border: '1px solid #ebe9f1',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {/* Cột Trái: Danh sách nhóm vai trò (~25% width) */}
        <Col
          xs={24}
          md={8}
          lg={6}
          style={{ borderRight: '1px solid #ebe9f1', backgroundColor: '#fff' }}
        >
          {/* Ô tìm kiếm vai trò & Nút thêm vai trò */}
          <div
            style={{ padding: '12px 14px', borderBottom: '1px solid #ebe9f1' }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Input
                placeholder="Tìm kiếm..."
                value={roleSearchTerm}
                onChange={(e) => setRoleSearchTerm(e.target.value)}
                allowClear
                style={{ borderRadius: 6, borderColor: '#d8d6de' }}
              />
              <Tooltip title="Thêm vai trò mới">
                <Button
                  type="text"
                  icon={
                    <PlusOutlined style={{ color: '#ea5455', fontSize: 16 }} />
                  }
                  onClick={() =>
                    handleModal?.(null, {
                      value: 'CREATE',
                      title: 'Thêm vai trò',
                    })
                  }
                />
              </Tooltip>
            </div>
          </div>

          {/* Danh sách vai trò */}
          <div style={{ maxHeight: 680, overflowY: 'auto' }}>
            {filteredRoles.map((role) => {
              const isSelected = selectedRole?.id === role.id;
              const isActiveStatus = role.status === 1;

              return (
                <div
                  key={role.id}
                  onClick={() => handleSelectRole(role)}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid #ebe9f1',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#fff0f0' : '#fff',
                    borderLeft: isSelected
                      ? '3px solid #ea5455'
                      : '3px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: isSelected ? '#ea5455' : '#2c2c2c',
                        }}
                      >
                        {role.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: isSelected ? '#ea5455' : '#8c8c8c',
                          marginTop: 3,
                        }}
                      >
                        {isActiveStatus ? 'Sử dụng' : 'Không sử dụng'}
                      </div>
                    </div>

                    <Space size="middle" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="Sửa tên vai trò">
                        <EditOutlined
                          style={{
                            color: isSelected ? '#ea5455' : '#b9b9c3',
                            fontSize: 15,
                            cursor: 'pointer',
                          }}
                          onClick={(e) => handleEditRole(e, role)}
                        />
                      </Tooltip>
                      <Tooltip
                        title={isActiveStatus ? 'Đang hoạt động' : 'Đã khóa'}
                      >
                        {isActiveStatus ? (
                          <UnlockOutlined
                            style={{
                              color: isSelected ? '#ea5455' : '#b9b9c3',
                              fontSize: 15,
                              cursor: 'pointer',
                            }}
                          />
                        ) : (
                          <LockOutlined
                            style={{
                              color: isSelected ? '#ea5455' : '#b9b9c3',
                              fontSize: 15,
                              cursor: 'pointer',
                            }}
                          />
                        )}
                      </Tooltip>
                      {!role.isSystem && (
                        <Popconfirm
                          title="Xóa vai trò"
                          description={`Xóa vai trò "${role.name}"?`}
                          onConfirm={(e: any) => handleDeleteRole(e, role)}
                          okText="Xóa"
                          cancelText="Hủy"
                        >
                          <DeleteOutlined
                            style={{
                              color: '#b9b9c3',
                              fontSize: 15,
                              cursor: 'pointer',
                            }}
                          />
                        </Popconfirm>
                      )}
                    </Space>
                  </div>
                </div>
              );
            })}

            {filteredRoles.length === 0 && (
              <div style={{ padding: 32, textAlign: 'center' }}>
                <Empty
                  description="Không có vai trò nào"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </div>
            )}
          </div>
        </Col>

        {/* Cột Phải: Danh sách thành viên / Ma trận quyền (~75% width) */}
        <Col
          xs={24}
          md={16}
          lg={18}
          style={{ backgroundColor: '#fff', padding: '16px 20px' }}
        >
          {selectedRole ? (
            <div>
              {/* Header của vai trò đang chọn */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  borderBottom: '1px solid #ebe9f1',
                  paddingBottom: 14,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#2c2c2c',
                    }}
                  >
                    {selectedRole.name}
                  </h3>
                </div>

                <Space size="large">
                  <Tabs
                    activeKey={activeTab}
                    onChange={(k) => setActiveTab(k as any)}
                    items={[
                      {
                        key: 'members',
                        label: (
                          <span>
                            <TeamOutlined /> Thành viên ({members.length})
                          </span>
                        ),
                      },
                      {
                        key: 'permissions',
                        label: (
                          <span>
                            <KeyOutlined /> Phân quyền chức năng
                          </span>
                        ),
                      },
                    ]}
                    style={{ marginBottom: -16 }}
                  />

                  {activeTab === 'members' && (
                    <Button
                      type="link"
                      style={{
                        color: '#ea5455',
                        fontWeight: 600,
                        paddingRight: 0,
                        fontSize: 14,
                      }}
                      onClick={handleModalAddMember}
                    >
                      + Thêm thành viên
                    </Button>
                  )}
                </Space>
              </div>

              {/* Tab 1: Danh sách thành viên đúng theo mẫu ảnh Becoxy */}
              {activeTab === 'members' && (
                <div>
                  <div
                    style={{
                      marginBottom: 12,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Input
                      prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                      placeholder="Tìm thành viên trong nhóm..."
                      value={memberSearchTerm}
                      onChange={(e) => setMemberSearchTerm(e.target.value)}
                      allowClear
                      style={{ width: 280, borderRadius: 6 }}
                    />
                  </div>

                  <AntTable<IRoleMember>
                    rowKey="id"
                    columns={memberColumns}
                    dataSource={members.slice(
                      (currentPage - 1) * pageSize,
                      currentPage * pageSize,
                    )}
                    loading={memberLoading}
                    pagination={false}
                    size="middle"
                    bordered={false}
                    style={{ minHeight: 380 }}
                  />

                  {/* Thanh phân trang y như mẫu chụp Becoxy */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 16,
                      paddingTop: 14,
                      borderTop: '1px solid #ebe9f1',
                    }}
                  >
                    <Space size="middle">
                      <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={members.length}
                        onChange={(page, pSize) => {
                          setCurrentPage(page);
                          setPageSize(pSize);
                        }}
                        showSizeChanger={false}
                        size="small"
                      />
                      <Select
                        value={pageSize}
                        onChange={(val) => {
                          setPageSize(val);
                          setCurrentPage(1);
                        }}
                        size="small"
                        style={{ width: 155 }}
                        options={[
                          { label: '20 Bản ghi / trang', value: 20 },
                          { label: '50 Bản ghi / trang', value: 50 },
                          { label: '100 Bản ghi / trang', value: 100 },
                        ]}
                      />
                    </Space>

                    <Text
                      type="secondary"
                      style={{ fontSize: 13, color: '#6e6b7b' }}
                    >
                      {currentPage} /{' '}
                      {Math.max(1, Math.ceil(members.length / pageSize))} Trang
                      ({members.length} Bản ghi)
                    </Text>
                  </div>
                </div>
              )}

              {/* Tab 2: Phân quyền chức năng (Ma trận quyền chi tiết) */}
              {activeTab === 'permissions' && (
                <PermissionMatrix
                  role={selectedRole}
                  permissions={permissions}
                  onChangePermissions={setPermissions}
                  onSave={handleSavePerms}
                  loading={loading}
                />
              )}
            </div>
          ) : (
            <div style={{ padding: 60, textAlign: 'center' }}>
              <Empty description="Chọn một nhóm vai trò bên trái để xem danh sách thành viên và phân quyền" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Table;
