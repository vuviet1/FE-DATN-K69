import { Link, useIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

const Exception403: React.FC = () => {
  const intl = useIntl();
  return (
    <Card variant="borderless" style={{ background: 'transparent' }}>
      <Result
        status="403"
        title="403"
        subTitle={intl.formatMessage({
          id: 'pages.403.subTitle',
          defaultMessage: 'Rất tiếc, bạn không có quyền truy cập trang này.',
        })}
        extra={
          <Link to="/" prefetch>
            <Button type="primary">
              {intl.formatMessage({
                id: 'pages.403.buttonText',
                defaultMessage: 'Quay về trang chủ',
              })}
            </Button>
          </Link>
        }
      />
    </Card>
  );
};

export default Exception403;
