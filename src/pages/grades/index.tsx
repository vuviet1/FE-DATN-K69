import {
  CheckOutlined,
  DownloadOutlined,
  EditOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

const { Text } = Typography;

interface StudentGrade {
  id: string;
  studentCode: string;
  fullName: string;
  attendanceScore: number; // 10%
  assignmentScore: number; // 20%
  midtermScore: number; // 20%
  finalScore: number; // 50%
}

const initialGrades: Record<string, StudentGrade[]> = {
  IT4409: [
    { id: '1', studentCode: '2021001', fullName: 'Nguyễn Hoàng Nam', attendanceScore: 9, assignmentScore: 8.5, midtermScore: 8.0, finalScore: 8.5 },
    { id: '2', studentCode: '2021002', fullName: 'Trần Thị Mai', attendanceScore: 10, assignmentScore: 9.5, midtermScore: 9.0, finalScore: 9.5 },
    { id: '3', studentCode: '2021003', fullName: 'Lê Văn Cường', attendanceScore: 5, assignmentScore: 4.0, midtermScore: 3.5, finalScore: 4.0 },
    { id: '4', studentCode: '2021004', fullName: 'Phạm Minh Tuấn', attendanceScore: 8, assignmentScore: 7.0, midtermScore: 6.5, finalScore: 7.0 },
    { id: '5', studentCode: '2021005', fullName: 'Hoàng Diệu Linh', attendanceScore: 9, assignmentScore: 8.0, midtermScore: 8.5, finalScore: 8.0 },
    { id: '6', studentCode: '2021006', fullName: 'Đỗ Đức Thắng', attendanceScore: 4, assignmentScore: 3.5, midtermScore: 4.0, finalScore: 3.5 },
    { id: '7', studentCode: '2021007', fullName: 'Vũ Thu Trang', attendanceScore: 10, assignmentScore: 9.0, midtermScore: 9.5, finalScore: 9.0 },
    { id: '8', studentCode: '2021008', fullName: 'Bùi Anh Quân', attendanceScore: 7, assignmentScore: 6.0, midtermScore: 5.5, finalScore: 6.0 },
  ],
  IT3090: [
    { id: '101', studentCode: '2021010', fullName: 'Ngô Bá Hưng', attendanceScore: 8, assignmentScore: 8.0, midtermScore: 7.5, finalScore: 8.0 },
    { id: '102', studentCode: '2021011', fullName: 'Lý Lan Anh', attendanceScore: 9, assignmentScore: 8.5, midtermScore: 9.0, finalScore: 8.5 },
  ],
};

const calculateTotalScore = (record: StudentGrade): number => {
  const total =
    record.attendanceScore * 0.1 +
    record.assignmentScore * 0.2 +
    record.midtermScore * 0.2 +
    record.finalScore * 0.5;
  return Number(total.toFixed(2));
};

const getLetterGrade = (score: number) => {
  if (score >= 8.5) return { letter: 'A', gpa4: 4.0, color: 'green' };
  if (score >= 8.0) return { letter: 'B+', gpa4: 3.5, color: 'cyan' };
  if (score >= 7.0) return { letter: 'B', gpa4: 3.0, color: 'blue' };
  if (score >= 6.5) return { letter: 'C+', gpa4: 2.5, color: 'geekblue' };
  if (score >= 5.5) return { letter: 'C', gpa4: 2.0, color: 'orange' };
  if (score >= 5.0) return { letter: 'D+', gpa4: 1.5, color: 'gold' };
  if (score >= 4.0) return { letter: 'D', gpa4: 1.0, color: 'volcano' };
  return { letter: 'F', gpa4: 0.0, color: 'red' };
};

export const GradesPage: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState('IT4409');
  const [gradesData, setGradesData] = useState<Record<string, StudentGrade[]>>(initialGrades);
  const [editingItem, setEditingItem] = useState<StudentGrade | null>(null);
  const [form] = Form.useForm();

  const currentList = gradesData[selectedCourse] || [];

  const handleEditClick = (record: StudentGrade) => {
    setEditingItem(record);
    form.setFieldsValue(record);
  };

  const handleSaveGrade = (values: any) => {
    if (!editingItem) return;
    const updated = currentList.map((item) => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          attendanceScore: Number(values.attendanceScore),
          assignmentScore: Number(values.assignmentScore),
          midtermScore: Number(values.midtermScore),
          finalScore: Number(values.finalScore),
        };
      }
      return item;
    });

    setGradesData((prev) => ({
      ...prev,
      [selectedCourse]: updated,
    }));
    message.success(`Đã cập nhật điểm cho sinh viên ${editingItem.fullName}`);
    setEditingItem(null);
  };

  const columns: ColumnsType<StudentGrade> = [
    {
      title: 'Mã SV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 100,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    {
      title: 'Chuyên cần (10%)',
      dataIndex: 'attendanceScore',
      key: 'attendanceScore',
      align: 'center',
      render: (val) => <span>{val}</span>,
    },
    {
      title: 'Bài tập/DA (20%)',
      dataIndex: 'assignmentScore',
      key: 'assignmentScore',
      align: 'center',
      render: (val) => <span>{val}</span>,
    },
    {
      title: 'Giữa kỳ (20%)',
      dataIndex: 'midtermScore',
      key: 'midtermScore',
      align: 'center',
      render: (val) => <span>{val}</span>,
    },
    {
      title: 'Cuối kỳ (50%)',
      dataIndex: 'finalScore',
      key: 'finalScore',
      align: 'center',
      render: (val) => <span>{val}</span>,
    },
    {
      title: 'Tổng kết (Hệ 10)',
      key: 'totalScore',
      align: 'center',
      render: (_, record) => {
        const total = calculateTotalScore(record);
        const color = total >= 7.0 ? '#52c41a' : total >= 4.0 ? '#1677ff' : '#ff4d4f';
        return <span style={{ color, fontWeight: 'bold', fontSize: 15 }}>{total}</span>;
      },
    },
    {
      title: 'Điểm chữ & Hệ 4',
      key: 'letterGrade',
      align: 'center',
      render: (_, record) => {
        const total = calculateTotalScore(record);
        const { letter, gpa4, color } = getLetterGrade(total);
        return (
          <Tag color={color} style={{ fontWeight: 'bold' }}>
            {letter} ({gpa4.toFixed(1)})
          </Tag>
        );
      },
    },
    {
      title: 'Kết quả',
      key: 'result',
      align: 'center',
      render: (_, record) => {
        const total = calculateTotalScore(record);
        return total >= 4.0 ? (
          <Tag color="success">Đạt</Tag>
        ) : (
          <Tag color="error">Học lại</Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          size="small"
          onClick={() => handleEditClick(record)}
        >
          Sửa điểm
        </Button>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Quản Lý Điểm Số Học Phần',
        subTitle: 'Nhập điểm quá trình, điểm thi và tự động tính điểm tổng kết',
      }}
    >
      <Card style={{ marginBottom: 16, borderRadius: 8 }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space align="center">
              <Text strong>Chọn Lớp Học Phần:</Text>
              <Select
                value={selectedCourse}
                onChange={setSelectedCourse}
                style={{ width: 280 }}
                options={[
                  { label: 'Lập trình Web nâng cao (IT4409)', value: 'IT4409' },
                  { label: 'Cơ sở dữ liệu phân tán (IT3090)', value: 'IT3090' },
                  { label: 'Kỹ thuật phần mềm (IT3100)', value: 'IT3100' },
                ]}
              />
            </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button
                icon={<DownloadOutlined />}
                onClick={() => message.success('Đã tải xuống bảng điểm Excel của lớp!')}
              >
                Xuất Bảng Điểm Excel
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={() => message.success('Đã lưu toàn bộ bảng điểm lên máy chủ đào tạo!')}
              >
                Khóa & Lưu Bảng Điểm
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Alert
        message="Công thức tính điểm học phần: Tổng kết = (Chuyên cần × 10%) + (Bài tập × 20%) + (Giữa kỳ × 20%) + (Cuối kỳ × 50%)"
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />

      <Card style={{ borderRadius: 8 }}>
        <Table
          columns={columns}
          dataSource={currentList}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Modal Chỉnh Sửa Điểm */}
      <Modal
        title={`Chỉnh Sửa Điểm - ${editingItem?.fullName} (${editingItem?.studentCode})`}
        open={!!editingItem}
        onCancel={() => setEditingItem(null)}
        onOk={() => form.submit()}
        okText="Cập nhật điểm"
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveGrade} style={{ marginTop: 16 }}>
          <Form.Item
            name="attendanceScore"
            label="Điểm chuyên cần (10%)"
            rules={[{ required: true, message: 'Vui lòng nhập điểm!' }]}
          >
            <InputNumber min={0} max={10} step={0.25} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="assignmentScore"
            label="Điểm bài tập / Quá trình (20%)"
            rules={[{ required: true, message: 'Vui lòng nhập điểm!' }]}
          >
            <InputNumber min={0} max={10} step={0.25} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="midtermScore"
            label="Điểm thi giữa kỳ (20%)"
            rules={[{ required: true, message: 'Vui lòng nhập điểm!' }]}
          >
            <InputNumber min={0} max={10} step={0.25} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="finalScore"
            label="Điểm thi cuối kỳ (50%)"
            rules={[{ required: true, message: 'Vui lòng nhập điểm!' }]}
          >
            <InputNumber min={0} max={10} step={0.25} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default GradesPage;
