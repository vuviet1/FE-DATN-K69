/**
 * @file table.tsx
 * @description Bảng đăng ký học phần tín chỉ: Lớp mở đăng ký & Danh sách lớp đã chọn
 */

import {
  ClockCircleOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type {
  ICourseClassRegistration,
  IRegistrationPeriod,
} from '@domain/models';
import api from '@infra/api';
import { notificationError, notificationSuccess } from '@utils/Common';
import {
  Table as AntTable,
  Button,
  Card,
  Col,
  Empty,
  Input,
  Popconfirm,
  Progress,
  Row,
  Space,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

const { Text, Title } = Typography;

export const Table: React.FC = () => {
  const [period, setPeriod] = useState<IRegistrationPeriod | null>(null);
  const [classes, setClasses] = useState<ICourseClassRegistration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'available' | 'registered'>(
    'available',
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const [periodsRes, classesRes] = await Promise.all([
        api.academicApi.registration.getPeriodsApi(),
        api.academicApi.registration.getAvailableClassesApi({ keyword }),
      ]);
      if (periodsRes && periodsRes.length > 0) {
        setPeriod(periodsRes[0]);
      }
      if (Array.isArray(classesRes)) {
        setClasses(classesRes);
      }
    } catch {
      notificationError('Lỗi khi tải dữ liệu đăng ký tín chỉ!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEnroll = async (record: ICourseClassRegistration) => {
    try {
      const res = await api.academicApi.registration.enrollClassApi(record.id);
      if (res.success) {
        notificationSuccess(res.message);
        setClasses((prev) =>
          prev.map((c) =>
            c.id === record.id
              ? { ...c, isRegistered: true, enrolled: c.enrolled + 1 }
              : c,
          ),
        );
      }
    } catch {
      notificationError('Đăng ký lớp thất bại!');
    }
  };

  const handleDrop = async (record: ICourseClassRegistration) => {
    try {
      const res = await api.academicApi.registration.dropClassApi(record.id);
      if (res.success) {
        notificationSuccess(res.message);
        setClasses((prev) =>
          prev.map((c) =>
            c.id === record.id
              ? {
                  ...c,
                  isRegistered: false,
                  enrolled: Math.max(0, c.enrolled - 1),
                }
              : c,
          ),
        );
      }
    } catch {
      notificationError('Hủy lớp thất bại!');
    }
  };

  const registeredClasses = classes.filter((c) => c.isRegistered);
  const totalRegisteredCredits = registeredClasses.reduce(
    (sum, c) => sum + c.credits,
    0,
  );

  // Cột lớp mở đăng ký
  const availableColumns: ColumnsType<ICourseClassRegistration> = [
    {
      title: 'Mã lớp HP',
      dataIndex: 'classCode',
      key: 'classCode',
      width: 110,
      render: (val) => <strong style={{ color: '#1677ff' }}>{val}</strong>,
    },
    {
      title: 'Mã HP',
      dataIndex: 'courseCode',
      key: 'courseCode',
      width: 100,
      render: (val) => <Tag color="blue">{val}</Tag>,
    },
    {
      title: 'Tên học phần',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (val, record) => (
        <div>
          <span style={{ fontWeight: 600 }}>{val}</span>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            {record.lecturerName}
          </div>
        </div>
      ),
    },
    {
      title: 'Tín chỉ',
      dataIndex: 'credits',
      key: 'credits',
      width: 80,
      align: 'center',
      render: (val) => <Tag color="geekblue">{val} TC</Tag>,
    },
    {
      title: 'Thời khóa biểu & Phòng',
      key: 'schedule',
      render: (_, record) => (
        <div>
          <div style={{ color: '#262626' }}>{record.schedule}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            Phòng học: {record.room}
          </div>
        </div>
      ),
    },
    {
      title: 'Sĩ số',
      key: 'enrolled',
      width: 110,
      render: (_, record) => {
        const isFull = record.enrolled >= record.capacity;
        return (
          <div>
            <span
              style={{ fontWeight: 600, color: isFull ? '#ff4d4f' : '#262626' }}
            >
              {record.enrolled} / {record.capacity}
            </span>
            <Progress
              percent={Math.min(
                100,
                Math.round((record.enrolled / record.capacity) * 100),
              )}
              size="small"
              status={isFull ? 'exception' : 'active'}
              showInfo={false}
            />
          </div>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => {
        if (record.isRegistered) {
          return (
            <Popconfirm
              title="Hủy đăng ký lớp này?"
              onConfirm={() => handleDrop(record)}
              okText="Hủy lớp"
              cancelText="Đóng"
            >
              <Button type="link" danger size="small" icon={<DeleteOutlined />}>
                Hủy đăng ký
              </Button>
            </Popconfirm>
          );
        }
        const isFull = record.enrolled >= record.capacity;
        return (
          <Button
            type="primary"
            size="small"
            disabled={isFull}
            icon={<PlusOutlined />}
            onClick={() => handleEnroll(record)}
          >
            {isFull ? 'Đã hết chỗ' : 'Đăng ký'}
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Banner Đợt đăng ký tín chỉ */}
      {period && (
        <Card style={{ backgroundColor: '#f0f7ff', borderColor: '#bae0ff' }}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col xs={24} md={16}>
              <Space direction="vertical" size={4}>
                <Space>
                  <Tag color="green">ĐANG MỞ ĐĂNG KÝ</Tag>
                  <Title level={4} style={{ margin: 0, color: '#003a8c' }}>
                    {period.name}
                  </Title>
                </Space>
                <Text type="secondary">
                  <ClockCircleOutlined /> Thời gian: {period.startDate} -{' '}
                  {period.endDate} • Đối tượng: Khóa{' '}
                  {period.allowedCohorts.join(', ')}
                </Text>
                <div style={{ fontSize: 13, color: '#262626', marginTop: 4 }}>
                  Quy định tải học tập: Tối thiểu{' '}
                  <strong>{period.minCredits} TC</strong> - Tối đa{' '}
                  <strong>{period.maxCredits} TC</strong>
                </div>
              </Space>
            </Col>

            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Card
                size="small"
                style={{
                  display: 'inline-block',
                  minWidth: 200,
                  backgroundColor: '#fff',
                }}
              >
                <div style={{ fontSize: 13, color: '#8c8c8c' }}>
                  Đã tích lũy trong kỳ:
                </div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: totalRegisteredCredits < 12 ? '#faad14' : '#52c41a',
                  }}
                >
                  {totalRegisteredCredits}{' '}
                  <span style={{ fontSize: 14 }}>/ {period.maxCredits} TC</span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: totalRegisteredCredits < 12 ? '#faad14' : '#52c41a',
                  }}
                >
                  {totalRegisteredCredits < 12
                    ? 'Chưa đủ mức tối thiểu (12 TC)'
                    : 'Hợp lệ theo quy chế HUST'}
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      )}

      {/* Tabs & Danh sách */}
      <Card bordered={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={(k) => setActiveTab(k as any)}
            items={[
              {
                key: 'available',
                label: `Lớp học phần mở đăng ký (${classes.length})`,
              },
              {
                key: 'registered',
                label: `Lớp học phần đã đăng ký (${registeredClasses.length})`,
              },
            ]}
          />

          {activeTab === 'available' && (
            <Input
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Tìm theo mã lớp, mã HP, tên môn..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={loadData}
              style={{ width: 280 }}
              allowClear
            />
          )}
        </div>

        {activeTab === 'available' ? (
          <AntTable<ICourseClassRegistration>
            rowKey="id"
            columns={availableColumns}
            dataSource={classes}
            loading={loading}
            pagination={{ pageSize: 8 }}
            size="middle"
          />
        ) : (
          <div>
            {registeredClasses.length > 0 ? (
              <AntTable<ICourseClassRegistration>
                rowKey="id"
                columns={availableColumns}
                dataSource={registeredClasses}
                pagination={false}
                size="middle"
              />
            ) : (
              <Empty description="Bạn chưa đăng ký lớp học phần nào trong kỳ này" />
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Table;
