/**
 * @file table.tsx
 * @description Bảng xét duyệt Học bổng Khuyến khích học tập (KKHT) theo tổ hợp CPA & ĐRL
 */

import {
  CheckCircleOutlined,
  DownloadOutlined,
  ReloadOutlined,
  SearchOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { CTSV } from '@domain/constants';
import type { IScholarshipRecipient, ScholarshipType } from '@domain/models';
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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

export const Table: React.FC = () => {
  const [data, setData] = useState<IScholarshipRecipient[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [scholarshipType, setScholarshipType] = useState<string | undefined>(
    undefined,
  );
  const [semester, _setSemester] = useState<string>('2026.1');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.ctsvApi.scholarships.getPagingApi({
        keyword,
        scholarshipType,
        semester,
        pageNumber,
        pageSize,
      });
      if (res?.data) {
        setData(res.data);
        setTotal(res.total);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [keyword, scholarshipType, semester, pageNumber, pageSize]);

  const handleApprove = async (id: string) => {
    try {
      const res = await api.ctsvApi.scholarships.approveApi(id);
      if (res.success) {
        notificationSuccess(res.message);
        loadData();
      }
    } catch {
      // Error
    }
  };

  const totalFund = data.reduce((sum, item) => sum + item.rewardAmount, 0);

  const columns: ColumnsType<IScholarshipRecipient> = [
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
      title: 'CPA Tích lũy',
      dataIndex: 'cpa',
      key: 'cpa',
      width: 110,
      align: 'center',
      render: (val) => (
        <strong style={{ color: '#fa8c16' }}>{val.toFixed(2)}</strong>
      ),
    },
    {
      title: 'Điểm rèn luyện',
      dataIndex: 'conductScore',
      key: 'conductScore',
      width: 120,
      align: 'center',
      render: (val) => (
        <Tag color={val >= 90 ? 'green' : 'blue'}>{val} điểm</Tag>
      ),
    },
    {
      title: 'Loại học bổng',
      dataIndex: 'scholarshipType',
      key: 'scholarshipType',
      width: 160,
      render: (val: ScholarshipType) => {
        const item = CTSV.SCHOLARSHIP_TYPES[val];
        return (
          <Tag color={item?.color || 'default'} style={{ fontWeight: 600 }}>
            {item?.label || val}
          </Tag>
        );
      },
    },
    {
      title: 'Mức học bổng (VND)',
      dataIndex: 'rewardAmount',
      key: 'rewardAmount',
      width: 160,
      align: 'right',
      render: (val) => (
        <strong style={{ color: '#52c41a', fontSize: 15 }}>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(val)}
        </strong>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (val) => (
        <Tag
          color={
            val === 'approved'
              ? 'success'
              : val === 'paid'
                ? 'geekblue'
                : 'warning'
          }
        >
          {val === 'approved'
            ? 'Đã phê duyệt'
            : val === 'paid'
              ? 'Đã chi trả'
              : 'Đề cử'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 90,
      align: 'center',
      render: (_, record) =>
        record.status === 'nominated' ? (
          <Button
            type="primary"
            size="small"
            icon={<CheckCircleOutlined />}
            onClick={() => handleApprove(record.id)}
          >
            Duyệt
          </Button>
        ) : (
          <span style={{ color: '#52c41a', fontSize: 13 }}>Đã duyệt</span>
        ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 3 Thẻ thống kê quỹ học bổng */}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng quỹ học bổng dự kiến (Kỳ 2026.1)"
              value={totalFund}
              formatter={(val) =>
                new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(Number(val))
              }
              valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              prefix={<TrophyOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Sinh viên đạt chuẩn học bổng"
              value={total}
              valueStyle={{ color: '#1677ff', fontWeight: 700 }}
              suffix="sinh viên"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Học bổng loại Xuất sắc"
              value={
                data.filter((d) => d.scholarshipType === 'XUAT_SAC').length
              }
              valueStyle={{ color: '#faad14', fontWeight: 700 }}
              suffix="suất"
            />
          </Card>
        </Col>
      </Row>

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
                placeholder="Tìm kiếm MSSV, họ tên..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 260 }}
                allowClear
              />

              <Select
                placeholder="Loại học bổng"
                value={scholarshipType}
                onChange={setScholarshipType}
                style={{ width: 180 }}
                allowClear
                options={[
                  { label: 'Học bổng Xuất sắc', value: 'XUAT_SAC' },
                  { label: 'Học bổng Giỏi', value: 'GIOI' },
                  { label: 'Học bổng Khá', value: 'KHA' },
                ]}
              />

              <Button icon={<ReloadOutlined />} onClick={loadData}>
                Làm mới
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Button icon={<DownloadOutlined />}>
              Xuất quyết định cấp học bổng
            </Button>
          </Col>
        </Row>

        <AntTable<IScholarshipRecipient>
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            current: pageNumber,
            pageSize,
            total,
            onChange: (p, ps) => {
              setPageNumber(p);
              setPageSize(ps);
            },
          }}
          size="middle"
          bordered
        />
      </Card>
    </div>
  );
};

export default Table;
