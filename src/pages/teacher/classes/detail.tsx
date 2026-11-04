import {
  BarChartOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FormOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ReadOutlined,
  SendOutlined,
  TeamOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history, useParams } from '@umijs/max';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  message,
  Popconfirm,
  Progress,
  Row,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export const TeacherClassDetailPage: React.FC = () => {
  const params = useParams<{ classId: string }>();
  const classId = params.classId || 'cls-1';

  const [classInfo, setClassInfo] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>('feed');

  // Form states
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostTitle, setNewPostTitle] = useState<string>('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {},
  );
  const [createAsmModalOpen, setCreateAsmModalOpen] = useState<boolean>(false);
  const [asmForm] = Form.useForm();

  // Load data
  useEffect(() => {
    const loadClassData = async () => {
      try {
        const [clsRes, postRes, asmRes, stdRes] = await Promise.all([
          fetch(`/api/lms/classes/${classId}`),
          fetch(`/api/lms/posts?classId=${classId}`),
          fetch(`/api/lms/assignments?classId=${classId}`),
          fetch(`/api/lms/classes/${classId}/students`),
        ]);
        const clsData = await clsRes.json();
        const postData = await postRes.json();
        const asmData = await asmRes.json();
        const stdData = await stdRes.json();

        if (clsData.success) setClassInfo(clsData.data);
        if (postData.success) setPosts(postData.data);
        if (asmData.success) setAssignments(asmData.data);
        if (stdData.success) setStudents(stdData.data);
      } catch {
        message.error('Không thể tải thông tin lớp học!');
      }
    };
    loadClassData();
  }, [classId]);

  const handleCopyCode = () => {
    if (classInfo?.code) {
      navigator.clipboard.writeText(classInfo.code);
      message.success(`Đã sao chép mã tham gia lớp: ${classInfo.code}`);
    }
  };

  // Tạo bài đăng mới (C4)
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      message.warning('Vui lòng nhập nội dung bài đăng!');
      return;
    }
    const newPost = {
      id: `post-${Date.now()}`,
      classId,
      className: classInfo?.name || 'Kỹ thuật Lập trình Web',
      authorName: 'TS. Nguyễn Văn Hùng',
      authorRole: 'teacher',
      authorAvatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: newPostTitle || 'Thông báo lớp học',
      content: newPostContent,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      userLiked: false,
      status: 'active',
      comments: [],
      attachments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    message.success('Đã đăng bài viết lên bảng tin lớp!');
  };

  // Bình luận bài viết (C4)
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    const newComment = {
      id: `cmt-${Date.now()}`,
      authorName: 'TS. Nguyễn Văn Hùng',
      authorAvatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      authorRole: 'teacher',
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

  // Like bài viết
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

  // Xóa bài viết
  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
    message.success('Đã xóa bài viết thành công!');
  };

  // Tạo bài tập mới (C5)
  const handleCreateAssignment = (values: any) => {
    const newAsm = {
      id: `asm-${Date.now()}`,
      classId,
      className: classInfo?.name || 'Kỹ thuật Lập trình Web',
      title: values.title,
      description: values.description,
      dueDate: values.dueDate
        ? values.dueDate.toISOString()
        : new Date().toISOString(),
      maxScore: values.maxScore || 10,
      allowLate: values.allowLate ?? true,
      latePenalty: values.latePenalty || 'Trừ 1 điểm/ngày',
      status: 'active',
      totalStudents: students.length || 48,
      submittedCount: 0,
      gradedCount: 0,
      attachments: values.attachment
        ? [{ name: values.attachment, size: '1.2 MB', url: '#' }]
        : [],
    };
    setAssignments([newAsm, ...assignments]);
    setCreateAsmModalOpen(false);
    asmForm.resetFields();
    message.success('Tạo bài tập mới cho lớp thành công!');
  };

  // Xóa sinh viên khỏi lớp (C8)
  const handleRemoveStudent = (studentId: string, name: string) => {
    setStudents(students.filter((s) => s.id !== studentId));
    message.success(`Đã xóa sinh viên ${name} khỏi lớp học.`);
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
        <title>{classInfo.name} - Quản lý Lớp học</title>
      </Helmet>
      <PageContainer
        header={{
          title: (
            <Space align="center" wrap>
              <span>{classInfo.name}</span>
              <Tag color="cyan" style={{ fontSize: 14 }}>
                {classInfo.courseCode}
              </Tag>
              <Tag color="purple">{classInfo.semester}</Tag>
            </Space>
          ),
          subTitle: (
            <Space style={{ marginTop: 4 }}>
              <span>
                Giảng viên: <b>{classInfo.teacherName}</b>
              </span>
              <span>·</span>
              <span>Phòng: {classInfo.room}</span>
              <span>·</span>
              <span>Lịch học: {classInfo.schedule}</span>
            </Space>
          ),
          extra: [
            <Button
              key="code"
              icon={<CopyOutlined />}
              type="dashed"
              style={{
                background: '#e6f7ff',
                borderColor: '#91d5ff',
                color: '#096dd9',
              }}
              onClick={handleCopyCode}
            >
              Mã tham gia lớp: <b>{classInfo.code}</b>
            </Button>,
            <Button
              key="create-asm"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateAsmModalOpen(true)}
            >
              Giao bài tập mới
            </Button>,
          ],
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          items={[
            // Tab 1: Tổng quan lớp học
            {
              key: 'overview',
              label: (
                <span>
                  <ReadOutlined /> Tổng quan lớp
                </span>
              ),
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} lg={16}>
                    <Card title="Giới thiệu & Đề cương học phần">
                      <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>
                        {classInfo.description ||
                          'Chào mừng các bạn đến với học phần Kỹ thuật Lập trình Web Hiện đại. Môn học trang bị kiến thức và kỹ năng thực chiến về kiến trúc Single Page Application, React 19, TypeScript, REST API, Prisma ORM và các quy trình triển khai hiện đại.'}
                      </Paragraph>
                      <Divider />
                      <Descriptions bordered column={2}>
                        <Descriptions.Item label="Mã lớp học phần">
                          <Tag color="blue">{classInfo.courseCode}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Mã tham gia lớp">
                          <Tag color="cyan" style={{ fontWeight: 700 }}>
                            {classInfo.code}
                          </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Số tín chỉ">
                          {classInfo.credits} tín chỉ
                        </Descriptions.Item>
                        <Descriptions.Item label="Sĩ số lớp">
                          {students.length || classInfo.studentCount} sinh viên
                        </Descriptions.Item>
                        <Descriptions.Item label="Giảng viên chính">
                          {classInfo.teacherName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email liên hệ">
                          {classInfo.teacherEmail}
                        </Descriptions.Item>
                        <Descriptions.Item label="Học kỳ">
                          {classInfo.semester}
                        </Descriptions.Item>
                        <Descriptions.Item label="Thời gian">
                          {classInfo.schedule}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col xs={24} lg={8}>
                    <Card title="Thao tác nhanh giảng viên">
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: '100%' }}
                      >
                        <Button
                          block
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => {
                            setActiveTab('assignments');
                            setCreateAsmModalOpen(true);
                          }}
                        >
                          Tạo bài tập mới
                        </Button>
                        <Button
                          block
                          icon={<EditOutlined />}
                          onClick={() => setActiveTab('feed')}
                        >
                          Đăng thông báo lên Bảng tin
                        </Button>
                        <Button
                          block
                          icon={<TeamOutlined />}
                          onClick={() => setActiveTab('students')}
                        >
                          Xem danh sách{' '}
                          {students.length || classInfo.studentCount} sinh viên
                        </Button>
                        <Button
                          block
                          icon={<BarChartOutlined />}
                          onClick={() => setActiveTab('statistics')}
                        >
                          Xem báo cáo thống kê lớp
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              ),
            },

            // Tab 2: Bảng tin (C4)
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
                    {/* Hộp đăng bài mới */}
                    <Card
                      title="Tạo bài viết hoặc thông báo mới cho lớp (C4)"
                      style={{ marginBottom: 16 }}
                    >
                      <Input
                        placeholder="Tiêu đề thông báo (tùy chọn)..."
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        style={{ marginBottom: 8 }}
                      />
                      <TextArea
                        rows={3}
                        placeholder="Nhập nội dung chia sẻ với cả lớp, bài giảng, tài liệu tham khảo..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: 12,
                        }}
                      >
                        <Space>
                          <Button icon={<PaperClipOutlined />}>
                            Đính kèm tệp
                          </Button>
                        </Space>
                        <Button
                          type="primary"
                          icon={<SendOutlined />}
                          onClick={handleCreatePost}
                        >
                          Đăng thông báo
                        </Button>
                      </div>
                    </Card>

                    {/* Danh sách bài đăng */}
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
                              {post.comments?.length || 0} Bình luận
                            </Button>,
                            <Popconfirm
                              key="delete"
                              title="Bạn có chắc muốn xóa bài đăng này?"
                              onConfirm={() => handleDeletePost(post.id)}
                            >
                              <Button
                                type="text"
                                danger
                                icon={<DeleteOutlined />}
                              >
                                Xóa bài
                              </Button>
                            </Popconfirm>,
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

                          {/* Đính kèm */}
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

                          {/* Khu vực bình luận */}
                          <Divider style={{ margin: '12px 0' }} />
                          <div style={{ maxHeight: 250, overflowY: 'auto' }}>
                            {post.comments?.map((c: any) => (
                              <div
                                key={c.id}
                                style={{
                                  display: 'flex',
                                  gap: 10,
                                  marginBottom: 10,
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
                              placeholder="Viết phản hồi cho sinh viên..."
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

                  {/* Sidebar tin quan trọng */}
                  <Col xs={24} lg={8}>
                    <Card title="Ghim thông tin lớp học">
                      <Alert
                        message="Lưu ý học phần"
                        description="Sinh viên cần hoàn thành 100% các bài tập trước hạn nộp để đủ điều kiện thi kết thúc học phần."
                        type="info"
                        showIcon
                      />
                      <Divider />
                      <Text strong>Trợ giảng lớp học:</Text>
                      <Paragraph type="secondary" style={{ marginTop: 4 }}>
                        Nguyễn Văn Tuấn (tuan.nv@lms.edu.vn)
                      </Paragraph>
                    </Card>
                  </Col>
                </Row>
              ),
            },

            // Tab 3: Quản lý bài tập (C5)
            {
              key: 'assignments',
              label: (
                <span>
                  <FormOutlined /> Quản lý bài tập ({assignments.length})
                </span>
              ),
              children: (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Text strong style={{ fontSize: 16 }}>
                      Danh sách bài tập của lớp (C5)
                    </Text>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => setCreateAsmModalOpen(true)}
                    >
                      Tạo bài tập mới
                    </Button>
                  </div>

                  <List
                    dataSource={assignments}
                    renderItem={(asm) => (
                      <Card
                        key={asm.id}
                        style={{ marginBottom: 16 }}
                        hoverable
                        actions={[
                          <Button
                            key="track"
                            type="primary"
                            icon={<TeamOutlined />}
                            onClick={() =>
                              history.push(`/teacher/assignments/${asm.id}`)
                            }
                          >
                            Theo dõi nộp bài & Chấm điểm (C6)
                          </Button>,
                        ]}
                      >
                        <Row gutter={16} align="middle">
                          <Col xs={24} md={16}>
                            <Space direction="vertical" size={4}>
                              <Space>
                                <Tag color="blue">
                                  Thang điểm: {asm.maxScore}
                                </Tag>
                                <Tag
                                  color={
                                    dayjs(asm.dueDate).isBefore(dayjs())
                                      ? 'red'
                                      : 'orange'
                                  }
                                >
                                  <ClockCircleOutlined /> Hạn nộp:{' '}
                                  {new Date(asm.dueDate).toLocaleString(
                                    'vi-VN',
                                  )}
                                </Tag>
                                {asm.allowLate ? (
                                  <Tag color="cyan">Cho phép nộp muộn</Tag>
                                ) : (
                                  <Tag color="error">Không nhận bài muộn</Tag>
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
                              {asm.attachments &&
                                asm.attachments.length > 0 && (
                                  <Space>
                                    <Text
                                      type="secondary"
                                      style={{ fontSize: 12 }}
                                    >
                                      Đề bài:
                                    </Text>
                                    {asm.attachments.map((f: any) => (
                                      <Tag key={f.name} color="default">
                                        📄 {f.name}
                                      </Tag>
                                    ))}
                                  </Space>
                                )}
                            </Space>
                          </Col>
                          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
                            <div
                              style={{
                                textAlign: 'center',
                                background: '#fafafa',
                                padding: 12,
                                borderRadius: 8,
                              }}
                            >
                              <Text type="secondary">Tình trạng nộp bài</Text>
                              <div style={{ marginTop: 8 }}>
                                <Progress
                                  percent={Math.round(
                                    (asm.submittedCount /
                                      (asm.totalStudents || 1)) *
                                      100,
                                  )}
                                  status="active"
                                />
                              </div>
                              <Space style={{ marginTop: 8, fontSize: 13 }}>
                                <span>
                                  Đã nộp: <b>{asm.submittedCount}</b>/
                                  {asm.totalStudents} SV
                                </span>
                                <span>·</span>
                                <span style={{ color: '#52c41a' }}>
                                  Đã chấm: <b>{asm.gradedCount}</b>
                                </span>
                              </Space>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    )}
                  />
                </div>
              ),
            },

            // Tab 4: Danh sách thành viên (C8)
            {
              key: 'students',
              label: (
                <span>
                  <TeamOutlined /> Sinh viên trong lớp ({students.length})
                </span>
              ),
              children: (
                <Card
                  title={`Danh sách sinh viên trong lớp học (${students.length} sinh viên)`}
                  extra={
                    <Button
                      onClick={() =>
                        message.info('Đã xuất file danh sách ra Excel!')
                      }
                    >
                      Xuất danh sách Excel
                    </Button>
                  }
                >
                  <Table
                    dataSource={students}
                    rowKey="id"
                    columns={[
                      {
                        title: 'STT',
                        valueType: 'indexBorder',
                        width: 50,
                      } as any,
                      {
                        title: 'Mã số sinh viên',
                        dataIndex: 'code',
                        render: (text: string) => <Text strong>{text}</Text>,
                      },
                      {
                        title: 'Họ và tên',
                        dataIndex: 'fullName',
                        render: (text: string, r: any) => (
                          <Space>
                            <Avatar src={r.avatar} icon={<UserOutlined />} />
                            <Text strong>{text}</Text>
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
                      {
                        title: 'Bài đã nộp',
                        dataIndex: 'submittedCount',
                        render: (count: number) => (
                          <Tag color="blue">{count} bài</Tag>
                        ),
                      },
                      {
                        title: 'Điểm trung bình',
                        dataIndex: 'avgScore',
                        render: (score: number) => (
                          <Tag
                            color={score >= 8.5 ? 'green' : 'orange'}
                            style={{ fontWeight: 700 }}
                          >
                            {score}
                          </Tag>
                        ),
                      },
                      {
                        title: 'Thao tác',
                        render: (_: any, r: any) => (
                          <Popconfirm
                            title={`Bạn có chắc muốn loại sinh viên ${r.fullName} khỏi lớp?`}
                            onConfirm={() =>
                              handleRemoveStudent(r.id, r.fullName)
                            }
                            okText="Xóa khỏi lớp"
                            cancelText="Hủy"
                          >
                            <Button
                              type="link"
                              danger
                              size="small"
                              icon={<UserDeleteOutlined />}
                            >
                              Loại khỏi lớp
                            </Button>
                          </Popconfirm>
                        ),
                      },
                    ]}
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              ),
            },

            // Tab 5: Thống kê lớp học (C9)
            {
              key: 'statistics',
              label: (
                <span>
                  <BarChartOutlined /> Thống kê lớp (C9)
                </span>
              ),
              children: (
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Card title="Tỷ lệ nộp bài">
                      <div style={{ textAlign: 'center', padding: '16px 0' }}>
                        <Progress
                          type="circle"
                          percent={87.5}
                          strokeColor="#52c41a"
                        />
                        <div style={{ marginTop: 16 }}>
                          <Tag color="success">Đúng hạn: 87.5%</Tag>
                          <Tag color="warning">Nộp muộn: 8.3%</Tag>
                          <Tag color="error">Chưa nộp: 4.2%</Tag>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} md={16}>
                    <Card title="Phổ điểm tổng kết lớp học">
                      <Row gutter={16}>
                        <Col span={8}>
                          <Card
                            size="small"
                            style={{
                              textAlign: 'center',
                              background: '#f6ffed',
                            }}
                          >
                            <Text type="secondary">Điểm cao nhất</Text>
                            <Title
                              level={2}
                              style={{ color: '#52c41a', margin: 0 }}
                            >
                              9.8
                            </Title>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card
                            size="small"
                            style={{
                              textAlign: 'center',
                              background: '#e6f7ff',
                            }}
                          >
                            <Text type="secondary">Điểm trung bình</Text>
                            <Title
                              level={2}
                              style={{ color: '#1890ff', margin: 0 }}
                            >
                              8.6
                            </Title>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card
                            size="small"
                            style={{
                              textAlign: 'center',
                              background: '#fffbe6',
                            }}
                          >
                            <Text type="secondary">Điểm thấp nhất</Text>
                            <Title
                              level={2}
                              style={{ color: '#faad14', margin: 0 }}
                            >
                              6.5
                            </Title>
                          </Card>
                        </Col>
                      </Row>
                      <Divider />
                      <Text strong>Phân bố xếp loại:</Text>
                      <div style={{ marginTop: 12 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>Xuất sắc (≥ 9.0)</span>
                          <b>35%</b>
                        </div>
                        <Progress
                          percent={35}
                          strokeColor="#52c41a"
                          size="small"
                        />

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 8,
                          }}
                        >
                          <span>Giỏi (8.0 - 8.9)</span>
                          <b>50%</b>
                        </div>
                        <Progress
                          percent={50}
                          strokeColor="#1890ff"
                          size="small"
                        />

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 8,
                          }}
                        >
                          <span>Khá (6.5 - 7.9)</span>
                          <b>15%</b>
                        </div>
                        <Progress
                          percent={15}
                          strokeColor="#faad14"
                          size="small"
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              ),
            },
          ]}
        />

        {/* Modal Giao bài tập mới (C5) */}
        <Modal
          title="Tạo bài tập mới cho Lớp học (C5)"
          open={createAsmModalOpen}
          onOk={() => asmForm.submit()}
          onCancel={() => setCreateAsmModalOpen(false)}
          okText="Giao bài tập"
          cancelText="Hủy"
          width={650}
        >
          <Form
            form={asmForm}
            layout="vertical"
            onFinish={handleCreateAssignment}
          >
            <Form.Item
              name="title"
              label="Tiêu đề bài tập"
              rules={[
                { required: true, message: 'Vui lòng nhập tiêu đề bài tập!' },
              ]}
            >
              <Input placeholder="Ví dụ: Bài tập 03: Xây dựng REST API với Node.js & Prisma" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả & Hướng dẫn làm bài"
              rules={[
                { required: true, message: 'Vui lòng nhập hướng dẫn làm bài!' },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Yêu cầu cụ thể, định dạng bài nộp (URL GitHub, link demo, file zip đính kèm)..."
              />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="dueDate"
                  label="Hạn chót nộp bài"
                  rules={[
                    { required: true, message: 'Vui lòng chọn hạn nộp!' },
                  ]}
                >
                  <DatePicker
                    showTime
                    style={{ width: '100%' }}
                    format="YYYY-MM-DD HH:mm:ss"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="maxScore"
                  label="Thang điểm tối đa"
                  initialValue={10}
                >
                  <InputNumber min={1} max={100} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} align="middle">
              <Col span={12}>
                <Form.Item
                  name="allowLate"
                  label="Cho phép nộp muộn"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="latePenalty"
                  label="Quy định trừ điểm nộp muộn"
                  initialValue="Trừ 1 điểm mỗi ngày nộp muộn"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="attachment"
              label="Tệp đề bài / Tài liệu hướng dẫn đính kèm"
            >
              <Input placeholder="Tên tệp đính kèm hoặc link đề bài" />
            </Form.Item>
          </Form>
        </Modal>
      </PageContainer>
    </>
  );
};

export default TeacherClassDetailPage;
