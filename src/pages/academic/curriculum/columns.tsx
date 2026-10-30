/**
 * @file columns.tsx
 * @description Định nghĩa các cột hiển thị trong danh mục học phần
 */

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ACADEMIC } from '@domain/constants';
import type { ICourse } from '@domain/models';
import { Button, Space, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

export interface ICurriculumColumnsProps {
  onEdit: (course: ICourse) => void;
  onDelete: (course: ICourse) => void;
}

export const useCurriculumColumns = ({
  onEdit,
  onDelete,
}: ICurriculumColumnsProps): ColumnsType<ICourse> => {
  return [
    {
      title: 'Mã HP',
      dataIndex: 'code',
      key: 'code',
      width: 110,
      render: (code) => <strong style={{ color: '#1677ff' }}>{code}</strong>,
    },
    {
      title: 'Tên học phần',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name, record) => (
        <div>
          <span style={{ fontWeight: 600, color: '#262626' }}>{name}</span>
          {record.description && (
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
              {record.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Khối kiến thức',
      dataIndex: 'courseType',
      key: 'courseType',
      width: 140,
      render: (type) => {
        const item = ACADEMIC.COURSE_TYPES.find((t) => t.value === type);
        return (
          <Tag color={item?.color || 'default'}>{item?.label || type}</Tag>
        );
      },
    },
    {
      title: 'Số tín chỉ',
      dataIndex: 'credits',
      key: 'credits',
      width: 110,
      align: 'center',
      render: (credits, record) => (
        <Tooltip
          title={`LT: ${record.theoryHours}h | BT: ${record.exerciseHours}h | TH: ${record.labHours}h`}
        >
          <Tag color="geekblue" style={{ fontWeight: 600 }}>
            {credits} TC ({record.tuitionCredits} HP)
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Học phần tiên quyết',
      dataIndex: 'prerequisiteCodes',
      key: 'prerequisiteCodes',
      width: 180,
      render: (codes: string[]) =>
        codes && codes.length > 0 ? (
          <Space wrap size={[0, 4]}>
            {codes.map((c) => (
              <Tag key={c} color="volcano">
                {c}
              </Tag>
            ))}
          </Space>
        ) : (
          <span style={{ color: '#bfbfbf', fontSize: 12 }}>Không yêu cầu</span>
        ),
    },
    {
      title: 'Đơn vị quản lý',
      dataIndex: 'department',
      key: 'department',
      render: (val) => (
        <span style={{ color: '#595959', fontSize: 13 }}>{val}</span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
              onClick={() => onEdit(record)}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Xóa học phần">
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
};
