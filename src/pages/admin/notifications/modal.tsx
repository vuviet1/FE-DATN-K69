/**
 * @file modal.tsx
 * @description Modal Soạn thảo / Chỉnh sửa thông báo hệ thống theo chuẩn Mes-Client-ES
 */

import {
  ModalForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { NOTIFICATION } from '@domain/constants';
import type { INotificationSubmit, ISystemNotification } from '@domain/models';
import { Col, Form, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { NotificationContext } from './useContext';

export interface INotificationModalProps {
  onFinish?: (values: INotificationSubmit) => Promise<boolean>;
}

export const ModalComponent: React.FC<INotificationModalProps> = ({
  onFinish,
}) => {
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(NotificationContext);
  const [form] = Form.useForm();
  const isEdit = typeModal?.value === 'EDIT';

  useEffect(() => {
    if (openModal) {
      if (isEdit && dataItem) {
        form.setFieldsValue({
          ...dataItem,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          type: 'academic',
          priority: 'normal',
          targetType: 'all',
          channels: ['web'],
          status: 'draft',
        });
      }
    }
  }, [openModal, isEdit, dataItem, form]);

  return (
    <ModalForm<INotificationSubmit>
      title={
        isEdit
          ? `Chỉnh sửa thông báo: ${(dataItem as ISystemNotification)?.title}`
          : 'Soạn thông báo hệ thống mới'
      }
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 760,
        okText: isEdit ? 'Lưu thay đổi' : 'Tạo thông báo',
        cancelText: 'Hủy bỏ',
      }}
      onFinish={async (values) => {
        if (onFinish) {
          const success = await onFinish(values);
          if (success) {
            handleModal?.();
          }
          return success;
        }
        return false;
      }}
    >
      <ProFormText
        name="title"
        label="Tiêu đề thông báo"
        placeholder="VD: [Học kỳ 1] Thông báo lịch thi kết thúc học phần và hạn nộp đồ án tốt nghiệp"
        rules={[
          { required: true, message: 'Vui lòng nhập tiêu đề thông báo!' },
        ]}
      />

      <Row gutter={16}>
        <Col span={8}>
          <ProFormSelect
            name="type"
            label="Loại thông báo"
            options={NOTIFICATION.TYPES}
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="priority"
            label="Mức độ ưu tiên"
            options={NOTIFICATION.PRIORITIES}
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="targetType"
            label="Đối tượng nhận"
            options={NOTIFICATION.TARGETS}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormCheckbox.Group
            name="channels"
            label="Kênh phát thông báo"
            options={[
              { label: 'Bảng tin trên Web', value: 'web' },
              { label: 'Gửi Email thông báo', value: 'email' },
            ]}
            rules={[{ required: true, message: 'Chọn ít nhất 1 kênh phát!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormRadio.Group
            name="status"
            label="Trạng thái khi tạo"
            options={[
              { label: 'Lưu bản nháp', value: 'draft' },
              { label: 'Phát hành ngay', value: 'published' },
            ]}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>

      <ProFormTextArea
        name="content"
        label="Nội dung chi tiết thông báo"
        placeholder="Soạn nội dung thông báo đầy đủ gửi tới sinh viên và giảng viên..."
        rows={6}
        rules={[
          { required: true, message: 'Vui lòng nhập nội dung thông báo!' },
        ]}
      />
    </ModalForm>
  );
};

export default ModalComponent;
