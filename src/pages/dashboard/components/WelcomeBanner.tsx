/**
 * @file WelcomeBanner.tsx
 * @description Banner chào mừng giảng viên
 */

import {
  CheckCircleOutlined,
  FormOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

export const WelcomeBanner: React.FC = () => {
  return (
    <Card
      style={{
        marginBottom: 20,
        background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
        borderRadius: 12,
        color: '#fff',
        boxShadow: '0 4px 14px rgba(22, 119, 255, 0.25)',
      }}
      bordered={false}
    >
      <Row align="middle" justify="space-between">
        <Col xs={24} md={16}>
          <Title level={3} style={{ color: '#fff', margin: 0 }}>
            Xin chào, TS. Nguyễn Văn Hùng 👋
          </Title>
          <Paragraph
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '8px 0 16px 0',
              fontSize: 15,
            }}
          >
            Chào mừng Thầy đến với cổng thông tin quản lý sinh viên. Hôm nay
            Thầy có <b>2 ca giảng dạy</b> và <b>1 hạn nộp bảng điểm</b> cần hoàn
            thành.
          </Paragraph>
          <Space wrap>
            <Button
              type="primary"
              style={{
                backgroundColor: '#fff',
                color: '#1677ff',
                fontWeight: 600,
              }}
              icon={<TeamOutlined />}
              onClick={() => history.push('/students')}
            >
              Quản lý Sinh viên
            </Button>
            <Button
              ghost
              style={{ color: '#fff', borderColor: '#fff' }}
              icon={<FormOutlined />}
              onClick={() => history.push('/grades')}
            >
              Nhập điểm học phần
            </Button>
            <Button
              ghost
              style={{ color: '#fff', borderColor: '#fff' }}
              icon={<CheckCircleOutlined />}
              onClick={() => history.push('/attendance')}
            >
              Điểm danh hôm nay
            </Button>
          </Space>
        </Col>
        <Col xs={0} md={8} style={{ textAlign: 'right' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '16px 24px',
              borderRadius: 10,
              display: 'inline-block',
            }}
          >
            <Text style={{ color: '#fff', display: 'block', fontSize: 13 }}>
              Tuần học hiện tại
            </Text>
            <Title
              level={2}
              style={{ color: '#fff', margin: 0, fontWeight: 700 }}
            >
              Tuần 09 / 15
            </Title>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default WelcomeBanner;
