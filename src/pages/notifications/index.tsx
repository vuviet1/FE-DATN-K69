import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  FormOutlined,
  InfoCircleOutlined,
  RightOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import { history } from '@umijs/max';
import {
  Avatar,
  Badge,
  Button,
  Card,
  List,
  message,
  Radio,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;

interface INotificationItem {
  id: string;
  type: 'assignment' | 'grade' | 'post' | 'system';
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('all');

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lms/notifications');
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/lms/notifications/mark-all-read', { method: 'POST' });
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      message.success('Đã đánh dấu đọc tất cả thông báo!');
    } catch {
      message.error('Lỗi khi đánh dấu thông báo!');
    }
  };

  const handleClickNotification = (item: INotificationItem) => {
    setNotifications(
      notifications.map((n) => (n.id === item.id ? { ...n, read: true } : n)),
    );
    if (item.link && item.link !== '#') {
      history.push(item.link);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FormOutlined style={{ color: '#1890ff', fontSize: 18 }} />;
      case 'grade':
        return <TrophyOutlined style={{ color: '#52c41a', fontSize: 18 }} />;
      case 'post':
        return <CommentOutlined style={{ color: '#faad14', fontSize: 18 }} />;
      default:
        return (
          <InfoCircleOutlined style={{ color: '#722ed1', fontSize: 18 }} />
        );
    }
  };

  const filtered = notifications.filter((n) => {
    if (filterType === 'unread') return !n.read;
    if (filterType === 'read') return n.read;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Trung tâm Thông báo - LMS</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Trung tâm Thông báo học tập (A3)',
          subTitle:
            'Tập hợp thông báo về bài tập mới, kết quả chấm điểm, bài đăng thảo luận và nhắc nhở thời hạn',
          extra: [
            <Button
              key="mark-read"
              icon={<CheckCircleOutlined />}
              onClick={handleMarkAllRead}
            >
              Đánh dấu đã đọc tất cả
            </Button>,
          ],
        }}
      >
        <Card
          extra={
            <Radio.Group
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="all">
                Tất cả ({notifications.length})
              </Radio.Button>
              <Radio.Button value="unread">
                Chưa đọc ({notifications.filter((n) => !n.read).length})
              </Radio.Button>
              <Radio.Button value="read">Đã đọc</Radio.Button>
            </Radio.Group>
          }
        >
          <List
            loading={loading}
            dataSource={filtered}
            renderItem={(item) => (
              <List.Item
                style={{
                  background: item.read ? '#fff' : '#f0f5ff',
                  padding: '16px 20px',
                  borderRadius: 8,
                  marginBottom: 8,
                  cursor: 'pointer',
                  border: item.read ? '1px solid #f0f0f0' : '1px solid #adc6ff',
                }}
                onClick={() => handleClickNotification(item)}
                actions={[
                  <Button
                    key="view"
                    type="link"
                    size="small"
                    icon={<RightOutlined />}
                  >
                    Xem chi tiết
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: item.read ? '#f5f5f5' : '#e6f7ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      icon={getIconForType(item.type)}
                    />
                  }
                  title={
                    <Space>
                      {!item.read && <Badge status="processing" />}
                      <Text strong style={{ fontSize: 15 }}>
                        {item.title}
                      </Text>
                      <Tag color={item.type === 'grade' ? 'green' : 'blue'}>
                        {item.type === 'grade'
                          ? 'Chấm điểm'
                          : item.type === 'assignment'
                            ? 'Bài tập'
                            : item.type === 'post'
                              ? 'Bảng tin'
                              : 'Hệ thống'}
                      </Tag>
                    </Space>
                  }
                  description={
                    <div>
                      <Paragraph
                        style={{ margin: '4px 0 6px 0', color: '#595959' }}
                      >
                        {item.message}
                      </Paragraph>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        <ClockCircleOutlined />{' '}
                        {new Date(item.createdAt).toLocaleString('vi-VN')}
                      </Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </PageContainer>
    </>
  );
};

export default NotificationsPage;
