import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  HistoryOutlined,
  LinkOutlined,
  SendOutlined,
  TrophyOutlined,
  UploadOutlined,
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
  Form,
  Input,
  message,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

export const StudentAssignmentSubmitPage: React.FC = () => {
  const params = useParams<{ assignmentId: string }>();
  const assignmentId = params.assignmentId || 'asm-1';

  const [assignment, setAssignment] = useState<any>(null);
  const [submission, setSubmission] = useState<any>(null);
  const [_loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm();

  const loadData = async () => {
    setLoading(true);
    try {
      const [asmRes, subRes] = await Promise.all([
        fetch(`/api/lms/assignments/${assignmentId}`),
        fetch(
          `/api/lms/submissions?assignmentId=${assignmentId}&studentId=SV2021001`,
        ),
      ]);
      const asmData = await asmRes.json();
      const subData = await subRes.json();
      if (asmData.success) setAssignment(asmData.data);
      if (subData.success && subData.data.length > 0) {
        setSubmission(subData.data[0]);
        form.setFieldsValue({
          submissionUrl: subData.data[0].submissionUrl,
          note: subData.data[0].note,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [assignmentId]);

  const handleSubmitWork = async (values: any) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/lms/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId,
          submissionUrl: values.submissionUrl,
          note: values.note,
          studentId: 'SV2021001',
          attachments: [
            { name: 'Bao_cao_Tien_do_Do_An.pdf', size: '2.5 MB', url: '#' },
          ],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmission(data.data);
        message.success(data.message || 'Nộp bài tập thành công!');
      }
    } catch {
      message.error('Lỗi khi nộp bài!');
    } finally {
      setSubmitting(false);
    }
  };

  if (!assignment) {
    return (
      <PageContainer>
        <Card loading />
      </PageContainer>
    );
  }

  const isOverdue = dayjs(assignment.dueDate).isBefore(dayjs());

  return (
    <>
      <Helmet>
        <title>{assignment.title} - Nộp bài tập</title>
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
              <span>{assignment.title}</span>
            </Space>
          ),
          subTitle: `Lớp: ${assignment.className} · Thang điểm ${assignment.maxScore}`,
          extra: [
            submission ? (
              submission.status === 'graded' ? (
                <Tag color="success" icon={<TrophyOutlined />} key="status">
                  Đã có điểm: {submission.score}/10
                </Tag>
              ) : (
                <Tag
                  color="processing"
                  icon={<CheckCircleOutlined />}
                  key="status"
                >
                  Đã nộp bài (Chờ chấm)
                </Tag>
              )
            ) : isOverdue ? (
              <Tag color="error" key="status">
                Quá hạn nộp bài
              </Tag>
            ) : (
              <Tag color="warning" key="status">
                Chưa nộp bài
              </Tag>
            ),
          ],
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Cột trái: Đề bài & Hướng dẫn */}
          <Col xs={24} lg={14}>
            <Card title="Yêu cầu đề bài & Tài liệu đính kèm">
              <Paragraph style={{ fontSize: 15, lineHeight: 1.8 }}>
                {assignment.description}
              </Paragraph>

              {assignment.attachments && assignment.attachments.length > 0 && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    background: '#fafafa',
                    borderRadius: 8,
                  }}
                >
                  <Text type="secondary">
                    Tài liệu tham khảo & Đề cương đính kèm:
                  </Text>
                  <div style={{ marginTop: 8 }}>
                    {assignment.attachments.map((f: any) => (
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
                            <span style={{ fontSize: 20 }}>📄</span>
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

              <Divider />

              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Hạn chót">
                  <Text
                    strong
                    style={{ color: isOverdue ? '#ff4d4f' : '#fa8c16' }}
                  >
                    {new Date(assignment.dueDate).toLocaleString('vi-VN')}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Điểm tối đa">
                  {assignment.maxScore} điểm
                </Descriptions.Item>
                <Descriptions.Item label="Chính sách nộp muộn" span={2}>
                  {assignment.allowLate ? (
                    <Tag color="cyan">
                      Cho phép nộp muộn ({assignment.latePenalty})
                    </Tag>
                  ) : (
                    <Tag color="error">Không chấp nhận bài nộp quá hạn</Tag>
                  )}
                </Descriptions.Item>
              </Descriptions>

              {/* Nếu đã được chấm điểm, hiển thị kết quả ngay */}
              {submission?.status === 'graded' && (
                <div style={{ marginTop: 20 }}>
                  <Alert
                    type="success"
                    showIcon
                    icon={<TrophyOutlined style={{ fontSize: 24 }} />}
                    message={
                      <span style={{ fontSize: 16, fontWeight: 700 }}>
                        Kết quả đánh giá: {submission.score} /{' '}
                        {assignment.maxScore} điểm
                      </span>
                    }
                    description={
                      <div style={{ marginTop: 6 }}>
                        <Text strong>Nhận xét của Giảng viên:</Text>
                        <Paragraph
                          style={{
                            marginTop: 4,
                            fontStyle: 'italic',
                            fontSize: 14,
                          }}
                        >
                          "{submission.feedback}"
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Chấm bởi: {submission.gradedBy} ·{' '}
                          {new Date(submission.gradedAt).toLocaleString(
                            'vi-VN',
                          )}
                        </Text>
                      </div>
                    }
                  />
                </div>
              )}
            </Card>
          </Col>

          {/* Cột phải: Form nộp bài (D7) */}
          <Col xs={24} lg={10}>
            <Card
              title={
                submission
                  ? 'Cập nhật / Nộp lại bài tập (D7)'
                  : 'Nộp bài tập của bạn (D7)'
              }
            >
              {submission && (
                <Alert
                  type="info"
                  showIcon
                  message={`Bạn đã nộp bài vào lúc ${new Date(submission.submittedAt).toLocaleString('vi-VN')}`}
                  description="Bạn có thể nộp lại bài làm trước khi hết hạn. Giảng viên sẽ chấm điểm theo phiên bản nộp mới nhất."
                  style={{ marginBottom: 16 }}
                />
              )}

              <Form form={form} layout="vertical" onFinish={handleSubmitWork}>
                <Form.Item
                  name="submissionUrl"
                  label={
                    <Space>
                      <Text strong>Đường dẫn bài làm (URL liên kết)</Text>
                      <Tag color="blue">Bắt buộc</Tag>
                    </Space>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập đường dẫn bài làm!',
                    },
                    {
                      type: 'url',
                      message:
                        'Vui lòng nhập một URL hợp lệ (http:// hoặc https://)!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LinkOutlined />}
                    placeholder="https://github.com/username/repository hoặc Google Drive"
                    size="large"
                  />
                </Form.Item>

                <Form.Item label="Tệp tài liệu bổ sung (PDF, DOCX, ZIP tối đa 25MB)">
                  <Upload maxCount={1} beforeUpload={() => false}>
                    <Button icon={<UploadOutlined />}>Chọn tệp đính kèm</Button>
                  </Upload>
                </Form.Item>

                <Form.Item name="note" label="Ghi chú gửi giảng viên">
                  <TextArea
                    rows={3}
                    placeholder="Ghi chú về tài khoản demo, hướng dẫn cài đặt hoặc thông tin cần lưu ý..."
                  />
                </Form.Item>

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<SendOutlined />}
                  loading={submitting}
                  onClick={() => form.submit()}
                >
                  {submission ? 'Xác nhận Nộp lại bài' : 'Gửi bài nộp'}
                </Button>
              </Form>

              {/* Lịch sử nộp lại (D7) */}
              {submission?.history && submission.history.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <Divider titlePlacement="start">
                    <Space>
                      <HistoryOutlined />
                      <span>Lịch sử các lần nộp (D7)</span>
                    </Space>
                  </Divider>
                  <Timeline
                    items={submission.history.map((h: any) => ({
                      children: (
                        <div>
                          <Text strong>Lần nộp #{h.version}</Text> -{' '}
                          <Text type="secondary">
                            {new Date(h.submittedAt).toLocaleString('vi-VN')}
                          </Text>
                          <div style={{ fontSize: 12 }}>
                            Link:{' '}
                            <a href={h.url} target="_blank" rel="noreferrer">
                              {h.url}
                            </a>
                          </div>
                        </div>
                      ),
                    }))}
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default StudentAssignmentSubmitPage;
