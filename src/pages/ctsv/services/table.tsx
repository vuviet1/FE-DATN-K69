/**
 * @file table.tsx
 * @description Bảng tiếp nhận & Xử lý Dịch vụ Một cửa sinh viên (CTSV HUST)
 */

import {
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  FileTextOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { CTSV } from '@domain/constants';
import type {
  IStudentServiceRequest,
  RequestStatus,
  RequestType,
} from '@domain/models';
import api from '@infra/api';
import { notificationSuccess } from '@utils/Common';
import {
  Table as AntTable,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

const { TextArea } = Input;

export const Table: React.FC = () => {
  const [data, setData] = useState<IStudentServiceRequest[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [requestType, setRequestType] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modal xem chi tiết và duyệt
  const [selectedItem, setSelectedItem] =
    useState<IStudentServiceRequest | null>(null);
  const [processNote, setProcessNote] = useState<string>('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.ctsvApi.services.getPagingApi({
        keyword,
        requestType,
        status,
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
  }, [keyword, requestType, status, pageNumber, pageSize]);

  const handleProcess = async (targetStatus: 'approved' | 'rejected') => {
    if (!selectedItem) return;
    try {
      const res = await api.ctsvApi.services.processApi(
        selectedItem.id,
        targetStatus,
        processNote,
      );
      if (res.success) {
        notificationSuccess(res.message);
        setSelectedItem(null);
        setProcessNote('');
        loadData();
      }
    } catch {
      // Error
    }
  };

  const columns: ColumnsType<IStudentServiceRequest> = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      render: (val) => <code>#{val}</code>,
    },
    {
      title: 'Người nộp đơn',
      dataIndex: 'studentName',
      key: 'studentName',
      width: 200,
      render: (val, record) => (
        <div>
          <strong style={{ color: '#1677ff' }}>{record.studentCode}</strong> -{' '}
          {val}
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>
            {record.classCode} • {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: 'Loại thủ tục hành chính',
      dataIndex: 'requestType',
      key: 'requestType',
      width: 220,
      render: (val: RequestType) => {
        const item = CTSV.REQUEST_TYPES[val];
        return <Tag color="blue">{item?.label || val}</Tag>;
      },
    },
    {
      title: 'Tiêu đề / Lý do xin cấp',
      dataIndex: 'title',
      key: 'title',
      render: (val, record) => (
        <div>
          <div style={{ fontWeight: 600, color: '#262626' }}>{val}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c', marginTop: 2 }}>
            {record.reason}
          </div>
        </div>
      ),
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (val) => (
        <span style={{ fontSize: 12, color: '#8c8c8c' }}>{val}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (val: RequestStatus) => {
        const item = CTSV.REQUEST_STATUSES[val];
        return <Badge status={item?.color as any} text={item?.label || val} />;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 90,
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Xem chi tiết & Xử lý đơn">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedItem(record);
              setProcessNote(record.responseNote || '');
            }}
          >
            Chi tiết
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
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
              placeholder="Tìm theo MSSV, họ tên, tiêu đề đơn..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: 280 }}
              allowClear
            />

            <Select
              placeholder="Loại thủ tục"
              value={requestType}
              onChange={setRequestType}
              style={{ width: 240 }}
              allowClear
              options={[
                {
                  label: 'Giấy xác nhận SV (Vay vốn CSXH)',
                  value: 'ENROLLMENT_CERTIFICATE',
                },
                {
                  label: 'Giấy hoãn Nghĩa vụ quân sự',
                  value: 'MILITARY_DEFERMENT',
                },
                { label: 'Cấp bảng điểm quá trình', value: 'TRANSCRIPT' },
                {
                  label: 'Nghỉ học tạm thời / Bảo lưu',
                  value: 'ACADEMIC_LEAVE',
                },
                { label: 'Đơn xin phúc khảo điểm', value: 'GRADE_APPEAL' },
              ]}
            />

            <Select
              placeholder="Trạng thái"
              value={status}
              onChange={setStatus}
              style={{ width: 150 }}
              allowClear
              options={[
                { label: 'Chờ tiếp nhận', value: 'pending' },
                { label: 'Đang xử lý', value: 'processing' },
                { label: 'Đã phê duyệt', value: 'approved' },
                { label: 'Từ chối', value: 'rejected' },
              ]}
            />

            <Button icon={<ReloadOutlined />} onClick={loadData}>
              Làm mới
            </Button>
          </Space>
        </Col>
      </Row>

      <AntTable<IStudentServiceRequest>
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

      {/* Modal Chi tiết đơn & Phê duyệt điện tử */}
      <Modal
        title={
          <Space>
            <FileTextOutlined style={{ color: '#1677ff' }} />
            <span>Thủ tục hành chính Một cửa: #{selectedItem?.id}</span>
          </Space>
        }
        open={!!selectedItem}
        onCancel={() => setSelectedItem(null)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setSelectedItem(null)}>
            Đóng
          </Button>,
          selectedItem?.status !== 'approved' && (
            <Button
              key="reject"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleProcess('rejected')}
            >
              Từ chối giải quyết
            </Button>
          ),
          selectedItem?.status !== 'approved' && (
            <Button
              key="approve"
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleProcess('approved')}
            >
              Phê duyệt & Ký số cấp giấy
            </Button>
          ),
        ]}
      >
        {selectedItem && (
          <div>
            <Descriptions
              bordered
              size="small"
              column={2}
              style={{ marginBottom: 16 }}
            >
              <Descriptions.Item label="Mã sinh viên">
                {selectedItem.studentCode}
              </Descriptions.Item>
              <Descriptions.Item label="Họ và tên">
                {selectedItem.studentName}
              </Descriptions.Item>
              <Descriptions.Item label="Lớp">
                {selectedItem.classCode}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedItem.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedItem.email}
              </Descriptions.Item>
              <Descriptions.Item label="Thời gian nộp">
                {selectedItem.createdAt}
              </Descriptions.Item>
              <Descriptions.Item label="Loại thủ tục" span={2}>
                <Tag color="blue">
                  {CTSV.REQUEST_TYPES[selectedItem.requestType]?.label}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginBottom: 16 }}>
              <strong style={{ fontSize: 14 }}>Tiêu đề đơn:</strong>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#1f1f1f',
                  marginTop: 4,
                }}
              >
                {selectedItem.title}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <strong style={{ fontSize: 14 }}>
                Lý do &amp; Nội dung yêu cầu:
              </strong>
              <div
                style={{
                  backgroundColor: '#f5f5f5',
                  padding: 12,
                  borderRadius: 6,
                  marginTop: 6,
                  lineHeight: 1.6,
                }}
              >
                {selectedItem.reason}
              </div>
            </div>

            <div>
              <strong style={{ fontSize: 14 }}>
                Ý kiến xử lý của Cán bộ tiếp nhận:
              </strong>
              <TextArea
                rows={3}
                placeholder="Nhập ghi chú phản hồi gửi cho sinh viên (VD: Đã ký số và gửi bản PDF về email)..."
                value={processNote}
                onChange={(e) => setProcessNote(e.target.value)}
                style={{ marginTop: 6 }}
              />
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default Table;
