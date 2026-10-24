import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import {
  Avatar,
  Badge,
  Button,
  Descriptions,
  message,
  Modal,
  Popconfirm,
  Space,
  Tag,
} from 'antd';
import React, { useRef, useState } from 'react';

export interface StudentItem {
  id: string;
  studentCode: string;
  fullName: string;
  avatar?: string;
  gender: 'Nam' | 'Nữ';
  birthDate: string;
  className: string;
  course: string;
  phone: string;
  email: string;
  trainingPoint: number;
  gpa: number;
  status: 'studying' | 'warning' | 'suspended' | 'dropped';
}

const initialStudents: StudentItem[] = [
  {
    id: '1',
    studentCode: '2021001',
    fullName: 'Nguyễn Hoàng Nam',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam',
    gender: 'Nam',
    birthDate: '2003-05-15',
    className: 'CNTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0981122334',
    email: 'nam.nh21001@sis.edu.vn',
    trainingPoint: 88,
    gpa: 3.45,
    status: 'studying',
  },
  {
    id: '2',
    studentCode: '2021002',
    fullName: 'Trần Thị Mai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai',
    gender: 'Nữ',
    birthDate: '2003-09-20',
    className: 'CNTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0972233445',
    email: 'mai.tt21002@sis.edu.vn',
    trainingPoint: 92,
    gpa: 3.72,
    status: 'studying',
  },
  {
    id: '3',
    studentCode: '2021003',
    fullName: 'Lê Văn Cường',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong',
    gender: 'Nam',
    birthDate: '2003-02-10',
    className: 'KTPM2-K65',
    course: 'Cơ sở dữ liệu phân tán',
    phone: '0963344556',
    email: 'cuong.lv21003@sis.edu.vn',
    trainingPoint: 65,
    gpa: 1.95,
    status: 'warning',
  },
  {
    id: '4',
    studentCode: '2021004',
    fullName: 'Phạm Minh Tuấn',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tuan',
    gender: 'Nam',
    birthDate: '2003-11-05',
    className: 'CNTT2-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0914455667',
    email: 'tuan.pm21004@sis.edu.vn',
    trainingPoint: 78,
    gpa: 2.85,
    status: 'studying',
  },
  {
    id: '5',
    studentCode: '2021005',
    fullName: 'Hoàng Diệu Linh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linh',
    gender: 'Nữ',
    birthDate: '2003-07-28',
    className: 'HTTT1-K65',
    course: 'Cơ sở dữ liệu phân tán',
    phone: '0935566778',
    email: 'linh.hd21005@sis.edu.vn',
    trainingPoint: 85,
    gpa: 3.3,
    status: 'studying',
  },
  {
    id: '6',
    studentCode: '2021006',
    fullName: 'Đỗ Đức Thắng',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thang',
    gender: 'Nam',
    birthDate: '2002-12-14',
    className: 'CNTT1-K65',
    course: 'Lập trình Web nâng cao',
    phone: '0946677889',
    email: 'thang.dd21006@sis.edu.vn',
    trainingPoint: 55,
    gpa: 1.6,
    status: 'warning',
  },
  {
    id: '7',
    studentCode: '2021007',
    fullName: 'Vũ Thu Trang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Trang',
    gender: 'Nữ',
    birthDate: '2003-03-30',
    className: 'KTPM1-K65',
    course: 'Kỹ thuật phần mềm',
    phone: '0987788990',
    email: 'trang.vt21007@sis.edu.vn',
    trainingPoint: 95,
    gpa: 3.88,
    status: 'studying',
  },
  {
    id: '8',
    studentCode: '2021008',
    fullName: 'Bùi Anh Quân',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quan',
    gender: 'Nam',
    birthDate: '2003-08-19',
    className: 'KTPM2-K65',
    course: 'Kỹ thuật phần mềm',
    phone: '0908899001',
    email: 'quan.ba21008@sis.edu.vn',
    trainingPoint: 70,
    gpa: 2.4,
    status: 'suspended',
  },
];

