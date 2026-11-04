import {
  CopyOutlined,
  LockOutlined,
  PlusOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history } from '@umijs/max';
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Modal,
  message,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface IClassItem {
  id: string;
  code: string;
  name: string;
  courseCode: string;
  credits: number;
  teacherName: string;
  semester: string;
  room: string;
  schedule: string;
  studentCount: number;
  status: 'active' | 'closed';
  cover: string;
  description: string;
}

export const TeacherClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<IClassItem[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [form] = Form.useForm();

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lms/classes');
      const data = await res.json();
      if (data.success) {
        setClasses(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateClass = async (values: any) => {
    const generatedCode = `CLS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newClass: IClassItem = {
      id: `cls-${Date.now()}`,
      code: values.code?.trim().toUpperCase() || generatedCode,
      name: values.name,
      courseCode: values.courseCode || 'IT4409',
      credits: Number(values.credits) || 3,
      teacherName: 'TS. Nguyễn Văn Hùng',
      semester: values.semester || 'Học kỳ 1 - 2026-2027',
      room: values.room || 'Hội trường B1',
      schedule: values.schedule || 'Thứ 2 (08:00 - 11:30)',
      studentCount: 0,
      status: 'active',
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
      description: values.description || '',
    };

    setClasses([newClass, ...classes]);
    setCreateModalOpen(false);
    form.resetFields();
    message.success(`Đã tạo lớp thành công! Mã mời tham gia: ${newClass.code}`);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    message.success(`Đã sao chép mã lớp: ${code}`);
  };

  const handleToggleStatus = (cls: IClassItem) => {
    const nextStatus = cls.status === 'active' ? 'closed' : 'active';
    setClasses(
      classes.map((c) =>
        c.id === cls.id ? { ...c, status: nextStatus as any } : c,
      ),
    );
    message.success(
      `Đã ${nextStatus === 'active' ? 'mở lại' : 'đóng nhận thành viên'} lớp ${cls.name}`,
    );
  };

  const handleRegenerateCode = (cls: IClassItem) => {
    const newCode = `CLS-${Math.floor(1000 + Math.random() * 9000)}`;
    setClasses(
      classes.map((c) => (c.id === cls.id ? { ...c, code: newCode } : c)),
    );
    message.success(`Đã làm mới mã tham gia lớp học thành công: ${newCode}`);
  };

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Helmet>
        <title>Danh sách Lớp học giảng dạy - Giáo viên</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Danh sách Lớp học phụ trách (C2)',
          subTitle:
            'Tạo lớp học mới, sinh mã tham gia duy nhất cho sinh viên, quản lý mã lớp và không gian học tập',
          extra: [
            <Button
              key="create"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalOpen(true)}
            >
              Tạo lớp học mới
            </Button>,
          ],
        }}
      >
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Tìm kiếm theo tên môn học hoặc mã lớp..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={16} style={{ textAlign: 'right' }}>
              <Button icon={<ReloadOutlined />} onClick={fetchClasses}>
                Làm mới
              </Button>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]}>
          {filteredClasses.map((item) => (
            <Col key={item.id} xs={24} sm={12} lg={8}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: 120,
                      background: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url(${item.cover}) center/cover`,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      color: '#fff',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Tag
                        color="cyan"
                        style={{ fontSize: 13, fontWeight: 700 }}
                      >
                        {item.courseCode}
                      </Tag>
                      <Badge
                        status={
                          item.status === 'active' ? 'success' : 'default'
                        }
                        text={
                          <span style={{ color: '#fff', fontSize: 12 }}>
                            {item.status === 'active' ? 'Đang mở' : 'Đã đóng'}
                          </span>
                        }
                      />
                    </div>
                    <Title
                      level={4}
                      style={{ color: '#fff', margin: 0 }}
                      ellipsis={{ rows: 2 }}
                    >
                      {item.name}
                    </Title>
                  </div>
                }
                actions={[
                  <Button
                    key="enter"
                    type="link"
                    icon={<RightOutlined />}
                    onClick={() => history.push(`/teacher/classes/${item.id}`)}
                  >
                    Vào lớp học
                  </Button>,
                  <Button
                    key="copy"
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => handleCopyCode(item.code)}
                  >
                    Mã: {item.code}
                  </Button>,
                  <Dropdown
                    key="more"
                    menu={{
                      items: [
                        {
                          key: 'regenerate',
                          label: 'Đổi mã tham gia lớp',
                          onClick: () => handleRegenerateCode(item),
                        },
                        {
                          key: 'status',
                          label:
                            item.status === 'active'
                              ? 'Đóng lớp học'
                              : 'Mở lại lớp',
                          icon:
                            item.status === 'active' ? (
                              <LockOutlined />
                            ) : (
                              <UnlockOutlined />
                            ),
                          danger: item.status === 'active',
                          onClick: () => handleToggleStatus(item),
                        },
                      ],
                    }}
                  >
                    <Button type="text" icon={<SettingOutlined />} />
                  </Dropdown>,
                ]}
              >
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Text type="secondary">{item.semester}</Text>
                    <Text strong style={{ color: '#1890ff' }}>
                      <TeamOutlined /> {item.studentCount} sinh viên
                    </Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Phòng: {item.room} · {item.schedule}
                  </Text>
                  <Paragraph
                    type="secondary"
                    ellipsis={{ rows: 2 }}
                    style={{ fontSize: 13, marginTop: 8, minHeight: 38 }}
                  >
                    {item.description || 'Chưa có mô tả môn học.'}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal Tạo lớp mới */}
        <Modal
          title="Tạo Lớp học phần mới (C2)"
          open={createModalOpen}
          onOk={() => form.submit()}
          onCancel={() => setCreateModalOpen(false)}
          okText="Tạo lớp học"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical" onFinish={handleCreateClass}>
            <Form.Item
              name="name"
              label="Tên môn học / Lớp học phần"
              rules={[
                { required: true, message: 'Vui lòng nhập tên lớp học!' },
              ]}
            >
              <Input placeholder="Ví dụ: Kỹ thuật Lập trình Web Hiện đại" />
            </Form.Item>
            <Form.Item
              name="code"
              label="Mã tham gia lớp (Để trống để tự động sinh ngẫu nhiên)"
            >
              <Input placeholder="Ví dụ: WEB2026 (hoặc bỏ trống)" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="courseCode"
                  label="Mã học phần"
                  initialValue="IT4409"
                >
                  <Input placeholder="IT4409" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="credits" label="Số tín chỉ" initialValue={3}>
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="semester"
                  label="Học kỳ"
                  initialValue="Học kỳ 1 - 2026-2027"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="room" label="Phòng học" initialValue="D9-501">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="schedule"
              label="Lịch học hàng tuần"
              initialValue="Thứ 2 (06:45 - 09:15)"
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả môn học & Yêu cầu">
              <Input.TextArea
                rows={3}
                placeholder="Giới thiệu mục tiêu môn học, giáo trình tham khảo..."
              />
            </Form.Item>
          </Form>
        </Modal>
      </PageContainer>
    </>
  );
};

export default TeacherClassesPage;
