import {
  ClockCircleOutlined,
  FormOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  ReadOutlined,
  SendOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history, useParams } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Input,
  List,
  message,
  Progress,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export const StudentClassDetailPage: React.FC = () => {
  const params = useParams<{ classId: string }>();
  const classId = params.classId || 'cls-1';

  const [classInfo, setClassInfo] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const loadClassData = async () => {
      try {
        const [clsRes, postRes, asmRes, subRes, stdRes] = await Promise.all([
          fetch(`/api/lms/classes/${classId}`),
          fetch(`/api/lms/posts?classId=${classId}`),
          fetch(`/api/lms/assignments?classId=${classId}`),
          fetch(`/api/lms/submissions?studentId=SV2021001`),
          fetch(`/api/lms/classes/${classId}/students`),
        ]);
        const clsData = await clsRes.json();
        const postData = await postRes.json();
        const asmData = await asmRes.json();
        const subData = await subRes.json();
        const stdData = await stdRes.json();

        if (clsData.success) setClassInfo(clsData.data);
        if (postData.success) setPosts(postData.data);
        if (asmData.success) setAssignments(asmData.data);
        if (subData.success) setSubmissions(subData.data);
        if (stdData.success) setStudents(stdData.data);
      } catch {
        message.error('Không thể tải thông tin lớp!');
      }
    };
    loadClassData();
  }, [classId]);

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const userLiked = !p.userLiked;
          return {
            ...p,
            userLiked,
            likesCount: p.likesCount + (userLiked ? 1 : -1),
          };
        }
        return p;
      }),
    );
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    const newComment = {
      id: `cmt-${Date.now()}`,
      authorName: 'Lê Văn Minh',
      authorAvatar:
        'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      authorRole: 'student',
      content: text,
      createdAt: new Date().toISOString(),
    };

    setPosts(
      posts.map((p) =>
        p.id === postId
          ? { ...p, comments: [...(p.comments || []), newComment] }
          : p,
      ),
    );
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  if (!classInfo) {
    return (
      <PageContainer>
        <Card loading />
      </PageContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{classInfo.name} - Lớp học phần</title>
      </Helmet>
      <PageContainer
        header={{
          title: (
            <Space align="center" wrap>
              <span>{classInfo.name}</span>
              <Tag color="cyan">{classInfo.courseCode}</Tag>
              <Tag color="purple">{classInfo.semester}</Tag>
            </Space>
          ),
          subTitle: `Giảng viên: ${classInfo.teacherName} · Phòng ${classInfo.room} · ${classInfo.schedule}`,
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          items={[
            // Tab 1: Tổng quan
            {
              key: 'overview',
              label: (
                <span>
                  <ReadOutlined /> Tổng quan môn học
                </span>
              ),
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={16}>
                    <Card title="Mục tiêu & Đề cương học phần">
                      <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>
                        {classInfo.description}
                      </Paragraph>
                      <Divider />
                      <Descriptions bordered column={2}>
                        <Descriptions.Item label="Mã lớp">
                          {classInfo.courseCode}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số tín chỉ">
                          {classInfo.credits} tín chỉ
                        </Descriptions.Item>
                        <Descriptions.Item label="Giảng viên chính">
                          {classInfo.teacherName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email giảng viên">
                          {classInfo.teacherEmail}
                        </Descriptions.Item>
                        <Descriptions.Item label="Lịch học hàng tuần">
                          {classInfo.schedule}
                        </Descriptions.Item>
                        <Descriptions.Item label="Địa điểm">
                          {classInfo.room}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card title="Tiến độ học tập của bạn">
                      <Text type="secondary">Hoàn thành bài tập:</Text>
                      <Progress
                        percent={Math.round(
                          (submissions.length / (assignments.length || 1)) *
                            100,
                        )}
                        style={{ marginTop: 8 }}
                      />
                      <Divider />
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button
                          block
                          type="primary"
                          icon={<FormOutlined />}
                          onClick={() => setActiveTab('assignments')}
                        >
                          Xem các bài tập cần nộp
                        </Button>
                        <Button
                          block
                          icon={<MessageOutlined />}
                          onClick={() => setActiveTab('feed')}
                        >
                          Bảng tin thảo luận
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              ),
            },

            // Tab 2: Bảng tin lớp
            {
              key: 'feed',
              label: (
                <span>
                  <MessageOutlined /> Bảng tin lớp ({posts.length})
                </span>
              ),
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={16}>
                    <List
                      dataSource={posts}
                      renderItem={(post) => (
                        <Card
                          key={post.id}
                          style={{ marginBottom: 16 }}
                          actions={[
                            <Button
                              key="like"
                              type="text"
                              icon={
                                post.userLiked ? (
                                  <HeartFilled style={{ color: '#ff4d4f' }} />
                                ) : (
                                  <HeartOutlined />
                                )
                              }
                              onClick={() => handleLikePost(post.id)}
                            >
                              {post.likesCount} Thích
                            </Button>,
                            <Button
                              key="comment"
                              type="text"
                              icon={<MessageOutlined />}
                            >
                              {post.comments?.length || 0} Phản hồi
                            </Button>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<Avatar src={post.authorAvatar} />}
                            title={
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Text strong style={{ fontSize: 16 }}>
                                  {post.title}
                                </Text>
                                <Tag
                                  color={
                                    post.authorRole === 'teacher'
                                      ? 'blue'
                                      : 'green'
                                  }
                                >
                                  {post.authorRole === 'teacher'
                                    ? 'Giảng viên'
                                    : 'Sinh viên'}
                                </Tag>
                              </div>
                            }
                            description={
                              <Space>
                                <Text strong>{post.authorName}</Text>
                                <span>·</span>
                                <Text type="secondary">
                                  {new Date(post.createdAt).toLocaleString(
                                    'vi-VN',
                                  )}
                                </Text>
                              </Space>
                            }
                          />
                          <Paragraph style={{ marginTop: 12, fontSize: 14 }}>
                            {post.content}
                          </Paragraph>

                          {post.attachments && post.attachments.length > 0 && (
                            <div
                              style={{
                                padding: 8,
                                background: '#fafafa',
                                borderRadius: 6,
                                marginBottom: 12,
                              }}
                            >
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                Tài liệu đính kèm:
                              </Text>
                              <div style={{ marginTop: 4 }}>
                                {post.attachments.map((f: any) => (
                                  <Tag
                                    key={f.name}
                                    color="default"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    📎 {f.name} ({f.size})
                                  </Tag>
                                ))}
                              </div>
                            </div>
                          )}

                          <Divider style={{ margin: '12px 0' }} />

                          {/* Danh sách bình luận */}
                          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                            {post.comments?.map((c: any) => (
                              <div
                                key={c.id}
                                style={{
                                  display: 'flex',
                                  gap: 10,
                                  marginBottom: 8,
                                  padding: 8,
                                  background: '#f9f9f9',
                                  borderRadius: 8,
                                }}
                              >
                                <Avatar size="small" src={c.authorAvatar} />
                                <div style={{ flex: 1 }}>
                                  <div
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <Text strong style={{ fontSize: 12 }}>
                                      {c.authorName}
                                    </Text>
                                    <Text
                                      type="secondary"
                                      style={{ fontSize: 11 }}
                                    >
                                      {new Date(c.createdAt).toLocaleTimeString(
                                        'vi-VN',
                                        {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        },
                                      )}
                                    </Text>
                                  </div>
                                  <Text style={{ fontSize: 13 }}>
                                    {c.content}
                                  </Text>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div
                            style={{ display: 'flex', gap: 8, marginTop: 12 }}
                          >
                            <Input
                              placeholder="Đặt câu hỏi hoặc thảo luận với thầy cô, bạn bè..."
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs({
                                  ...commentInputs,
                                  [post.id]: e.target.value,
                                })
                              }
                              onPressEnter={() => handleAddComment(post.id)}
                            />
                            <Button
                              type="primary"
                              icon={<SendOutlined />}
                              onClick={() => handleAddComment(post.id)}
                            >
                              Gửi
                            </Button>
                          </div>
                        </Card>
                      )}
                    />
                  </Col>

                  <Col xs={24} lg={8}>
                    <Card title="Ghi chú học tập">
                      <Paragraph type="secondary">
                        Bạn có thể tương tác, đặt câu hỏi trực tiếp cho giảng
                        viên trên bảng tin hoặc thảo luận nhóm cùng các bạn
                        trong lớp.
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              ),
            },

            // Tab 3: Bài tập của lớp
            {
              key: 'assignments',
              label: (
                <span>
                  <FormOutlined /> Bài tập môn học ({assignments.length})
                </span>
              ),
              children: (
                <List
                  dataSource={assignments}
                  renderItem={(asm) => {
                    const mySub = submissions.find(
                      (s) => s.assignmentId === asm.id,
                    );
                    return (
                      <Card
                        key={asm.id}
                        style={{ marginBottom: 16 }}
                        hoverable
                        actions={[
                          mySub ? (
                            <Button
                              key="view-res"
                              type="link"
                              onClick={() =>
                                history.push(`/student/submissions/${mySub.id}`)
                              }
                            >
                              Xem kết quả & Lời phê (
                              {mySub.score ? `${mySub.score}/10` : 'Đang chấm'})
                            </Button>
                          ) : (
                            <Button
                              key="submit"
                              type="primary"
                              onClick={() =>
                                history.push(`/student/assignments/${asm.id}`)
                              }
                            >
                              Nộp bài tập ngay
                            </Button>
                          ),
                        ]}
                      >
                        <Row gutter={16} align="middle">
                          <Col xs={24} md={18}>
                            <Space direction="vertical" size={4}>
                              <Space>
                                <Tag color="blue">
                                  Thang điểm: {asm.maxScore}
                                </Tag>
                                <Tag color="orange">
                                  <ClockCircleOutlined /> Hạn nộp:{' '}
                                  {new Date(asm.dueDate).toLocaleString(
                                    'vi-VN',
                                  )}
                                </Tag>
                                {mySub ? (
                                  mySub.status === 'graded' ? (
                                    <Tag color="cyan">
                                      Đã chấm: <b>{mySub.score}/10</b>
                                    </Tag>
                                  ) : (
                                    <Tag color="success">
                                      Đã nộp bài (Chờ chấm)
                                    </Tag>
                                  )
                                ) : (
                                  <Tag color="error">Chưa nộp bài</Tag>
                                )}
                              </Space>
                              <Title
                                level={4}
                                style={{ margin: '8px 0 4px 0' }}
                              >
                                {asm.title}
                              </Title>
                              <Paragraph
                                type="secondary"
                                ellipsis={{ rows: 2 }}
                              >
                                {asm.description}
                              </Paragraph>
                            </Space>
                          </Col>
                          <Col xs={24} md={6} style={{ textAlign: 'right' }}>
                            {mySub?.score ? (
                              <div
                                style={{
                                  textAlign: 'center',
                                  background: '#f6ffed',
                                  padding: 12,
                                  borderRadius: 8,
                                }}
                              >
                                <Text type="secondary">Điểm số của bạn</Text>
                                <Title
                                  level={2}
                                  style={{ color: '#52c41a', margin: 0 }}
                                >
                                  {mySub.score}
                                </Title>
                              </div>
                            ) : (
                              <div
                                style={{
                                  textAlign: 'center',
                                  background: '#fffbe6',
                                  padding: 12,
                                  borderRadius: 8,
                                }}
                              >
                                <Text type="secondary">Hạn chót</Text>
                                <div
                                  style={{
                                    color: '#d46b08',
                                    fontWeight: 600,
                                    marginTop: 4,
                                  }}
                                >
                                  {dayjs(asm.dueDate).diff(dayjs(), 'day')} ngày
                                  nữa
                                </div>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Card>
                    );
                  }}
                />
              ),
            },

            // Tab 4: Thành viên lớp
            {
              key: 'members',
              label: (
                <span>
                  <TeamOutlined /> Thành viên ({students.length})
                </span>
              ),
              children: (
                <Card
                  title={`Danh sách sinh viên cùng lớp (${students.length} bạn học)`}
                >
                  <Table
                    dataSource={students}
                    rowKey="id"
                    columns={[
                      {
                        title: 'STT',
                        width: 50,
                        render: (_: any, __: any, idx: number) => idx + 1,
                      },
                      {
                        title: 'Sinh viên',
                        dataIndex: 'fullName',
                        render: (name: string, r: any) => (
                          <Space>
                            <Avatar src={r.avatar} icon={<UserOutlined />} />
                            <div>
                              <Text strong>{name}</Text>
                              <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                                {r.code}
                              </div>
                            </div>
                          </Space>
                        ),
                      },
                      {
                        title: 'Email',
                        dataIndex: 'email',
                      },
                      {
                        title: 'Ngày tham gia',
                        dataIndex: 'joinedAt',
                      },
                    ]}
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              ),
            },
          ]}
        />
      </PageContainer>
    </>
  );
};

export default StudentClassDetailPage;
