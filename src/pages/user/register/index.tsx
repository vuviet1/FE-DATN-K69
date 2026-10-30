import { useMutation, useQueryClient } from '@tanstack/react-query';
import { history, Link } from '@umijs/max';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Popover,
  Progress,
  Row,
  Select,
  Space,
} from 'antd';
import type { Store } from 'antd/es/form/interface';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { fakeRegister } from './service';
import useStyles from './styles';

const FormItem = Form.Item;
const { Option } = Select;

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const getPasswordStatus = (value?: string) => {
  if (value && value.length > 9) {
    return 'ok';
  }
  if (value && value.length > 5) {
    return 'pass';
  }
  return 'poor';
};

const PasswordProgress: React.FC<{
  value?: string;
  styles: Record<string, string>;
}> = ({ value, styles }) => {
  const passwordStatus = getPasswordStatus(value);
  return value?.length ? (
    <div className={styles[`progress-${passwordStatus}`]}>
      <Progress
        status={passwordProgressMap[passwordStatus]}
        size={6}
        percent={value.length * 10 > 100 ? 100 : value.length * 10}
        showInfo={false}
      />
    </div>
  ) : null;
};

const Register: FC = () => {
  const { styles } = useStyles();
  const [count, setCount]: [number, any] = useState(0);
  const [open, setVisible]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const queryClient = useQueryClient();

  const passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <span>Độ mạnh: Mạnh</span>
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <span>Độ mạnh: Trung bình</span>
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <span>Độ mạnh: Quá ngắn</span>
      </div>
    ),
  };

  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );
  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  const { isPending: submitting, mutate: register } = useMutation({
    mutationFn: (formValues: Store) => {
      const payload = {
        mail: formValues.email,
        password: formValues.password,
        confirm: formValues.confirm,
        mobile: formValues.mobile,
        captcha: formValues.captcha,
        prefix: formValues.prefix,
      };
      return fakeRegister(payload);
    },
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        queryClient.invalidateQueries({ queryKey: ['current-user'] });
        message.success('Đăng ký tài khoản thành công!');
        history.push({
          pathname: `/user/register-result?account=${params.mail}`,
        });
      }
    },
  });
  const onFinish = (values: Store) => {
    register(values);
  };
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('Mật khẩu nhập lại không trùng khớp!');
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    if (!value) {
      setVisible(!!value);
      return promise.reject('Vui lòng nhập mật khẩu!');
    }
    if (!open) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };
  const changePrefix = (value: string) => {
    setPrefix(value);
  };
  const password = Form.useWatch('password', form);
  const passwordStatus = getPasswordStatus(password);
  return (
    <div className={styles.main}>
      <h3>Đăng Ký Tài Khoản Giảng Viên</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ email!',
            },
            {
              type: 'email',
              message: 'Địa chỉ email không đúng định dạng!',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Email trường (ví dụ: giangvien@daihoc.edu.vn)"
          />
        </FormItem>
        <Popover
          getPopupContainer={(node) => {
            if (node?.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            open && (
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {passwordStatusMap[passwordStatus]}
                <PasswordProgress value={password} styles={styles} />
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <span>
                    Vui lòng nhập ít nhất 6 ký tự. Hãy dùng mật khẩu bảo mật
                    cao.
                  </span>
                </div>
              </div>
            )
          }
          overlayStyle={{
            width: 240,
          }}
          placement="right"
          open={open}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder="Mật khẩu ít nhất 6 ký tự"
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: 'Vui lòng xác nhận mật khẩu!',
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input size="large" type="password" placeholder="Nhập lại mật khẩu" />
        </FormItem>
        <FormItem
          name="mobile"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số điện thoại!',
            },
            {
              pattern: /^\d{9,11}$/,
              message: 'Số điện thoại không hợp lệ!',
            },
          ]}
        >
          <Space.Compact style={{ width: '100%' }}>
            <Select
              size="large"
              value={prefix}
              onChange={changePrefix}
              style={{
                width: '30%',
              }}
            >
              <Option value="84">+84</Option>
              <Option value="1">+1</Option>
            </Select>

            <Input size="large" placeholder="Số điện thoại liên hệ" />
          </Space.Compact>
        </FormItem>
        <Row gutter={8}>
          <Col span={16}>
            <FormItem
              name="captcha"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã OTP!',
                },
              ]}
            >
              <Input size="large" placeholder="Mã xác thực OTP" />
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              size="large"
              disabled={!!count}
              className={styles.getCaptcha}
              onClick={onGetCaptcha}
            >
              {count ? `${count} s` : 'Lấy mã OTP'}
            </Button>
          </Col>
        </Row>
        <FormItem>
          <div className={styles.footer}>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>Đăng ký</span>
            </Button>
            <Link to="/user/login" prefetch>
              <span>Đã có tài khoản? Đăng nhập ngay</span>
            </Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};
export default Register;
