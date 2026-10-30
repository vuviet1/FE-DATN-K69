/**
 * @file permission-matrix.tsx
 * @description Ma trận phân quyền chi tiết cho vai trò theo chuẩn Mes-Client-ES Becoxy
 */

import { CheckOutlined, KeyOutlined, SaveOutlined } from '@ant-design/icons';
import { PERMISSION_MODULES } from '@domain/constants';
import type { IRole } from '@domain/models';
import { Alert, Button, Card, Checkbox, Empty, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

export interface IPermissionMatrixProps {
  role: IRole | null;
  permissions: Record<string, string[]>;
  onChangePermissions: (perms: Record<string, string[]>) => void;
  onSave: () => void;
  loading?: boolean;
}

export const PermissionMatrix: React.FC<IPermissionMatrixProps> = ({
  role,
  permissions,
  onChangePermissions,
  onSave,
  loading = false,
}) => {
  if (!role) {
    return (
      <Card
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Empty description="Vui lòng chọn một vai trò bên danh sách để thiết lập phân quyền" />
      </Card>
    );
  }

  const handleActionToggle = (
    moduleKey: string,
    actionKey: string,
    checked: boolean,
  ) => {
    const currentActions = permissions[moduleKey] || [];
    let updatedActions: string[];

    if (checked) {
      updatedActions = [...new Set([...currentActions, actionKey])];
    } else {
      updatedActions = currentActions.filter((a) => a !== actionKey);
    }

    onChangePermissions({
      ...permissions,
      [moduleKey]: updatedActions,
    });
  };

  const handleModuleToggleAll = (
    moduleKey: string,
    allActionKeys: string[],
    checked: boolean,
  ) => {
    onChangePermissions({
      ...permissions,
      [moduleKey]: checked ? allActionKeys : [],
    });
  };

  const handleSelectAll = () => {
    const allPerms: Record<string, string[]> = {};
    PERMISSION_MODULES.forEach((mod) => {
      allPerms[mod.moduleKey] = mod.actions.map((a) => a.actionKey);
    });
    onChangePermissions(allPerms);
  };

  const handleClearAll = () => {
    const cleared: Record<string, string[]> = {};
    PERMISSION_MODULES.forEach((mod) => {
      cleared[mod.moduleKey] = [];
    });
    onChangePermissions(cleared);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Phân hệ / Module',
      dataIndex: 'moduleName',
      key: 'moduleName',
      width: 200,
      render: (_, record) => (
        <div>
          <strong style={{ fontSize: 14 }}>{record.moduleName}</strong>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            {record.description}
          </div>
        </div>
      ),
    },
    {
      title: 'Tất cả',
      key: 'all',
      width: 80,
      align: 'center',
      render: (_, record) => {
        const currentActions = permissions[record.moduleKey] || [];
        const allKeys = record.actions.map((a: any) => a.actionKey);
        const isAll =
          allKeys.length > 0 &&
          allKeys.every((k: string) => currentActions.includes(k));
        const isIndeterminate = currentActions.length > 0 && !isAll;

        return (
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isAll}
            onChange={(e) =>
              handleModuleToggleAll(record.moduleKey, allKeys, e.target.checked)
            }
          />
        );
      },
    },
    {
      title: 'Quyền thao tác chi tiết',
      key: 'actions',
      render: (_, record) => {
        const currentActions = permissions[record.moduleKey] || [];
        return (
          <Space wrap size={[16, 8]}>
            {record.actions.map((action: any) => {
              const isChecked = currentActions.includes(action.actionKey);
              return (
                <Checkbox
                  key={action.actionKey}
                  checked={isChecked}
                  onChange={(e) =>
                    handleActionToggle(
                      record.moduleKey,
                      action.actionKey,
                      e.target.checked,
                    )
                  }
                >
                  <span style={{ fontWeight: isChecked ? 600 : 400 }}>
                    {action.actionName}
                  </span>
                </Checkbox>
              );
            })}
          </Space>
        );
      },
    },
  ];

  return (
    <Card
      title={
        <Space>
          <KeyOutlined style={{ color: '#1677ff' }} />
          <span>
            Ma trận phân quyền cho vai trò:{' '}
            <strong style={{ color: '#1677ff' }}>{role.name}</strong>
          </span>
          {role.isSystem && <Tag color="error">Hệ thống</Tag>}
        </Space>
      }
      extra={
        <Space>
          <Button
            size="small"
            icon={<CheckOutlined />}
            onClick={handleSelectAll}
          >
            Chọn tất cả
          </Button>
          <Button size="small" onClick={handleClearAll}>
            Bỏ chọn tất cả
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={loading}
            onClick={onSave}
          >
            Lưu phân quyền
          </Button>
        </Space>
      }
    >
      <Alert
        message={`Đang thiết lập quyền cho vai trò ${role.name} (${role.code})`}
        description="Các tài khoản thuộc vai trò này sẽ tự động được áp dụng chính sách phân quyền theo các hành động đã chọn bên dưới."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Table
        rowKey="moduleKey"
        columns={columns}
        dataSource={PERMISSION_MODULES}
        pagination={false}
        bordered
        size="middle"
      />
    </Card>
  );
};

export default PermissionMatrix;
