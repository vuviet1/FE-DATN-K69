import { Link, useIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

const Exception500: React.FC = () => {
  const intl = useIntl();
  return (
    <Card variant="borderless" style={{ background: 'transparent' }}>
      <Result
        status="500"
        title="500"
        subTitle={intl.formatMessage({
          id: 'pages.500.subTitle',
          defaultMessage:
            'Đã xảy ra sự cố máy chủ nội bộ. Vui lòng thử lại sau.',
        })}
        extra={
          <Link to="/" prefetch>
            <Button type="primary">
              {intl.formatMessage({
                id: 'pages.500.buttonText',
                defaultMessage: 'Quay về trang chủ',
              })}
            </Button>
          </Link>
        }
      />
    </Card>
  );
};

export default Exception500;
