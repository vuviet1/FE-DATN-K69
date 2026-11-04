import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EditOutlined,
  FormOutlined,
  PlusOutlined,
  ReadOutlined,
  RightOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history, useModel } from '@umijs/max';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

export const TeacherDashboardPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [classes, setClasses] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clsRes, asmRes, subRes] = await Promise.all([
          fetch('/api/lms/classes'),
          fetch('/api/lms/assignments'),
          fetch('/api/lms/submissions'),
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

  const pendingSubmissions = submissions.filter(
    (s) => s.status === 'submitted' || s.status === 'late',
  );

  return (
    <>
      <Helmet>
        <title>Bảng điều khiển Giảng viên - LMS</title>
      </Helmet>
      <PageContainer
        header={{
          title: `Chào mừng, ${initialState?.currentUser?.name || 'Thầy/Cô'}!`,
          subTitle:
            'Trang tổng quan công tác giảng dạy, các lớp học phụ trách và bài tập cần chấm điểm (C1)',
          extra: [
            <Button
              key="create-class"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/teacher/classes')}
            >
              Tạo lớp học mới
            </Button>,
          ],
        }}
      >
        {/* Hàng thẻ thống kê nhanh */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #1890ff' }}>
              <Statistic
                title="Lớp học đang phụ trách"
                value={classes.filter((c) => c.status === 'active').length}
                suffix="lớp"
                prefix={<ReadOutlined style={{ color: '#1890ff' }} />}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Tổng số sinh viên: 155 SV
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #52c41a' }}>
              <Statistic
                title="Bài tập đang mở"
                value={assignments.filter((a) => a.status === 'active').length}
                suffix="bài"
                prefix={<FormOutlined style={{ color: '#52c41a' }} />}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                2 bài sắp đến hạn tuần này
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #faad14' }}>
              <Statistic
                title="Bài nộp đang chờ chấm"
                value={pendingSubmissions.length}
                suffix="bài"
                prefix={<EditOutlined style={{ color: '#faad14' }} />}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                {submissions.filter((s) => s.status === 'graded').length} bài đã
                có điểm
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable style={{ borderLeft: '4px solid #722ed1' }}>
              <Statistic
                title="Tỷ lệ nộp bài đúng hạn"
                value={88.5}
                suffix="%"
                prefix={<CheckCircleOutlined style={{ color: '#722ed1' }} />}
              />
              <Progress
                percent={88.5}
                size="small"
                showInfo={false}
                strokeColor="#722ed1"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {/* Cột trái: Lớp học phụ trách */}
          <Col xs={24} lg={14}>
            <Card
              title={
                <Space>
                  <AppstoreOutlined style={{ color: '#1890ff' }} />
                  <span>Các lớp học đang phụ trách</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/teacher/classes')}
                >
                  Xem tất cả
                </Button>
              }
            >
              <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={classes}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        key="view"
                        type="primary"
                        ghost
                        size="small"
                        onClick={() =>
                          history.push(`/teacher/classes/${item.id}`)
                        }
                      >
                        Vào lớp học <RightOutlined />
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={54}
                          src={item.cover}
                          style={{ borderRadius: 8 }}
                        />
                      }
                      title={
                        <Space>
                          <Tag color="cyan" style={{ fontWeight: 600 }}>
                            {item.code}
                          </Tag>
                          <Text strong style={{ fontSize: 15 }}>
                            {item.name}
                          </Text>
                        </Space>
                      }
                      description={
                        <Space direction="vertical" size={2}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {item.semester} · Phòng {item.room} ·{' '}
                            {item.schedule}
                          </Text>
                          <Space
                            size="large"
                            style={{ fontSize: 12, marginTop: 4 }}
                          >
                            <span style={{ color: '#1890ff' }}>
                              <TeamOutlined /> {item.studentCount} sinh viên
                            </span>
                            <Badge
                              status={
                                item.status === 'active' ? 'success' : 'default'
                              }
                              text={
                                item.status === 'active' ? 'Đang mở' : 'Đã đóng'
                              }
                            />
                          </Space>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Bài tập sắp đến hạn */}
            <Card
              title={
                <Space>
                  <ClockCircleOutlined style={{ color: '#fa8c16' }} />
                  <span>Bài tập sắp đến hạn nộp</span>
                </Space>
              }
              style={{ marginTop: 16 }}
            >
              <List
                dataSource={assignments}
                renderItem={(asm) => (
                  <List.Item
                    actions={[
                      <Button
                        key="action"
                        type="link"
                        size="small"
                        onClick={() =>
                          history.push(`/teacher/assignments/${asm.id}`)
                        }
                      >
                        Theo dõi nộp bài
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      title={<Text strong>{asm.title}</Text>}
                      description={
                        <Space wrap>
                          <Tag color="blue">{asm.className}</Tag>
                          <Tag color="orange">
                            <ClockCircleOutlined /> Hạn:{' '}
                            {new Date(asm.dueDate).toLocaleString('vi-VN')}
                          </Tag>
                          <Tag color="purple">Thang điểm {asm.maxScore}</Tag>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Đã nộp: <b>{asm.submittedCount}</b>/
                            {asm.totalStudents} sinh viên
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Cột phải: Bài nộp cần chấm điểm ngay */}
          <Col xs={24} lg={10}>
            <Card
              title={
                <Space>
                  <EditOutlined style={{ color: '#faad14' }} />
                  <span>
                    Bài nộp cần chấm điểm ({pendingSubmissions.length})
                  </span>
                </Space>
              }
              extra={<Tag color="warning">Cần xử lý</Tag>}
            >
              <List
                dataSource={pendingSubmissions}
                renderItem={(sub) => (
                  <List.Item
                    actions={[
                      <Button
                        key="grade"
                        type="primary"
                        size="small"
                        onClick={() =>
                          history.push(`/teacher/submissions/${sub.id}`)
                        }
                      >
                        Chấm bài ngay
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={sub.studentAvatar} />}
                      title={
                        <div>
                          <Text strong>{sub.studentName}</Text>{' '}
                          <Text type="secondary">({sub.studentCode})</Text>
                        </div>
                      }
                      description={
                        <div>
                          <div style={{ fontSize: 12, color: '#595959' }}>
                            {sub.assignmentTitle}
                          </div>
                          <Space style={{ marginTop: 4 }}>
                            {sub.isLate ? (
                              <Tag color="error">Nộp muộn</Tag>
                            ) : (
                              <Tag color="green">Đúng hạn</Tag>
                            )}
                            <Text type="secondary" style={{ fontSize: 11 }}>
                              {new Date(sub.submittedAt).toLocaleString(
                                'vi-VN',
                              )}
                            </Text>
                          </Space>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />

              <div
                style={{
                  marginTop: 20,
                  padding: 12,
                  background: '#fafafa',
                  borderRadius: 8,
                }}
              >
                <Text strong>Tiến độ chấm điểm toàn khóa:</Text>
                <div style={{ marginTop: 8 }}>
                  <Progress
                    percent={Math.round(
                      (submissions.filter((s) => s.status === 'graded').length /
                        (submissions.length || 1)) *
                        100,
                    )}
                    status="active"
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 4,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Đã chấm:{' '}
                    <b>
                      {submissions.filter((s) => s.status === 'graded').length}{' '}
                      bài
                    </b>
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Chờ chấm: <b>{pendingSubmissions.length} bài</b>
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default TeacherDashboardPage;
