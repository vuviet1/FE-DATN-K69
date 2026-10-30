/**
 * @file index.tsx
 * @description Màn hình Xét duyệt Học bổng Khuyến khích học tập (KKHT) chuẩn HUST
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import React from 'react';
import Table from './table';

export const ScholarshipsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Xét duyệt Học bổng KKHT | CTSV HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Xét duyệt Học bổng Khuyến khích học tập',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Công tác sinh viên', path: '/ctsv/conduct' },
              { title: 'Học bổng KKHT', path: '/ctsv/scholarships' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </>
  );
};

export default ScholarshipsPage;
