import {
  BankOutlined,
  GoogleOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { Button, List } from 'antd';
import React from 'react';
import useStyles from '../style.style';

const BindingView: React.FC = () => {
  const { styles } = useStyles();

  const bindingData = [
    {
      title: 'Liên kết Google Workspace',
      description: 'Chưa liên kết tài khoản Google học đường',
      actions: [
        <Button key="BindGoogle" type="link">
          Liên kết
        </Button>,
      ],
      avatar: <GoogleOutlined className={styles.google} />,
    },
    {
      title: 'Liên kết Microsoft 365 (Teams / Outlook)',
      description: 'Đã liên kết với email hung.nguyen@daihoc.edu.vn',
      actions: [
        <Button key="BindMicrosoft" type="link">
          Hủy liên kết
        </Button>,
      ],
      avatar: <WindowsOutlined className={styles.windows} />,
    },
    {
      title: 'Liên kết Cổng Đào Tạo Đại Học',
      description: 'Đồng bộ tự động danh sách lớp và sinh viên',
      actions: [
        <Button key="BindPortal" type="link">
          Đang đồng bộ
        </Button>,
      ],
      avatar: <BankOutlined className={styles.portal} />,
    },
  ];

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
