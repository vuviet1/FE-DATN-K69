import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LinkOutlined,
  SaveOutlined,
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
  Descriptions,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

export const TeacherGradeSubmissionPage: React.FC = () => {
  const params = useParams<{ submissionId: string }>();
  const submissionId = params.submissionId || 'sub-1';

  const [submission, setSubmission] = useState<any>(null);
  const [_loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSub = async () => {
      try {
        const res = await fetch(`/api/lms/submissions/${submissionId}`);
        const data = await res.json();
        if (data.success) {
          setSubmission(data.data);
          form.setFieldsValue({
            score: data.data.score,
            feedback: data.data.feedback,
          });
        }
      } catch {
        message.error('Không thể tải bài nộp!');
      } finally {
        setLoading(false);
      }
    };
    fetchSub();
  }, [submissionId, form]);

  const handleSaveGrade = async (values: any) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/lms/submissions/${submissionId}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        setSubmission(data.data);
        message.success('Đã lưu điểm và nhận xét thành công!');
      }
    } catch {
      message.error('Không thể lưu kết quả chấm!');
    } finally {
      setSubmitting(false);
    }
  };

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
        <title>Chấm điểm & Đánh giá bài nộp - LMS</title>
      </Helmet>
      <PageContainer
        header={{
          title: (
            <Space align="center">
              <Button
                icon={<ArrowLeftOutlined />}
                type="text"
                onClick={() =>
                  history.push(
                    `/teacher/assignments/${submission.assignmentId}`,
                  )
                }
              />
              <span>
                Chấm bài: {submission.studentName} ({submission.studentCode})
              </span>
            </Space>
          ),
          subTitle: submission.assignmentTitle,
          extra: [
            submission.status === 'graded' ? (
              <Tag color="success" icon={<CheckCircleOutlined />} key="status">
                Đã có điểm: {submission.score}/10
              </Tag>
            ) : (
              <Tag color="warning" icon={<ClockCircleOutlined />} key="status">
                Chờ chấm điểm
              </Tag>
            ),
          ],
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Cột trái: Nội dung bài nộp của sinh viên */}
          <Col xs={24} lg={15}>
            <Card title="Nội dung bài làm của sinh viên">
              <Descriptions column={2} bordered size="small">
                <Descriptions.Item label="Họ và tên">
                  <Space>
                    <Avatar
                      src={submission.studentAvatar}
                      icon={<UserOutlined />}
                    />
                    <Text strong>{submission.studentName}</Text>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Mã sinh viên">
                  {submission.studentCode}
                </Descriptions.Item>
                <Descriptions.Item label="Thời điểm nộp">
                  {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                </Descriptions.Item>
                <Descriptions.Item label="Tình trạng">
                  {submission.isLate ? (
                    <Tag color="error">Nộp muộn</Tag>
                  ) : (
                    <Tag color="green">Đúng hạn</Tag>
                  )}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <div>
                <Text strong>1. Liên kết bài làm (URL nộp bài):</Text>
                <div
                  style={{
                    marginTop: 8,
                    padding: 12,
                    background: '#f5f5f5',
                    borderRadius: 8,
                  }}
                >
                  <a
                    href={submission.submissionUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Space>
                      <LinkOutlined style={{ fontSize: 16 }} />
                      <Text strong style={{ color: '#1890ff', fontSize: 14 }}>
                        {submission.submissionUrl}
                      </Text>
                    </Space>
                  </a>
                </div>
              </div>

              {submission.attachments && submission.attachments.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <Text strong>2. Tệp đính kèm bài làm:</Text>
                  <div style={{ marginTop: 8 }}>
                    {submission.attachments.map((f: any) => (
                      <Card
                        key={f.name}
                        size="small"
                        style={{ marginBottom: 8, background: '#fafafa' }}
                        actions={[
                          <Button
                            key="dl"
                            type="link"
                            size="small"
                            icon={<DownloadOutlined />}
                          >
                            Tải xuống tệp
                          </Button>,
                        ]}
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
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {submission.note && (
                <div style={{ marginTop: 20 }}>
                  <Text strong>3. Ghi chú của sinh viên gửi giảng viên:</Text>
                  <Paragraph
                    style={{
                      marginTop: 8,
                      padding: 12,
                      background: '#fffbe6',
                      borderRadius: 8,
                      borderLeft: '4px solid #ffe58f',
                    }}
                  >
                    "{submission.note}"
                  </Paragraph>
                </div>
              )}

              {submission.history && submission.history.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <Divider titlePlacement="start">
                    <Space>
                      <HistoryOutlined />
                      <span>Lịch sử các lần nộp lại (Revision History)</span>
                    </Space>
                  </Divider>
                  <Timeline
                    items={submission.history.map((h: any) => ({
                      children: (
                        <div>
                          <Text strong>Phiên bản #{h.version}</Text> -{' '}
                          <Text type="secondary">
                            {new Date(h.submittedAt).toLocaleString('vi-VN')}
                          </Text>
                          <div
                            style={{
                              fontSize: 12,
                              color: '#595959',
                              marginTop: 4,
                            }}
                          >
                            Link:{' '}
                            <a href={h.url} target="_blank" rel="noreferrer">
                              {h.url}
                            </a>
                          </div>
                          {h.note && (
                            <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                              Ghi chú: {h.note}
                            </div>
                          )}
                        </div>
                      ),
                    }))}
                  />
                </div>
              )}
            </Card>
          </Col>

          {/* Cột phải: Form nhập điểm & nhận xét (C7) */}
          <Col xs={24} lg={9}>
            <Card
              title="Đánh giá & Chấm điểm (C7)"
              style={{ position: 'sticky', top: 80 }}
            >
              <Form form={form} layout="vertical" onFinish={handleSaveGrade}>
                <Form.Item
                  name="score"
                  label={
                    <Space>
                      <Text strong style={{ fontSize: 15 }}>
                        Điểm số (Thang điểm 0 - 10)
                      </Text>
                      <Tag color="blue">Bắt buộc</Tag>
                    </Space>
                  }
                  rules={[
                    { required: true, message: 'Vui lòng nhập điểm!' },
                    {
                      validator: (_, value) => {
                        if (value < 0 || value > 10) {
                          return Promise.reject(
                            new Error(
                              'Điểm phải nằm trong khoảng từ 0 đến 10!',
                            ),
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={10}
                    step={0.1}
                    size="large"
                    style={{ width: '100%', fontSize: 20, fontWeight: 700 }}
                    placeholder="Ví dụ: 9.5"
                  />
                </Form.Item>

                <Form.Item
                  name="feedback"
                  label={
                    <Space>
                      <Text strong style={{ fontSize: 15 }}>
                        Nhận xét & Lời phê của Giảng viên
                      </Text>
                      <Tag color="cyan">Hỗ trợ Markdown</Tag>
                    </Space>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập nhận xét cho sinh viên!',
                    },
                  ]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Nhận xét ưu điểm, những điểm cần cải thiện, chất lượng code, giao diện..."
                  />
                </Form.Item>

                <Alert
                  type="info"
                  showIcon
                  message="Lưu ý về quyền riêng tư"
                  description="Sinh viên chỉ có thể xem điểm và nhận xét của chính mình sau khi giảng viên bấm lưu kết quả."
                  style={{ marginBottom: 16 }}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<SaveOutlined />}
                  loading={submitting}
                  onClick={() => form.submit()}
                >
                  Lưu điểm & Công bố kết quả
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default TeacherGradeSubmissionPage;
