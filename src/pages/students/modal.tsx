/**
 * @file modal.tsx
 * @description Modal Thêm mới / Cập nhật sinh viên theo chuẩn Mes-Client-ES
 */

import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { STUDENT } from '@domain/constants';
import type { IStudent, IStudentSubmit } from '@domain/models';
import { Col, Form, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { StudentContext } from './useContext';

export interface IModalProps {
  onFinish?: (values: IStudentSubmit) => Promise<boolean>;
}

export const ModalComponent: React.FC<IModalProps> = ({ onFinish }) => {
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(StudentContext);
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
          gender: 'Nam',
          status: 'studying',
          trainingPoint: 80,
          gpa: 3.0,
        });
      }
    }
  }, [openModal, isEdit, dataItem, form]);

  return (
    <ModalForm<IStudentSubmit>
      title={
        isEdit
          ? `Chỉnh sửa sinh viên: ${(dataItem as IStudent)?.fullName}`
          : 'Thêm mới sinh viên'
      }
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 780,
        okText: isEdit ? 'Lưu thay đổi' : 'Thêm sinh viên',
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
            name="studentCode"
            label="Mã sinh viên"
            placeholder="VD: 2021001"
            disabled={isEdit}
            rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="fullName"
            label="Họ và tên"
            placeholder="VD: Nguyễn Hoàng Nam"
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên sinh viên!' },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <ProFormRadio.Group
            name="gender"
            label="Giới tính"
            options={STUDENT.GENDER_OPTIONS}
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker
            name="birthDate"
            label="Ngày sinh"
            width="100%"
            placeholder="Chọn ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="status"
            label="Trạng thái"
            options={STUDENT.STATUS_OPTIONS}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="className"
            label="Lớp sinh hoạt"
            placeholder="VD: CNTT1-K65"
            rules={[
              { required: true, message: 'Vui lòng nhập lớp sinh hoạt!' },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="course"
            label="Học phần đang học"
            placeholder="VD: Lập trình Web nâng cao"
            rules={[{ required: true, message: 'Vui lòng nhập học phần!' }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="phone"
            label="Số điện thoại"
            placeholder="VD: 0981122334"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
              {
                pattern: /^[0-9]{10,11}$/,
                message: 'Số điện thoại không hợp lệ!',
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="email"
            label="Email sinh viên"
            placeholder="VD: nam.nh21001@sis.edu.vn"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormDigit
            name="trainingPoint"
            label="Điểm rèn luyện (ĐRL)"
            min={0}
            max={100}
            rules={[{ required: true, message: 'Nhập ĐRL (0 - 100)!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name="gpa"
            label="Điểm GPA tích lũy (Hệ 4)"
            min={0}
            max={4.0}
            step={0.01}
            rules={[{ required: true, message: 'Nhập GPA (0.0 - 4.0)!' }]}
          />
        </Col>
      </Row>

      <ProFormTextArea
        name="address"
        label="Địa chỉ thường trú"
        placeholder="VD: Cầu Giấy, Hà Nội"
        rows={2}
      />
    </ModalForm>
  );
};

export default ModalComponent;
