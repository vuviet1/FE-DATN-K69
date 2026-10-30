/**
 * @file index.tsx
 * @description Màn hình Dịch vụ Một cửa sinh viên theo chuẩn CTSV HUST
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import React from 'react';
import Table from './table';

export const StudentServicesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Dịch vụ một cửa sinh viên | CTSV HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Dịch vụ một cửa sinh viên',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Công tác sinh viên', path: '/ctsv/conduct' },
              { title: 'Dịch vụ một cửa', path: '/ctsv/services' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </>
  );
};

export default StudentServicesPage;
