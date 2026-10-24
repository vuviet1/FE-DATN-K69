import { UploadOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, message, Upload } from 'antd';
import React from 'react';
import { getCityOptions, provinceOptions } from '@/utils/chinaDivision';
import type { GeographicItemType } from '../data';
import { queryCity, queryCurrent, queryProvince } from '../service';
import useStyles from './index.style';

const validatorPhone = (
  _rule: any,
  value: string[],
  callback: (message?: string) => void,
) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

const toSelectValue = (item?: { label?: string; key?: string }) =>
  item?.key
    ? {
        label: item.label,
        value: item.key,
      }
    : undefined;

const toSelectOptions = (items: GeographicItemType[]) =>
  items
    .map((item) => {
      const label = item.name ?? item.label;
      const value = item.id ?? item.key;

      return label && value ? { label, value } : undefined;
    })
    .filter((item): item is { label: string; value: string } => Boolean(item));

const handleFinish = async () => {
  message.success('Cập nhật thông tin thành công!');
};

const BaseView: React.FC = () => {
  const { styles } = useStyles();
  const formRef = React.useRef<ProFormInstance>(undefined);

  const handleValuesChange = (changedValues: Record<string, unknown>) => {
    if ('province' in changedValues) {
      formRef.current?.setFieldValue('city', undefined);
    }
  };

  const { data: currentUser, isLoading: loading } = useQuery({
    queryKey: ['current-user'],
    queryFn: () => queryCurrent().then((res) => res.data),
  });
  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url =
        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              formRef={formRef}
              layout="vertical"
              onFinish={handleFinish}
              onValuesChange={handleValuesChange}
              submitter={{
                searchConfig: {
                  submitText: 'Cập nhật thông tin',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                province: toSelectValue(currentUser?.geographic?.province),
                city: toSelectValue(currentUser?.geographic?.city),
                phone: currentUser?.phone?.split('-'),
              }}
              requiredMark={false}
            >
              <ProFormText
                width="md"
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Email!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên!',
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label="Giới thiệu bản thân"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập giới thiệu bản thân!',
                  },
                ]}
                placeholder="Chuyên môn, môn giảng dạy, hướng nghiên cứu..."
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="Quốc gia"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn quốc gia!',
                  },
                ]}
                options={[
                  {
                    label: 'Việt Nam',
                    value: 'Vietnam',
                  },
                ]}
              />

              <ProForm.Group size={8}>
                <ProFormSelect
                  label="Tỉnh / Thành phố"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn tỉnh/thành phố!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  request={async () => {
                    const options = toSelectOptions(await queryProvince());
                    return options.length
                      ? options
                      : toSelectOptions(provinceOptions);
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        label=" "
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng chọn quận/huyện!',
                          },
                        ]}
                        fieldProps={{
                          labelInValue: true,
                        }}
                        disabled={!province}
                        request={async (params) => {
                          if (!params.key) {
                            return [];
                          }
                          const provinceKey = String(params.key);
                          const options = toSelectOptions(
                            await queryCity(provinceKey),
                          );
                          return options.length
                            ? options
                            : toSelectOptions(getCityOptions(provinceKey));
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="Địa chỉ cơ quan / Khoa"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ cơ quan!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="Số điện thoại liên hệ"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} placeholder="024" />
                <Input className={styles.phone_number} placeholder="38691234" />
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};
export default BaseView;

const AvatarView = ({ avatar }: { avatar: string }) => {
  const { styles } = useStyles();

  return (
    <>
      <div className={styles.avatar_title}>Ảnh đại diện</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            Thay đổi ảnh
          </Button>
        </div>
      </Upload>
    </>
  );
};
