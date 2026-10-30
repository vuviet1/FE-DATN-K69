/**
 * @file columns.tsx
 * @description Định nghĩa các cột cho bảng Thông báo hệ thống theo chuẩn Mes-Client-ES
 */

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MailOutlined,
  NotificationOutlined,
  RollbackOutlined,
  SendOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { NOTIFICATION } from '@domain/constants';
import type { ISystemNotification } from '@domain/models';
import { Badge, Button, Space, Tag, Tooltip } from 'antd';
import React from 'react';

interface INotificationColumnActions {
  onView: (record: ISystemNotification) => void;
  onEdit: (record: ISystemNotification) => void;
  onPublish: (record: ISystemNotification) => void;
  onRevoke: (record: ISystemNotification) => void;
  onDelete: (record: ISystemNotification) => void;
}

export const getNotificationColumns = ({
  onView,
  onEdit,
  onPublish,
  onRevoke,
  onDelete,
}: INotificationColumnActions): ProColumns<ISystemNotification>[] => [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
    align: 'center',
  },
  {
    title: 'Tiêu đề thông báo',
    dataIndex: 'title',
    key: 'title',
    render: (_, record) => {
      const typeConfig = NOTIFICATION.TYPES.find(
        (t) => t.value === record.type,
      );
      return (
        <div>
          <Space>
            <Tag color={typeConfig?.color || 'blue'}>{typeConfig?.label}</Tag>
            <strong
              style={{ color: '#1677ff', cursor: 'pointer' }}
              onClick={() => onView(record)}
            >
              {record.title}
            </strong>
          </Space>
          <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
            Tạo bởi: {record.createdBy} - Ngày: {record.createdAt}
          </div>
        </div>
      );
    },
  },
  {
    title: 'Mức độ',
    dataIndex: 'priority',
    key: 'priority',
    width: 110,
    align: 'center',
    valueEnum: NOTIFICATION.PRIORITIES.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.label, status: curr.color };
      return acc;
    }, {} as any),
    render: (_, record) => {
      const pri = NOTIFICATION.PRIORITIES.find(
        (p) => p.value === record.priority,
      );
      return <Tag color={pri?.color || 'default'}>{pri?.label}</Tag>;
    },
  },
  {
    title: 'Đối tượng nhận',
    dataIndex: 'targetType',
    key: 'targetType',
    width: 170,
    valueEnum: NOTIFICATION.TARGETS.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.label };
      return acc;
    }, {} as any),
    render: (_, record) => {
      const tar = NOTIFICATION.TARGETS.find(
        (t) => t.value === record.targetType,
      );
      return <span>{record.targetName || tar?.label}</span>;
    },
  },
  {
    title: 'Kênh gửi',
    dataIndex: 'channels',
    key: 'channels',
    width: 130,
    search: false,
    render: (_, record) => (
      <Space>
        {record.channels?.includes('web') && (
          <Tooltip title="Thông báo trên Web">
            <Tag color="cyan" icon={<NotificationOutlined />}>
              Web
            </Tag>
          </Tooltip>
        )}
        {record.channels?.includes('email') && (
          <Tooltip title="Gửi thư điện tử Email">
            <Tag color="geekblue" icon={<MailOutlined />}>
              Email
            </Tag>
          </Tooltip>
        )}
      </Space>
    ),
  },
  {
    title: 'Tỷ lệ đã xem',
    dataIndex: 'readCount',
    key: 'readCount',
    width: 120,
    align: 'center',
    search: false,
    render: (_, record) => (
      <span>
        {record.readCount} / {record.totalTarget}
      </span>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 130,
    valueEnum: NOTIFICATION.STATUSES.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.label, status: curr.status };
      return acc;
    }, {} as any),
    render: (_, record) => {
      const st = NOTIFICATION.STATUSES.find((s) => s.value === record.status);
      return (
        <Badge status={st?.status.toLowerCase() as any} text={st?.label} />
      );
    },
  },
  {
    title: 'Thời gian phát',
    dataIndex: 'sendAt',
    key: 'sendAt',
    width: 150,
    search: false,
    render: (val) => val || '-',
  },
  {
    title: 'Thao tác',
    valueType: 'option',
    key: 'option',
    width: 170,
    fixed: 'right',
    align: 'center',
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Xem nội dung chi tiết">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }} />}
            onClick={() => onView(record)}
            size="small"
          />
        </Tooltip>
        {record.status === 'draft' || record.status === 'scheduled' ? (
          <Tooltip title="Phát hành ngay lập tức">
            <Button
              type="text"
              icon={<SendOutlined style={{ color: '#52c41a' }} />}
              onClick={() => onPublish(record)}
              size="small"
            />
          </Tooltip>
        ) : null}
        {record.status === 'published' ? (
          <Tooltip title="Thu hồi thông báo">
            <Button
              type="text"
              icon={<RollbackOutlined style={{ color: '#faad14' }} />}
              onClick={() => onRevoke(record)}
              size="small"
            />
          </Tooltip>
        ) : null}
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            onClick={() => onEdit(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Xóa thông báo">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
            size="small"
          />
        </Tooltip>
      </Space>
    ),
  },
];
