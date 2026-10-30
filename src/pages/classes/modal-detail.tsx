/**
 * @file modal-detail.tsx
 * @description Drawer xem chi tiết thông tin lớp học theo chuẩn Mes-Client-ES
 */

import { CheckCircleOutlined, SolutionOutlined } from '@ant-design/icons';
import { StatusTag } from '@components';
import type { IClass } from '@domain/models';
import { history } from '@umijs/max';
import { Button, Descriptions, Drawer, Progress, Space } from 'antd';
import React, { useContext } from 'react';
import { ClassContext } from './useContext';

export const ModalDetail: React.FC = () => {
  const { openModalDetail, handleModalDetail, dataItem } =
    useContext(ClassContext);
  const cls = dataItem as IClass | null;

  if (!cls) return null;

  return (
    <Drawer
      title={`Thông tin chi tiết lớp học: ${cls.name}`}
      open={openModalDetail}
      onClose={handleModalDetail}
      width={600}
      extra={
        <Space>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => {
              handleModalDetail?.();
              history.push(`/attendance?classCode=${cls.code}`);
            }}
          >
            Điểm danh
          </Button>
          <Button
            icon={<SolutionOutlined />}
            onClick={() => {
              handleModalDetail?.();
              history.push(`/grades?classCode=${cls.code}`);
            }}
          >
            Bảng điểm
          </Button>
        </Space>
      }
    >
      <div style={{ marginBottom: 24 }}>
        <h4>Tiến độ giảng dạy học phần</h4>
        <Progress
          percent={cls.progress}
          status={cls.progress === 100 ? 'success' : 'active'}
        />
        <div style={{ marginTop: 8, color: '#8c8c8c' }}>
          Đã thực hiện: {cls.completedLessons} / {cls.totalLessons} buổi học
        </div>
      </div>

      <Descriptions title="Thông tin học phần" bordered column={1} size="small">
        <Descriptions.Item label="Mã lớp học phần">
          {cls.code}
        </Descriptions.Item>
        <Descriptions.Item label="Tên học phần">{cls.name}</Descriptions.Item>
        <Descriptions.Item label="Học kỳ">{cls.semester}</Descriptions.Item>
        <Descriptions.Item label="Số tín chỉ">
          {cls.credits} Tín chỉ
        </Descriptions.Item>
        <Descriptions.Item label="Sĩ số sinh viên">
          {cls.studentCount} Sinh viên
        </Descriptions.Item>
        <Descriptions.Item label="Lịch học">{cls.schedule}</Descriptions.Item>
        <Descriptions.Item label="Phòng học">{cls.room}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <StatusTag status={cls.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Giảng viên phụ trách">
          {cls.lecturerName || 'ThS. Nguyễn Văn Giảng'}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả / Ghi chú">
          {cls.description || 'Chưa có ghi chú thêm.'}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ModalDetail;
