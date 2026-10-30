/**
 * @file columns.tsx
 * @description Định nghĩa các cột cho bảng Sinh viên theo chuẩn Mes-Client-ES
 */

import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { StatusTag } from '@components';
import { STUDENT } from '@domain/constants';
import type { IStudent } from '@domain/models';
import { Avatar, Button, Space, Tag, Tooltip } from 'antd';
import React from 'react';

interface IColumnActions {
  onView: (record: IStudent) => void;
  onEdit: (record: IStudent) => void;
  onDelete: (record: IStudent) => void;
}

export const getStudentColumns = ({
  onView,
  onEdit,
  onDelete,
}: IColumnActions): ProColumns<IStudent>[] => [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
    align: 'center',
  },
  {
    title: 'Mã SV',
    dataIndex: 'studentCode',
    key: 'studentCode',
    width: 110,
    copyable: true,
    render: (_, record) => <strong>{record.studentCode}</strong>,
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName',
    width: 220,
    render: (_, record) => (
      <Space>
        <Avatar src={record.avatar} icon={<UserOutlined />} />
        <div>
          <div style={{ fontWeight: 500 }}>{record.fullName}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.email}</div>
        </div>
      </Space>
    ),
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender',
    width: 90,
    align: 'center',
    valueEnum: {
      Nam: { text: 'Nam' },
      Nữ: { text: 'Nữ' },
    },
    render: (_, record) => (
      <Tag color={record.gender === 'Nam' ? 'blue' : 'magenta'}>
        {record.gender}
      </Tag>
    ),
  },
  {
    title: 'Lớp sinh hoạt',
    dataIndex: 'className',
    key: 'className',
    width: 130,
  },
  {
    title: 'Học phần',
    dataIndex: 'course',
    key: 'course',
    ellipsis: true,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width: 120,
    search: false,
  },
  {
    title: 'ĐRL',
    dataIndex: 'trainingPoint',
    key: 'trainingPoint',
    width: 80,
    align: 'center',
    search: false,
    sorter: (a, b) => a.trainingPoint - b.trainingPoint,
    render: (_, record) => (
      <Tag
        color={
          record.trainingPoint >= 80
            ? 'green'
            : record.trainingPoint >= 65
              ? 'blue'
              : 'orange'
        }
      >
        {record.trainingPoint}
      </Tag>
    ),
  },
  {
    title: 'Điểm GPA',
    dataIndex: 'gpa',
    key: 'gpa',
    width: 95,
    align: 'center',
    search: false,
    sorter: (a, b) => a.gpa - b.gpa,
    render: (_, record) => (
      <span
        style={{
          fontWeight: 600,
          color:
            record.gpa >= 3.2
              ? '#52c41a'
              : record.gpa < 2.0
                ? '#ff4d4f'
                : '#faad14',
        }}
      >
        {record.gpa.toFixed(2)}
      </span>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 140,
    valueEnum: STUDENT.STATUS_OPTIONS.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.label, status: curr.status };
      return acc;
    }, {} as any),
    render: (_, record) => <StatusTag status={record.status} />,
  },
  {
    title: 'Thao tác',
    valueType: 'option',
    key: 'option',
    width: 130,
    fixed: 'right',
    align: 'center',
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Xem chi tiết">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }} />}
            onClick={() => onView(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#52c41a' }} />}
            onClick={() => onEdit(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Xóa">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record)}
            size="small"
          />
        </Tooltip>
      </Space>
    ),
  },
];
