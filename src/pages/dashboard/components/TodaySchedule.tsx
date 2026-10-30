/**
 * @file TodaySchedule.tsx
 * @description Lịch giảng dạy hôm nay
 */

import { ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Avatar, Badge, Button, Card, List, Space, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export interface ITodayClass {
  id: string;
  subject: string;
  room: string;
  time: string;
  studentCount: number;
  status: string;
  statusText: string;
  statusColor: string;
}

const defaultTodayClasses: ITodayClass[] = [
  {
    id: '1',
    subject: 'Lập trình Web nâng cao (IT4409)',
    room: 'Phòng D9-301',
    time: '07:30 - 09:50 (Ca 1)',
    studentCount: 45,
    status: 'upcoming',
    statusText: 'Sắp diễn ra',
    statusColor: 'processing',
  },
  {
    id: '2',
    subject: 'Cơ sở dữ liệu phân tán (IT3090)',
    room: 'Phòng D3-102',
    time: '12:30 - 15:00 (Ca 2)',
    studentCount: 52,
    status: 'scheduled',
    statusText: 'Buổi chiều',
    statusColor: 'default',
  },
];

export const TodaySchedule: React.FC<{ classes?: ITodayClass[] }> = ({
  classes = defaultTodayClasses,
}) => {
  return (
    <Card
      title={
        <Space>
          <ClockCircleOutlined style={{ color: '#1677ff' }} />
          <span>Lịch Giảng Dạy Hôm Nay</span>
        </Space>
      }
      extra={
        <Button type="link" onClick={() => history.push('/classes')}>
          Xem toàn bộ lịch dạy <ArrowRightOutlined />
        </Button>
      }
      style={{ marginBottom: 16, borderRadius: 8 }}
    >
      <List
        itemLayout="horizontal"
        dataSource={classes}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key="checkin"
                type="primary"
                size="small"
                onClick={() => history.push('/attendance')}
              >
                Điểm danh lớp
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  size={46}
                  style={{ backgroundColor: '#1677ff', fontWeight: 'bold' }}
                >
                  {item.id === '1' ? 'SÁNG' : 'CHIỀU'}
                </Avatar>
              }
              title={
                <Text strong style={{ fontSize: 15 }}>
                  {item.subject}
                </Text>
              }
              description={
                <Space size="middle" style={{ marginTop: 4 }}>
                  <span>
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {item.time}
                  </span>
                  <span>📍 {item.room}</span>
                  <span>👥 {item.studentCount} Sinh viên</span>
                  <Badge
                    status={item.statusColor as any}
                    text={item.statusText}
                  />
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TodaySchedule;
