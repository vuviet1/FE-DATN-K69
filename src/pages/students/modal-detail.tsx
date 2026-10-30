/**
 * @file modal-detail.tsx
 * @description Drawer/Modal xem chi tiết hồ sơ sinh viên theo chuẩn Mes-Client-ES
 */

import { UserOutlined } from '@ant-design/icons';
import { StatusTag } from '@components';
import type { IStudent } from '@domain/models';
import { formatDate } from '@utils/Utils';
import { Avatar, Button, Descriptions, Drawer, Space, Tag } from 'antd';
import React, { useContext } from 'react';
import { StudentContext } from './useContext';

export const ModalDetail: React.FC = () => {
  const { openModalDetail, handleModalDetail, dataItem } =
    useContext(StudentContext);
  const student = dataItem as IStudent | null;

  if (!student) return null;

  return (
    <Drawer
      title="Hồ sơ chi tiết sinh viên"
      open={openModalDetail}
      onClose={handleModalDetail}
      width={600}
      extra={<Button onClick={handleModalDetail}>Đóng</Button>}
    >
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar
          size={80}
          src={student.avatar}
          icon={<UserOutlined />}
          style={{ marginBottom: 12 }}
        />
        <h3 style={{ margin: 0 }}>{student.fullName}</h3>
        <p style={{ color: '#8c8c8c', margin: '4px 0 0' }}>
          Mã SV: {student.studentCode}
        </p>
        <div style={{ marginTop: 8 }}>
          <StatusTag status={student.status} />
        </div>
      </div>

      <Descriptions title="Thông tin cá nhân" bordered column={1} size="small">
        <Descriptions.Item label="Giới tính">
          <Tag color={student.gender === 'Nam' ? 'blue' : 'magenta'}>
            {student.gender}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày sinh">
          {formatDate(student.birthDate)}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {student.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {student.address || 'Chưa cập nhật'}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 24 }}>
        <Descriptions
          title="Thông tin đào tạo"
          bordered
          column={1}
          size="small"
        >
          <Descriptions.Item label="Lớp sinh hoạt">
            {student.className}
          </Descriptions.Item>
          <Descriptions.Item label="Học phần">
            {student.course}
          </Descriptions.Item>
          <Descriptions.Item label="Điểm rèn luyện (ĐRL)">
            <Space>
              <strong>{student.trainingPoint}</strong>
              <Tag color={student.trainingPoint >= 80 ? 'green' : 'orange'}>
                {student.trainingPoint >= 90
                  ? 'Xuất sắc'
                  : student.trainingPoint >= 80
                    ? 'Tốt'
                    : student.trainingPoint >= 65
                      ? 'Khá'
                      : 'Trung bình'}
              </Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Điểm trung bình tích lũy (GPA)">
            <Space>
              <strong
                style={{
                  fontSize: 16,
                  color: student.gpa >= 3.2 ? '#52c41a' : '#faad14',
                }}
              >
                {student.gpa.toFixed(2)} / 4.0
              </strong>
              <Tag
                color={
                  student.gpa >= 3.6
                    ? 'gold'
                    : student.gpa >= 3.2
                      ? 'green'
                      : student.gpa >= 2.5
                        ? 'blue'
                        : 'red'
                }
              >
                {student.gpa >= 3.6
                  ? 'Xuất sắc'
                  : student.gpa >= 3.2
                    ? 'Giỏi'
                    : student.gpa >= 2.5
                      ? 'Khá'
                      : student.gpa >= 2.0
                        ? 'Trung bình'
                        : 'Yếu / Cảnh báo'}
              </Tag>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Drawer>
  );
};

export default ModalDetail;