const StudentsPage: React.FC = () => {
  const [data, setData] = useState<StudentItem[]>(initialStudents);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<StudentItem | null>(null);
  const actionRef = useRef<ActionType>(null);

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    message.success('Đã xóa thông tin sinh viên thành công!');
  };

  const handleCreate = async (values: any) => {
    const newStudent: StudentItem = {
      id: String(Date.now()),
      studentCode: values.studentCode,
      fullName: values.fullName,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(values.fullName)}`,
      gender: values.gender || 'Nam',
      birthDate: values.birthDate || '2003-01-01',
      className: values.className || 'CNTT1-K65',
      course: values.course || 'Lập trình Web nâng cao',
      phone: values.phone || '',
      email: values.email || `${values.studentCode}@sis.edu.vn`,
      trainingPoint: Number(values.trainingPoint) || 80,
      gpa: Number(values.gpa) || 3.0,
      status: values.status || 'studying',
    };
    setData((prev) => [newStudent, ...prev]);
    message.success('Thêm sinh viên mới thành công!');
    setCreateModalVisible(false);
    return true;
  };

  const columns: ProColumns<StudentItem>[] = [
    {
      title: 'Mã SV',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 110,
      render: (_, record) => <Tag color="blue">{record.studentCode}</Tag>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <span style={{ fontWeight: 600 }}>{record.fullName}</span>
        </Space>
      ),
    },
    {
      title: 'Lớp sinh hoạt',
      dataIndex: 'className',
      key: 'className',
      valueType: 'select',
      valueEnum: {
        all: { text: 'Tất cả các lớp' },
        'CNTT1-K65': { text: 'CNTT1-K65' },
        'CNTT2-K65': { text: 'CNTT2-K65' },
        'KTPM1-K65': { text: 'KTPM1-K65' },
        'KTPM2-K65': { text: 'KTPM2-K65' },
        'HTTT1-K65': { text: 'HTTT1-K65' },
      },
      render: (_, record) => <Tag>{record.className}</Tag>,
    },
    {
      title: 'Lớp học phần',
      dataIndex: 'course',
      key: 'course',
      valueType: 'select',
      valueEnum: {
        all: { text: 'Tất cả môn học' },
        'Lập trình Web nâng cao': { text: 'Lập trình Web nâng cao' },
        'Cơ sở dữ liệu phân tán': { text: 'Cơ sở dữ liệu phân tán' },
        'Kỹ thuật phần mềm': { text: 'Kỹ thuật phần mềm' },
      },
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      width: 90,
      valueType: 'select',
      valueEnum: {
        all: { text: 'Tất cả' },
        Nam: { text: 'Nam' },
        Nữ: { text: 'Nữ' },
      },
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthDate',
      key: 'birthDate',
      valueType: 'date',
      width: 120,
    },
    {
      title: 'Điểm GPA',
      dataIndex: 'gpa',
      key: 'gpa',
      width: 100,
      search: false,
      sorter: (a, b) => a.gpa - b.gpa,
      render: (_, record) => {
        const color = record.gpa >= 3.2 ? '#52c41a' : record.gpa >= 2.5 ? '#1677ff' : '#ff4d4f';
        return <span style={{ color, fontWeight: 'bold' }}>{record.gpa.toFixed(2)}</span>;
      },
    },
    {
      title: 'Đ.Rèn luyện',
      dataIndex: 'trainingPoint',
      key: 'trainingPoint',
      width: 100,
      search: false,
      sorter: (a, b) => a.trainingPoint - b.trainingPoint,
      render: (_, record) => <span>{record.trainingPoint} đ</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      valueType: 'select',
      valueEnum: {
        studying: { text: 'Đang học', status: 'Success' },
        warning: { text: 'Cảnh báo', status: 'Error' },
        suspended: { text: 'Bảo lưu', status: 'Warning' },
        dropped: { text: 'Nghỉ học', status: 'Default' },
      },
      render: (_, record) => {
        const statusMap = {
          studying: { text: 'Đang học', badge: 'success' },
          warning: { text: 'Cảnh báo', badge: 'error' },
          suspended: { text: 'Bảo lưu', badge: 'warning' },
          dropped: { text: 'Nghỉ học', badge: 'default' },
        };
        const s = statusMap[record.status] || { text: record.status, badge: 'default' };
        return <Badge status={s.badge as any} text={s.text} />;
      },
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      key: 'option',
      width: 130,
      render: (_, record) => [
        <Button
          key="view"
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => {
            setCurrentStudent(record);
            setDetailModalVisible(true);
          }}
        >
          Xem
        </Button>,
        <Popconfirm
          key="delete"
          title="Xác nhận xóa"
          description={`Bạn có chắc muốn xóa sinh viên ${record.fullName}?`}
          onConfirm={() => handleDelete(record.id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button type="text" danger size="small" icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Quản Lý Sinh Viên',
        subTitle: 'Danh sách và thông tin học tập của sinh viên các lớp học phần',
      }}
    >
      <ProTable<StudentItem>
        headerTitle="Danh sách Sinh viên"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
          defaultCollapsed: false,
          searchText: 'Tìm kiếm',
          resetText: 'Đặt lại',
        }}
        toolBarRender={() => [
          <Button
            key="export"
            icon={<DownloadOutlined />}
            onClick={() => message.success('Đang xuất file Excel danh sách sinh viên...')}
          >
            Xuất file Excel
          </Button>,
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            Thêm sinh viên mới
          </Button>,
        ]}
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />

      {/* Modal Thêm Mới Sinh Viên */}
      <ModalForm
        title="Thêm Mới Sinh Viên Vào Lớp Học Phần"
        width={650}
        open={createModalVisible}
        onOpenChange={setCreateModalVisible}
        onFinish={handleCreate}
        modalProps={{
          destroyOnClose: true,
          okText: 'Lưu thông tin',
          cancelText: 'Hủy bỏ',
        }}
      >
        <ProFormText
          name="studentCode"
          label="Mã Sinh Viên (MSSV)"
          placeholder="Ví dụ: 2021009"
          rules={[{ required: true, message: 'Vui lòng nhập MSSV!' }]}
        />
        <ProFormText
          name="fullName"
          label="Họ và tên sinh viên"
          placeholder="Ví dụ: Nguyễn Văn An"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        />
        <ProFormRadio.Group
          name="gender"
          label="Giới tính"
          initialValue="Nam"
          options={[
            { label: 'Nam', value: 'Nam' },
            { label: 'Nữ', value: 'Nữ' },
          ]}
        />
        {/* Dropdown gắn lịch DatePicker chọn ngày sinh */}
        <ProFormDatePicker
          name="birthDate"
          label="Ngày sinh"
          placeholder="Chọn ngày sinh trên lịch"
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
        />
        <ProFormSelect
          name="className"
          label="Lớp sinh hoạt"
          initialValue="CNTT1-K65"
          options={[
            { label: 'CNTT1-K65', value: 'CNTT1-K65' },
            { label: 'CNTT2-K65', value: 'CNTT2-K65' },
            { label: 'KTPM1-K65', value: 'KTPM1-K65' },
            { label: 'KTPM2-K65', value: 'KTPM2-K65' },
            { label: 'HTTT1-K65', value: 'HTTT1-K65' },
          ]}
        />
        <ProFormSelect
          name="course"
          label="Lớp học phần tham gia"
          initialValue="Lập trình Web nâng cao"
          options={[
            { label: 'Lập trình Web nâng cao', value: 'Lập trình Web nâng cao' },
            { label: 'Cơ sở dữ liệu phân tán', value: 'Cơ sở dữ liệu phân tán' },
            { label: 'Kỹ thuật phần mềm', value: 'Kỹ thuật phần mềm' },
          ]}
        />
        <ProFormText
          name="phone"
          label="Số điện thoại liên lạc"
          placeholder="Ví dụ: 0912345678"
        />
        <ProFormText
          name="email"
          label="Email sinh viên"
          placeholder="Ví dụ: an.nv21009@sis.edu.vn"
        />
        <ProFormRadio.Group
          name="status"
          label="Trạng thái học tập"
          initialValue="studying"
          options={[
            { label: 'Đang học', value: 'studying' },
            { label: 'Cảnh báo học vụ', value: 'warning' },
            { label: 'Bảo lưu', value: 'suspended' },
          ]}
        />
        <ProFormTextArea
          name="note"
          label="Ghi chú thêm"
          placeholder="Nhập ghi chú đặc biệt nếu có..."
        />
      </ModalForm>

      {/* Modal Xem Chi Tiết Sinh Viên */}
      <Modal
        title="Hồ Sơ Chi Tiết Sinh Viên"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={600}
      >
        {currentStudent && (
          <Descriptions column={2} bordered size="middle" style={{ marginTop: 16 }}>
            <Descriptions.Item label="MSSV" span={2}>
              <Tag color="blue" style={{ fontSize: 14 }}>{currentStudent.studentCode}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Họ và tên" span={2}>
              <Space>
                <Avatar src={currentStudent.avatar} size="large" />
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>{currentStudent.fullName}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">{currentStudent.gender}</Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">{currentStudent.birthDate}</Descriptions.Item>
            <Descriptions.Item label="Lớp">{currentStudent.className}</Descriptions.Item>
            <Descriptions.Item label="Môn học">{currentStudent.course}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{currentStudent.phone}</Descriptions.Item>
            <Descriptions.Item label="Email">{currentStudent.email}</Descriptions.Item>
            <Descriptions.Item label="Điểm GPA tích lũy">
              <span style={{ color: '#1677ff', fontWeight: 'bold' }}>{currentStudent.gpa.toFixed(2)}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Điểm rèn luyện">{currentStudent.trainingPoint} điểm</Descriptions.Item>
            <Descriptions.Item label="Trạng thái học tập" span={2}>
              {currentStudent.status === 'studying' && <Tag color="success">Đang học</Tag>}
              {currentStudent.status === 'warning' && <Tag color="error">Cảnh báo học vụ</Tag>}
              {currentStudent.status === 'suspended' && <Tag color="warning">Bảo lưu kết quả</Tag>}
              {currentStudent.status === 'dropped' && <Tag color="default">Nghỉ học</Tag>}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default StudentsPage;
