/**
 * @file index.tsx
 * @description Màn hình Đăng ký học phần tín chỉ theo đợt chuẩn HUST
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import React from 'react';
import Table from './table';

export const RegistrationPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Đăng ký học phần tín chỉ | SIS HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Đăng ký học phần tín chỉ',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Đào tạo & Học vụ', path: '/academic/curriculum' },
              { title: 'Đăng ký học phần', path: '/academic/registration' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </>
  );
};

export default RegistrationPage;
