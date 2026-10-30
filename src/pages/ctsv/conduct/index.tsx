/**
 * @file index.tsx
 * @description Màn hình Đánh giá Điểm rèn luyện theo 5 tiêu chí Thông tư 16/BGDĐT
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import React from 'react';
import Table from './table';

export const ConductPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Đánh giá Điểm rèn luyện | CTSV HUST</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Đánh giá Điểm rèn luyện',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Công tác sinh viên', path: '/ctsv/conduct' },
              { title: 'Điểm rèn luyện', path: '/ctsv/conduct' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </>
  );
};

export default ConductPage;
