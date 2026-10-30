/**
 * @file StatisticCards.tsx
 * @description Các thẻ thống kê nhanh tổng quan trên Dashboard
 */

import {
  BookOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';
import type { IDashboardOverview } from '@domain/models';
import { Avatar, Col, Row, Tag, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export interface IStatisticCardsProps {
  overview?: IDashboardOverview | null;
}

export const StatisticCards: React.FC<IStatisticCardsProps> = ({
  overview,
}) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
      <Col xs={24} sm={12} lg={6}>
        <StatisticCard
          statistic={{
            title: 'Tổng sinh viên phụ trách',
            value: overview?.totalStudents || 168,
            icon: (
              <Avatar
                size={48}
                style={{ backgroundColor: '#e6f4ff', color: '#1677ff' }}
                icon={<TeamOutlined style={{ fontSize: 24 }} />}
              />
            ),
            description: (
              <Text type="secondary">Phân bố trên 4 lớp học phần</Text>
            ),
          }}
          chart={
            <Tag color="blue" style={{ marginTop: 8 }}>
              K65 & K66 CNTT
            </Tag>
          }
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatisticCard
          statistic={{
            title: 'Lớp học phần đang dạy',
            value: overview?.activeClasses || 4,
            icon: (
              <Avatar
                size={48}
                style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                icon={<BookOutlined style={{ fontSize: 24 }} />}
              />
            ),
            description: <Text type="secondary">12 tín chỉ học phần</Text>,
          }}
          chart={
            <Tag color="green" style={{ marginTop: 8 }}>
              100% đúng tiến độ
            </Tag>
          }
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatisticCard
          statistic={{
            title: 'Ca giảng dạy hôm nay',
            value: 2,
            icon: (
              <Avatar
                size={48}
                style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}
                icon={<CalendarOutlined style={{ fontSize: 24 }} />}
              />
            ),
            description: (
              <Text type="secondary">Ca sáng: D9-301 | Ca chiều: D3-102</Text>
            ),
          }}
          chart={
            <Tag color="orange" style={{ marginTop: 8 }}>
              Sĩ số: 97 SV
            </Tag>
          }
        />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <StatisticCard
          statistic={{
            title: 'Sinh viên cần lưu ý',
            value: 8,
            icon: (
              <Avatar
                size={48}
                style={{ backgroundColor: '#fff1f0', color: '#ff4d4f' }}
                icon={<ExclamationCircleOutlined style={{ fontSize: 24 }} />}
              />
            ),
            description: (
              <Text type="danger">Có nguy cơ cấm thi / Điểm thấp</Text>
            ),
          }}
          chart={
            <Tag color="error" style={{ marginTop: 8 }}>
              Vắng &gt; 20%
            </Tag>
          }
        />
      </Col>
    </Row>
  );
};

export default StatisticCards;
