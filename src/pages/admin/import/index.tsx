import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  InboxOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Helmet } from '@components';
import type { UploadProps } from 'antd';
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Modal,
  message,
  Row,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;

interface IImportRecord {
  line: number;
  studentCode: string;
  fullName: string;
  email: string;
  classCode: string;
  status: 'valid' | 'invalid';
  errorReason?: string;
}

export const AdminImportPage: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [parsedData, setParsedData] = useState<IImportRecord[]>([]);
  const [importing, setImporting] = useState<boolean>(false);
  const [importSuccess, setImportSuccess] = useState<boolean>(false);

  // Mẫu dữ liệu giả lập sau khi tải file lên
  const sampleImportResult: IImportRecord[] = [
    {
      line: 2,
      studentCode: '20210001',
      fullName: 'Lê Văn Minh',
      email: 'minh.lv2100@lms.edu.vn',
      classCode: 'WEB2026',
      status: 'valid',
    },
    {
      line: 3,
      studentCode: '20210002',
      fullName: 'Trần Thị Mai',
      email: 'mai.tt2100@lms.edu.vn',
      classCode: 'WEB2026',
      status: 'valid',
    },
    {
      line: 4,
      studentCode: '20210003',
      fullName: 'Nguyễn Hoàng Nam',
      email: 'nam.nh2100@lms.edu.vn',
      classCode: 'SE3100',
      status: 'valid',
    },
    {
      line: 5,
      studentCode: '20210004',
      fullName: 'Phạm Đức Anh',
      email: 'anh.pd_invalid_email',
      classCode: 'WEB2026',
      status: 'invalid',
      errorReason: 'Định dạng email không hợp lệ',
    },
    {
      line: 6,
      studentCode: '20210002',
      fullName: 'Trần Thị Mai (Trùng)',
      email: 'mai.tt2100@lms.edu.vn',
      classCode: 'WEB2026',
      status: 'invalid',
      errorReason: 'Email và Mã sinh viên bị trùng lặp với dòng 3',
    },
    {
      line: 7,
      studentCode: '20210005',
      fullName: 'Vũ Hải Đăng',
      email: 'dang.vh2100@lms.edu.vn',
      classCode: 'AI401',
      status: 'valid',
    },
  ];

  const handleDownloadTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,STT,MaSinhVien,HoVaTen,Email,MaLop\n1,20210001,Nguyen Van A,a.nguyen@lms.edu.vn,WEB2026\n2,20210002,Tran Thi B,b.tran@lms.edu.vn,WEB2026';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'Mau_Nhap_SinhVien_LMS.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success('Đã tải xuống tệp mẫu CSV!');
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.csv,.xlsx,.xls',
    beforeUpload: (file) => {
      // Giả lập đọc và parse file
      message.loading({
        content: `Đang phân tích tệp: ${file.name}...`,
        key: 'upload',
      });
      setTimeout(() => {
        setFileList([file]);
        setParsedData(sampleImportResult);
        setImportSuccess(false);
        message.success({
          content: 'Đã phân tích xong dữ liệu tệp!',
          key: 'upload',
        });
      }, 800);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setFileList([]);
      setParsedData([]);
      setImportSuccess(false);
    },
  };

  const validCount = parsedData.filter((d) => d.status === 'valid').length;
  const invalidCount = parsedData.filter((d) => d.status === 'invalid').length;
  const hasErrors = invalidCount > 0;

  const handleExecuteImport = () => {
    if (hasErrors) {
      Modal.error({
        title: 'Không thể thực hiện nhập dữ liệu',
        content: (
          <div>
            <p>
              Quy tắc hệ thống bắt buộc giao dịch <b>All-or-Nothing</b>.
            </p>
            <p>
              Tệp danh sách đang có <b>{invalidCount} dòng dữ liệu lỗi</b>. Vui
              lòng tải lại tệp đã chỉnh sửa các dòng báo đỏ trước khi tiến hành
              import!
            </p>
          </div>
        ),
      });
      return;
    }

    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportSuccess(true);
      message.success(
        `Nhập dữ liệu thành công! Đã tạo tài khoản cho ${validCount} sinh viên và thêm vào lớp tương ứng.`,
      );
    }, 1500);
  };

  const handleFixAndMockValid = () => {
    // Cho phép người dùng bấm "Tự động loại bỏ dòng lỗi để tiếp tục thử nghiệm"
    const cleaned = parsedData.filter((d) => d.status === 'valid');
    setParsedData(cleaned);
    message.success(
      'Đã loại bỏ các dòng không hợp lệ. Bạn có thể thực hiện nhập dữ liệu ngay!',
    );
  };

  const columns = [
    {
      title: 'Dòng',
      dataIndex: 'line',
      width: 70,
      render: (val: number) => <Tag>#{val}</Tag>,
    },
    {
      title: 'Mã sinh viên',
      dataIndex: 'studentCode',
      render: (val: string) => <Text strong>{val}</Text>,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
    },
    {
      title: 'Email sinh viên',
      dataIndex: 'email',
    },
    {
      title: 'Mã lớp ghi danh',
      dataIndex: 'classCode',
      render: (code: string) => <Tag color="cyan">{code}</Tag>,
    },
    {
      title: 'Kiểm tra dữ liệu',
      dataIndex: 'status',
      render: (status: string, record: IImportRecord) =>
        status === 'valid' ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Hợp lệ
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            {record.errorReason || 'Lỗi dữ liệu'}
          </Tag>
        ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nhập danh sách từ CSV/Excel - Admin</title>
      </Helmet>
      <PageContainer
        header={{
          title: 'Nhập danh sách tài khoản & sinh viên từ CSV/Excel (B4)',
          subTitle:
            'Tạo tài khoản tự động và thêm sinh viên vào lớp học phần theo danh sách tệp đính kèm',
          extra: [
            <Button
              key="download"
              icon={<DownloadOutlined />}
              onClick={handleDownloadTemplate}
            >
              Tải file mẫu (.CSV)
            </Button>,
          ],
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Tải lên tệp danh sách">
              <Dragger {...uploadProps} fileList={fileList}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                </p>
                <p className="ant-upload-text">
                  Kéo thả tệp CSV hoặc Excel (.xlsx) vào đây, hoặc bấm để duyệt
                  tệp
                </p>
                <p className="ant-upload-hint">
                  Hỗ trợ tệp tối đa 1.000 dòng. Các cột bắt buộc: Mã sinh viên,
                  Họ và tên, Email, Mã lớp.
                </p>
              </Dragger>

              {parsedData.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card
                        size="small"
                        style={{ textAlign: 'center', background: '#f6ffed' }}
                      >
                        <Text type="secondary">Dòng hợp lệ</Text>
                        <Title
                          level={3}
                          style={{ color: '#52c41a', margin: 0 }}
                        >
                          {validCount}
                        </Title>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        size="small"
                        style={{
                          textAlign: 'center',
                          background: invalidCount > 0 ? '#fff2f0' : '#f5f5f5',
                        }}
                      >
                        <Text type="secondary">Dòng bị lỗi</Text>
                        <Title
                          level={3}
                          style={{
                            color: invalidCount > 0 ? '#ff4d4f' : '#8c8c8c',
                            margin: 0,
                          }}
                        >
                          {invalidCount}
                        </Title>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card
                        size="small"
                        style={{ textAlign: 'center', background: '#e6f7ff' }}
                      >
                        <Text type="secondary">Tổng số bản ghi</Text>
                        <Title
                          level={3}
                          style={{ color: '#1890ff', margin: 0 }}
                        >
                          {parsedData.length}
                        </Title>
                      </Card>
                    </Col>
                  </Row>

                  {hasErrors && (
                    <Alert
                      style={{ marginTop: 16 }}
                      type="error"
                      showIcon
                      message="Phát hiện lỗi trong tệp dữ liệu"
                      description={
                        <div>
                          <span>
                            Có {invalidCount} dòng dữ liệu không hợp lệ (email
                            sai định dạng hoặc bị trùng lặp). Hệ thống thực hiện
                            theo giao dịch an toàn all-or-nothing nên sẽ không
                            nhập dở dang.
                          </span>
                          <div style={{ marginTop: 8 }}>
                            <Button
                              size="small"
                              onClick={handleFixAndMockValid}
                            >
                              Tự động bỏ qua {invalidCount} dòng lỗi để tiếp tục
                              nhập
                            </Button>
                          </div>
                        </div>
                      }
                    />
                  )}

                  {importSuccess && (
                    <Alert
                      style={{ marginTop: 16 }}
                      type="success"
                      showIcon
                      message="Nhập dữ liệu thành công hoàn tất!"
                      description={`Đã tạo tài khoản với mật khẩu mặc định (Mật khẩu khởi tạo: 123456) và gán sinh viên vào các lớp học phần.`}
                    />
                  )}

                  <Divider />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text strong>Bảng xem trước dữ liệu (Preview):</Text>
                    <Button
                      type="primary"
                      size="large"
                      icon={<SafetyCertificateOutlined />}
                      loading={importing}
                      disabled={hasErrors || importSuccess}
                      onClick={handleExecuteImport}
                    >
                      {importSuccess
                        ? 'Đã nhập thành công'
                        : 'Thực hiện nhập dữ liệu'}
                    </Button>
                  </div>

                  <Table
                    style={{ marginTop: 12 }}
                    size="small"
                    dataSource={parsedData}
                    rowKey="line"
                    columns={columns}
                    pagination={false}
                  />
                </div>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Quy chuẩn & Hướng dẫn Import (B4)">
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <div>
                  <Text strong>1. Giới hạn & Định dạng:</Text>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    - Tệp tối đa 1.000 dòng trên một lần tải lên.
                    <br />- Chấp nhận tệp định dạng .CSV hoặc bảng tính Excel
                    (.xlsx).
                  </Paragraph>
                </div>
                <div>
                  <Text strong>2. Kiểm tra tính hợp lệ:</Text>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    - Cột Họ tên, Mã sinh viên, Email không được để trống.
                    <br />- Email phải đúng cú pháp và không được trùng với tài
                    khoản đã có trên hệ thống hoặc trùng trong tệp.
                  </Paragraph>
                </div>
                <div>
                  <Text strong>3. Cơ chế giao dịch All-or-Nothing:</Text>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    - Nếu có bất kỳ dòng nào bị lỗi, giao dịch sẽ dừng lại hoàn
                    toàn để đảm bảo tính toàn vẹn dữ liệu.
                  </Paragraph>
                </div>
                <div>
                  <Text strong>4. Mật khẩu khởi tạo:</Text>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 13, marginTop: 4 }}
                  >
                    - Sinh viên được cấp mật khẩu mặc định:{' '}
                    <Tag color="blue">123456</Tag>
                    <br />- Yêu cầu đổi mật khẩu ở lần đăng nhập đầu tiên.
                  </Paragraph>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default AdminImportPage;
