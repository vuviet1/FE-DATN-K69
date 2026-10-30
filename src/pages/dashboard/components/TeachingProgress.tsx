/**
 * @file TeachingProgress.tsx
 * @description Khối hiển thị tiến độ giảng dạy học phần
 */

import { TrophyOutlined } from '@ant-design/icons';
import { Card, Col, Progress, Row, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export interface ITeachingProgressItem {
  subject: string;
  progress: number;
  lesson: string;
  gradeDone: boolean;
}

const defaultProgress: ITeachingProgressItem[] = [
  {
    subject: 'Lập trình Web (IT4409)',
    progress: 68,
    lesson: '10/15 buổi',
    gradeDone: true,
  },
  {
    subject: 'CSDL phân tán (IT3090)',
    progress: 45,
    lesson: '7/15 buổi',
    gradeDone: false,
  },
  {
    subject: 'Kỹ thuật phần mềm (IT3100)',
    progress: 80,
    lesson: '12/15 buổi',
    gradeDone: true,
  },
  {
    subject: 'Đồ án chuyên ngành (IT4900)',
    progress: 30,
    lesson: 'Giai đoạn 1',
    gradeDone: false,
  },
];

export const TeachingProgress: React.FC<{
  items?: ITeachingProgressItem[];
}> = ({ items = defaultProgress }) => {
  return (
    <Card
      title={
        <Space>
          <TrophyOutlined style={{ color: '#52c41a' }} />
          <span>Tiến Độ Giảng Dạy Học Phần</span>
        </Space>
      }
      style={{ borderRadius: 8 }}
    >
      {items.map((item) => (
        <div key={item.subject} style={{ marginBottom: 16 }}>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 4 }}
          >
            <Col>
              <Text strong>{item.subject}</Text>
              <Tag color="cyan" style={{ marginLeft: 8 }}>
                {item.lesson}
              </Tag>
            </Col>
            <Col>
              {item.gradeDone ? (
                <Tag color="success">Đã nhập điểm GK</Tag>
              ) : (
                <Tag color="warning">Chưa nhập điểm GK</Tag>
              )}
            </Col>
          </Row>
          <Progress percent={item.progress} strokeColor="#1677ff" />
        </div>
      ))}
    </Card>
  );
};

export default TeachingProgress;
