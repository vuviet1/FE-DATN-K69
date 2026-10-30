/**
 * @file table.tsx
 * @description Bảng xử lý học vụ & Cảnh báo học tập mức 1, 2, 3 theo Quy chế đào tạo HUST
 */

import {
  AlertOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { ACADEMIC } from '@domain/constants';
import type { AlertLevel, IAcademicRecord } from '@domain/models';
import api from '@infra/api';
import { notificationSuccess } from '@utils/Common';
import {
  Table as AntTable,
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

export const Table: React.FC = () => {
  const [records, setRecords] = useState<IAcademicRecord[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [alertLevel, setAlertLevel] = useState<AlertLevel | undefined>(
    undefined,
  );
  const [semester, setSemester] = useState<string>('2026.1');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.academicApi.alerts.getPagingApi({
        keyword,
        alertLevel,
        semester,
        pageNumber,
        pageSize,
      });
      if (res?.data) {
        setRecords(res.data);
        setTotal(res.total);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [keyword, alertLevel, semester, pageNumber, pageSize]);

  const handleProcessAlerts = async () => {
    setLoading(true);
    try {
      const res = await api.academicApi.alerts.processAlertsApi(semester);
      if (res.success) {
        notificationSuccess(res.message);
        loadData();
      }
    } finally {
      setLoading(false);
    }
  };

  // Thống kê nhanh
  const countL1 = records.filter((r) => r.alertLevel === 'LEVEL_1').length;
  const countL2 = records.filter((r) => r.alertLevel === 'LEVEL_2').length;
  const countL3 = records.filter((r) => r.alertLevel === 'LEVEL_3').length;
  const countGrad = records.filter((r) => r.isEligibleForGraduation).length;

  const columns: ColumnsType<IAcademicRecord> = [
    {
      title: 'MSSV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 110,
      render: (val) => <strong style={{ color: '#1677ff' }}>{val}</strong>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (val, record) => (
        <div>
          <span style={{ fontWeight: 600 }}>{val}</span>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            {record.classCode} • {record.department}
          </div>
        </div>
      ),
    },
    {
      title: 'Học kỳ',
      dataIndex: 'semester',
      key: 'semester',
      width: 90,
      align: 'center',
    },
    {
      title: 'GPA Kỳ',
      dataIndex: 'gpa',
      key: 'gpa',
      width: 90,
      align: 'center',
      render: (val) => (
        <span
          style={{ fontWeight: 600, color: val < 1.5 ? '#ff4d4f' : '#262626' }}
        >
          {val.toFixed(2)}
        </span>
      ),
    },
    {
      title: 'CPA Tích lũy',
      dataIndex: 'cpa',
      key: 'cpa',
      width: 110,
      align: 'center',
      render: (val) => (
        <Tag
          color={
            val >= 3.2
              ? 'gold'
              : val >= 2.5
                ? 'blue'
                : val >= 2.0
                  ? 'cyan'
                  : 'error'
          }
          style={{ fontWeight: 700 }}
        >
          {val.toFixed(2)} / 4.0
        </Tag>
      ),
    },
    {
      title: 'Nợ tín chỉ',
      key: 'failedCredits',
      width: 110,
      align: 'center',
      render: (_, record) => (
        <Tooltip title={`Kỳ này trượt: ${record.failedCreditsThisSemester} TC`}>
          <span
            style={{
              fontWeight: 600,
              color: record.totalFailedCredits > 8 ? '#ff4d4f' : '#595959',
            }}
          >
            {record.totalFailedCredits} TC
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Tình trạng học vụ (HUST)',
      dataIndex: 'alertLevel',
      key: 'alertLevel',
      width: 180,
      render: (level: AlertLevel, record) => {
        const item = ACADEMIC.ALERT_LEVELS[level];
        if (record.isEligibleForGraduation) {
          return (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Đủ điều kiện TN
            </Tag>
          );
        }
        return (
          <Tooltip title={item?.description}>
            <Tag color={item?.color || 'default'} style={{ fontWeight: 600 }}>
              {item?.label || level}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: 'Ghi chú xử lý',
      dataIndex: 'note',
      key: 'note',
      render: (val) => (
        <span style={{ fontSize: 12, color: '#8c8c8c' }}>{val || '—'}</span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 4 Card Thống kê chỉ số học vụ theo chuẩn Bách Khoa */}
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ borderLeft: '4px solid #fa8c16' }}>
            <Statistic
              title="Cảnh báo Mức 1"
              value={countL1}
              valueStyle={{ color: '#fa8c16', fontWeight: 700 }}
              prefix={<ExclamationCircleOutlined />}
              suffix="sinh viên"
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              CPA &lt; 1.0 hoặc nợ &gt; 8 TC
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ borderLeft: '4px solid #f5222d' }}>
            <Statistic
              title="Cảnh báo Mức 2"
              value={countL2}
              valueStyle={{ color: '#f5222d', fontWeight: 700 }}
              prefix={<AlertOutlined />}
              suffix="sinh viên"
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              2 kỳ liên tiếp mức 1 hoặc nợ &gt; 16 TC
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ borderLeft: '4px solid #780650' }}>
            <Statistic
              title="Mức 3 - Buộc thôi học"
              value={countL3}
              valueStyle={{ color: '#780650', fontWeight: 700 }}
              prefix={<StopOutlined />}
              suffix="sinh viên"
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              Đình chỉ học tập theo quy chế HUST
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card bordered={false} style={{ borderLeft: '4px solid #52c41a' }}>
            <Statistic
              title="Đủ điều kiện tốt nghiệp"
              value={countGrad}
              valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              prefix={<CheckCircleOutlined />}
              suffix="sinh viên"
            />
            <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
              CPA &ge; 2.0 &amp; Hoàn tất chuẩn đầu ra
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bảng Dữ liệu & Thao tác */}
      <Card bordered={false}>
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col xs={24} md={16}>
            <Space wrap size="middle">
              <Input
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                placeholder="Tìm theo MSSV, họ tên, lớp..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 260 }}
                allowClear
              />

              <Select
                value={semester}
                onChange={setSemester}
                style={{ width: 180 }}
                options={ACADEMIC.SEMESTERS}
              />

              <Select
                placeholder="Mức cảnh báo"
                value={alertLevel}
                onChange={setAlertLevel}
                style={{ width: 190 }}
                allowClear
                options={[
                  { label: 'Cảnh báo Mức 1', value: 'LEVEL_1' },
                  { label: 'Cảnh báo Mức 2', value: 'LEVEL_2' },
                  { label: 'Mức 3 - Buộc thôi học', value: 'LEVEL_3' },
                  { label: 'Học lực bình thường', value: 'NORMAL' },
                ]}
              />

              <Button icon={<ReloadOutlined />} onClick={loadData}>
                Làm mới
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<DownloadOutlined />}>Xuất danh sách</Button>
              <Button
                type="primary"
                danger
                icon={<PlayCircleOutlined />}
                loading={loading}
                onClick={handleProcessAlerts}
              >
                Xét cảnh báo học vụ tự động
              </Button>
            </Space>
          </Col>
        </Row>

        <AntTable<IAcademicRecord>
          rowKey="id"
          columns={columns}
          dataSource={records}
          loading={loading}
          pagination={{
            current: pageNumber,
            pageSize,
            total,
            onChange: (p, ps) => {
              setPageNumber(p);
              setPageSize(ps);
            },
            showSizeChanger: true,
          }}
          size="middle"
          bordered
        />
      </Card>
    </div>
  );
};

export default Table;
