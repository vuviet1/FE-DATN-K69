import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Input,
  List,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export const StudentAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [asmRes, subRes] = await Promise.all([
        fetch('/api/lms/assignments'),
        fetch('/api/lms/submissions?studentId=SV2021001'),
      ]);
      const asmData = await asmRes.json();
      const subData = await subRes.json();
      if (asmData.success) setAssignments(asmData.data);
      if (subData.success) setSubmissions(subData.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSubmissionFor = (asmId: string) => {
    return submissions.find((s) => s.assignmentId === asmId);
  };

  const filtered = assignments.filter((asm) => {
    const sub = getSubmissionFor(asm.id);
    const isSubmitted = !!sub;
    const isGraded = sub?.status === 'graded';
    const isOverdue = dayjs(asm.dueDate).isBefore(dayjs()) && !isSubmitted;

    if (statusFilter === 'pending' && isSubmitted) return false;
    if (statusFilter === 'submitted' && (!isSubmitted || isGraded))
      return false;
    if (statusFilter === 'graded' && !isGraded) return false;
    if (statusFilter === 'overdue' && !isOverdue) return false;

    if (classFilter !== 'all' && asm.classId !== classFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !asm.title.toLowerCase().includes(q) &&
        !asm.className.toLowerCase().includes(q)
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Nhiệm vụ & Bài tập - Sinh viên</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Danh sách Bài tập & Hạn nộp (D5)',
          subTitle:
            'Tập hợp bài tập từ tất cả các lớp học phần bạn đang tham gia, theo dõi hạn chót và trạng thái bài làm',
        }}
      >
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Input
                placeholder="Tìm bài tập theo tiêu đề, lớp học..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={12} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={classFilter}
                onChange={setClassFilter}
                options={[
                  { label: 'Tất cả các lớp', value: 'all' },
                  { label: 'Kỹ thuật Lập trình Web', value: 'cls-1' },
                  { label: 'Công nghệ Phần mềm', value: 'cls-2' },
                ]}
              />
            </Col>
            <Col xs={24} sm={10} style={{ textAlign: 'right' }}>
              <Radio.Group
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="all">
                  Tất cả ({assignments.length})
                </Radio.Button>
                <Radio.Button value="pending">Chưa nộp</Radio.Button>
                <Radio.Button value="submitted">Đã nộp</Radio.Button>
                <Radio.Button value="graded">Đã chấm</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </Card>

        <List
          loading={loading}
          dataSource={filtered}
          renderItem={(item) => {
            const sub = getSubmissionFor(item.id);
            const isSubmitted = !!sub;
            const isGraded = sub?.status === 'graded';
            const isOverdue =
              dayjs(item.dueDate).isBefore(dayjs()) && !isSubmitted;

            return (
              <Card
                key={item.id}
                style={{ marginBottom: 16 }}
                hoverable
                actions={[
                  isSubmitted ? (
                    <Button
                      key="result"
                      type="link"
                      onClick={() =>
                        history.push(`/student/submissions/${sub.id}`)
                      }
                    >
                      {isGraded
                        ? 'Xem bảng điểm & Lời phê'
                        : 'Xem lại bài đã nộp'}{' '}
                      ({isGraded ? `${sub.score}/10` : 'Chờ chấm'})
                    </Button>
                  ) : (
                    <Button
                      key="submit"
                      type="primary"
                      onClick={() =>
                        history.push(`/student/assignments/${item.id}`)
                      }
                    >
                      Nộp bài tập ngay <RightOutlined />
                    </Button>
                  ),
                ]}
              >
                <Row gutter={16} align="middle">
                  <Col xs={24} md={18}>
                    <Space direction="vertical" size={4}>
                      <Space wrap>
                        <Tag color="blue">{item.className}</Tag>
                        <Tag color={isOverdue ? 'red' : 'orange'}>
                          <ClockCircleOutlined /> Hạn nộp:{' '}
                          {new Date(item.dueDate).toLocaleString('vi-VN')}
                        </Tag>
                        <Tag color="purple">Thang điểm: {item.maxScore}</Tag>
                        {isGraded ? (
                          <Tag color="cyan" icon={<CheckCircleOutlined />}>
                            Đã có điểm: <b>{sub.score}/10</b>
                          </Tag>
                        ) : isSubmitted ? (
                          <Tag color="success" icon={<CheckCircleOutlined />}>
                            Đã nộp bài
                          </Tag>
                        ) : isOverdue ? (
                          <Tag
                            color="error"
                            icon={<ExclamationCircleOutlined />}
                          >
                            Quá hạn nộp
                          </Tag>
                        ) : (
                          <Tag color="warning">Chưa nộp bài</Tag>
                        )}
                      </Space>
                      <Title level={4} style={{ margin: '8px 0 4px 0' }}>
                        {item.title}
                      </Title>
                      <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                        {item.description}
                      </Paragraph>
                    </Space>
                  </Col>
                  <Col xs={24} md={6} style={{ textAlign: 'right' }}>
                    {isGraded ? (
                      <div
                        style={{
                          textAlign: 'center',
                          background: '#f6ffed',
                          padding: 12,
                          borderRadius: 8,
                        }}
                      >
                        <Text type="secondary">Kết quả đánh giá</Text>
                        <Title
                          level={2}
                          style={{ color: '#52c41a', margin: 0 }}
                        >
                          {sub.score}
                        </Title>
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: 'center',
                          background: '#fafafa',
                          padding: 12,
                          borderRadius: 8,
                        }}
                      >
                        <Text type="secondary">Thời hạn còn lại</Text>
                        <div
                          style={{
                            color: isOverdue ? '#ff4d4f' : '#fa8c16',
                            fontWeight: 700,
                            marginTop: 4,
                          }}
                        >
                          {isOverdue
                            ? 'Đã quá hạn'
                            : `${dayjs(item.dueDate).diff(dayjs(), 'day')} ngày`}
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>
              </Card>
            );
          }}
        />
      </PageContainer>
    </>
  );
};

export default StudentAssignmentsPage;
