/**
 * @file NotificationBell.tsx
 * @description Icon Chuông Thông báo trên Header kèm Popover danh sách thông báo và đánh dấu đã đọc
 */

import {
  AlertOutlined,
  BellOutlined,
  BookOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type {
  ISystemNotification,
  NotificationPriority,
  NotificationType,
} from '@domain/models';
import api from '@infra/api';
import { history } from '@umijs/max';
import {
  Avatar,
  Badge,
  Button,
  Empty,
  List,
  Modal,
  Popover,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useHeaderActionStyles from './style';

const { Text, Paragraph } = Typography;

// Dữ liệu thông báo mặc định nếu chưa có kết nối API
const defaultNotifications: ISystemNotification[] = [
  {
    id: '1',
    title: 'Kế hoạch đăng ký tín chỉ và đóng học phí Học kỳ 2',
    content:
      'Phòng Đào tạo thông báo tới toàn thể sinh viên các khóa về thời gian mở cổng đăng ký học phần từ 05/11/2026 đến 15/11/2026. Sinh viên có nợ học phí vui lòng hoàn tất trước ngày 03/11 để được kích hoạt quyền đăng ký môn học.',
    type: 'fee',
    priority: 'high',
    targetType: 'all',
    targetName: 'Toàn bộ sinh viên & Giảng viên',
    channels: ['web', 'email'],
    status: 'published',
    sendAt: '28/10/2026 08:00',
    createdAt: '27/10/2026',
    createdBy: 'Phòng Đào tạo',
    readCount: 310,
    totalTarget: 384,
  },
  {
    id: '2',
    title: 'Hạn chót nhập điểm giữa kỳ và rà soát sinh viên vắng quá 20%',
    content:
      'Đề nghị quý Thầy/Cô phụ trách các lớp học phần hoàn thành nhập điểm kiểm tra giữa kỳ lên hệ thống trước 17h00 ngày 31/10/2026, đồng thời chốt danh sách sinh viên vắng mặt trên 20% tổng số tiết để Khoa ra quyết định cảnh báo.',
    type: 'academic',
    priority: 'urgent',
    targetType: 'lecturers',
    targetName: 'Tất cả Giảng viên',
    channels: ['web', 'email'],
    status: 'published',
    sendAt: '25/10/2026 10:30',
    createdAt: '25/10/2026',
    createdBy: 'Ban Quản lý Đào tạo',
    readCount: 26,
    totalTarget: 30,
  },
  {
    id: '3',
    title: 'Bảo trì và nâng cấp máy chủ cổng thông tin đào tạo SIS',
    content:
      'Hệ thống sẽ tiến hành bảo trì hạ tầng cơ sở dữ liệu định kỳ từ 23h00 ngày 31/10/2026 đến 02h00 ngày 01/11/2026. Trong thời gian này, các tính năng nhập điểm và xem hồ sơ có thể bị gián đoạn tạm thời.',
    type: 'system',
    priority: 'normal',
    targetType: 'all',
    targetName: 'Toàn bộ người dùng',
    channels: ['web'],
    status: 'published',
    sendAt: '24/10/2026 14:00',
    createdAt: '24/10/2026',
    createdBy: 'Quản trị viên Hệ thống',
    readCount: 154,
    totalTarget: 384,
  },
  {
    id: '4',
    title: 'Lịch thi kết thúc học phần và quy chế phòng thi Học kỳ 1',
    content:
      'Đã cập nhật lịch thi chính thức trên cổng thông tin sinh viên. Đề nghị sinh viên kiểm tra phòng thi, số báo danh và mang theo thẻ sinh viên hợp lệ khi vào phòng thi.',
    type: 'academic',
    priority: 'high',
    targetType: 'students',
    targetName: 'Sinh viên tất cả các khoa',
    channels: ['web', 'email'],
    status: 'published',
    sendAt: '22/10/2026 09:15',
    createdAt: '22/10/2026',
    createdBy: 'Phòng Khảo thí & Đảm bảo chất lượng',
    readCount: 370,
    totalTarget: 384,
  },
];

export const NotificationBell: React.FC = () => {
  const { styles } = useHeaderActionStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [notifications, setNotifications] =
    useState<ISystemNotification[]>(defaultNotifications);
  const [readIds, setReadIds] = useState<string[]>(['4']); // Ban đầu giả lập ID 4 đã đọc
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedNoti, setSelectedNoti] = useState<ISystemNotification | null>(
    null,
  );

  // Tải danh sách thông báo từ API nếu có
  useEffect(() => {
    api.systemNotificationApi
      .getPagingApi({ pageSize: 10, status: 'published' })
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setNotifications(res.data);
        }
      })
      .catch(() => {
        // Sử dụng dữ liệu mặc định nếu API lỗi
      });
  }, []);

  const unreadCount = notifications.filter(
    (n) => !readIds.includes(n.id),
  ).length;

  const handleMarkAllAsRead = () => {
    setReadIds(notifications.map((n) => n.id));
  };

  const handleItemClick = (noti: ISystemNotification) => {
    if (!readIds.includes(noti.id)) {
      setReadIds((prev) => [...prev, noti.id]);
    }
    setSelectedNoti(noti);
  };

  const renderIcon = (
    type: NotificationType,
    priority: NotificationPriority,
  ) => {
    if (priority === 'urgent') {
      return (
        <Avatar
          style={{ backgroundColor: '#fff1f0', color: '#ff4d4f' }}
          icon={<AlertOutlined />}
          size={36}
        />
      );
    }
    switch (type) {
      case 'academic':
        return (
          <Avatar
            style={{ backgroundColor: '#e6f4ff', color: '#1677ff' }}
            icon={<BookOutlined />}
            size={36}
          />
        );
      case 'fee':
        return (
          <Avatar
            style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
            icon={<DollarOutlined />}
            size={36}
          />
        );
      default:
        return (
          <Avatar
            style={{ backgroundColor: '#f9f0ff', color: '#722ed1' }}
            icon={<SettingOutlined />}
            size={36}
          />
        );
    }
  };

  const renderPriorityTag = (priority: NotificationPriority) => {
    switch (priority) {
      case 'urgent':
        return <Tag color="error">Khẩn cấp</Tag>;
      case 'high':
        return <Tag color="warning">Quan trọng</Tag>;
      default:
        return <Tag color="default">Thông thường</Tag>;
    }
  };

  // Lọc thông báo theo tab
  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const popoverContent = (
    <div
      style={{
        width: 380,
        maxHeight: 520,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Popover */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 4px 12px 4px',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Space>
          <Text strong style={{ fontSize: 16 }}>
            Thông báo
          </Text>
          {unreadCount > 0 ? (
            <Tag color="red" style={{ borderRadius: 10 }}>
              {unreadCount} mới
            </Tag>
          ) : (
            <Tag color="green" style={{ borderRadius: 10 }}>
              Đã đọc hết
            </Tag>
          )}
        </Space>

        {unreadCount > 0 && (
          <Button
            type="link"
            size="small"
            icon={<CheckCircleOutlined />}
            onClick={handleMarkAllAsRead}
            style={{ padding: 0 }}
          >
            Đọc tất cả
          </Button>
        )}
      </div>

      {/* Tabs Filter */}
      <Tabs
        size="small"
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: 'all', label: `Tất cả (${notifications.length})` },
          { key: 'academic', label: 'Học vụ' },
          { key: 'fee', label: 'Học phí' },
          { key: 'system', label: 'Hệ thống' },
        ]}
        style={{ marginBottom: 0 }}
      />

      {/* Danh sách thông báo */}
      <div style={{ overflowY: 'auto', maxHeight: 330, paddingRight: 4 }}>
        {filteredNotifications.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={filteredNotifications}
            renderItem={(item) => {
              const isRead = readIds.includes(item.id);
              return (
                <List.Item
                  onClick={() => handleItemClick(item)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    backgroundColor: isRead ? '#ffffff' : '#f0f7ff',
                    marginBottom: 4,
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isRead
                      ? '#f5f5f5'
                      : '#e6f4ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isRead
                      ? '#ffffff'
                      : '#f0f7ff';
                  }}
                >
                  <List.Item.Meta
                    avatar={renderIcon(item.type, item.priority)}
                    title={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: isRead ? 500 : 700,
                            color: isRead ? '#262626' : '#1677ff',
                            fontSize: 13,
                            lineHeight: 1.3,
                            paddingRight: 6,
                          }}
                        >
                          {item.title}
                        </span>
                        {!isRead && (
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: '#1677ff',
                              display: 'inline-block',
                              marginTop: 4,
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </div>
                    }
                    description={
                      <div>
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{
                            fontSize: 12,
                            color: '#595959',
                            margin: '4px 0 6px 0',
                          }}
                        >
                          {item.content}
                        </Paragraph>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span style={{ fontSize: 11, color: '#8c8c8c' }}>
                            {item.sendAt || item.createdAt}
                          </span>
                          {renderPriorityTag(item.priority)}
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              );
            }}
          />
        ) : (
          <div style={{ padding: '32px 0', textAlign: 'center' }}>
            <Empty
              description="Không có thông báo nào"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        )}
      </div>

      {/* Footer Popover */}
      <div
        style={{
          borderTop: '1px solid #f0f0f0',
          paddingTop: 10,
          marginTop: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setOpen(false);
            history.push('/admin/notifications');
          }}
          style={{ padding: 0 }}
        >
          Trang quản lý thông báo
        </Button>
        <Button type="text" size="small" onClick={() => setOpen(false)}>
          Đóng
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        content={popoverContent}
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
      >
        <Tooltip
          title={`Thông báo ${unreadCount > 0 ? `(${unreadCount} chưa đọc)` : ''}`}
        >
          <Button
            type="text"
            className={styles.action}
            aria-label="Thông báo hệ thống"
            style={{ position: 'relative' }}
          >
            <Badge
              count={unreadCount}
              overflowCount={99}
              size="small"
              offset={[6, -4]}
            >
              <BellOutlined
                style={{ fontSize: 18, color: open ? '#1677ff' : undefined }}
              />
            </Badge>
          </Button>
        </Tooltip>
      </Popover>

      {/* Modal xem chi tiết thông báo */}
      <Modal
        title={
          <Space>
            <InfoCircleOutlined style={{ color: '#1677ff' }} />
            <span>Chi tiết thông báo</span>
          </Space>
        }
        open={!!selectedNoti}
        onCancel={() => setSelectedNoti(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedNoti(null)}>
            Đóng
          </Button>,
          <Button
            key="manage"
            type="primary"
            onClick={() => {
              setSelectedNoti(null);
              setOpen(false);
              history.push('/admin/notifications');
            }}
          >
            Xem danh sách thông báo
          </Button>,
        ]}
      >
        {selectedNoti && (
          <div>
            <h4 style={{ fontSize: 16, color: '#1f1f1f', marginBottom: 12 }}>
              {selectedNoti.title}
            </h4>

            <div
              style={{
                marginBottom: 16,
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {renderPriorityTag(selectedNoti.priority)}
              <Tag color="blue">
                Kênh: {selectedNoti.channels.join(', ').toUpperCase()}
              </Tag>
              <Tag color="purple">
                Gửi tới: {selectedNoti.targetName || selectedNoti.targetType}
              </Tag>
            </div>

            <div
              style={{
                backgroundColor: '#fafafa',
                padding: 14,
                borderRadius: 6,
                border: '1px solid #f0f0f0',
                marginBottom: 16,
                fontSize: 14,
                lineHeight: 1.6,
                color: '#262626',
                whiteSpace: 'pre-line',
              }}
            >
              {selectedNoti.content}
            </div>

            <div style={{ fontSize: 12, color: '#8c8c8c' }}>
              <div>
                <strong>Người phát hành:</strong> {selectedNoti.createdBy}
              </div>
              <div>
                <strong>Thời gian gửi:</strong>{' '}
                {selectedNoti.sendAt || selectedNoti.createdAt}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default NotificationBell;
