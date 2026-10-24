import { Link, useSearchParams } from '@umijs/max';
import { Button, Result } from 'antd';
import React from 'react';
import useStyles from './style.style';

const RegisterResult: React.FC<Record<string, unknown>> = () => {
  const { styles } = useStyles();
  const [params] = useSearchParams();

  const actions = (
    <div className={styles.actions}>
      <Button size="large" type="primary">
        <span>Kiểm tra hộp thư</span>
      </Button>
      <Link to="/" prefetch>
        <Button size="large">Về trang chủ</Button>
      </Link>
    </div>
  );

  const email = params?.get('account') || 'giangvien@daihoc.edu.vn';
  return (
    <Result
      className={styles.registerResult}
      status="success"
      title={
        <div className={styles.title}>
          <span>Tài khoản {email} đã đăng ký thành công</span>
        </div>
      }
      subTitle="Email kích hoạt tài khoản đã được gửi đến hộp thư của bạn. Vui lòng kiểm tra email để hoàn tất kích hoạt."
      extra={actions}
    />
  );
};
export default RegisterResult;
