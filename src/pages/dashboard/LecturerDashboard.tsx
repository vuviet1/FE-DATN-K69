import {
  ArrowRightOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  TeamOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  List,
  Progress,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

export const LecturerDashboard: React.FC = () => {
  // Dữ liệu mẫu lịch dạy hôm nay
  const todayClasses = [
    {
      id: '1',
      subject: 'Lập trình Web nâng cao (IT4409)',
      room: 'Phòng D9-301',
      time: '07:30 - 09:50 (Ca 1)',
      studentCount: 45,
      status: 'upcoming',
      statusText: 'Sắp diễn ra',
      statusColor: 'processing',
    },
    {
      id: '2',
      subject: 'Cơ sở dữ liệu phân tán (IT3090)',
      room: 'Phòng D3-102',
      time: '12:30 - 15:00 (Ca 2)',
      studentCount: 52,
      status: 'scheduled',
      statusText: 'Buổi chiều',
      statusColor: 'default',
    },
  ];

  // Danh sách thông báo học vụ cần làm
  const reminders = [
    {
      id: '1',
      title: 'Hạn chót nhập điểm giữa kỳ lớp IT4409',
      deadline: 'Còn 3 ngày (Hạn: 27/10/2026)',
      type: 'warning',
      actionText: 'Nhập điểm ngay',
      link: '/grades',
    },
    {
      id: '2',
      title: 'Xác nhận 8 sinh viên có nguy cơ cấm thi do vắng > 20%',
      deadline: 'Học kỳ 1 - Năm học 2025-2026',
      type: 'danger',
      actionText: 'Kiểm tra điểm danh',
      link: '/attendance',
    },
    {
      id: '3',
      title: 'Duyệt đề tài Đồ án tốt nghiệp đợt 1',
      deadline: '5 sinh viên đã nộp đề cương',
      type: 'info',
      actionText: 'Xem danh sách',
      link: '/students',
    },
  ];

  // Tiến độ hoàn thành công việc giảng dạy
  const teachingProgress = [
    { subject: 'Lập trình Web (IT4409)', progress: 68, lesson: '10/15 buổi', gradeDone: true },
    { subject: 'CSDL phân tán (IT3090)', progress: 45, lesson: '7/15 buổi', gradeDone: false },
    { subject: 'Kỹ thuật phần mềm (IT3100)', progress: 80, lesson: '12/15 buổi', gradeDone: true },
    { subject: 'Đồ án chuyên ngành (IT4900)', progress: 30, lesson: 'Giai đoạn 1', gradeDone: false },
  ];

  return (
    <PageContainer
      header={{
        title: 'Bảng Điều Khiển Giảng Viên',
        subTitle: 'Học kỳ 1 - Năm học 2025-2026',
      }}
    >
      {/* Banner Chào Mừng */}
      <Card
        style={{
          marginBottom: 20,
          background: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)',
          borderRadius: 12,
          color: '#fff',
          boxShadow: '0 4px 14px rgba(22, 119, 255, 0.25)',
        }}
        bordered={false}
      >
        <Row align="middle" justify="space-between">
          <Col xs={24} md={16}>
            <Title level={3} style={{ color: '#fff', margin: 0 }}>
              Xin chào, TS. Nguyễn Văn Hùng 👋
            </Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.85)', margin: '8px 0 16px 0', fontSize: 15 }}>
              Chào mừng Thầy đến với cổng thông tin quản lý sinh viên. Hôm nay Thầy có{' '}
              <b>2 ca giảng dạy</b> và <b>1 hạn nộp bảng điểm</b> cần hoàn thành.
            </Paragraph>
            <Space wrap>
              <Button
                type="primary"
                style={{ backgroundColor: '#fff', color: '#1677ff', fontWeight: 600 }}
                icon={<TeamOutlined />}
                onClick={() => history.push('/students')}
              >
                Quản lý Sinh viên
              </Button>
              <Button
                ghost
                style={{ color: '#fff', borderColor: '#fff' }}
                icon={<FormOutlined />}
                onClick={() => history.push('/grades')}
              >
                Nhập điểm học phần
              </Button>
              <Button
                ghost
                style={{ color: '#fff', borderColor: '#fff' }}
                icon={<CheckCircleOutlined />}
                onClick={() => history.push('/attendance')}
              >
                Điểm danh hôm nay
              </Button>
            </Space>
          </Col>
          <Col xs={0} md={8} style={{ textAlign: 'right' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.15)', padding: '16px 24px', borderRadius: 10, display: 'inline-block' }}>
              <Text style={{ color: '#fff', display: 'block', fontSize: 13 }}>Tuần học hiện tại</Text>
              <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 700 }}>
                Tuần 09 / 15
              </Title>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Thống kê nhanh */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: 'Tổng sinh viên phụ trách',
              value: 168,
              icon: (
                <Avatar
                  size={48}
                  style={{ backgroundColor: '#e6f4ff', color: '#1677ff' }}
                  icon={<TeamOutlined style={{ fontSize: 24 }} />}
                />
              ),
              description: <Text type="secondary">Phân bố trên 4 lớp học phần</Text>,
            }}
            chart={
              <Tag color="blue" style={{ marginTop: 8 }}>
                K65 & K66 CNTT
              </Tag>
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: 'Lớp học phần đang dạy',
              value: 4,
              icon: (
                <Avatar
                  size={48}
                  style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                  icon={<BookOutlined style={{ fontSize: 24 }} />}
                />
              ),
              description: <Text type="secondary">12 tín chỉ học phần</Text>,
            }}
            chart={
              <Tag color="green" style={{ marginTop: 8 }}>
                100% đúng tiến độ
              </Tag>
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: 'Ca giảng dạy hôm nay',
              value: 2,
              icon: (
                <Avatar
                  size={48}
                  style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}
                  icon={<CalendarOutlined style={{ fontSize: 24 }} />}
                />
              ),
              description: <Text type="secondary">Ca sáng: D9-301 | Ca chiều: D3-102</Text>,
            }}
            chart={
              <Tag color="orange" style={{ marginTop: 8 }}>
                Sĩ số: 97 SV
              </Tag>
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatisticCard
            statistic={{
              title: 'Sinh viên cần lưu ý',
              value: 8,
              icon: (
                <Avatar
                  size={48}
                  style={{ backgroundColor: '#fff1f0', color: '#ff4d4f' }}
                  icon={<ExclamationCircleOutlined style={{ fontSize: 24 }} />}
                />
              ),
              description: <Text type="danger">Có nguy cơ cấm thi / Điểm thấp</Text>,
            }}
            chart={
              <Tag color="error" style={{ marginTop: 8 }}>
                Vắng &gt; 20%
              </Tag>
            }
          />
        </Col>
      </Row>

      {/* Nội dung chi tiết */}
      <Row gutter={[16, 16]}>
        {/* Lịch dạy hôm nay & Nhắc việc */}
        <Col xs={24} lg={14}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined style={{ color: '#1677ff' }} />
                <span>Lịch Giảng Dạy Hôm Nay</span>
              </Space>
            }
            extra={
              <Button type="link" onClick={() => history.push('/classes')}>
                Xem toàn bộ lịch dạy <ArrowRightOutlined />
              </Button>
            }
            style={{ marginBottom: 16, borderRadius: 8 }}
          >
            <List
              itemLayout="horizontal"
              dataSource={todayClasses}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key="checkin"
                      type="primary"
                      size="small"
                      onClick={() => history.push('/attendance')}
                    >
                      Điểm danh lớp
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={46}
                        style={{ backgroundColor: '#1677ff', fontWeight: 'bold' }}
                      >
                        {item.id === '1' ? 'SÁNG' : 'CHIỀU'}
                      </Avatar>
                    }
                    title={<Text strong style={{ fontSize: 15 }}>{item.subject}</Text>}
                    description={
                      <Space size="middle" style={{ marginTop: 4 }}>
                        <span>
                          <ClockCircleOutlined style={{ marginRight: 4 }} />
                          {item.time}
                        </span>
                        <span>📍 {item.room}</span>
                        <span>👥 {item.studentCount} Sinh viên</span>
                        <Badge status={item.statusColor as any} text={item.statusText} />
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Tiến độ giảng dạy từng lớp */}
          <Card
            title={
              <Space>
                <TrophyOutlined style={{ color: '#52c41a' }} />
                <span>Tiến Độ Giảng Dạy Học Phần</span>
              </Space>
            }
            style={{ borderRadius: 8 }}
          >
            {teachingProgress.map((item) => (
              <div key={item.subject} style={{ marginBottom: 16 }}>
                <Row justify="space-between" align="middle" style={{ marginBottom: 4 }}>
                  <Col>
                    <Text strong>{item.subject}</Text>
                    <Tag color="cyan" style={{ marginLeft: 8 }}>
                      {item.lesson}
                    </Tag>
                  </Col>
                  <Col>
                    {item.gradeDone ? (
                      <Tag color="success">Đã nhập điểm GK</Tag>
                    ) : (
                      <Tag color="warning">Chưa nhập điểm GK</Tag>
                    )}
                  </Col>
                </Row>
                <Progress percent={item.progress} strokeColor="#1677ff" />
              </div>
            ))}
          </Card>
        </Col>

        {/* Thông báo học vụ & Hành động nhanh */}
        <Col xs={24} lg={10}>
          <Card
            title={
              <Space>
                <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />
                <span>Việc Cần Xử Lý & Nhắc Nhở</span>
              </Space>
            }
            style={{ marginBottom: 16, borderRadius: 8 }}
          >
            <List
              dataSource={reminders}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key="action"
                      type="link"
                      size="small"
                      onClick={() => history.push(item.link)}
                    >
                      {item.actionText}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Text
                        strong
                        style={{
                          color:
                            item.type === 'danger'
                              ? '#ff4d4f'
                              : item.type === 'warning'
                              ? '#fa8c16'
                              : '#1677ff',
                        }}
                      >
                        {item.title}
                      </Text>
                    }
                    description={
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        {item.deadline}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Lối tắt chức năng cho Giảng viên */}
          <Card title="Chức Năng Nhanh" style={{ borderRadius: 8 }}>
            <Row gutter={[12, 12]}>
              <Col span={12}>
                <Button
                  block
                  style={{ height: 50 }}
                  icon={<TeamOutlined style={{ color: '#1677ff' }} />}
                  onClick={() => history.push('/students')}
                >
                  Danh sách sinh viên
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  style={{ height: 50 }}
                  icon={<FormOutlined style={{ color: '#52c41a' }} />}
                  onClick={() => history.push('/grades')}
                >
                  Nhập điểm số
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  style={{ height: 50 }}
                  icon={<CheckCircleOutlined style={{ color: '#fa8c16' }} />}
                  onClick={() => history.push('/attendance')}
                >
                  Điểm danh lớp
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  style={{ height: 50 }}
                  icon={<BookOutlined style={{ color: '#722ed1' }} />}
                  onClick={() => history.push('/classes')}
                >
                  Thời khóa biểu
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default LecturerDashboard;
