/**
 * @file Reminders.tsx
 * @description Danh sách nhắc việc & cảnh báo học vụ cần xử lý
 */

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, List, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export interface IReminderItem {
  id: string;
  title: string;
  deadline: string;
  type: 'danger' | 'warning' | 'info';
  actionText: string;
  link: string;
}

const defaultReminders: IReminderItem[] = [
  {
    id: '1',
    title: 'Hạn chót nhập điểm giữa kỳ lớp IT4409',
    deadline: 'Còn 3 ngày (Hạn: 27/10/2026)',
    type: 'warning',
    actionText: 'Nhập điểm ngay',
    link: '/grades',
  },
  {
    id: '2',
    title: 'Xác nhận 8 sinh viên có nguy cơ cấm thi do vắng > 20%',
    deadline: 'Học kỳ 1 - Năm học 2025-2026',
    type: 'danger',
    actionText: 'Kiểm tra điểm danh',
    link: '/attendance',
  },
  {
    id: '3',
    title: 'Duyệt đề tài Đồ án tốt nghiệp đợt 1',
    deadline: '5 sinh viên đã nộp đề cương',
    type: 'info',
    actionText: 'Xem danh sách',
    link: '/students',
  },
];

export const Reminders: React.FC<{ items?: IReminderItem[] }> = ({
  items = defaultReminders,
}) => {
  return (
    <Card
      title={
        <Space>
          <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />
          <span>Việc Cần Xử Lý & Nhắc Nhở</span>
        </Space>
      }
      style={{ marginBottom: 16, borderRadius: 8 }}
    >
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="action"
                type="link"
                size="small"
                onClick={() => history.push(item.link)}
              >
                {item.actionText}
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Text
                  strong
                  style={{
                    color:
                      item.type === 'danger'
                        ? '#ff4d4f'
                        : item.type === 'warning'
                          ? '#fa8c16'
                          : '#1677ff',
                  }}
                >
                  {item.title}
                </Text>
              }
              description={
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {item.deadline}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Reminders;
