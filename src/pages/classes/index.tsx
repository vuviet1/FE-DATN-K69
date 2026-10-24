import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  FormOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Modal,
  Progress,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface ClassItem {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: string;
  studentCount: number;
  schedule: string;
  room: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  status: 'active' | 'completed';
}

const mockClasses: ClassItem[] = [
  {
    id: '1',
    code: 'IT4409',
    name: 'Lập trình Web nâng cao',
    credits: 3,
    semester: 'HK1 (2025-2026)',
    studentCount: 45,
    schedule: 'Thứ 3 (Tiết 3 - 5)',
    room: 'Phòng D9-301',
    progress: 68,
    completedLessons: 10,
    totalLessons: 15,
    status: 'active',
  },
  {
    id: '2',
    code: 'IT3090',
    name: 'Cơ sở dữ liệu phân tán',
    credits: 3,
    semester: 'HK1 (2025-2026)',
    studentCount: 52,
    schedule: 'Thứ 4 (Tiết 1 - 3)',
    room: 'Phòng D3-102',
    progress: 45,
    completedLessons: 7,
    totalLessons: 15,
    status: 'active',
  },
  {
    id: '3',
    code: 'IT3100',
    name: 'Kỹ thuật phần mềm',
    credits: 3,
    semester: 'HK1 (2025-2026)',
    studentCount: 40,
    schedule: 'Thứ 6 (Tiết 7 - 9)',
    room: 'Phòng C1-205',
    progress: 80,
    completedLessons: 12,
    totalLessons: 15,
    status: 'active',
  },
  {
    id: '4',
    code: 'IT4900',
    name: 'Đồ án tốt nghiệp / Chuyên ngành',
    credits: 4,
    semester: 'HK1 (2025-2026)',
    studentCount: 31,
    schedule: 'Thứ 7 (Tiết 1 - 4)',
    room: 'Phòng Lab 402',
    progress: 30,
    completedLessons: 5,
    totalLessons: 15,
    status: 'active',
  },
];

const ClassesPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <PageContainer
      header={{
        title: 'Lớp Học Phần Phụ Trách',
        subTitle: 'Danh sách và lịch giảng dạy các lớp học phần trong học kỳ hiện tại',
      }}
    >
      <Row gutter={[16, 16]}>
        {mockClasses.map((item) => (
          <Col xs={24} md={12} key={item.id}>
            <Card
              hoverable
              title={
                <Space>
                  <Tag color="blue">{item.code}</Tag>
                  <Text strong style={{ fontSize: 16 }}>{item.name}</Text>
                </Space>
              }
              extra={<Badge status="processing" text="Đang giảng dạy" />}
              style={{ borderRadius: 10, height: '100%' }}
              actions={[
                <Button
                  key="students"
                  type="link"
                  icon={<TeamOutlined />}
                  onClick={() => history.push('/students')}
                >
                  Sinh viên
                </Button>,
                <Button
                  key="grades"
                  type="link"
                  icon={<FormOutlined />}
                  onClick={() => history.push('/grades')}
                >
                  Nhập điểm
                </Button>,
                <Button
                  key="attendance"
                  type="link"
                  icon={<CheckCircleOutlined />}
                  onClick={() => history.push('/attendance')}
                >
                  Điểm danh
                </Button>,
              ]}
            >
              <div style={{ marginBottom: 12 }}>
                <Row gutter={[8, 8]}>
                  <Col span={12}>
                    <Text type="secondary">
                      <ClockCircleOutlined style={{ marginRight: 6 }} />
                      {item.schedule}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">
                      <EnvironmentOutlined style={{ marginRight: 6 }} />
                      {item.room}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">
                      <TeamOutlined style={{ marginRight: 6 }} />
                      Sĩ số: <b>{item.studentCount}</b> sinh viên
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">
                      <CalendarOutlined style={{ marginRight: 6 }} />
                      Số tín chỉ: <b>{item.credits}</b> TC
                    </Text>
                  </Col>
                </Row>
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 12 }} type="secondary">Tiến độ giảng dạy</Text>
                  <Text style={{ fontSize: 12 }} strong>
                    {item.completedLessons}/{item.totalLessons} buổi ({item.progress}%)
                  </Text>
                </div>
                <Progress percent={item.progress} strokeColor="#1677ff" />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Thông Tin Chi Tiết Lớp Học Phần"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setModalVisible(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedClass && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Mã học phần">{selectedClass.code}</Descriptions.Item>
            <Descriptions.Item label="Tên môn học">{selectedClass.name}</Descriptions.Item>
            <Descriptions.Item label="Số tín chỉ">{selectedClass.credits}</Descriptions.Item>
            <Descriptions.Item label="Thời khóa biểu">{selectedClass.schedule}</Descriptions.Item>
            <Descriptions.Item label="Phòng học">{selectedClass.room}</Descriptions.Item>
            <Descriptions.Item label="Sĩ số">{selectedClass.studentCount} SV</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default ClassesPage;
