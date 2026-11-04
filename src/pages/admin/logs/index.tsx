import {
  ClockCircleOutlined,
  EyeOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Helmet } from '@components';
import {
  Badge,
  Button,
  Descriptions,
  Drawer,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

interface IAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorName: string;
  action: string;
  targetType: string;
  targetName: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'failure';
}

export const AdminLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<IAuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<IAuditLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lms/audit-logs');
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const actionMap: Record<string, { label: string; color: string }> = {
    LOCK_USER: { label: 'Khóa tài khoản', color: 'volcano' },
    UNLOCK_USER: { label: 'Mở khóa tài khoản', color: 'green' },
    IMPORT_USERS: { label: 'Nhập danh sách Excel', color: 'blue' },
    HIDE_POST: { label: 'Ẩn bài viết vi phạm', color: 'red' },
    DELETE_POST: { label: 'Xóa bài viết', color: 'magenta' },
    UPDATE_CLASS: { label: 'Cập nhật thông tin lớp', color: 'cyan' },
    CREATE_USER: { label: 'Tạo tài khoản mới', color: 'purple' },
  };

  const columns: ProColumns<IAuditLog>[] = [
    {
      title: 'Thời gian thao tác',
      dataIndex: 'timestamp',
      width: 170,
      render: (_, record) => (
        <Space>
          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
          <span>{new Date(record.timestamp).toLocaleString('vi-VN')}</span>
        </Space>
      ),
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'actorName',
      render: (_, record) => (
        <div>
          <Text strong>{record.actorName}</Text>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>@{record.actor}</div>
        </div>
      ),
    },
    {
      title: 'Hành động / Thao tác',
      dataIndex: 'action',
      valueEnum: {
        LOCK_USER: { text: 'Khóa tài khoản' },
        IMPORT_USERS: { text: 'Nhập danh sách' },
        HIDE_POST: { text: 'Ẩn bài viết' },
        UPDATE_CLASS: { text: 'Cập nhật lớp' },
      },
      render: (_, record) => {
        const item = actionMap[record.action] || {
          label: record.action,
          color: 'default',
        };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: 'Đối tượng tác động',
      dataIndex: 'targetName',
      render: (_, record) => (
        <Space>
          <Tag>{record.targetType}</Tag>
          <Text ellipsis style={{ maxWidth: 220 }}>
            {record.targetName}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Chi tiết nội dung',
      dataIndex: 'details',
      ellipsis: true,
    },
    {
      title: 'Địa chỉ IP',
      dataIndex: 'ipAddress',
      width: 120,
    },
    {
      title: 'Kết quả',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => (
        <Badge
          status={record.status === 'success' ? 'success' : 'error'}
          text={record.status === 'success' ? 'Thành công' : 'Thất bại'}
        />
      ),
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      width: 90,
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedLog(record);
            setDrawerOpen(true);
          }}
        >
          Chi tiết
        </Button>,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nhật ký quản trị hệ thống - Admin</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Nhật ký quản trị & Truy vết thao tác (B6)',
          subTitle:
            'Ghi lại toàn bộ hành vi tạo, sửa, xóa, khóa tài khoản, import danh sách và kiểm duyệt để kiểm tra và kiểm toán',
        }}
      >
        <ProTable<IAuditLog>
          headerTitle="Nhật ký các phiên hoạt động quản trị"
          loading={loading}
          dataSource={logs}
          rowKey="id"
          columns={columns}
          toolBarRender={() => [
            <Button key="reload" icon={<ReloadOutlined />} onClick={fetchLogs}>
              Làm mới
            </Button>,
          ]}
          pagination={{ pageSize: 10 }}
        />

        <Drawer
          title="Chi tiết bản ghi Nhật ký Quản trị"
          size="large"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {selectedLog && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Mã log">
                {selectedLog.id}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian thực hiện">
                {new Date(selectedLog.timestamp).toLocaleString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Người thực hiện">
                {selectedLog.actorName} (@{selectedLog.actor})
              </Descriptions.Item>
              <Descriptions.Item label="Hành động">
                <Tag color={actionMap[selectedLog.action]?.color || 'blue'}>
                  {actionMap[selectedLog.action]?.label || selectedLog.action}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Loại đối tượng tác động">
                <Tag>{selectedLog.targetType}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Đối tượng cụ thể">
                {selectedLog.targetName}
              </Descriptions.Item>
              <Descriptions.Item label="Chi tiết thực hiện">
                {selectedLog.details}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ IP nguồn">
                {selectedLog.ipAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái giao dịch">
                <Badge
                  status={
                    selectedLog.status === 'success' ? 'success' : 'error'
                  }
                  text={
                    selectedLog.status === 'success'
                      ? 'Thành công (200 OK)'
                      : 'Thất bại'
                  }
                />
              </Descriptions.Item>
            </Descriptions>
          )}
        </Drawer>
      </PageContainer>
    </>
  );
};

export default AdminLogsPage;
