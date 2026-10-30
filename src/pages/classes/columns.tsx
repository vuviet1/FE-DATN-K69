/**
 * @file columns.tsx
 * @description Định nghĩa các cột hiển thị lớp học theo chuẩn Mes-Client-ES
 */

import {
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { StatusTag } from '@components';
import { CLASS } from '@domain/constants';
import type { IClass } from '@domain/models';
import { history } from '@umijs/max';
import { Button, Progress, Space, Tag, Tooltip } from 'antd';
import React from 'react';

interface IColumnActions {
  onView: (record: IClass) => void;
  onEdit: (record: IClass) => void;
  onDelete: (record: IClass) => void;
}

export const getClassColumns = ({
  onView,
  onEdit,
  onDelete,
}: IColumnActions): ProColumns<IClass>[] => [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
    align: 'center',
  },
  {
    title: 'Mã lớp',
    dataIndex: 'code',
    key: 'code',
    width: 100,
    render: (_, record) => <Tag color="blue">{record.code}</Tag>,
  },
  {
    title: 'Tên học phần',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <div>
        <div
          style={{ fontWeight: 600, color: '#1677ff', cursor: 'pointer' }}
          onClick={() => onView(record)}
        >
          {record.name}
        </div>
        <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.semester}</div>
      </div>
    ),
  },
  {
    title: 'Số tín chỉ',
    dataIndex: 'credits',
    key: 'credits',
    width: 90,
    align: 'center',
    search: false,
    render: (_, record) => `${record.credits} TC`,
  },
  {
    title: 'Sĩ số',
    dataIndex: 'studentCount',
    key: 'studentCount',
    width: 90,
    align: 'center',
    search: false,
    render: (_, record) => `${record.studentCount} SV`,
  },
  {
    title: 'Lịch học',
    dataIndex: 'schedule',
    key: 'schedule',
    search: false,
    render: (_, record) => (
      <Space>
        <CalendarOutlined style={{ color: '#fa8c16' }} />
        <span>{record.schedule}</span>
      </Space>
    ),
  },
  {
    title: 'Phòng học',
    dataIndex: 'room',
    key: 'room',
    width: 110,
    search: false,
  },
  {
    title: 'Tiến độ',
    dataIndex: 'progress',
    key: 'progress',
    width: 180,
    search: false,
    render: (_, record) => (
      <div>
        <Progress
          percent={record.progress}
          size="small"
          status={record.progress === 100 ? 'success' : 'active'}
        />
        <div style={{ fontSize: 12, color: '#8c8c8c' }}>
          Đã dạy: {record.completedLessons}/{record.totalLessons} buổi
        </div>
      </div>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    valueEnum: CLASS.STATUS_OPTIONS.reduce((acc, curr) => {
      acc[curr.value] = { text: curr.label, status: curr.color };
      return acc;
    }, {} as any),
    render: (_, record) => <StatusTag status={record.status} />,
  },
  {
    title: 'Thao tác',
    valueType: 'option',
    key: 'option',
    width: 170,
    fixed: 'right',
    align: 'center',
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Xem chi tiết lớp">
          <Button
            type="text"
            icon={<EyeOutlined style={{ color: '#1890ff' }} />}
            onClick={() => onView(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Điểm danh lớp">
          <Button
            type="text"
            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            onClick={() => history.push(`/attendance?classCode=${record.code}`)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Nhập bảng điểm">
          <Button
            type="text"
            icon={<SolutionOutlined style={{ color: '#722ed1' }} />}
            onClick={() => history.push(`/grades?classCode=${record.code}`)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Chỉnh sửa">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#fa8c16' }} />}
            onClick={() => onEdit(record)}
            size="small"
          />
        </Tooltip>
        <Tooltip title="Xóa lớp">
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
