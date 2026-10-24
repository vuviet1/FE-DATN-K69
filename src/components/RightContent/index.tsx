import { BookOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { LangDropdown } from './LangDropdown';
import useHeaderActionStyles from './style';
import { VersionDropdown } from './VersionDropdown';

export const DocLink: React.FC = () => {
  const { styles } = useHeaderActionStyles();
  return (
    <Tooltip title="Hướng dẫn sử dụng">
      <Button
        type="text"
        className={styles.action}
        icon={<BookOutlined />}
        aria-label="Hướng dẫn sử dụng"
        onClick={() => {
          history.push('/welcome');
        }}
      />
    </Tooltip>
  );
};

export { LangDropdown, VersionDropdown };
