/**
 * @file modal-detail.tsx
 * @description Drawer xem trước nội dung thông báo hệ thống theo chuẩn Mes-Client-ES
 */

import {
  ClockCircleOutlined,
  MailOutlined,
  NotificationOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NOTIFICATION } from '@domain/constants';
import type { ISystemNotification } from '@domain/models';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Drawer,
  Progress,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useContext } from 'react';
import { NotificationContext } from './useContext';

const { Title, Paragraph } = Typography;

export const ModalDetail: React.FC = () => {
  const { openModalDetail, handleModalDetail, dataItem } =
    useContext(NotificationContext);
  const noti = dataItem as ISystemNotification | null;

  if (!noti) return null;

  const typeConfig = NOTIFICATION.TYPES.find((t) => t.value === noti.type);
  const priConfig = NOTIFICATION.PRIORITIES.find(
    (p) => p.value === noti.priority,
  );
  const stConfig = NOTIFICATION.STATUSES.find((s) => s.value === noti.status);
  const readPercent =
    noti.totalTarget > 0
      ? Math.round((noti.readCount / noti.totalTarget) * 100)
      : 0;

  return (
    <Drawer
      title="Xem trước nội dung thông báo"
      open={openModalDetail}
      onClose={handleModalDetail}
      width={680}
      extra={<Button onClick={handleModalDetail}>Đóng</Button>}
    >
      <div style={{ marginBottom: 16 }}>
        <Space style={{ marginBottom: 8 }} wrap>
          <Tag color={typeConfig?.color || 'blue'}>{typeConfig?.label}</Tag>
          <Tag color={priConfig?.color || 'default'}>
            Mức độ: {priConfig?.label}
          </Tag>
          <Badge
            status={stConfig?.status.toLowerCase() as any}
            text={stConfig?.label}
          />
        </Space>
        <Title level={4} style={{ marginTop: 8 }}>
          {noti.title}
        </Title>
        <div style={{ color: '#8c8c8c', fontSize: 13 }}>
          <Space split={<span>•</span>}>
            <span>
              <UserOutlined /> Người tạo: {noti.createdBy}
            </span>
            <span>
              <ClockCircleOutlined /> Ngày tạo: {noti.createdAt}
            </span>
            {noti.sendAt && <span>Đã gửi lúc: {noti.sendAt}</span>}
          </Space>
        </div>
      </div>

      <Card
        style={{
          backgroundColor: '#fafafa',
          marginBottom: 24,
          borderRadius: 8,
        }}
      >
        <Paragraph
          style={{
            whiteSpace: 'pre-wrap',
            fontSize: 15,
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {noti.content}
        </Paragraph>
      </Card>

      <Descriptions
        title="Cấu hình gửi thông báo"
        bordered
        column={1}
        size="small"
      >
        <Descriptions.Item label="Đối tượng nhận tin">
          <Space>
            <TeamOutlined style={{ color: '#1677ff' }} />
            <span>{noti.targetName || 'Toàn trường'}</span>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Kênh phát hành">
          <Space>
            {noti.channels?.includes('web') && (
              <Tag color="cyan" icon={<NotificationOutlined />}>
                Web App
              </Tag>
            )}
            {noti.channels?.includes('email') && (
              <Tag color="geekblue" icon={<MailOutlined />}>
                Email Sinh viên
              </Tag>
            )}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Tiến độ tiếp cận (Đã xem)">
          <div>
            <Progress percent={readPercent} size="small" />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              Đã đọc: {noti.readCount} / {noti.totalTarget} người nhận (
              {readPercent}%)
            </div>
          </div>
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ModalDetail;
