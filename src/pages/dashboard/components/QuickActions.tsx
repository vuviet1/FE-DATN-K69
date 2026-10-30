/**
 * @file QuickActions.tsx
 * @description Lối tắt chức năng nhanh dành cho giảng viên
 */

import {
  BookOutlined,
  CheckCircleOutlined,
  FormOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Card, Col, Row } from 'antd';
import React from 'react';

export const QuickActions: React.FC = () => {
  return (
    <Card title="Chức Năng Nhanh" style={{ borderRadius: 8 }}>
      <Row gutter={[12, 12]}>
        <Col span={12}>
          <Button
            block
            style={{ height: 50 }}
            icon={<TeamOutlined style={{ color: '#1677ff' }} />}
            onClick={() => history.push('/students')}
          >
            Danh sách sinh viên
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            style={{ height: 50 }}
            icon={<FormOutlined style={{ color: '#52c41a' }} />}
            onClick={() => history.push('/grades')}
          >
            Nhập điểm số
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            style={{ height: 50 }}
            icon={<CheckCircleOutlined style={{ color: '#fa8c16' }} />}
            onClick={() => history.push('/attendance')}
          >
            Điểm danh lớp
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            style={{ height: 50 }}
            icon={<BookOutlined style={{ color: '#722ed1' }} />}
            onClick={() => history.push('/classes')}
          >
            Thời khóa biểu
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default QuickActions;
