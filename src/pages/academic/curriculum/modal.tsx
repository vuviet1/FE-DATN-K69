/**
 * @file modal.tsx
 * @description Modal Thêm / Sửa học phần trong chương trình đào tạo
 */

import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { ACADEMIC } from '@domain/constants';
import type { ICourse, ICourseSubmit } from '@domain/models';
import { Col, Form, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { CurriculumContext } from './useContext';

export interface ICurriculumModalProps {
  onFinish?: (values: ICourseSubmit) => Promise<boolean>;
}

export const ModalComponent: React.FC<ICurriculumModalProps> = ({
  onFinish,
}) => {
  const { openModal, handleModal, dataItem, typeModal } =
    useContext(CurriculumContext);
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
          status: 1,
          credits: 3,
          tuitionCredits: 3,
          theoryHours: 30,
          exerciseHours: 15,
          labHours: 0,
          courseType: 'fundamental',
        });
      }
    }
  }, [openModal, isEdit, dataItem, form]);

  return (
    <ModalForm<ICourseSubmit>
      title={
        isEdit
          ? `Chỉnh sửa học phần: ${(dataItem as ICourse)?.code}`
          : 'Thêm học phần mới vào CTĐT'
      }
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 680,
        okText: isEdit ? 'Lưu thay đổi' : 'Thêm học phần',
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
        <Col span={8}>
          <ProFormText
            name="code"
            label="Mã học phần"
            placeholder="VD: IT3011, MI1111"
            rules={[
              { required: true, message: 'Nhập mã học phần!' },
              {
                pattern: /^[A-Z]{2}[0-9]{4}$/,
                message: 'Mã gồm 2 chữ in hoa và 4 chữ số (chuẩn HUST)!',
              },
            ]}
          />
        </Col>
        <Col span={16}>
          <ProFormText
            name="name"
            label="Tên học phần"
            placeholder="VD: Cấu trúc dữ liệu và giải thuật"
            rules={[{ required: true, message: 'Nhập tên học phần!' }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormSelect
            name="courseType"
            label="Khối kiến thức"
            options={ACADEMIC.COURSE_TYPES}
            rules={[{ required: true, message: 'Chọn khối kiến thức!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="department"
            label="Khoa / Viện phụ trách"
            placeholder="VD: Khoa Khoa học máy tính"
            rules={[{ required: true, message: 'Nhập đơn vị quản lý!' }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <ProFormDigit
            name="credits"
            label="Số tín chỉ học tập"
            min={1}
            max={15}
            rules={[{ required: true, message: 'Nhập số TC!' }]}
          />
        </Col>
        <Col span={6}>
          <ProFormDigit
            name="tuitionCredits"
            label="Số TC học phí"
            min={1}
            max={20}
            rules={[{ required: true, message: 'Nhập số TC học phí!' }]}
          />
        </Col>
        <Col span={4}>
          <ProFormDigit name="theoryHours" label="Lý thuyết (h)" min={0} />
        </Col>
        <Col span={4}>
          <ProFormDigit name="exerciseHours" label="Bài tập (h)" min={0} />
        </Col>
        <Col span={4}>
          <ProFormDigit name="labHours" label="Thí nghiệm (h)" min={0} />
        </Col>
      </Row>

      <ProFormSelect
        name="prerequisiteCodes"
        label="Học phần tiên quyết (Phải tích lũy trước)"
        mode="tags"
        placeholder="Nhập mã HP rồi nhấn Enter (VD: IT1110, MI1111)"
      />

      <ProFormTextArea
        name="description"
        label="Tóm tắt nội dung học phần"
        placeholder="Mô tả mục tiêu, kiến thức và kỹ năng đạt được"
        rows={3}
      />
    </ModalForm>
  );
};

export default ModalComponent;
