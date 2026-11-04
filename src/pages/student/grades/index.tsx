import {
  CheckCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  ReadOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  message,
  Row,
  Select,
  Statistic,
  Table,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;

export const StudentGradesPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedClass, setSelectedClass] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, clsRes] = await Promise.all([
          fetch('/api/lms/submissions?studentId=SV2021001'),
          fetch('/api/lms/classes'),
        ]);
        const subData = await subRes.json();
        const clsData = await clsRes.json();
        if (subData.success) setSubmissions(subData.data);
        if (clsData.success) setClasses(clsData.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const gradedList = submissions.filter((s) => s.status === 'graded');
  const avgScore =
    gradedList.length > 0
      ? (
          gradedList.reduce((acc, curr) => acc + (curr.score || 0), 0) /
          gradedList.length
        ).toFixed(1)
      : '0.0';

  const columns = [
    {
      title: 'STT',
      width: 50,
      render: (_: any, __: any, idx: number) => idx + 1,
    },
    {
      title: 'Bài tập học phần',
      dataIndex: 'assignmentTitle',
      render: (title: string, record: any) => (
        <div>
          <Text strong style={{ fontSize: 14 }}>
            {title}
          </Text>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            Mã bài nộp: #{record.id}
          </div>
        </div>
      ),
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'submittedAt',
      render: (t: string) => new Date(t).toLocaleString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) =>
        status === 'graded' ? (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Đã chấm
          </Tag>
        ) : (
          <Tag color="processing">Đang chấm</Tag>
        ),
    },
    {
      title: 'Điểm số',
      dataIndex: 'score',
      render: (score: number | null) =>
        score !== null && score !== undefined ? (
          <Tag color="cyan" style={{ fontSize: 15, fontWeight: 700 }}>
            {score} / 10
          </Tag>
        ) : (
          <Tag color="default">Chưa có</Tag>
        ),
    },
    {
      title: 'Nhận xét của Giảng viên',
      dataIndex: 'feedback',
      render: (feedback: string) =>
        feedback ? (
          <Paragraph
            ellipsis={{ rows: 2 }}
            style={{ margin: 0, fontStyle: 'italic', fontSize: 13 }}
          >
            "{feedback}"
          </Paragraph>
        ) : (
          <Text type="secondary">Chưa có nhận xét</Text>
        ),
    },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => history.push(`/student/submissions/${record.id}`)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bảng điểm cá nhân - Sinh viên</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Bảng điểm cá nhân & Kết quả đánh giá (D9)',
          subTitle:
            'Tổng hợp điểm số các bài tập theo từng lớp học, nhận xét của giảng viên và điểm trung bình tích lũy',
          extra: [
            <Button
              key="export"
              icon={<DownloadOutlined />}
              onClick={() =>
                message.success(
                  'Đã tải xuống bảng điểm cá nhân dạng PDF/Excel!',
                )
              }
            >
              Xuất bảng điểm
            </Button>,
          ],
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: 'center', background: '#f6ffed' }}>
              <Statistic
                title="Điểm trung bình (GPA)"
                value={avgScore}
                suffix="/ 10"
                valueStyle={{ color: '#52c41a', fontSize: 32, fontWeight: 700 }}
                prefix={<TrophyOutlined />}
              />
              <Text type="secondary">Xếp loại: Xuất sắc</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: 'center', background: '#e6f7ff' }}>
              <Statistic
                title="Bài tập đã có điểm"
                value={gradedList.length}
                suffix="bài"
                valueStyle={{ color: '#1890ff', fontSize: 32, fontWeight: 700 }}
                prefix={<CheckCircleOutlined />}
              />
              <Text type="secondary">Đạt 100% tỷ lệ bài chấm</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card style={{ textAlign: 'center', background: '#fffbe6' }}>
              <Statistic
                title="Số tín chỉ học phần"
                value={10}
                suffix="TC"
                valueStyle={{ color: '#faad14', fontSize: 32, fontWeight: 700 }}
                prefix={<ReadOutlined />}
              />
              <Text type="secondary">Học kỳ 1 - 2026-2027</Text>
            </Card>
          </Col>
        </Row>

        <Card
          title="Bảng điểm chi tiết các bài tập đã nộp"
          style={{ marginTop: 16 }}
          extra={
            <Select
              style={{ width: 250 }}
              value={selectedClass}
              onChange={setSelectedClass}
              options={[
                { label: 'Tất cả các lớp học phần', value: 'all' },
                ...classes.map((c) => ({ label: c.name, value: c.id })),
              ]}
            />
          }
        >
          <Table
            loading={loading}
            dataSource={submissions}
            rowKey="id"
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </PageContainer>
    </>
  );
};

export default StudentGradesPage;
