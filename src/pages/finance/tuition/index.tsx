/**
 * @file index.tsx
 * @description Màn hình Quản lý Học phí theo tín chỉ & Công nợ sinh viên chuẩn HUST
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import React from 'react';
import Table from './table';

export const TuitionPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Quản lý Học phí & Công nợ sinh viên | SIS HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Quản lý Học phí & Công nợ theo tín chỉ',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Tài chính & Học phí', path: '/finance/tuition' },
              { title: 'Học phí sinh viên', path: '/finance/tuition' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </>
  );
};

export default TuitionPage;
