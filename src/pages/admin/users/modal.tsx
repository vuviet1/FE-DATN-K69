/**
 * @file modal.tsx
 * @description Modal Thêm mới / Cập nhật tài khoản người dùng theo chuẩn Mes-Client-ES
 */

import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { SYSTEM_USER } from '@domain/constants';
import type { ISystemUser, ISystemUserSubmit } from '@domain/models';
import { Col, Form, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { SystemUserContext } from './useContext';

export interface ISystemUserModalProps {
  onFinish?: (values: ISystemUserSubmit) => Promise<boolean>;
}

export const ModalComponent: React.FC<ISystemUserModalProps> = ({
  onFinish,
}) => {
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(SystemUserContext);
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
          role: 'lecturer',
          status: 'active',
          department: 'Khoa Công nghệ thông tin',
        });
      }
    }
  }, [openModal, isEdit, dataItem, form]);

  return (
    <ModalForm<ISystemUserSubmit>
      title={
        isEdit
          ? `Chỉnh sửa tài khoản: @${(dataItem as ISystemUser)?.username}`
          : 'Thêm mới tài khoản hệ thống'
      }
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 680,
        okText: isEdit ? 'Lưu thay đổi' : 'Tạo tài khoản',
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
      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="username"
            label="Tên đăng nhập"
            placeholder="VD: nguyenvana"
            disabled={isEdit}
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 4, message: 'Tối thiểu 4 ký tự!' },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="fullName"
            label="Họ và tên"
            placeholder="VD: TS. Nguyễn Văn A"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          />
        </Col>
      </Row>

      {!isEdit && (
        <Row gutter={16}>
          <Col span={12}>
            <ProFormText.Password
              name="password"
              label="Mật khẩu khởi tạo"
              placeholder="Tối thiểu 6 ký tự"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu khởi tạo!' },
                { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="role"
              label="Phân vai trò / Nhóm quyền"
              options={SYSTEM_USER.ROLES}
              rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            />
          </Col>
        </Row>
      )}

      {isEdit && (
        <Row gutter={16}>
          <Col span={12}>
            <ProFormSelect
              name="role"
              label="Phân vai trò / Nhóm quyền"
              options={SYSTEM_USER.ROLES}
              rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormSelect
              name="status"
              label="Trạng thái tài khoản"
              options={SYSTEM_USER.STATUS_OPTIONS}
              rules={[{ required: true }]}
            />
          </Col>
        </Row>
      )}

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="email"
            label="Địa chỉ Email"
            placeholder="VD: nguyenvana@sis.edu.vn"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="phone"
            label="Số điện thoại"
            placeholder="VD: 0912345678"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              {
                pattern: /^[0-9]{10,11}$/,
                message: 'Số điện thoại không hợp lệ!',
              },
            ]}
          />
        </Col>
      </Row>

      <ProFormSelect
        name="department"
        label="Khoa / Bộ môn công tác"
        options={SYSTEM_USER.DEPARTMENTS.map((d) => ({ label: d, value: d }))}
      />
    </ModalForm>
  );
};

export default ModalComponent;
