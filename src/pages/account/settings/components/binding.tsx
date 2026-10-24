import {
  AlipayOutlined,
  DingdingOutlined,
  TaobaoOutlined,
} from '@ant-design/icons';
import { Button, List } from 'antd';
import React from 'react';

const bindingData = [
  {
    title: 'Liên kết Google Workspace',
    description: 'Chưa liên kết tài khoản Google học đường',
    actions: [
      <Button key="Bind" type="link">
        Liên kết
      </Button>,
    ],
    avatar: <TaobaoOutlined className="taobao" />,
  },
  {
    title: 'Liên kết Microsoft 365 (Teams / Outlook)',
    description: 'Đã liên kết với email hung.nguyen@daihoc.edu.vn',
    actions: [
      <Button key="Bind" type="link">
        Hủy liên kết
      </Button>,
    ],
    avatar: <AlipayOutlined className="alipay" />,
  },
  {
    title: 'Liên kết Cổng Đào Tạo Đại Học',
    description: 'Đồng bộ tự động danh sách lớp và sinh viên',
    actions: [
      <Button key="Bind" type="link">
        Đang đồng bộ
      </Button>,
    ],
    avatar: <DingdingOutlined className="dingding" />,
  },
];

const BindingView: React.FC = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={bindingData}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta
            avatar={item.avatar}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default BindingView;
