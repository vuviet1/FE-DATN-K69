import {
  CrownOutlined,
  GithubOutlined,
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  ReadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  type ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, Helmet, useIntl, useModel } from '@umijs/max';
import {
  Alert,
  App,
  Button,
  Divider,
  Input,
  Modal,
  Tabs,
  Typography,
} from 'antd';
import { createStyles } from 'antd-style';
import React, { startTransition, useRef, useState } from 'react';
import { Footer, LangDropdown } from '@/components';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';

const { Text, Paragraph } = Typography;

const getSafeRedirectUrl = (redirect: string | null): string => {
  if (!redirect?.startsWith('/')) return '/';
  if (redirect.startsWith('//')) return '/';

  try {
    const parsed = new URL(redirect, window.location.origin);
    if (parsed.origin !== window.location.origin) return '/';
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return '/';
  }
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <GoogleOutlined
        key="GoogleOutlined"
        className={styles.action}
        title="Đăng nhập Google/SSO"
      />
      <MailOutlined
        key="MailOutlined"
        className={styles.action}
        title="Email trường (@edu.vn)"
      />
      <GithubOutlined
        key="GithubOutlined"
        className={styles.action}
        title="Tài khoản GitHub"
      />
    </>
  );
};

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      <LangDropdown />
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      title={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const [forgotModalOpen, setForgotModalOpen] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  const { message } = App.useApp();
  const _intl = useIntl();
  const formRef = useRef<ProFormInstance | undefined>(undefined);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      startTransition(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login({ ...values, type });
      if (msg.status === 'ok') {
        message.success('Đăng nhập thành công!');
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        const redirectParam = urlParams.get('redirect');

        // Determine destination based on authority if no specific redirect
        let defaultTarget = '/teacher/dashboard';
        if (msg.currentAuthority === 'admin') defaultTarget = '/admin/overview';
        if (msg.currentAuthority === 'student')
          defaultTarget = '/student/dashboard';

        const redirectUrl = redirectParam
          ? getSafeRedirectUrl(redirectParam)
          : defaultTarget;
        window.location.href = redirectUrl;
        return;
      }
      setUserLoginState(msg);
    } catch {
      message.error('Đăng nhập thất bại, vui lòng thử lại!');
    }
  };

  const handleQuickLogin = async (username: string, _role: string) => {
    formRef.current?.setFieldsValue({
      username,
      password: '123456',
    });
    await handleSubmit({ username, password: '123456', type: 'account' });
  };

  const handleResetPassword = () => {
    if (!forgotEmail.trim()) {
      message.warning('Vui lòng nhập email đăng ký tài khoản!');
      return;
    }
    message.success(
      `Đã gửi liên kết đặt lại mật khẩu về email: ${forgotEmail}`,
    );
    setForgotModalOpen(false);
    setForgotEmail('');
  };

  const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Đăng nhập - Mạng Xã Hội Học Tập</title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          formRef={formRef}
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Mạng Xã Hội Học Tập"
          subTitle="Nền tảng Mạng xã hội học tập tích hợp Quản lý lớp học & Giao nhận bài tập trực tuyến"
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="Phương thức đăng nhập khác"
            />,
            <ActionIcons key="icons" />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {/* Nút đăng nhập nhanh các vai trò thử nghiệm */}
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Đăng nhập nhanh theo vai trò (Mật khẩu: 123456):
            </Text>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <Button
                size="small"
                style={{ flex: 1, borderColor: '#faad14', color: '#d48806' }}
                icon={<CrownOutlined />}
                onClick={() => handleQuickLogin('admin', 'admin')}
              >
                Admin
              </Button>
              <Button
                size="small"
                style={{ flex: 1, borderColor: '#1890ff', color: '#096dd9' }}
                icon={<ReadOutlined />}
                onClick={() => handleQuickLogin('teacher', 'teacher')}
              >
                Giáo viên
              </Button>
              <Button
                size="small"
                style={{ flex: 1, borderColor: '#52c41a', color: '#389e0d' }}
                icon={<UserOutlined />}
                onClick={() => handleQuickLogin('student', 'student')}
              >
                Sinh viên
              </Button>
            </div>
          </div>

          <Divider style={{ margin: '12px 0' }} />

          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Tài khoản & Mật khẩu',
              },
              {
                key: 'mobile',
                label: 'Đăng nhập qua SĐT / OTP',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content="Tài khoản hoặc mật khẩu không chính xác hoặc tài khoản đã bị khóa! (Mật khẩu mặc định: 123456)" />
          )}

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="Tên đăng nhập / Email (admin, teacher, student)"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên đăng nhập hoặc email!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="Mật khẩu: 123456"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              />
            </>
          )}

          {status === 'error' && loginType === 'mobile' && (
            <LoginMessage content="Mã OTP không chính xác" />
          )}

          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                  {
                    pattern: /^0\d{9}$/,
                    message: 'Số điện thoại không hợp lệ!',
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder="Nhập mã OTP"
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} giây`;
                  }
                  return 'Lấy mã OTP';
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mã OTP!',
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (!result) return;
                  message.success('Mã OTP thử nghiệm là: 1234');
                }}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              Ghi nhớ đăng nhập
            </ProFormCheckbox>
            <Button
              type="link"
              style={{
                float: 'right',
                padding: 0,
              }}
              onClick={() => setForgotModalOpen(true)}
            >
              Quên mật khẩu? (A1)
            </Button>
          </div>
        </LoginForm>

        {/* Modal Quên mật khẩu (A1) */}
        <Modal
          title="Quên mật khẩu / Khôi phục tài khoản (A1)"
          open={forgotModalOpen}
          onOk={handleResetPassword}
          onCancel={() => setForgotModalOpen(false)}
          okText="Gửi liên kết đặt lại"
          cancelText="Hủy"
        >
          <Paragraph>
            Vui lòng nhập địa chỉ email đã đăng ký tài khoản trong hệ thống.
            Chúng tôi sẽ gửi hướng dẫn tạo lại mật khẩu mới qua email của bạn:
          </Paragraph>
          <Input
            size="large"
            prefix={<MailOutlined />}
            placeholder="Ví dụ: sinhvien@lms.edu.vn"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
