import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FieldTimeOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  message,
  Radio,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const { Text, Title } = Typography;

type AttendanceStatus = 'present' | 'late' | 'excused' | 'absent';

interface AttendanceRecord {
  id: string;
  studentCode: string;
  fullName: string;
  avatar: string;
  totalAbsences: number; // Tổng số buổi đã vắng trước đây
  status: AttendanceStatus;
}

const initialAttendanceList: AttendanceRecord[] = [
  { id: '1', studentCode: '2021001', fullName: 'Nguyễn Hoàng Nam', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam', totalAbsences: 0, status: 'present' },
  { id: '2', studentCode: '2021002', fullName: 'Trần Thị Mai', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai', totalAbsences: 0, status: 'present' },
  { id: '3', studentCode: '2021003', fullName: 'Lê Văn Cường', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong', totalAbsences: 3, status: 'absent' },
  { id: '4', studentCode: '2021004', fullName: 'Phạm Minh Tuấn', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan', totalAbsences: 1, status: 'present' },
  { id: '5', studentCode: '2021005', fullName: 'Hoàng Diệu Linh', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh', totalAbsences: 0, status: 'present' },
  { id: '6', studentCode: '2021006', fullName: 'Đỗ Đức Thắng', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thang', totalAbsences: 4, status: 'absent' },
  { id: '7', studentCode: '2021007', fullName: 'Vũ Thu Trang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trang', totalAbsences: 0, status: 'present' },
  { id: '8', studentCode: '2021008', fullName: 'Bùi Anh Quân', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quan', totalAbsences: 2, status: 'late' },
];

export const AttendancePage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('IT4409');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [students, setStudents] = useState<AttendanceRecord[]>(initialAttendanceList);

  const handleStatusChange = (id: string, newStatus: AttendanceStatus) => {
    setStudents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleMarkAllPresent = () => {
    setStudents((prev) => prev.map((item) => ({ ...item, status: 'present' })));
    message.success('Đã đánh dấu tất cả sinh viên Có mặt!');
  };

  const handleSaveAttendance = () => {
    message.success(
      `Đã lưu điểm danh ngày ${selectedDate.format('DD/MM/YYYY')} cho lớp ${selectedCourse} thành công!`
    );
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const excusedCount = students.filter((s) => s.status === 'excused').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;

  const columns: ColumnsType<AttendanceRecord> = [
    {
      title: 'Mã SV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 100,
      render: (code) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <span style={{ fontWeight: 600 }}>{record.fullName}</span>
        </Space>
      ),
    },
    {
      title: 'Số buổi vắng trước',
      dataIndex: 'totalAbsences',
      key: 'totalAbsences',
      align: 'center',
      width: 170,
      render: (count) => {
        if (count >= 3) {
          return <Tag color="error">Vắng {count} buổi (Nguy cơ cấm thi)</Tag>;
        }
        if (count > 0) {
          return <Tag color="warning">Vắng {count} buổi</Tag>;
        }
        return <Tag color="success">Chăm chỉ (0 buổi)</Tag>;
      },
    },
    {
      title: 'Trạng thái điểm danh hôm nay',
      key: 'status',
      render: (_, record) => (
        <Radio.Group
          value={record.status}
          onChange={(e) => handleStatusChange(record.id, e.target.value)}
        >
          <Radio.Button value="present" style={{ color: record.status === 'present' ? '#52c41a' : undefined }}>
            <CheckCircleOutlined /> Có mặt
          </Radio.Button>
          <Radio.Button value="late" style={{ color: record.status === 'late' ? '#fa8c16' : undefined }}>
            <FieldTimeOutlined /> Đi muộn
          </Radio.Button>
          <Radio.Button value="excused" style={{ color: record.status === 'excused' ? '#1677ff' : undefined }}>
            Có phép
          </Radio.Button>
          <Radio.Button value="absent" style={{ color: record.status === 'absent' ? '#ff4d4f' : undefined }}>
            <CloseCircleOutlined /> Vắng không phép
          </Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Điểm Danh & Theo Dõi Chuyên Cần',
        subTitle: 'Quản lý chuyên cần, điểm danh theo từng buổi học và kiểm soát sinh viên vắng quá số tiết',
      }}
    >
      {/* Bộ lọc chọn lớp và ngày */}
      <Card style={{ marginBottom: 16, borderRadius: 8 }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={14}>
            <Space size="middle" wrap>
              <div>
                <Text strong style={{ marginRight: 8 }}>Lớp học phần:</Text>
                <Select
                  value={selectedCourse}
                  onChange={setSelectedCourse}
                  style={{ width: 260 }}
                  options={[
                    { label: 'Lập trình Web nâng cao (IT4409)', value: 'IT4409' },
                    { label: 'Cơ sở dữ liệu phân tán (IT3090)', value: 'IT3090' },
                    { label: 'Kỹ thuật phần mềm (IT3100)', value: 'IT3100' },
                  ]}
                />
              </div>

              <div>
                <Text strong style={{ marginRight: 8 }}>Ngày học:</Text>
                {/* Dropdown gắn lịch DatePicker */}
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => date && setSelectedDate(date)}
                  format="DD/MM/YYYY"
                  allowClear={false}
                />
              </div>
            </Space>
          </Col>

          <Col xs={24} md={10} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<CheckOutlined />} onClick={handleMarkAllPresent}>
                Tất cả có mặt
              </Button>
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveAttendance}>
                Lưu Điểm Danh
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Thống kê nhanh sĩ số có mặt hôm nay */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 8, textAlign: 'center' }}>
            <Statistic title="Có mặt" value={presentCount} valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 8, textAlign: 'center' }}>
            <Statistic title="Đi muộn" value={lateCount} valueStyle={{ color: '#fa8c16' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 8, textAlign: 'center' }}>
            <Statistic title="Vắng có phép" value={excusedCount} valueStyle={{ color: '#1677ff' }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ borderRadius: 8, textAlign: 'center' }}>
            <Statistic title="Vắng không phép" value={absentCount} valueStyle={{ color: '#ff4d4f' }} />
          </Card>
        </Col>
      </Row>

      {absentCount > 0 && (
        <Alert
          message={`Hôm nay lớp có ${absentCount} sinh viên vắng không phép. Hệ thống đã tự động cập nhật vào lịch sử chuyên cần.`}
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Bảng danh sách điểm danh */}
      <Card style={{ borderRadius: 8 }}>
        <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </PageContainer>
  );
};

export default AttendancePage;
