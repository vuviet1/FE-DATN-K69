import { List, Switch } from 'antd';
import React from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const notificationAction = (key: string) => (
  <Switch
    key={key}
    checkedChildren="Bật"
    unCheckedChildren="Tắt"
    defaultChecked
  />
);

const notificationData = [
  {
    key: 'user-message',
    title: 'Tin nhắn từ sinh viên / đồng nghiệp',
    description: 'Nhận thông báo khi sinh viên gửi câu hỏi hoặc phản hồi bài tập',
    actions: [notificationAction('user-message-switch')],
  },
  {
    key: 'system-message',
    title: 'Thông báo từ phòng Đào tạo',
    description: 'Nhận thông báo về lịch thi, hạn nộp điểm và thời khóa biểu',
    actions: [notificationAction('system-message-switch')],
  },
  {
    key: 'todo-task',
    title: 'Nhắc nhở công việc cần xử lý',
    description: 'Tự động nhắc các công việc sắp đến hạn (nhập điểm, điểm danh)',
    actions: [notificationAction('todo-task-switch')],
  },
];

const NotificationView: React.FC = () => {
  const data = notificationData;
  return (
    <List<Unpacked<typeof data>>
      rowKey="key"
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default NotificationView;
