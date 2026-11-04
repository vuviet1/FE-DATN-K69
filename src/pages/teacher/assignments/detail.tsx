import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  EditOutlined,
  FileDoneOutlined,
  LinkOutlined,
  ReloadOutlined,
  SearchOutlined,
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
  Input,
  message,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;

export const TeacherAssignmentDetailPage: React.FC = () => {
  const params = useParams<{ assignmentId: string }>();
  const assignmentId = params.assignmentId || 'asm-1';

  const [assignment, setAssignment] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [asmRes, subRes] = await Promise.all([
        fetch(`/api/lms/assignments/${assignmentId}`),
        fetch(`/api/lms/submissions?assignmentId=${assignmentId}`),
      ]);
      const asmData = await asmRes.json();
      const subData = await subRes.json();
      if (asmData.success) setAssignment(asmData.data);
      if (subData.success) setSubmissions(subData.data);
    } catch {
      message.error('Không thể tải dữ liệu bài tập!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [assignmentId]);

  if (!assignment) {
    return (
      <PageContainer>
        <Card loading />
      </PageContainer>
    );
  }

  const filteredSubmissions = submissions.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        s.studentName.toLowerCase().includes(q) ||
        s.studentCode.toLowerCase().includes(q) ||
        s.studentEmail.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const columns = [
    {
      title: 'STT',
      width: 50,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Sinh viên',
      dataIndex: 'studentName',
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.studentAvatar} icon={<UserOutlined />} />
          <div>
            <Text strong>{record.studentName}</Text>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>
              {record.studentCode}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Trạng thái nộp',
      dataIndex: 'status',
      render: (status: string, record: any) => {
        if (status === 'graded') {
          return (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Đã chấm điểm
            </Tag>
          );
        }
        if (record.isLate) {
          return (
            <Tag color="error" icon={<ClockCircleOutlined />}>
              Nộp muộn
            </Tag>
          );
        }
        return (
          <Tag color="processing" icon={<FileDoneOutlined />}>
            Đã nộp đúng hạn
          </Tag>
        );
      },
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'submittedAt',
      render: (time: string) => (
        <Text style={{ fontSize: 13 }}>
          {new Date(time).toLocaleString('vi-VN')}
        </Text>
      ),
    },
    {
      title: 'Bài làm / Liên kết',
      dataIndex: 'submissionUrl',
      render: (url: string) => (
        <a href={url} target="_blank" rel="noreferrer">
          <Space>
            <LinkOutlined />
            <Text ellipsis style={{ maxWidth: 220, color: '#1890ff' }}>
              {url}
            </Text>
          </Space>
        </a>
      ),
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      render: (score: number | null) =>
        score !== null && score !== undefined ? (
          <Tag color="cyan" style={{ fontSize: 14, fontWeight: 700 }}>
            {score} / 10
          </Tag>
        ) : (
          <Tag color="default">Chưa chấm</Tag>
        ),
    },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Button
          type="primary"
          size="small"
          icon={<EditOutlined />}
          onClick={() => history.push(`/teacher/submissions/${record.id}`)}
        >
          {record.status === 'graded' ? 'Sửa điểm & nhận xét' : 'Chấm bài ngay'}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{assignment.title} - Theo dõi nộp bài</title>
      </Helmet>
      <PageContainer
        header={{
          title: (
            <Space align="center">
              <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                onClick={() =>
                  history.push(`/teacher/classes/${assignment.classId}`)
                }
              />
              <span>{assignment.title}</span>
            </Space>
          ),
          subTitle: `Lớp: ${assignment.className} · Thang điểm ${assignment.maxScore}`,
          extra: [
            <Button
              key="export"
              icon={<DownloadOutlined />}
              onClick={() =>
                message.success('Đã xuất bảng điểm nộp bài ra Excel!')
              }
            >
              Xuất kết quả ra Excel
            </Button>,
          ],
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Chi tiết đề bài & Hướng dẫn">
              <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>
                {assignment.description}
              </Paragraph>
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 10,
                    background: '#fafafa',
                    borderRadius: 6,
                  }}
                >
                  <Text type="secondary">Tài liệu / Đề bài kèm theo:</Text>
                  <div style={{ marginTop: 6 }}>
                    {assignment.attachments.map((f: any) => (
                      <Tag
                        key={f.name}
                        color="blue"
                        style={{ cursor: 'pointer', padding: '4px 8px' }}
                      >
                        📄 {f.name} ({f.size})
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Thông tin hạn nộp & Cấu hình">
              <Descriptions column={1} size="small" bordered>
                <Descriptions.Item label="Hạn chót">
                  <Text strong style={{ color: '#d4380d' }}>
                    {new Date(assignment.dueDate).toLocaleString('vi-VN')}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Chính sách nộp muộn">
                  {assignment.allowLate ? (
                    <Tag color="cyan">Cho phép ({assignment.latePenalty})</Tag>
                  ) : (
                    <Tag color="error">Không nhận bài muộn</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Điểm tối đa">
                  {assignment.maxScore} điểm
                </Descriptions.Item>
                <Descriptions.Item label="Tiến độ nộp">
                  {submissions.length} / {assignment.totalStudents || 48} sinh
                  viên
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>

        <Card
          title="Danh sách bài nộp của sinh viên (C6)"
          style={{ marginTop: 16 }}
          extra={
            <Space wrap>
              <Input
                placeholder="Tìm sinh viên theo tên, MSSV..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                style={{ width: 220 }}
              />
              <Radio.Group
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="all">
                  Tất cả ({submissions.length})
                </Radio.Button>
                <Radio.Button value="submitted">Chờ chấm</Radio.Button>
                <Radio.Button value="graded">Đã chấm</Radio.Button>
                <Radio.Button value="late">Nộp muộn</Radio.Button>
              </Radio.Group>
              <Button icon={<ReloadOutlined />} onClick={loadData}>
                Làm mới
              </Button>
            </Space>
          }
        >
          <Table
            loading={loading}
            dataSource={filteredSubmissions}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </PageContainer>
    </>
  );
};

export default TeacherAssignmentDetailPage;
