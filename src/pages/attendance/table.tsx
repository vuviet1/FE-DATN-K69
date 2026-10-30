/**
 * @file table.tsx
 * @description Bảng điểm danh sinh viên theo chuẩn Mes-Client-ES
 */

import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Table as AntTable,
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Statistic,
  Typography,
} from 'antd';
import React, { useContext, useEffect } from 'react';
import { getAttendanceColumns } from './columns';
import { useAttendance } from './hooks';
import { AttendanceContext } from './useContext';

const { Text } = Typography;

export const Table: React.FC = () => {
  const {
    selectedCourse,
    setSelectedCourse,
    selectedDate,
    setSelectedDate,
    records,
    setRecords,
    handleStatusChange,
  } = useContext(AttendanceContext);

  const { loading, getAttendance, saveAttendance, markAllPresent } =
    useAttendance();

  useEffect(() => {
    getAttendance(selectedCourse, selectedDate).then((res) => {
      setRecords(res);
    });
  }, [selectedCourse, selectedDate, getAttendance, setRecords]);

  const handleNoteChange = (id: string, note: string) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, note } : r)));
  };

  const handleSave = () => {
    saveAttendance(selectedCourse, selectedDate, records);
  };

  const presentCount = records.filter((s) => s.status === 'present').length;
  const lateCount = records.filter((s) => s.status === 'late').length;
  const excusedCount = records.filter((s) => s.status === 'excused').length;
  const absentCount = records.filter((s) => s.status === 'absent').length;
  const total = records.length;
  const presentRate =
    total > 0 ? Math.round(((presentCount + lateCount) / total) * 100) : 0;

  const columns = getAttendanceColumns({
    onStatusChange: handleStatusChange,
    onNoteChange: handleNoteChange,
  });

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle" justify="space-between">
          <Col xs={24} md={14}>
            <Space size="large" wrap>
              <Space>
                <Text strong>Lớp học phần:</Text>
                <Select
                  value={selectedCourse}
                  onChange={(val) => setSelectedCourse(val)}
                  style={{ width: 280 }}
                  options={[
                    {
                      label: 'IT4409 - Lập trình Web nâng cao',
                      value: 'IT4409',
                    },
                    {
                      label: 'IT3090 - Cơ sở dữ liệu phân tán',
                      value: 'IT3090',
                    },
                    { label: 'IT4010 - Kiến trúc máy tính', value: 'IT4010' },
                  ]}
                />
              </Space>

              <Space>
                <Text strong>Ngày điểm danh:</Text>
                <DatePicker
                  value={selectedDate}
                  onChange={(d) => d && setSelectedDate(d)}
                  format="DD/MM/YYYY"
                  allowClear={false}
                />
              </Space>
            </Space>
          </Col>

          <Col xs={24} md={10} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<CheckOutlined />} onClick={markAllPresent}>
                Tất cả có mặt
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={loading}
                onClick={handleSave}
              >
                Lưu điểm danh
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6} md={4}>
          <Card size="small">
            <Statistic
              title="Có mặt"
              value={presentCount}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card size="small">
            <Statistic
              title="Đi muộn"
              value={lateCount}
              valueStyle={{ color: '#faad14' }}
              prefix={<FieldTimeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card size="small">
            <Statistic
              title="Có phép"
              value={excusedCount}
              valueStyle={{ color: '#1677ff' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Card size="small">
            <Statistic
              title="Vắng mặt"
              value={absentCount}
              valueStyle={{ color: '#ff4d4f' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size="small">
            <Statistic
              title="Tỷ lệ chuyên cần buổi này"
              value={presentRate}
              suffix={`% (${presentCount + lateCount}/${total} SV)`}
              valueStyle={{ color: presentRate >= 80 ? '#52c41a' : '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {absentCount > 0 && (
        <Alert
          message={`Có ${absentCount} sinh viên vắng mặt trong buổi học ngày ${selectedDate.format('DD/MM/YYYY')}. Hệ thống sẽ tự động cập nhật số buổi vắng vào sổ theo dõi đào tạo.`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <AntTable
        rowKey="id"
        columns={columns}
        dataSource={records}
        loading={loading}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default Table;
