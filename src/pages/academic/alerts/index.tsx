/**
 * @file index.tsx
 * @description Màn hình Xử lý học vụ & Cảnh báo học tập Mức 1, 2, 3 chuẩn Bách Khoa HUST
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import React from 'react';
import Table from './table';

export const AcademicAlertsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Xử lý học vụ & Cảnh báo học tập | SIS HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Xử lý học vụ & Cảnh báo học tập',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Đào tạo & Học vụ', path: '/academic/curriculum' },
              { title: 'Xử lý học vụ', path: '/academic/alerts' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </>
  );
};

export default AcademicAlertsPage;
