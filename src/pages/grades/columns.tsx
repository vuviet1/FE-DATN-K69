/**
 * @file columns.tsx
 * @description Định nghĩa các cột cho bảng điểm sinh viên theo chuẩn Mes-Client-ES
 */

import { EditOutlined } from '@ant-design/icons';
import type { IGradeItem } from '@domain/models';
import { Button, InputNumber, Space, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface IColumnActions {
  onEdit: (record: IGradeItem) => void;
  isEditingAll?: boolean;
  onGradeChange?: (id: string, field: keyof IGradeItem, value: number) => void;
}

export const getGradeColumns = ({
  onEdit,
  isEditingAll = false,
  onGradeChange,
}: IColumnActions): ColumnsType<IGradeItem> => [
  {
    title: 'STT',
    key: 'stt',
    width: 60,
    align: 'center',
    render: (_, __, index) => index + 1,
  },
  {
    title: 'Mã SV',
    dataIndex: 'studentCode',
    key: 'studentCode',
    width: 110,
    render: (code) => <strong>{code}</strong>,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName',
    width: 200,
  },
  {
    title: 'Chuyên cần (10%)',
    dataIndex: 'attendanceScore',
    key: 'attendanceScore',
    width: 140,
    align: 'center',
    render: (val, record) =>
      isEditingAll && onGradeChange ? (
        <InputNumber
          min={0}
          max={10}
          step={0.5}
          value={val}
          onChange={(v) => onGradeChange(record.id, 'attendanceScore', v ?? 0)}
          size="small"
        />
      ) : (
        <span>{val}</span>
      ),
  },
  {
    title: 'Bài tập (20%)',
    dataIndex: 'assignmentScore',
    key: 'assignmentScore',
    width: 130,
    align: 'center',
    render: (val, record) =>
      isEditingAll && onGradeChange ? (
        <InputNumber
          min={0}
          max={10}
          step={0.5}
          value={val}
          onChange={(v) => onGradeChange(record.id, 'assignmentScore', v ?? 0)}
          size="small"
        />
      ) : (
        <span>{val}</span>
      ),
  },
  {
    title: 'Giữa kỳ (20%)',
    dataIndex: 'midtermScore',
    key: 'midtermScore',
    width: 130,
    align: 'center',
    render: (val, record) =>
      isEditingAll && onGradeChange ? (
        <InputNumber
          min={0}
          max={10}
          step={0.5}
          value={val}
          onChange={(v) => onGradeChange(record.id, 'midtermScore', v ?? 0)}
          size="small"
        />
      ) : (
        <span>{val}</span>
      ),
  },
  {
    title: 'Cuối kỳ (50%)',
    dataIndex: 'finalScore',
    key: 'finalScore',
    width: 130,
    align: 'center',
    render: (val, record) =>
      isEditingAll && onGradeChange ? (
        <InputNumber
          min={0}
          max={10}
          step={0.5}
          value={val}
          onChange={(v) => onGradeChange(record.id, 'finalScore', v ?? 0)}
          size="small"
        />
      ) : (
        <span>{val}</span>
      ),
  },
  {
    title: 'Tổng kết (Hệ 10)',
    dataIndex: 'totalScore',
    key: 'totalScore',
    width: 140,
    align: 'center',
    sorter: (a, b) => (a.totalScore || 0) - (b.totalScore || 0),
    render: (val) => (
      <strong
        style={{
          fontSize: 15,
          color: val >= 7.0 ? '#52c41a' : val < 4.0 ? '#ff4d4f' : '#faad14',
        }}
      >
        {val !== undefined ? val.toFixed(1) : '-'}
      </strong>
    ),
  },
  {
    title: 'Điểm chữ',
    dataIndex: 'letterGrade',
    key: 'letterGrade',
    width: 90,
    align: 'center',
    render: (letter) => (
      <Tag
        color={
          letter === 'A' || letter === 'A+'
            ? 'green'
            : letter === 'F'
              ? 'red'
              : 'blue'
        }
      >
        {letter || '-'}
      </Tag>
    ),
  },
  {
    title: 'Kết quả',
    dataIndex: 'isPassed',
    key: 'isPassed',
    width: 110,
    align: 'center',
    render: (isPassed) => (
      <Tag color={isPassed ? 'success' : 'error'}>
        {isPassed ? 'ĐẠT' : 'HỌC LẠI'}
      </Tag>
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    width: 90,
    align: 'center',
    render: (_, record) => (
      <Space>
        <Tooltip title="Chỉnh sửa điểm">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            onClick={() => onEdit(record)}
            size="small"
          />
        </Tooltip>
      </Space>
    ),
  },
];
