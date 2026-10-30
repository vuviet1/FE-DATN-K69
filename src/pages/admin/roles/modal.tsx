/**
 * @file modal.tsx
 * @description Modal Thêm / Sửa vai trò người dùng theo chuẩn Mes-Client-ES
 */

import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { IRole, IRoleSubmit } from '@domain/models';
import { Form } from 'antd';
import React, { useContext, useEffect } from 'react';
import { RoleContext } from './useContext';

export interface IRoleModalProps {
  onFinish?: (values: IRoleSubmit) => Promise<boolean>;
}

export const ModalComponent: React.FC<IRoleModalProps> = ({ onFinish }) => {
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(RoleContext);
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
      }
    }
  }, [openModal, isEdit, dataItem, form]);

  return (
    <ModalForm<IRoleSubmit>
      title={
        isEdit
          ? `Chỉnh sửa vai trò: ${(dataItem as IRole)?.name}`
          : 'Thêm vai trò mới'
      }
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 520,
        okText: isEdit ? 'Lưu thay đổi' : 'Tạo vai trò',
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
        name="code"
        label="Mã vai trò (Code)"
        placeholder="VD: ACADEMIC_STAFF"
        disabled={isEdit && (dataItem as IRole)?.isSystem}
        rules={[
          { required: true, message: 'Vui lòng nhập mã vai trò!' },
          {
            pattern: /^[A-Z0-9_]+$/,
            message: 'Mã vai trò chỉ gồm chữ hoa, số và dấu gạch dưới!',
          },
        ]}
      />

      <ProFormText
        name="name"
        label="Tên vai trò hiển thị"
        placeholder="VD: Cán bộ đào tạo & Khảo thí"
        rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}
      />

      <ProFormTextArea
        name="description"
        label="Mô tả phạm vi quyền hạn"
        placeholder="Mô tả các trách nhiệm và nhiệm vụ của vai trò này"
        rows={3}
        rules={[{ required: true, message: 'Vui lòng nhập mô tả vai trò!' }]}
      />
    </ModalForm>
  );
};

export default ModalComponent;
