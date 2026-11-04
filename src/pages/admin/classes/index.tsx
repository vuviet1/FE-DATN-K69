import {
  EyeOutlined,
  LockOutlined,
  PlusOutlined,
  ReloadOutlined,
  TeamOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Helmet } from '@components';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Drawer,
  Form,
  Input,
  Modal,
  message,
  Popconfirm,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

interface IClassItem {
  id: string;
  code: string;
  name: string;
  courseCode: string;
  credits: number;
  teacherName: string;
  teacherEmail: string;
  semester: string;
  room: string;
  studentCount: number;
  status: 'active' | 'closed';
  createdAt: string;
}

export const AdminClassesPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [classList, setClassList] = useState<IClassItem[]>([]);
  const [selectedClass, setSelectedClass] = useState<IClassItem | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lms/classes');
      const data = await res.json();
      if (data.success) {
        setClassList(data.data);
      }
    } catch {
      message.error('Không thể tải danh sách lớp học!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleToggleStatus = (record: IClassItem) => {
    const newStatus = record.status === 'active' ? 'closed' : 'active';
    const updated = classList.map((c) =>
      c.id === record.id
        ? { ...c, status: newStatus as 'active' | 'closed' }
        : c,
    );
    setClassList(updated);
    message.success(
      `Đã ${newStatus === 'active' ? 'mở lại' : 'khóa/đóng'} lớp ${record.name} (${record.code})`,
    );
  };

  const handleCreateClass = (values: any) => {
    const newClass: IClassItem = {
      id: `cls-${Date.now()}`,
      code: values.code || `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: values.name,
      courseCode: values.courseCode || 'IT4000',
      credits: Number(values.credits) || 3,
      teacherName: values.teacherName || 'TS. Nguyễn Văn Hùng',
      teacherEmail: 'hung.nguyen@lms.edu.vn',
      semester: values.semester || 'Học kỳ 1 - 2026-2027',
      room: values.room || 'Hội trường B1',
      studentCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setClassList([newClass, ...classList]);
    setCreateModalOpen(false);
    form.resetFields();
    message.success('Tạo lớp học mới thành công!');
  };

  const columns: ProColumns<IClassItem>[] = [
    {
      title: 'STT',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Mã lớp / Môn học',
      dataIndex: 'code',
      render: (_, record) => (
        <Space direction="vertical" size={2}>
          <Space>
            <Tag color="cyan" style={{ fontWeight: 600 }}>
              {record.code}
            </Tag>
            <Text style={{ fontWeight: 600 }}>{record.name}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Mã học phần: {record.courseCode} · {record.credits} tín chỉ
          </Text>
        </Space>
      ),
    },
    {
      title: 'Giảng viên phụ trách',
      dataIndex: 'teacherName',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.teacherName}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.teacherEmail}
          </Text>
        </div>
      ),
    },
    {
      title: 'Học kỳ & Phòng học',
      dataIndex: 'semester',
      render: (_, record) => (
        <div>
          <div>{record.semester}</div>
          <Tag color="blue">{record.room}</Tag>
        </div>
      ),
    },
    {
      title: 'Sĩ số',
      dataIndex: 'studentCount',
      sorter: (a, b) => a.studentCount - b.studentCount,
      render: (_, record) => (
        <Space>
          <TeamOutlined style={{ color: '#1890ff' }} />
          <span>{record.studentCount} sinh viên</span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: {
        active: { text: 'Đang mở', status: 'Success' },
        closed: { text: 'Đã đóng/Khóa', status: 'Default' },
      },
      render: (_, record) => (
        <Badge
          status={record.status === 'active' ? 'success' : 'default'}
          text={
            record.status === 'active' ? (
              <Tag color="success">Đang hoạt động</Tag>
            ) : (
              <Tag color="default">Đã đóng/Khóa</Tag>
            )
          }
        />
      ),
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      width: 160,
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedClass(record);
            setDrawerVisible(true);
          }}
        >
          Chi tiết
        </Button>,
        <Popconfirm
          key="status"
          title={`Bạn có chắc muốn ${record.status === 'active' ? 'khóa/đóng' : 'mở lại'} lớp này?`}
          onConfirm={() => handleToggleStatus(record)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <Button
            type="link"
            size="small"
            danger={record.status === 'active'}
            icon={
              record.status === 'active' ? <LockOutlined /> : <UnlockOutlined />
            }
          >
            {record.status === 'active' ? 'Khóa lớp' : 'Mở lớp'}
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Quản lý Lớp học toàn hệ thống - Admin</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Quản lý Lớp học toàn hệ thống (B3)',
          subTitle:
            'Theo dõi toàn bộ lớp học, giáo viên phụ trách, mã lớp, sĩ số và xử lý lớp vi phạm',
        }}
      >
        <ProTable<IClassItem>
          headerTitle="Danh sách lớp học toàn trường"
          loading={loading}
          dataSource={classList}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          toolBarRender={() => [
            <Button
              key="create"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalOpen(true)}
            >
              Tạo lớp mới
            </Button>,
            <Button
              key="reload"
              icon={<ReloadOutlined />}
              onClick={fetchClasses}
            >
              Làm mới
            </Button>,
          ]}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />

        {/* Drawer xem chi tiết lớp học */}
        <Drawer
          title={
            selectedClass
              ? `Chi tiết lớp: ${selectedClass.name}`
              : 'Chi tiết lớp học'
          }
          size="large"
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        >
          {selectedClass && (
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Mã tham gia lớp">
                  <Tag color="cyan" style={{ fontSize: 14, fontWeight: 700 }}>
                    {selectedClass.code}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag
                    color={
                      selectedClass.status === 'active' ? 'green' : 'default'
                    }
                  >
                    {selectedClass.status === 'active'
                      ? 'Đang hoạt động'
                      : 'Đã khóa'}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Tên lớp học phần" span={2}>
                  <Text strong>{selectedClass.name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Mã học phần">
                  {selectedClass.courseCode}
                </Descriptions.Item>
                <Descriptions.Item label="Số tín chỉ">
                  {selectedClass.credits} tín chỉ
                </Descriptions.Item>
                <Descriptions.Item label="Giảng viên phụ trách">
                  {selectedClass.teacherName}
                </Descriptions.Item>
                <Descriptions.Item label="Email giảng viên">
                  {selectedClass.teacherEmail}
                </Descriptions.Item>
                <Descriptions.Item label="Học kỳ">
                  {selectedClass.semester}
                </Descriptions.Item>
                <Descriptions.Item label="Phòng học">
                  {selectedClass.room}
                </Descriptions.Item>
                <Descriptions.Item label="Sĩ số hiện tại" span={2}>
                  {selectedClass.studentCount} sinh viên
                </Descriptions.Item>
              </Descriptions>

              <Card title="Quản trị thành viên & Phân quyền">
                <Text type="secondary">
                  Quản trị viên có quyền điều chuyển giảng viên phụ trách, khóa
                  lớp khi phát hiện vi phạm quy chế hoặc xuất danh sách thành
                  viên ra file Excel.
                </Text>
                <div style={{ marginTop: 16 }}>
                  <Space>
                    <Button
                      danger={selectedClass.status === 'active'}
                      icon={
                        selectedClass.status === 'active' ? (
                          <LockOutlined />
                        ) : (
                          <UnlockOutlined />
                        )
                      }
                      onClick={() => {
                        handleToggleStatus(selectedClass);
                        setSelectedClass({
                          ...selectedClass,
                          status:
                            selectedClass.status === 'active'
                              ? 'closed'
                              : 'active',
                        });
                      }}
                    >
                      {selectedClass.status === 'active'
                        ? 'Khóa/Đóng lớp học'
                        : 'Mở lại lớp học'}
                    </Button>
                    <Button
                      onClick={() =>
                        message.info('Đã tải danh sách thành viên dạng bảng!')
                      }
                    >
                      Xuất danh sách sinh viên
                    </Button>
                  </Space>
                </div>
              </Card>
            </Space>
          )}
        </Drawer>

        {/* Modal tạo lớp mới */}
        <Modal
          title="Tạo Lớp học phần mới"
          open={createModalOpen}
          onCancel={() => setCreateModalOpen(false)}
          onOk={() => form.submit()}
          okText="Tạo lớp"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical" onFinish={handleCreateClass}>
            <Form.Item
              name="name"
              label="Tên lớp học phần"
              rules={[{ required: true, message: 'Vui lòng nhập tên lớp!' }]}
            >
              <Input placeholder="Ví dụ: Kỹ thuật Lập trình Web Nâng cao" />
            </Form.Item>
            <Form.Item
              name="code"
              label="Mã tham gia lớp (Tự động hoặc tùy chỉnh)"
            >
              <Input placeholder="Để trống để hệ thống tự động sinh mã" />
            </Form.Item>
            <Space style={{ display: 'flex' }}>
              <Form.Item
                name="courseCode"
                label="Mã học phần"
                initialValue="IT4409"
              >
                <Input placeholder="IT4409" />
              </Form.Item>
              <Form.Item name="credits" label="Số tín chỉ" initialValue={3}>
                <Input type="number" />
              </Form.Item>
            </Space>
            <Form.Item
              name="teacherName"
              label="Giảng viên phụ trách"
              initialValue="TS. Nguyễn Văn Hùng"
            >
              <Select>
                <Select.Option value="TS. Nguyễn Văn Hùng">
                  TS. Nguyễn Văn Hùng (GV202401)
                </Select.Option>
                <Select.Option value="PGS.TS Trần Quang">
                  PGS.TS Trần Quang (GV202402)
                </Select.Option>
                <Select.Option value="TS. Lê Hải Yến">
                  TS. Lê Hải Yến (GV202403)
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="semester"
              label="Học kỳ"
              initialValue="Học kỳ 1 - 2026-2027"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="room"
              label="Phòng học"
              initialValue="Hội trường D9-501"
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </PageContainer>
    </>
  );
};

export default AdminClassesPage;
