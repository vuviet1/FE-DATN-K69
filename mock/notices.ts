import type { Request, Response } from 'express';

const getNotices = (_req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/MSbDR4FR2MUAAAAAAAAAAAAAFl94AQBr',
        title: 'Có 45 sinh viên vừa nộp bài tập lớn môn Lập trình Web',
        datetime: '2026-10-24',
        type: 'notification',
      },
      {
        id: '000000002',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/hX-PTavYIq4AAAAAAAAAAAAAFl94AQBr',
        title: 'Phòng Đào tạo thông báo hạn nộp điểm giữa kỳ ngày 27/10',
        datetime: '2026-10-23',
        type: 'notification',
      },
      {
        id: '000000003',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/jHX5R5l3QjQAAAAAAAAAAAAAFl94AQBr',
        title: 'Sinh viên Nguyễn Hoàng Nam gửi thắc mắc về đề tài',
        description: 'Thưa Thầy, em xin phép gửi bản sửa đề cương đồ án đợt 1 ạ.',
        datetime: '2026-10-24',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000004',
        avatar:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Wr4mQqx6jfwAAAAAAAAAAAAAFl94AQBr',
        title: 'Sinh viên Trần Thị Mai đã nộp báo cáo thực tập',
        description: 'Báo cáo tuần 9 - Thực tập doanh nghiệp',
        datetime: '2026-10-23',
        type: 'message',
        clickClose: true,
      },
      {
        id: '000000005',
        title: 'Nhập điểm giữa kỳ lớp IT4409',
        description: 'Cần hoàn thành và khóa bảng điểm trước 17:00 ngày 27/10',
        extra: 'Sắp hết hạn',
        status: 'urgent',
        type: 'event',
      },
      {
        id: '000000006',
        title: 'Họp bộ môn Kỹ thuật phần mềm',
        description: 'Địa điểm: Văn phòng bộ môn tầng 4 nhà D9 lúc 09:00 Thứ 5',
        extra: 'Sắp diễn ra',
        status: 'processing',
        type: 'event',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
