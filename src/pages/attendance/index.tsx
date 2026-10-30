/**
 * @file index.tsx
 * @description Màn hình Điểm danh sinh viên chuẩn theo kiến trúc Mes-Client-ES Becoxy
 */

import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { AttendanceStatus, IAttendanceRecord } from '@domain/models';
import { useWindowSize } from '@utils/hooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import Table from './table';
import { AttendanceContext } from './useContext';

export const AttendancePage: React.FC = () => {
  const windowSize = useWindowSize();
  const [selectedCourse, setSelectedCourse] = useState<string>('IT4409');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [records, setRecords] = useState<IAttendanceRecord[]>([]);

  const handleStatusChange = (id: string, newStatus: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student,
      ),
    );
  };

  return (
    <AttendanceContext.Provider
      value={{
        windowSize,
        selectedCourse,
        setSelectedCourse,
        selectedDate,
        setSelectedDate,
        records,
        setRecords,
        handleStatusChange,
      }}
    >
      <Helmet>
        <title>Sổ theo dõi & Điểm danh Sinh viên</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Điểm danh lớp học phần',
          breadcrumb: {
            items: [
              { title: 'Trang chủ', path: '/dashboard' },
              { title: 'Điểm danh', path: '/attendance' },
            ],
          },
        }}
      >
        <Table />
      </PageContainer>
    </AttendanceContext.Provider>
  );
};

export default AttendancePage;
