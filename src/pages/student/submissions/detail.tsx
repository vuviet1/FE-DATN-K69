import {
  ArrowLeftOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LinkOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history, useParams } from '@umijs/max';
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export const StudentSubmissionDetailPage: React.FC = () => {
  const params = useParams<{ submissionId: string }>();
  const submissionId = params.submissionId || 'sub-1';

  const [submission, setSubmission] = useState<any>(null);
  const [_loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSub = async () => {
      try {
        const res = await fetch(`/api/lms/submissions/${submissionId}`);
        const data = await res.json();
        if (data.success) {
          setSubmission(data.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSub();
  }, [submissionId]);

  if (!submission) {
    return (
      <PageContainer>
        <Card loading />
      </PageContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>Kết quả bài nộp - LMS</title>
      </Helmet>
      <PageContainer
        header={{
          title: (
            <Space align="center">
              <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                onClick={() => history.push('/student/assignments')}
              />
              <span>Kết quả bài nộp: {submission.assignmentTitle} (D8)</span>
            </Space>
          ),
          subTitle: `Mã bài nộp: #${submission.id} · Sinh viên: ${submission.studentName}`,
          extra: [
            submission.status === 'graded' ? (
              <Tag
                color="success"
                icon={<TrophyOutlined />}
                style={{ fontSize: 14 }}
                key="score"
              >
                Điểm số: {submission.score} / 10
              </Tag>
            ) : (
              <Tag
                color="processing"
                icon={<ClockCircleOutlined />}
                key="status"
              >
                Đang chờ giảng viên chấm điểm
              </Tag>
            ),
          ],
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={15}>
            {/* Đánh giá và Lời phê */}
            {submission.status === 'graded' ? (
              <Card
                title={
                  <Space>
                    <TrophyOutlined style={{ color: '#faad14' }} />
                    <span>Đánh giá & Lời phê của Giảng viên</span>
                  </Space>
                }
                style={{
                  marginBottom: 16,
                  borderColor: '#b7eb8f',
                  background: '#f6ffed',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text strong style={{ fontSize: 16 }}>
                    Điểm số chính thức:
                  </Text>
                  <Title level={1} style={{ color: '#52c41a', margin: 0 }}>
                    {submission.score}{' '}
                    <span style={{ fontSize: 16, color: '#8c8c8c' }}>/ 10</span>
                  </Title>
                </div>
                <Divider style={{ margin: '12px 0' }} />
                <Text strong>Nhận xét chi tiết:</Text>
                <Paragraph
                  style={{
                    marginTop: 8,
                    fontSize: 14,
                    lineHeight: 1.8,
                    padding: 12,
                    background: '#fff',
                    borderRadius: 8,
                  }}
                >
                  "{submission.feedback}"
                </Paragraph>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Người chấm: <b>{submission.gradedBy}</b> · Thời điểm chấm:{' '}
                  {new Date(submission.gradedAt).toLocaleString('vi-VN')}
                </Text>
              </Card>
            ) : (
              <Alert
                message="Bài nộp đang chờ được giảng viên đánh giá"
                description="Bạn đã nộp bài thành công. Sau khi giảng viên hoàn tất chấm điểm, kết quả và lời phê chi tiết sẽ xuất hiện tại đây."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            {/* Chi tiết nội dung bài làm */}
            <Card title="Nội dung bài làm đã gửi">
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Thời điểm nộp">
                  {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái hạn nộp">
                  {submission.isLate ? (
                    <Tag color="error">Nộp muộn</Tag>
                  ) : (
                    <Tag color="green">Đúng hạn</Tag>
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Liên kết bài nộp" span={2}>
                  <a
                    href={submission.submissionUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Space>
                      <LinkOutlined />
                      <Text strong style={{ color: '#1890ff' }}>
                        {submission.submissionUrl}
                      </Text>
                    </Space>
                  </a>
                </Descriptions.Item>
                {submission.note && (
                  <Descriptions.Item label="Ghi chú kèm theo" span={2}>
                    {submission.note}
                  </Descriptions.Item>
                )}
              </Descriptions>

              {submission.attachments && submission.attachments.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <Text strong>Tệp tài liệu đính kèm:</Text>
                  <div style={{ marginTop: 8 }}>
                    {submission.attachments.map((f: any) => (
                      <Card
                        key={f.name}
                        size="small"
                        style={{ marginBottom: 6 }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Space>
                            <span style={{ fontSize: 18 }}>📦</span>
                            <div>
                              <Text strong>{f.name}</Text>
                              <div style={{ fontSize: 11, color: '#8c8c8c' }}>
                                {f.size}
                              </div>
                            </div>
                          </Space>
                          <Button size="small" icon={<DownloadOutlined />}>
                            Tải về
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </Col>

          {/* Cột phải: Lịch sử nộp bài (D8) */}
          <Col xs={24} lg={9}>
            <Card
              title={
                <Space>
                  <HistoryOutlined />
                  <span>Lịch sử các lần nộp bài (D8)</span>
                </Space>
              }
            >
              {submission.history && submission.history.length > 0 ? (
                <Timeline
                  items={submission.history.map((h: any) => ({
                    color:
                      h.version === submission.history.length
                        ? 'green'
                        : 'blue',
                    children: (
                      <div>
                        <Space>
                          <Text strong>Phiên bản #{h.version}</Text>
                          {h.version === submission.history.length && (
                            <Tag color="cyan">Hiện hành</Tag>
                          )}
                        </Space>
                        <div
                          style={{
                            fontSize: 12,
                            color: '#8c8c8c',
                            marginTop: 2,
                          }}
                        >
                          {new Date(h.submittedAt).toLocaleString('vi-VN')}
                        </div>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          Link:{' '}
                          <a href={h.url} target="_blank" rel="noreferrer">
                            {h.url}
                          </a>
                        </div>
                        {h.note && (
                          <div
                            style={{
                              fontSize: 12,
                              color: '#595959',
                              marginTop: 2,
                            }}
                          >
                            "{h.note}"
                          </div>
                        )}
                      </div>
                    ),
                  }))}
                />
              ) : (
                <Text type="secondary">Chưa có lịch sử nộp lại.</Text>
              )}
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default StudentSubmissionDetailPage;
