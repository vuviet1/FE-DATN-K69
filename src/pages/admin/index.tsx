/**
 * @file index.tsx
 * @description Trung tâm Quản trị Hệ thống (Admin Hub) theo chuẩn Mes-Client-ES Becoxy
 */

import {
  BellOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  KeyOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { PageContainer, StatisticCard } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history } from '@umijs/max';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  List,
  Row,
  Space,
  Switch,
  Tag,
  Typography,
} from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export const AdminOverviewPage: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  // Nhật ký hoạt động quản trị gần nhất
  const auditLogs = [
    {
      id: '1',
      action: 'Cập nhật phân quyền',
      detail:
        'Quản trị viên đã cập nhật ma trận quyền cho vai trò "Quản lý đào tạo"',
      time: '10 phút trước',
      user: 'admin',
      type: 'warning',
    },
    {
      id: '2',
      action: 'Phát hành thông báo',
      detail:
        'Đã gửi thông báo "[Học kỳ 1] Thông báo lịch thi kết thúc học phần" tới toàn trường',
      time: '45 phút trước',
      user: 'admin',
      type: 'info',
    },
    {
      id: '3',
      action: 'Tạo tài khoản mới',
      detail: 'Thêm tài khoản giảng viên mới: TS. Nguyễn Văn Hùng (@hung.nv)',
      time: '2 giờ trước',
      user: 'admin',
      type: 'success',
    },
    {
      id: '4',
      action: 'Đặt lại mật khẩu',
      detail:
        'Khôi phục mật khẩu mặc định cho sinh viên Đỗ Đức Thắng (@2021006)',
      time: 'Hôm qua lúc 16:30',
      user: 'admin',
      type: 'default',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Trung tâm Quản trị Hệ thống</title>
      </Helmet>

      <PageContainer
        header={{
          title: 'Trung tâm Quản trị Hệ thống',
          subTitle:
            'Cổng điều hành tài khoản, vai trò phân quyền và cấu hình thông báo toàn trường',
        }}
      >
        {/* Banner Tổng quan Quản trị */}
        <Card
          style={{
            marginBottom: 20,
            background: 'linear-gradient(135deg, #1f1f1f 0%, #141414 100%)',
            borderRadius: 12,
            color: '#fff',
            border: '1px solid #303030',
          }}
          bordered={false}
        >
          <Row align="middle" justify="space-between">
            <Col xs={24} md={16}>
              <Space align="center" style={{ marginBottom: 8 }}>
                <SafetyCertificateOutlined
                  style={{ fontSize: 28, color: '#52c41a' }}
                />
                <Title level={3} style={{ color: '#fff', margin: 0 }}>
                  Bảng Điều Hành Quản Trị Hệ Thống (Admin Portal)
                </Title>
              </Space>
              <Paragraph
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  margin: '8px 0 16px 0',
                  fontSize: 14,
                }}
              >
                Hệ thống quản lý phân quyền đa cấp bậc (RBAC), kiểm soát tài
                khoản người dùng, giám sát an toàn thông tin và cấu hình các
                chính sách học vụ toàn diện.
              </Paragraph>
              <Space wrap>
                <Button
                  type="primary"
                  icon={<UserSwitchOutlined />}
                  onClick={() => history.push('/admin/users')}
                >
                  Quản lý Tài khoản
                </Button>
                <Button
                  style={{
                    backgroundColor: '#262626',
                    borderColor: '#434343',
                    color: '#fff',
                  }}
                  icon={<KeyOutlined />}
                  onClick={() => history.push('/admin/roles')}
                >
                  Ma trận Phân quyền
                </Button>
                <Button
                  style={{
                    backgroundColor: '#262626',
                    borderColor: '#434343',
                    color: '#fff',
                  }}
                  icon={<BellOutlined />}
                  onClick={() => history.push('/admin/notifications')}
                >
                  Cấu hình Thông báo
                </Button>
              </Space>
            </Col>
            <Col xs={0} md={8} style={{ textAlign: 'right' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '16px 24px',
                  borderRadius: 10,
                  display: 'inline-block',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <Text
                  style={{ color: '#8c8c8c', display: 'block', fontSize: 12 }}
                >
                  Trạng thái máy chủ
                </Text>
                <div style={{ marginTop: 4 }}>
                  <Badge
                    status="processing"
                    color="#52c41a"
                    text={
                      <span style={{ color: '#fff', fontWeight: 600 }}>
                        ONLINE (99.98%)
                      </span>
                    }
                  />
                </div>
                <Text
                  style={{
                    color: '#8c8c8c',
                    display: 'block',
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  Thời gian phản hồi: <strong>16ms</strong>
                </Text>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 4 Thẻ thống kê tổng quan */}
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={24} sm={12} lg={6}>
            <StatisticCard
              statistic={{
                title: 'Tổng số tài khoản',
                value: 384,
                icon: (
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#e6f4ff', color: '#1677ff' }}
                    icon={<TeamOutlined style={{ fontSize: 24 }} />}
                  />
                ),
                description: (
                  <Text type="secondary">2 Admin • 28 GV • 350 SV • 4 QL</Text>
                ),
              }}
              chart={
                <Tag color="blue" style={{ marginTop: 8 }}>
                  382 Hoạt động / 2 Đã khóa
                </Tag>
              }
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatisticCard
              statistic={{
                title: 'Nhóm vai trò (Roles)',
                value: 4,
                icon: (
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                    icon={<KeyOutlined style={{ fontSize: 24 }} />}
                  />
                ),
                description: (
                  <Text type="secondary">Đã gán 32 quyền hạn chi tiết</Text>
                ),
              }}
              chart={
                <Tag color="green" style={{ marginTop: 8 }}>
                  Mô hình RBAC chuẩn
                </Tag>
              }
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatisticCard
              statistic={{
                title: 'Thông báo hệ thống',
                value: 4,
                icon: (
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}
                    icon={<BellOutlined style={{ fontSize: 24 }} />}
                  />
                ),
                description: (
                  <Text type="secondary">3 đã phát hành • 1 bản nháp</Text>
                ),
              }}
              chart={
                <Tag color="orange" style={{ marginTop: 8 }}>
                  Tỷ lệ đã đọc: 82.4%
                </Tag>
              }
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatisticCard
              statistic={{
                title: 'An toàn bảo mật',
                value: '100%',
                icon: (
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#f9f0ff', color: '#722ed1' }}
                    icon={<CheckCircleOutlined style={{ fontSize: 24 }} />}
                  />
                ),
                description: (
                  <Text type="secondary">Mã hóa token • Phân quyền CASL</Text>
                ),
              }}
              chart={
                <Tag color="purple" style={{ marginTop: 8 }}>
                  0 lỗ hổng cảnh báo
                </Tag>
              }
            />
          </Col>
        </Row>

        {/* 3 Khối chức năng quản trị chính */}
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col xs={24} md={8}>
            <Card
              hoverable
              title={
                <Space>
                  <UserSwitchOutlined style={{ color: '#1677ff' }} />
                  <span>Quản lý Tài khoản & Người dùng</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/admin/users')}
                >
                  Truy cập <RightOutlined />
                </Button>
              }
              style={{ height: '100%' }}
            >
              <Paragraph style={{ color: '#595959' }}>
                Cấp tài khoản mới, phân vai trò người dùng (Admin, Giảng viên,
                Sinh viên, Quản lý), khóa/mở khóa tài khoản và đặt lại mật khẩu
                an toàn.
              </Paragraph>
              <div style={{ marginTop: 12 }}>
                <Button
                  block
                  type="dashed"
                  onClick={() => history.push('/admin/users')}
                >
                  Mở danh sách tài khoản
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              title={
                <Space>
                  <KeyOutlined style={{ color: '#52c41a' }} />
                  <span>Vai trò & Ma trận Phân quyền</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/admin/roles')}
                >
                  Truy cập <RightOutlined />
                </Button>
              }
              style={{ height: '100%' }}
            >
              <Paragraph style={{ color: '#595959' }}>
                Thiết lập ma trận phân quyền chi tiết cho từng vai trò trên 6
                phân hệ: Sinh viên, Lớp học, Điểm số, Điểm danh, Thông báo và
                Quản trị hệ thống.
              </Paragraph>
              <div style={{ marginTop: 12 }}>
                <Button
                  block
                  type="dashed"
                  onClick={() => history.push('/admin/roles')}
                >
                  Cấu hình ma trận quyền
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              title={
                <Space>
                  <BellOutlined style={{ color: '#fa8c16' }} />
                  <span>Cấu hình & Phát thông báo</span>
                </Space>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/admin/notifications')}
                >
                  Truy cập <RightOutlined />
                </Button>
              }
              style={{ height: '100%' }}
            >
              <Paragraph style={{ color: '#595959' }}>
                Soạn thảo thông báo hệ thống, học vụ, học phí, hẹn giờ phát hành
                và theo dõi tỷ lệ tiếp cận/đã đọc của sinh viên và giảng viên.
              </Paragraph>
              <div style={{ marginTop: 12 }}>
                <Button
                  block
                  type="dashed"
                  onClick={() => history.push('/admin/notifications')}
                >
                  Soạn & Quản lý thông báo
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Hàng 3: Nhật ký hoạt động & Cấu hình nhanh */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={15}>
            <Card
              title={
                <Space>
                  <FieldTimeOutlined style={{ color: '#1677ff' }} />
                  <span>Nhật Ký Thao Tác Quản Trị Gần Đây (Audit Logs)</span>
                </Space>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={auditLogs}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor:
                              item.type === 'warning'
                                ? '#faad14'
                                : item.type === 'success'
                                  ? '#52c41a'
                                  : item.type === 'info'
                                    ? '#1677ff'
                                    : '#8c8c8c',
                          }}
                        >
                          {item.action.charAt(0)}
                        </Avatar>
                      }
                      title={
                        <Space>
                          <strong>{item.action}</strong>
                          <Tag>{item.user}</Tag>
                        </Space>
                      }
                      description={item.detail}
                    />
                    <div style={{ color: '#8c8c8c', fontSize: 13 }}>
                      {item.time}
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={9}>
            <Card
              title={
                <Space>
                  <SettingOutlined style={{ color: '#722ed1' }} />
                  <span>Thiết Lập Vận Hành Hệ Thống</span>
                </Space>
              }
            >
              <List itemLayout="horizontal">
                <List.Item
                  actions={[
                    <Switch
                      key="maintenance"
                      checked={maintenanceMode}
                      onChange={setMaintenanceMode}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title="Chế độ bảo trì hệ thống"
                    description="Tạm khóa tính năng ghi dữ liệu để bảo trì CSDL"
                  />
                </List.Item>

                <List.Item
                  actions={[
                    <Switch
                      key="registration"
                      checked={allowRegistration}
                      onChange={setAllowRegistration}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title="Cổng đăng ký tín chỉ"
                    description="Mở cho sinh viên đăng ký học phần trực tuyến"
                  />
                </List.Item>

                <List.Item
                  actions={[
                    <Button key="backup" size="small">
                      Sao lưu ngay
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title="Sao lưu dữ liệu định kỳ"
                    description="Lần sao lưu gần nhất: Hôm nay 04:00 AM"
                  />
                </List.Item>
              </List>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default AdminOverviewPage;
