/**
 * @file modal.tsx
 * @description Modal Thêm mới / Cập nhật lớp học theo chuẩn Mes-Client-ES
 */

import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { CLASS } from '@domain/constants';
import type { IClass, IClassSubmit } from '@domain/models';
import { Col, Form, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { ClassContext } from './useContext';

export interface IClassModalProps {
  onFinish?: (values: IClassSubmit) => Promise<boolean>;
}

export const ModalComponent: React.FC<IClassModalProps> = ({ onFinish }) => {
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(ClassContext);
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
          credits: 3,
          semester: 'HK1 (2025-2026)',
          studentCount: 40,
          totalLessons: 15,
          completedLessons: 0,
          status: 'active',
        });
      }
    }
  }, [openModal, isEdit, dataItem, form]);

  return (
    <ModalForm<IClassSubmit>
      title={
        isEdit
          ? `Chỉnh sửa lớp: ${(dataItem as IClass)?.name}`
          : 'Mở lớp học phần mới'
      }
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 720,
        okText: isEdit ? 'Lưu thay đổi' : 'Tạo lớp học',
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
            name="code"
            label="Mã lớp học phần"
            placeholder="VD: IT4409"
            disabled={isEdit}
            rules={[{ required: true, message: 'Vui lòng nhập mã lớp!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="name"
            label="Tên học phần"
            placeholder="VD: Lập trình Web nâng cao"
            rules={[{ required: true, message: 'Vui lòng nhập tên học phần!' }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <ProFormDigit
            name="credits"
            label="Số tín chỉ"
            min={1}
            max={6}
            rules={[{ required: true, message: 'Nhập số tín chỉ!' }]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="semester"
            label="Học kỳ"
            options={CLASS.SEMESTER_OPTIONS}
            rules={[{ required: true, message: 'Chọn học kỳ!' }]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="status"
            label="Trạng thái"
            options={CLASS.STATUS_OPTIONS}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormText
            name="schedule"
            label="Lịch học trong tuần"
            placeholder="VD: Thứ 3 (Tiết 3 - 5)"
            rules={[{ required: true, message: 'Nhập lịch học!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="room"
            label="Phòng học"
            placeholder="VD: Phòng D9-301"
            rules={[{ required: true, message: 'Nhập phòng học!' }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <ProFormDigit
            name="studentCount"
            label="Sĩ số dự kiến"
            min={1}
            max={150}
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="completedLessons"
            label="Số buổi đã dạy"
            min={0}
            max={50}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="totalLessons"
            label="Tổng số buổi"
            min={1}
            max={50}
            rules={[{ required: true }]}
          />
        </Col>
      </Row>

      <ProFormTextArea
        name="description"
        label="Mô tả / Đề cương tóm tắt"
        placeholder="Ghi chú về học phần hoặc tài liệu học tập"
        rows={2}
      />
    </ModalForm>
  );
};

export default ModalComponent;
