/**
 * @file modal.tsx
 * @description Modal Chỉnh sửa điểm sinh viên theo chuẩn Mes-Client-ES
 */

import { ModalForm, ProFormDigit } from '@ant-design/pro-components';
import type { IGradeItem } from '@domain/models';
import { Col, Descriptions, Form, Row } from 'antd';
import React, { useContext, useEffect } from 'react';
import { GradeContext } from './useContext';

export interface IGradeModalProps {
  onFinish?: (values: IGradeItem) => Promise<boolean>;
}

export const ModalComponent: React.FC<IGradeModalProps> = ({ onFinish }) => {
  const { openModal, handleModal, dataItem } = useContext(GradeContext);
  const [form] = Form.useForm();
  const student = dataItem as IGradeItem | null;

  useEffect(() => {
    if (openModal && student) {
      form.setFieldsValue({
        attendanceScore: student.attendanceScore,
        assignmentScore: student.assignmentScore,
        midtermScore: student.midtermScore,
        finalScore: student.finalScore,
      });
    }
  }, [openModal, student, form]);

  if (!student) return null;

  return (
    <ModalForm<IGradeItem>
      title={`Cập nhật điểm sinh viên: ${student.fullName} (${student.studentCode})`}
      open={openModal}
      form={form}
      modalProps={{
        destroyOnClose: true,
        onCancel: handleModal,
        centered: true,
        width: 600,
        okText: 'Lưu điểm số',
        cancelText: 'Hủy bỏ',
      }}
      onFinish={async (values) => {
        if (onFinish) {
          const success = await onFinish({
            ...student,
            ...values,
          });
          if (success) {
            handleModal?.();
          }
          return success;
        }
        return false;
      }}
    >
      <Descriptions size="small" column={2} style={{ marginBottom: 16 }}>
        <Descriptions.Item label="Mã sinh viên">
          {student.studentCode}
        </Descriptions.Item>
        <Descriptions.Item label="Họ và tên">
          {student.fullName}
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormDigit
            name="attendanceScore"
            label="Điểm chuyên cần (10%)"
            min={0}
            max={10}
            step={0.5}
            rules={[{ required: true, message: 'Nhập điểm chuyên cần!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name="assignmentScore"
            label="Điểm bài tập (20%)"
            min={0}
            max={10}
            step={0.5}
            rules={[{ required: true, message: 'Nhập điểm bài tập!' }]}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <ProFormDigit
            name="midtermScore"
            label="Điểm giữa kỳ (20%)"
            min={0}
            max={10}
            step={0.5}
            rules={[{ required: true, message: 'Nhập điểm giữa kỳ!' }]}
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name="finalScore"
            label="Điểm thi cuối kỳ (50%)"
            min={0}
            max={10}
            step={0.5}
            rules={[{ required: true, message: 'Nhập điểm thi cuối kỳ!' }]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default ModalComponent;
