import {
  LoginOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Empty,
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

export const StudentClassesPage: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');
  const [joining, setJoining] = useState<boolean>(false);

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

  const handleJoinClass = async () => {
    if (!joinCode.trim()) {
      message.warning('Vui lòng nhập mã lớp!');
      return;
    }
    setJoining(true);
    try {
      const res = await fetch('/api/lms/classes/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: joinCode }),
      });
      const data = await res.json();
      if (data.success) {
        message.success(data.message || 'Tham gia lớp thành công!');
        setJoinModalOpen(false);
        setJoinCode('');
        fetchClasses();
        history.push(`/student/classes/${data.data.id}`);
      } else {
        message.error(data.errorMessage || 'Mã lớp không hợp lệ!');
      }
    } catch {
      message.error('Lỗi khi tham gia lớp học!');
    } finally {
      setJoining(false);
    }
  };

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.teacherName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Helmet>
        <title>Lớp học của tôi - Sinh viên</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Các lớp học phần đã tham gia (D2 & D3)',
          subTitle:
            'Không gian học tập, trao đổi bài giảng, thảo luận và theo dõi bài tập theo từng môn học',
          extra: [
            <Button
              key="join"
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => setJoinModalOpen(true)}
            >
              Tham gia lớp học bằng mã (D3)
            </Button>,
          ],
        }}
      >
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Tìm lớp theo tên môn học, giảng viên, mã lớp..."
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

        {filtered.length === 0 ? (
          <Empty description="Bạn chưa tham gia lớp học nào." />
        ) : (
          <Row gutter={[16, 16]}>
            {filtered.map((item) => (
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
                        }}
                      >
                        <Tag
                          color="cyan"
                          style={{ fontSize: 13, fontWeight: 700 }}
                        >
                          {item.courseCode}
                        </Tag>
                        <Tag color="blue">{item.semester}</Tag>
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
                      type="primary"
                      ghost
                      icon={<RightOutlined />}
                      onClick={() =>
                        history.push(`/student/classes/${item.id}`)
                      }
                    >
                      Vào lớp học ngay
                    </Button>,
                  ]}
                >
                  <Space
                    direction="vertical"
                    size={4}
                    style={{ width: '100%' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text strong>
                        <UserOutlined /> {item.teacherName}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <TeamOutlined /> {item.studentCount} bạn học
                      </Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Phòng {item.room} · {item.schedule}
                    </Text>
                    <Paragraph
                      type="secondary"
                      ellipsis={{ rows: 2 }}
                      style={{ fontSize: 13, marginTop: 8, minHeight: 38 }}
                    >
                      {item.description}
                    </Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Modal Tham gia lớp (D3) */}
        <Modal
          title="Tham gia Lớp học phần bằng mã (D3)"
          open={joinModalOpen}
          onOk={handleJoinClass}
          onCancel={() => setJoinModalOpen(false)}
          okText="Tham gia lớp"
          cancelText="Hủy"
          confirmLoading={joining}
        >
          <Paragraph>
            Nhập mã lớp do giảng viên cung cấp để tham gia vào lớp học phần:
          </Paragraph>
          <Input
            size="large"
            placeholder="Ví dụ: WEB2026"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            onPressEnter={handleJoinClass}
            style={{ textTransform: 'uppercase', fontWeight: 600 }}
          />
          <div style={{ marginTop: 12 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              💡 Mã gợi ý: <Tag color="blue">WEB2026</Tag>{' '}
              <Tag color="purple">SE3100</Tag> <Tag color="cyan">AI401</Tag>
            </Text>
          </div>
        </Modal>
      </PageContainer>
    </>
  );
};

export default StudentClassesPage;
