import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LikeOutlined,
  MessageOutlined,
  ReloadOutlined,
  SearchOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  List,
  Modal,
  message,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

interface IPostItem {
  id: string;
  classId: string;
  className: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  content: string;
  attachments?: { name: string; size: string; url: string }[];
  createdAt: string;
  likesCount: number;
  comments?: any[];
  status: 'active' | 'hidden';
  moderationReason?: string;
}

export const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<IPostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<IPostItem | null>(null);
  const [moderationModalOpen, setModerationModalOpen] =
    useState<boolean>(false);
  const [actionType, setActionType] = useState<'hide' | 'delete'>('hide');
  const [reason, setReason] = useState<string>('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lms/posts');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch {
      message.error('Không thể tải danh sách bài đăng!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenModeration = (post: IPostItem, action: 'hide' | 'delete') => {
    setSelectedPost(post);
    setActionType(action);
    setReason('');
    setModerationModalOpen(true);
  };

  const handleConfirmModeration = () => {
    if (!reason.trim()) {
      message.warning('Vui lòng nhập lý do kiểm duyệt/xử lý bài đăng!');
      return;
    }
    if (!selectedPost) return;

    if (actionType === 'delete') {
      setPosts(posts.filter((p) => p.id !== selectedPost.id));
      message.success(
        `Đã xóa vĩnh viễn bài đăng của ${selectedPost.authorName}!`,
      );
    } else {
      setPosts(
        posts.map((p) =>
          p.id === selectedPost.id
            ? { ...p, status: 'hidden', moderationReason: reason }
            : p,
        ),
      );
      message.success(`Đã ẩn bài đăng. Lý do: "${reason}"`);
    }
    setModerationModalOpen(false);
  };

  const handleUnhide = (post: IPostItem) => {
    setPosts(
      posts.map((p) =>
        p.id === post.id
          ? { ...p, status: 'active', moderationReason: undefined }
          : p,
      ),
    );
    message.success('Đã bỏ ẩn và khôi phục hiển thị bài đăng!');
  };

  const filteredPosts = posts.filter((post) => {
    if (filterClass !== 'all' && post.classId !== filterClass) return false;
    if (filterStatus !== 'all' && post.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Kiểm duyệt bài đăng mạng xã hội - Admin</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Kiểm duyệt bài đăng trên Bảng tin (B5)',
          subTitle:
            'Theo dõi nội dung bảng tin, phát hiện các bài viết vi phạm quy chế học đường, ẩn/xóa bài đăng và ghi nhận lý do',
        }}
      >
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Input
                placeholder="Tìm theo tiêu đề, nội dung, tác giả..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={12} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={filterClass}
                onChange={setFilterClass}
                options={[
                  { label: 'Tất cả các lớp học', value: 'all' },
                  { label: 'Kỹ thuật Lập trình Web', value: 'cls-1' },
                  { label: 'Công nghệ Phần mềm', value: 'cls-2' },
                  { label: 'Trí tuệ Nhân tạo', value: 'cls-3' },
                ]}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={filterStatus}
                onChange={setFilterStatus}
                options={[
                  { label: 'Tất cả trạng thái', value: 'all' },
                  { label: 'Đang hiển thị bình thường', value: 'active' },
                  { label: 'Đã bị ẩn/vi phạm', value: 'hidden' },
                ]}
              />
            </Col>
            <Col xs={24} sm={4} style={{ textAlign: 'right' }}>
              <Button icon={<ReloadOutlined />} onClick={fetchPosts}>
                Làm mới
              </Button>
            </Col>
          </Row>
        </Card>

        <List
          loading={loading}
          itemLayout="vertical"
          dataSource={filteredPosts}
          renderItem={(item) => (
            <Card
              key={item.id}
              style={{
                marginBottom: 16,
                borderColor: item.status === 'hidden' ? '#ffccc7' : '#f0f0f0',
                background: item.status === 'hidden' ? '#fff1f0' : '#fff',
              }}
              actions={[
                <Space key="likes">
                  <LikeOutlined /> {item.likesCount} lượt thích
                </Space>,
                <Space key="comments">
                  <MessageOutlined /> {item.comments?.length || 0} phản hồi
                </Space>,
                item.status === 'active' ? (
                  <Button
                    key="hide"
                    type="link"
                    danger
                    icon={<EyeInvisibleOutlined />}
                    onClick={() => handleOpenModeration(item, 'hide')}
                  >
                    Ẩn bài vi phạm
                  </Button>
                ) : (
                  <Button
                    key="unhide"
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => handleUnhide(item)}
                  >
                    Bỏ ẩn bài viết
                  </Button>
                ),
                <Button
                  key="delete"
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleOpenModeration(item, 'delete')}
                >
                  Xóa bài viết
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.authorAvatar} />}
                title={
                  <Space wrap>
                    <Text strong style={{ fontSize: 16 }}>
                      {item.title}
                    </Text>
                    <Tag color="blue">{item.className}</Tag>
                    {item.status === 'hidden' && (
                      <Tag color="error" icon={<WarningOutlined />}>
                        Đã ẩn do vi phạm
                      </Tag>
                    )}
                  </Space>
                }
                description={
                  <Space>
                    <Text type="secondary">
                      Đăng bởi: <b>{item.authorName}</b> (
                      {item.authorRole === 'teacher'
                        ? 'Giảng viên'
                        : 'Sinh viên'}
                      )
                    </Text>
                    <span>·</span>
                    <Text type="secondary">
                      {new Date(item.createdAt).toLocaleString('vi-VN')}
                    </Text>
                  </Space>
                }
              />
              <Paragraph style={{ marginTop: 12, fontSize: 14 }}>
                {item.content}
              </Paragraph>

              {item.attachments && item.attachments.length > 0 && (
                <div
                  style={{
                    marginTop: 8,
                    padding: 8,
                    background: '#fafafa',
                    borderRadius: 6,
                  }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Tệp đính kèm ({item.attachments.length}):
                  </Text>
                  <Space wrap style={{ marginTop: 4 }}>
                    {item.attachments.map((f) => (
                      <Tag key={f.name} color="default">
                        📎 {f.name} ({f.size})
                      </Tag>
                    ))}
                  </Space>
                </div>
              )}

              {item.moderationReason && (
                <div
                  style={{
                    marginTop: 12,
                    padding: 8,
                    background: '#ffeef0',
                    borderLeft: '4px solid #ff4d4f',
                    borderRadius: 4,
                  }}
                >
                  <Text type="danger" strong>
                    Lý do xử lý của Quản trị viên:
                  </Text>{' '}
                  <Text>{item.moderationReason}</Text>
                </div>
              )}
            </Card>
          )}
        />

        {/* Modal ghi nhận lý do kiểm duyệt */}
        <Modal
          title={
            actionType === 'delete'
              ? 'Xác nhận xóa bài viết vĩnh viễn'
              : 'Xác nhận ẩn bài viết vi phạm'
          }
          open={moderationModalOpen}
          onOk={handleConfirmModeration}
          onCancel={() => setModerationModalOpen(false)}
          okText={actionType === 'delete' ? 'Xác nhận xóa' : 'Xác nhận ẩn bài'}
          okButtonProps={{ danger: true }}
          cancelText="Hủy"
        >
          <Paragraph>
            Vui lòng nhập lý do kiểm duyệt xử lý bài viết{' '}
            <b>"{selectedPost?.title}"</b> của tác giả{' '}
            <b>{selectedPost?.authorName}</b>. Lý do sẽ được lưu vào Nhật ký
            quản trị (Audit Log).
          </Paragraph>
          <TextArea
            rows={4}
            placeholder="Ví dụ: Bài viết chứa nội dung quảng cáo spam, ngôn từ không phù hợp với chuẩn mực học đường..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Modal>
      </PageContainer>
    </>
  );
};

export default AdminPostsPage;
