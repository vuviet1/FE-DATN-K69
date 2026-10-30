/**
 * @file StatusTag/index.tsx
 * @description Tag hiển thị trạng thái chuẩn hóa
 */

import { Badge, Tag } from 'antd';
import React from 'react';

export interface IStatusTagProps {
  status: string;
  label?: string;
  type?: 'tag' | 'badge';
  statusMap?: Record<
    string,
    {
      label: string;
      color?: string;
      badgeStatus?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    }
  >;
}

const defaultStatusMap: Record<
  string,
  {
    label: string;
    color?: string;
    badgeStatus?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  }
> = {
  studying: { label: 'Đang học', color: 'blue', badgeStatus: 'processing' },
  warning: { label: 'Cảnh báo', color: 'warning', badgeStatus: 'warning' },
  suspended: { label: 'Đình chỉ', color: 'error', badgeStatus: 'error' },
  dropped: { label: 'Thôi học', color: 'default', badgeStatus: 'default' },
  active: { label: 'Đang dạy', color: 'green', badgeStatus: 'success' },
  completed: { label: 'Hoàn thành', color: 'blue', badgeStatus: 'processing' },
  present: { label: 'Có mặt', color: 'success', badgeStatus: 'success' },
  late: { label: 'Đi muộn', color: 'warning', badgeStatus: 'warning' },
  excused: { label: 'Có phép', color: 'processing', badgeStatus: 'processing' },
  absent: { label: 'Vắng mặt', color: 'error', badgeStatus: 'error' },
};

export const StatusTag: React.FC<IStatusTagProps> = ({
  status,
  label,
  type = 'tag',
  statusMap = defaultStatusMap,
}) => {
  const item = statusMap[status] || {
    label: label || status,
    color: 'default',
    badgeStatus: 'default',
  };

  if (type === 'badge') {
    return <Badge status={item.badgeStatus} text={label || item.label} />;
  }

  return <Tag color={item.color}>{label || item.label}</Tag>;
};

export default StatusTag;
