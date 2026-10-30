/**
 * @file table.tsx
 * @description Bảng quản lý Học phí theo tín chỉ & Công nợ sinh viên chuẩn HUST
 */

import {
  DollarOutlined,
  DownloadOutlined,
  PayCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { FINANCE } from '@domain/constants';
import type { ITuitionFee, PaymentStatus } from '@domain/models';
import api from '@infra/api';
import { notificationSuccess } from '@utils/Common';
import {
  Table as AntTable,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    val,
  );

export const Table: React.FC = () => {
  const [data, setData] = useState<ITuitionFee[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [status, setStatus] = useState<PaymentStatus | undefined>(undefined);
  const [semester, _setSemester] = useState<string>('2026.1');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modal thu tiền / gạch nợ
  const [payingItem, setPayingItem] = useState<ITuitionFee | null>(null);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [transRef, setTransRef] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.financeApi.tuition.getPagingApi({
        keyword,
        status,
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
  }, [keyword, status, semester, pageNumber, pageSize]);

  const handleOpenPay = (record: ITuitionFee) => {
    setPayingItem(record);
    setPayAmount(record.remainingAmount);
    setTransRef(`BANK_TRANS_${Date.now()}`);
  };

  const handleConfirmPay = async () => {
    if (!payingItem) return;
    try {
      const res = await api.financeApi.tuition.payApi(
        payingItem.id,
        payAmount,
        transRef,
      );
      if (res.success) {
        notificationSuccess(res.message);
        setPayingItem(null);
        loadData();
      }
    } catch {
      // Error
    }
  };

  // Tổng hợp chỉ số tài chính
  const totalReceivable = data.reduce((sum, item) => sum + item.amountToPay, 0);
  const totalCollected = data.reduce((sum, item) => sum + item.paidAmount, 0);
  const totalRemaining = data.reduce(
    (sum, item) => sum + item.remainingAmount,
    0,
  );

  const columns: ColumnsType<ITuitionFee> = [
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
      title: 'Số TC ĐK',
      dataIndex: 'totalRegisteredCredits',
      key: 'credits',
      width: 90,
      align: 'center',
      render: (val) => <Tag color="geekblue">{val} TC</Tag>,
    },
    {
      title: 'Phải nộp (VND)',
      dataIndex: 'amountToPay',
      key: 'amountToPay',
      width: 140,
      align: 'right',
      render: (val) => (
        <strong style={{ color: '#262626' }}>{formatCurrency(val)}</strong>
      ),
    },
    {
      title: 'Đã nộp (VND)',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      width: 140,
      align: 'right',
      render: (val) => (
        <span style={{ color: '#52c41a', fontWeight: 600 }}>
          {formatCurrency(val)}
        </span>
      ),
    },
    {
      title: 'Còn nợ (VND)',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
      width: 140,
      align: 'right',
      render: (val) => (
        <span
          style={{
            color: val > 0 ? '#ff4d4f' : '#8c8c8c',
            fontWeight: val > 0 ? 700 : 400,
          }}
        >
          {formatCurrency(val)}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (val: PaymentStatus) => {
        const item = FINANCE.PAYMENT_STATUSES[val];
        return <Tag color={item?.color || 'default'}>{item?.label || val}</Tag>;
      },
    },
    {
      title: 'Hạn nộp',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 110,
      render: (val) => (
        <span style={{ fontSize: 12, color: '#8c8c8c' }}>{val}</span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          {record.remainingAmount > 0 && (
            <Tooltip title="Thu học phí / Gạch nợ">
              <Button
                type="primary"
                size="small"
                icon={<PayCircleOutlined />}
                onClick={() => handleOpenPay(record)}
              >
                Gạch nợ
              </Button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 3 Thẻ thống kê tài chính công nợ */}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng học phí phải thu (Kỳ 2026.1)"
              value={totalReceivable}
              formatter={(val) => formatCurrency(Number(val))}
              valueStyle={{ color: '#1677ff', fontWeight: 700 }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Đã thực thu về quỹ"
              value={totalCollected}
              formatter={(val) => formatCurrency(Number(val))}
              valueStyle={{ color: '#52c41a', fontWeight: 700 }}
              prefix={<PayCircleOutlined />}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Tổng công nợ còn phải thu"
              value={totalRemaining}
              formatter={(val) => formatCurrency(Number(val))}
              valueStyle={{ color: '#ff4d4f', fontWeight: 700 }}
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
                placeholder="Tìm theo MSSV, họ tên, lớp..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ width: 260 }}
                allowClear
              />

              <Select
                placeholder="Trạng thái học phí"
                value={status}
                onChange={setStatus}
                style={{ width: 170 }}
                allowClear
                options={[
                  { label: 'Đã hoàn thành', value: 'PAID' },
                  { label: 'Nộp một phần', value: 'PARTIAL' },
                  { label: 'Còn nợ học phí', value: 'UNPAID' },
                  { label: 'Miễn giảm 100%', value: 'EXEMPT' },
                ]}
              />

              <Button icon={<ReloadOutlined />} onClick={loadData}>
                Làm mới
              </Button>
            </Space>
          </Col>

          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Button icon={<DownloadOutlined />}>
              Xuất sổ theo dõi học phí
            </Button>
          </Col>
        </Row>

        <AntTable<ITuitionFee>
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

      {/* Modal Thu tiền / Gạch nợ học phí */}
      <Modal
        title={`Ghi nhận nộp học phí: ${payingItem?.studentName} (${payingItem?.studentCode})`}
        open={!!payingItem}
        onCancel={() => setPayingItem(null)}
        onOk={handleConfirmPay}
        okText="Xác nhận thanh toán"
        cancelText="Hủy bỏ"
        destroyOnClose
      >
        {payingItem && (
          <div>
            <Descriptions
              bordered
              size="small"
              column={1}
              style={{ marginBottom: 16 }}
            >
              <Descriptions.Item label="Mã sinh viên">
                {payingItem.studentCode}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng số tín chỉ">
                {payingItem.totalRegisteredCredits} TC
              </Descriptions.Item>
              <Descriptions.Item label="Tổng học phí kỳ">
                {formatCurrency(payingItem.amountToPay)}
              </Descriptions.Item>
              <Descriptions.Item label="Đã thanh toán trước đó">
                {formatCurrency(payingItem.paidAmount)}
              </Descriptions.Item>
              <Descriptions.Item label="Số tiền còn nợ">
                {formatCurrency(payingItem.remainingAmount)}
              </Descriptions.Item>
            </Descriptions>

            <Form layout="vertical">
              <Form.Item label="Số tiền thanh toán đợt này (VND)">
                <InputNumber
                  value={payAmount}
                  onChange={(val) => setPayAmount(val || 0)}
                  min={1000}
                  max={payingItem.remainingAmount}
                  style={{ width: '100%' }}
                  formatter={(val) =>
                    `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                />
              </Form.Item>

              <Form.Item label="Mã giao dịch / Biên lai chuyển khoản">
                <Input
                  value={transRef}
                  onChange={(e) => setTransRef(e.target.value)}
                  placeholder="Nhập mã tham chiếu giao dịch ngân hàng / VNPay / Momo"
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Table;
