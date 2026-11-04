import {
  AlertOutlined,
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LoginOutlined,
  ReadOutlined,
  RightOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history, useModel } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  Input,
  List,
  Modal,
  message,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;

export const StudentDashboardPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [classes, setClasses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);

  // Modal tham gia lớp (D3)
  const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);
  const [joinCode, setJoinCode] = useState<string>('');
  const [joining, setJoining] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clsRes, asmRes, subRes] = await Promise.all([
          fetch('/api/lms/classes'),
          fetch('/api/lms/assignments'),
          fetch('/api/lms/submissions?studentId=SV2021001'),
        ]);
        const clsData = await clsRes.json();
        const asmData = await asmRes.json();
        const subData = await subRes.json();
        if (clsData.success) setClasses(clsData.data);
        if (asmData.success) setAssignments(asmData.data);
        if (subData.success) setSubmissions(subData.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleJoinClass = async () => {
    if (!joinCode.trim()) {
      message.warning('Vui lòng nhập mã lớp học phần!');
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
        message.success(data.message || 'Tham gia lớp học thành công!');
        setJoinModalOpen(false);
        setJoinCode('');
        // Điều hướng vào chi tiết lớp học
        history.push(`/student/classes/${data.data.id}`);
      } else {
        message.error(data.errorMessage || 'Mã lớp không hợp lệ!');
      }
    } catch {
      message.error('Lỗi khi gửi yêu cầu tham gia lớp!');
    } finally {
      setJoining(false);
    }
  };

  const gradedSubmissions = submissions.filter((s) => s.status === 'graded');
  const pendingAssignments = assignments.filter((a) => {
    const hasSubmitted = submissions.some((s) => s.assignmentId === a.id);
    return !hasSubmitted;
  });

  return (
    <>
      <Helmet>
        <title>Không gian Sinh viên - LMS</title>
      </Helmet>
      <PageContainer
        header={{
          title: `Xin chào, ${initialState?.currentUser?.name || 'Sinh viên'}!`,
          subTitle:
            'Nắm bắt nhanh các lớp học phần, bài tập sắp đến hạn và kết quả đánh giá học tập (D1)',
          extra: [
            <Button
              key="join"
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => setJoinModalOpen(true)}
            >
              Tham gia lớp bằng mã (D3)
            </Button>,
          ],
        }}
      >
        {/* Hàng thống kê tổng quan */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #1890ff' }}>
              <Statistic
                title="Lớp học đã tham gia"
                value={classes.length}
                suffix="lớp"
                prefix={<ReadOutlined style={{ color: '#1890ff' }} />}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Học kỳ 1 - Năm học 2026-2027
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #ff4d4f' }}>
              <Statistic
                title="Bài tập chưa nộp"
                value={pendingAssignments.length}
                suffix="bài"
                prefix={<AlertOutlined style={{ color: '#ff4d4f' }} />}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Cần hoàn thành trước hạn chót
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #52c41a' }}>
              <Statistic
                title="Bài tập đã nộp"
                value={submissions.length}
                suffix="bài"
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {gradedSubmissions.length} bài đã có điểm & nhận xét
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #722ed1' }}>
              <Statistic
                title="Điểm trung bình (GPA)"
                value={9.5}
                suffix="/ 10"
                prefix={<TrophyOutlined style={{ color: '#722ed1' }} />}
              />
              <Progress
                percent={95}
                size="small"
                showInfo={false}
                strokeColor="#722ed1"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* Cột trái: Bài tập sắp đến hạn & Lớp của tôi */}
          <Col xs={24} lg={15}>
            {/* Cảnh báo bài tập cần nộp gấp */}
            <Card
              title={
                <Space>
                  <ClockCircleOutlined style={{ color: '#fa8c16' }} />
                  <span>Nhiệm vụ & Bài tập sắp đến hạn nộp</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/student/assignments')}
                >
                  Xem tất cả ({assignments.length})
                </Button>
              }
            >
              <List
                dataSource={assignments}
                renderItem={(item) => {
                  const isSubmitted = submissions.some(
                    (s) => s.assignmentId === item.id,
                  );
                  const _isOverdue = dayjs(item.dueDate).isBefore(dayjs());
                  return (
                    <List.Item
                      actions={[
                        isSubmitted ? (
                          <Button
                            key="view"
                            type="link"
                            onClick={() =>
                              history.push(`/student/assignments/${item.id}`)
                            }
                          >
                            Xem bài đã nộp
                          </Button>
                        ) : (
                          <Button
                            key="submit"
                            type="primary"
                            size="small"
                            onClick={() =>
                              history.push(`/student/assignments/${item.id}`)
                            }
                          >
                            Nộp bài ngay
                          </Button>
                        ),
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            shape="square"
                            size={44}
                            style={{
                              background: isSubmitted ? '#f6ffed' : '#fff7e6',
                              color: isSubmitted ? '#52c41a' : '#fa8c16',
                              border: `1px solid ${isSubmitted ? '#b7eb8f' : '#ffd591'}`,
                            }}
                            icon={
                              isSubmitted ? (
                                <CheckCircleOutlined />
                              ) : (
                                <ClockCircleOutlined />
                              )
                            }
                          />
                        }
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            {isSubmitted ? (
                              <Tag color="success">Đã nộp</Tag>
                            ) : (
                              <Tag color="warning">Chưa nộp</Tag>
                            )}
                          </Space>
                        }
                        description={
                          <Space wrap style={{ marginTop: 4 }}>
                            <Tag color="blue">{item.className}</Tag>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Hạn nộp:{' '}
                              <b>
                                {new Date(item.dueDate).toLocaleString('vi-VN')}
                              </b>
                            </Text>
                            <Tag color="purple">
                              Thang điểm: {item.maxScore}
                            </Tag>
                          </Space>
                        }
                      />
                    </List.Item>
                  );
                }}
              />
            </Card>

            {/* Các lớp học đang theo học */}
            <Card
              title={
                <Space>
                  <AppstoreOutlined style={{ color: '#1890ff' }} />
                  <span>Lớp học phần đang theo học</span>
                </Space>
              }
              style={{ marginTop: 16 }}
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/student/classes')}
                >
                  Danh sách lớp
                </Button>
              }
            >
              <Row gutter={[12, 12]}>
                {classes.map((cls) => (
                  <Col key={cls.id} xs={24} sm={12}>
                    <Card
                      size="small"
                      hoverable
                      onClick={() => history.push(`/student/classes/${cls.id}`)}
                      style={{ border: '1px solid #f0f0f0', borderRadius: 8 }}
                    >
                      <Space
                        direction="vertical"
                        size={2}
                        style={{ width: '100%' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Tag color="cyan">{cls.code}</Tag>
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {cls.semester}
                          </Text>
                        </div>
                        <Text strong style={{ fontSize: 14 }}>
                          {cls.name}
                        </Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Giảng viên: {cls.teacherName}
                        </Text>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* Cột phải: Kết quả bài nộp & Lời phê của Giảng viên */}
          <Col xs={24} lg={9}>
            <Card
              title={
                <Space>
                  <TrophyOutlined style={{ color: '#faad14' }} />
                  <span>Kết quả & Nhận xét mới nhất (D8)</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/student/grades')}
                >
                  Bảng điểm
                </Button>
              }
            >
              {gradedSubmissions.length > 0 ? (
                <List
                  dataSource={gradedSubmissions}
                  renderItem={(sub) => (
                    <Card
                      key={sub.id}
                      size="small"
                      style={{
                        marginBottom: 12,
                        background: '#f6ffed',
                        borderColor: '#b7eb8f',
                      }}
                      actions={[
                        <Button
                          key="view"
                          type="link"
                          size="small"
                          onClick={() =>
                            history.push(`/student/submissions/${sub.id}`)
                          }
                        >
                          Xem chi tiết kết quả & lịch sử <RightOutlined />
                        </Button>,
                      ]}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Text strong style={{ fontSize: 14 }}>
                          {sub.assignmentTitle}
                        </Text>
                        <Tag
                          color="cyan"
                          style={{ fontSize: 16, fontWeight: 700 }}
                        >
                          {sub.score} / 10
                        </Tag>
                      </div>
                      <Divider style={{ margin: '8px 0' }} />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Lời phê của {sub.gradedBy || 'Giảng viên'}:
                      </Text>
                      <Paragraph
                        style={{
                          marginTop: 4,
                          fontSize: 13,
                          fontStyle: 'italic',
                          color: '#262626',
                        }}
                      >
                        "{sub.feedback}"
                      </Paragraph>
                    </Card>
                  )}
                />
              ) : (
                <Empty description="Chưa có bài tập nào được chấm điểm." />
              )}
            </Card>
          </Col>
        </Row>

        {/* Modal Tham gia lớp học bằng mã (D3) */}
        <Modal
          title="Tham gia Lớp học phần bằng mã (D3)"
          open={joinModalOpen}
          onOk={handleJoinClass}
          onCancel={() => setJoinModalOpen(false)}
          okText="Tham gia ngay"
          cancelText="Hủy"
          confirmLoading={joining}
        >
          <Paragraph>
            Nhập mã tham gia lớp học do giảng viên cung cấp (Ví dụ:{' '}
            <b>WEB2026</b>, <b>AI401</b>, <b>SE3100</b>):
          </Paragraph>
          <Input
            size="large"
            placeholder="Nhập mã lớp (không phân biệt chữ hoa/thường)..."
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            onPressEnter={handleJoinClass}
            style={{
              textTransform: 'uppercase',
              fontWeight: 600,
              letterSpacing: 1,
            }}
          />
          <div style={{ marginTop: 12 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              💡 Gợi ý mã lớp thử nghiệm: <Tag color="blue">WEB2026</Tag>{' '}
              <Tag color="purple">SE3100</Tag> <Tag color="cyan">AI401</Tag>
            </Text>
          </div>
        </Modal>
      </PageContainer>
    </>
  );
};

export default StudentDashboardPage;
