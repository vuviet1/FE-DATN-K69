import {
  CrownOutlined,
  ReadOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Dropdown, type MenuProps, message, Tag } from 'antd';
import React from 'react';

export const RoleSwitcher: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentRole = initialState?.currentUser?.access || 'admin';

  const roleConfigs: Record<
    string,
    { label: string; icon: React.ReactNode; color: string; redirect: string }
  > = {
    admin: {
      label: 'Quản trị viên',
      icon: <CrownOutlined />,
      color: 'gold',
      redirect: '/admin/overview',
    },
    teacher: {
      label: 'Giảng viên',
      icon: <ReadOutlined />,
      color: 'blue',
      redirect: '/teacher/dashboard',
    },
    student: {
      label: 'Sinh viên',
      icon: <UserOutlined />,
      color: 'green',
      redirect: '/student/dashboard',
    },
  };

  const handleRoleChange = async (targetRole: string) => {
    try {
      const res = await fetch('/api/user/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: targetRole }),
      });
      const data = await res.json();
      if (data.success) {
        setInitialState((s) => ({
          ...s,
          currentUser: data.data,
        }));
        message.success(
          `Đã chuyển vai trò sang: ${roleConfigs[targetRole].label}`,
        );
        // Chuyển trang và làm mới quyền truy cập sạch sẽ cho vai trò mới
        window.location.href = roleConfigs[targetRole].redirect;
      }
    } catch {
      message.error('Chuyển đổi vai trò thất bại!');
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'title',
      type: 'group',
      label: 'Chuyển đổi vai trò thử nghiệm',
    },
    {
      key: 'admin',
      icon: <CrownOutlined style={{ color: '#faad14' }} />,
      label: (
        <div>
          <span style={{ fontWeight: 600 }}>Quản trị viên (Admin)</span>
          <div style={{ fontSize: 11, color: '#8c8c8c' }}>
            Toàn quyền hệ thống, duyệt bài, import
          </div>
        </div>
      ),
      disabled: currentRole === 'admin',
      onClick: () => handleRoleChange('admin'),
    },
    {
      key: 'teacher',
      icon: <ReadOutlined style={{ color: '#1890ff' }} />,
      label: (
        <div>
          <span style={{ fontWeight: 600 }}>Giảng viên (Teacher)</span>
          <div style={{ fontSize: 11, color: '#8c8c8c' }}>
            TS. Nguyễn Văn Hùng - Quản lý lớp, chấm bài
          </div>
        </div>
      ),
      disabled: currentRole === 'teacher',
      onClick: () => handleRoleChange('teacher'),
    },
    {
      key: 'student',
      icon: <UserOutlined style={{ color: '#52c41a' }} />,
      label: (
        <div>
          <span style={{ fontWeight: 600 }}>Sinh viên (Student)</span>
          <div style={{ fontSize: 11, color: '#8c8c8c' }}>
            Lê Văn Minh - Tham gia lớp, nộp bài
          </div>
        </div>
      ),
      disabled: currentRole === 'student',
      onClick: () => handleRoleChange('student'),
    },
  ];

  const currentConfig = roleConfigs[currentRole] || roleConfigs.admin;

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" arrow>
      <Button
        size="small"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderColor: currentConfig.color,
          borderRadius: 16,
          padding: '2px 10px',
        }}
      >
        <Tag
          color={currentConfig.color}
          style={{ margin: 0, padding: '0 6px', borderRadius: 10 }}
        >
          {currentConfig.label}
        </Tag>
        <SwapOutlined style={{ fontSize: 12, color: '#8c8c8c' }} />
      </Button>
    </Dropdown>
  );
};

export default RoleSwitcher;
