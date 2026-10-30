/**
 * @file Common.tsx
 * @description Các helper giao diện dùng chung: Hộp thoại xác nhận, Thông báo chuẩn Becoxy
 */

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, message, notification } from 'antd';
import React from 'react';

export interface IConfirmModalParams {
  title?: React.ReactNode;
  content: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => any;
  onCancel?: () => void;
  danger?: boolean;
}

/**
 * Hiển thị hộp thoại xác nhận (Confirm Dialog)
 */
export const showConfirmDialog = ({
  title = 'Xác nhận thao tác',
  content,
  okText = 'Đồng ý',
  cancelText = 'Hủy bỏ',
  onOk,
  onCancel,
  danger = false,
}: IConfirmModalParams) => {
  Modal.confirm({
    title,
    icon: (
      <ExclamationCircleFilled
        style={{ color: danger ? '#ff4d4f' : '#faad14' }}
      />
    ),
    content,
    okText,
    okType: danger ? 'danger' : 'primary',
    cancelText,
    onOk,
    onCancel,
    centered: true,
  });
};

/**
 * Hộp thoại chuyên dùng cho thao tác xóa dữ liệu
 */
export const showConfirmDelete = ({
  title = 'Xác nhận xóa dữ liệu',
  content = 'Bạn có chắc chắn muốn xóa bản ghi này? Hành động này không thể hoàn tác.',
  onOk,
}: {
  title?: React.ReactNode;
  content?: React.ReactNode;
  onOk: () => any;
}) => {
  showConfirmDialog({
    title,
    content,
    okText: 'Xóa ngay',
    cancelText: 'Hủy',
    danger: true,
    onOk,
  });
};

/**
 * Thông báo thành công
 */
export const notificationSuccess = (content: string) => {
  message.success(content);
};

/**
 * Thông báo thất bại
 */
export const notificationError = (content: string) => {
  message.error(content);
};

/**
 * Thông báo cảnh báo
 */
export const notificationWarning = (content: string) => {
  message.warning(content);
};

/**
 * Thông báo nổi góc màn hình
 */
export const showNotification = (
  type: 'success' | 'info' | 'warning' | 'error',
  title: string,
  description?: string,
) => {
  notification[type]({
    message: title,
    description,
    placement: 'topRight',
  });
};
