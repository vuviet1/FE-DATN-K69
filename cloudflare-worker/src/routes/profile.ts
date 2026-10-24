import { Hono } from 'hono';

const basicGoods = [
  {
    id: '1234561',
    name: 'Tài liệu Giáo trình',
    barcode: '12421432143214321',
    price: '50000',
    num: '1',
    amount: '50000',
  },
  {
    id: '1234562',
    name: 'Sổ tay sinh viên',
    barcode: '12421432143214322',
    price: '30000',
    num: '2',
    amount: '60000',
  },
  {
    id: '1234563',
    name: 'Thẻ thực hành Lab',
    barcode: '12421432143214323',
    price: '70000',
    num: '1',
    amount: '70000',
  },
  {
    id: '1234564',
    name: 'Bộ kit vi điều khiển',
    barcode: '12421432143214324',
    price: '250000',
    num: '1',
    amount: '250000',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '2026-10-24 14:10',
    rate: 'Liên hệ sinh viên',
    status: 'processing',
    operator: 'Giảng viên ID1234',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2026-10-24 14:05',
    rate: 'Bắt đầu chấm bài',
    status: 'success',
    operator: 'Giảng viên ID1234',
    cost: '1h',
  },
  {
    key: '3',
    time: '2026-10-24 13:05',
    rate: 'Nhận bài nộp',
    status: 'success',
    operator: 'Giảng viên ID1234',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2026-10-24 13:00',
    rate: 'Duyệt đơn xin phép',
    status: 'success',
    operator: 'Hệ thống',
    cost: '1h',
  },
  {
    key: '5',
    time: '2026-10-24 12:00',
    rate: 'Gửi yêu cầu phúc khảo',
    status: 'success',
    operator: 'Sinh viên',
    cost: '5mins',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: 'Đăng ký học phần thành công',
    name: 'TS. Nguyễn Văn Hùng',
    status: 'agree',
    updatedAt: '2026-10-24 10:00:00',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'Phòng Đào tạo xác nhận',
    name: 'Trần Thị Mai',
    status: 'reject',
    updatedAt: '2026-10-24 11:00:00',
    memo: 'Lý do chưa đạt điều kiện tiên quyết',
  },
  {
    key: 'op3',
    type: 'Bộ môn duyệt',
    name: 'Lê Văn Cường',
    status: 'agree',
    updatedAt: '2026-10-24 12:00:00',
    memo: '-',
  },
  {
    key: 'op4',
    type: 'Nộp hồ sơ',
    name: 'Phạm Minh Tuấn',
    status: 'agree',
    updatedAt: '2026-10-24 13:00:00',
    memo: 'Đạt yêu cầu',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: 'Đăng ký học phần thành công',
    name: 'TS. Nguyễn Văn Hùng',
    status: 'agree',
    updatedAt: '2026-10-24 10:00:00',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'Bộ môn duyệt',
    name: 'Lê Văn Cường',
    status: 'agree',
    updatedAt: '2026-10-24 12:00:00',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: 'Nộp hồ sơ',
    name: 'Phạm Minh Tuấn',
    status: 'agree',
    updatedAt: '2026-10-24 13:00:00',
    memo: 'Đạt yêu cầu',
  },
];

const app = new Hono();

app.get('/basic', (c) => {
  return c.json({
    data: {
      basicGoods,
      basicProgress,
    },
  });
});

app.get('/advanced', (c) => {
  return c.json({
    data: {
      advancedOperation1,
      advancedOperation2,
      advancedOperation3,
    },
  });
});

export default app;
