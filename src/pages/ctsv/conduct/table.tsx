/**
 * @file table.tsx
 * @description Bảng đánh giá Điểm rèn luyện theo 5 tiêu chí Thông tư 16/BGDĐT chuẩn HUST
 */

import {
  CheckOutlined,
  DownloadOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { CTSV } from '@domain/constants';
import type { ConductClassification, IConductScore } from '@domain/models';
import api from '@infra/api';
import { notificationSuccess } from '@utils/Common';
import {
  Table as AntTable,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

export const Table: React.FC = () => {
  const [data, setData] = useState<IConductScore[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [classification, setClassification] = useState<string | undefined>(
    undefined,
  );
  const [semester, _setSemester] = useState<string>('2026.1');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modal chấm điểm
  const [editingItem, setEditingItem] = useState<IConductScore | null>(null);
  const [form] = Form.useForm();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.ctsvApi.conduct.getPagingApi({
        keyword,
        classification,
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
  }, [keyword, classification, semester, pageNumber, pageSize]);

  const handleEdit = (record: IConductScore) => {
    setEditingItem(record);
    form.setFieldsValue({ ...record });
  };

  const handleSaveModal = async () => {
    if (!editingItem) return;
    try {
      const values = await form.validateFields();
      await api.ctsvApi.conduct.updateApi(editingItem.id, values);
      notificationSuccess('Cập nhật điểm rèn luyện thành công!');
      setEditingItem(null);
      loadData();
    } catch {
      // Validate error
    }
  };

  const handleApproveAll = async () => {
    setLoading(true);
    try {
      const res = await api.ctsvApi.conduct.approveApi(semester);
      if (res.success) {
        notificationSuccess(res.message);
        loadData();
      }
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<IConductScore> = [
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
            {record.classCode} • Khóa {record.cohort}
          </div>
        </div>
      ),
    },
    {
      title: 'TC 1 (Học tập)',
      dataIndex: 'criteria1Score',
      key: 'c1',
      width: 110,
      align: 'center',
      render: (val) => `${val}/20`,
    },
    {
      title: 'TC 2 (Nội quy)',
      dataIndex: 'criteria2Score',
      key: 'c2',
      width: 110,
      align: 'center',
      render: (val) => `${val}/25`,
    },
    {
      title: 'TC 3 (Hoạt động)',
      dataIndex: 'criteria3Score',
      key: 'c3',
      width: 110,
      align: 'center',
      render: (val) => `${val}/20`,
    },
    {
      title: 'TC 4 (Công dân)',
      dataIndex: 'criteria4Score',
      key: 'c4',
      width: 110,
      align: 'center',
      render: (val) => `${val}/25`,
    },
    {
      title: 'TC 5 (Khen thưởng)',
      dataIndex: 'criteria5Score',
      key: 'c5',
      width: 110,
      align: 'center',
      render: (val) => `${val}/10`,
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'totalScore',
      key: 'totalScore',
      width: 100,
      align: 'center',
      render: (val) => (
        <strong
          style={{
            fontSize: 16,
            color:
              val >= 90
                ? '#52c41a'
                : val >= 80
                  ? '#1677ff'
                  : val >= 65
                    ? '#13c2c2'
                    : '#ff4d4f',
          }}
        >
          {val}
        </strong>
      ),
    },
    {
      title: 'Xếp loại',
      dataIndex: 'classification',
      key: 'classification',
      width: 140,
      render: (val: ConductClassification) => {
        const item = CTSV.CONDUCT_CLASSIFICATIONS[val];
        return <Tag color={item?.color || 'default'}>{item?.label || val}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 80,
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Chấm điểm rèn luyện">
          <Button
            type="text"
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            onClick={() => handleEdit(record)}
          />
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
              placeholder="Tìm theo MSSV, họ tên, lớp..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: 260 }}
              allowClear
            />

            <Select
              placeholder="Xếp loại ĐRL"
              value={classification}
              onChange={setClassification}
              style={{ width: 170 }}
              allowClear
              options={[
                { label: 'Xuất sắc (90-100)', value: 'XUAT_SAC' },
                { label: 'Tốt (80-89)', value: 'TOT' },
                { label: 'Khá (65-79)', value: 'KHA' },
                { label: 'Trung bình (50-64)', value: 'TRUNG_BINH' },
                { label: 'Yếu / Kém (<50)', value: 'YEU' },
              ]}
            />

            <Button icon={<ReloadOutlined />} onClick={loadData}>
              Làm mới
            </Button>
          </Space>
        </Col>

        <Col xs={24} md={8} style={{ textAlign: 'right' }}>
          <Space>
            <Button icon={<DownloadOutlined />}>Xuất bảng ĐRL</Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleApproveAll}
            >
              Duyệt bảng điểm kỳ
            </Button>
          </Space>
        </Col>
      </Row>

      <AntTable<IConductScore>
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
          showSizeChanger: true,
        }}
        size="middle"
        bordered
      />

      {/* Modal Chấm điểm rèn luyện 5 tiêu chí */}
      <Modal
        title={`Chấm điểm rèn luyện: ${editingItem?.studentName} (${editingItem?.studentCode})`}
        open={!!editingItem}
        onCancel={() => setEditingItem(null)}
        onOk={handleSaveModal}
        okText="Lưu điểm rèn luyện"
        cancelText="Hủy bỏ"
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="criteria1Score"
            label="Tiêu chí 1: Ý thức tham gia học tập (Tối đa 20 điểm)"
            rules={[{ required: true, message: 'Nhập điểm!' }]}
          >
            <InputNumber min={0} max={20} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="criteria2Score"
            label="Tiêu chí 2: Ý thức chấp hành pháp luật và nội quy (Tối đa 25 điểm)"
            rules={[{ required: true, message: 'Nhập điểm!' }]}
          >
            <InputNumber min={0} max={25} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="criteria3Score"
            label="Tiêu chí 3: Tham gia hoạt động chính trị - xã hội, văn thể mỹ (Tối đa 20 điểm)"
            rules={[{ required: true, message: 'Nhập điểm!' }]}
          >
            <InputNumber min={0} max={20} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="criteria4Score"
            label="Tiêu chí 4: Phẩm chất công dân và quan hệ cộng đồng (Tối đa 25 điểm)"
            rules={[{ required: true, message: 'Nhập điểm!' }]}
          >
            <InputNumber min={0} max={25} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="criteria5Score"
            label="Tiêu chí 5: Khen thưởng, kỷ luật, tham gia ban cán sự lớp (Tối đa 10 điểm)"
            rules={[{ required: true, message: 'Nhập điểm!' }]}
          >
            <InputNumber min={0} max={10} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Table;
