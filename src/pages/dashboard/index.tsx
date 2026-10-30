/**
 * @file index.tsx
 * @description Màn hình Dashboard Giảng viên theo chuẩn kiến trúc Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import {
  QuickActions,
  Reminders,
  StatisticCards,
  TeachingProgress,
  TodaySchedule,
  WelcomeBanner,
} from './components';
import { useDashboard } from './hooks';

export const DashboardPage: React.FC = () => {
  const { overview, fetchDashboardData } = useDashboard();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <>
      <Helmet>
        <title>Bảng Điều Khiển Giảng Viên</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Bảng Điều Khiển Giảng Viên',
          subTitle: 'Học kỳ 1 - Năm học 2025-2026',
        }}
      >
        {/* Banner Chào Mừng */}
        <WelcomeBanner />

        {/* Thẻ Thống kê nhanh */}
        <StatisticCards overview={overview} />

        {/* Nội dung chi tiết */}
        <Row gutter={[16, 16]}>
          {/* Lịch dạy hôm nay & Tiến độ */}
          <Col xs={24} lg={14}>
            <TodaySchedule />
            <TeachingProgress />
          </Col>

          {/* Nhắc nhở & Thao tác nhanh */}
          <Col xs={24} lg={10}>
            <Reminders />
            <QuickActions />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default DashboardPage;
