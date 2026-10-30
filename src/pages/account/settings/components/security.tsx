import { Button, List } from 'antd';
import React from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: <span className="strong">Mạnh</span>,
  medium: <span className="medium">Trung bình</span>,
  weak: <span className="weak">Yếu</span>,
};

const securityData = [
  {
    title: 'Mật khẩu tài khoản',
    description: <>Độ mạnh mật khẩu hiện tại: {passwordStrength.strong}</>,
    actions: [
      <Button key="Modify" type="link">
        Chỉnh sửa
      </Button>,
    ],
  },
  {
    title: 'Số điện thoại bảo mật',
    description: 'Đã liên kết số: 0988****456',
    actions: [
      <Button key="Modify" type="link">
        Chỉnh sửa
      </Button>,
    ],
  },
  {
    title: 'Câu hỏi bảo mật',
    description: 'Chưa thiết lập câu hỏi bảo mật để bảo vệ tài khoản',
    actions: [
      <Button key="Set" type="link">
        Thiết lập
      </Button>,
    ],
  },
  {
    title: 'Email dự phòng',
    description: 'Đã liên kết: hung.nguyen@daihoc.edu.vn',
    actions: [
      <Button key="Modify" type="link">
        Chỉnh sửa
      </Button>,
    ],
  },
  {
    title: 'Xác thực hai yếu tố (2FA)',
    description: 'Chưa kích hoạt mã OTP qua ứng dụng xác thực',
    actions: [
      <Button key="bind" type="link">
        Liên kết
      </Button>,
    ],
  },
];

const SecurityView: React.FC = () => {
  const data = securityData;
  return (
    <List<Unpacked<typeof data>>
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

export default SecurityView;
