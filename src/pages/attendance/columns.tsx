/**
 * @file columns.tsx
 * @description Định nghĩa các cột bảng Điểm danh theo chuẩn Mes-Client-ES
 */

import { UserOutlined } from '@ant-design/icons';
import type { AttendanceStatus, IAttendanceRecord } from '@domain/models';
import { Avatar, Input, Radio, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface IAttendanceColumnActions {
  onStatusChange: (id: string, status: AttendanceStatus) => void;
  onNoteChange?: (id: string, note: string) => void;
}

export const getAttendanceColumns = ({
  onStatusChange,
  onNoteChange,
}: IAttendanceColumnActions): ColumnsType<IAttendanceRecord> => [
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
    title: 'Sinh viên',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_, record) => (
      <Space>
        <Avatar src={record.avatar} icon={<UserOutlined />} />
        <span style={{ fontWeight: 500 }}>{record.fullName}</span>
      </Space>
    ),
  },
  {
    title: 'Vắng tích lũy',
    dataIndex: 'totalAbsences',
    key: 'totalAbsences',
    width: 130,
    align: 'center',
    render: (count) => (
      <Tag color={count >= 3 ? 'error' : count > 0 ? 'warning' : 'success'}>
        {count} buổi {count >= 3 && '(Nguy cơ cấm thi)'}
      </Tag>
    ),
  },
  {
    title: 'Trạng thái điểm danh',
    dataIndex: 'status',
    key: 'status',
    width: 380,
    render: (status, record) => (
      <Radio.Group
        value={status}
        onChange={(e) => onStatusChange(record.id, e.target.value)}
        buttonStyle="solid"
        size="small"
      >
        <Radio.Button
          value="present"
          style={{ color: status === 'present' ? '#fff' : '#52c41a' }}
        >
          Có mặt
        </Radio.Button>
        <Radio.Button
          value="late"
          style={{ color: status === 'late' ? '#fff' : '#faad14' }}
        >
          Đi muộn
        </Radio.Button>
        <Radio.Button
          value="excused"
          style={{ color: status === 'excused' ? '#fff' : '#1677ff' }}
        >
          Có phép
        </Radio.Button>
        <Radio.Button
          value="absent"
          style={{ color: status === 'absent' ? '#fff' : '#ff4d4f' }}
        >
          Vắng mặt
        </Radio.Button>
      </Radio.Group>
    ),
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
    width: 220,
    render: (note, record) => (
      <Input
        size="small"
        placeholder="Ghi chú (lý do...)"
        defaultValue={note}
        onBlur={(e) => onNoteChange?.(record.id, e.target.value)}
      />
    ),
  },
];
