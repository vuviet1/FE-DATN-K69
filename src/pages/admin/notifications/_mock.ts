/**
 * @file _mock.ts
 * @description Mock API endpoints cho module Cấu hình thông báo hệ thống
 */

import type { ISystemNotification } from '@domain/models';
import type { Request, Response } from 'express';

let notificationsDatabase: ISystemNotification[] = [
  {
    id: '1',
    title: 'Thông báo kế hoạch đăng ký tín chỉ và đóng học phí Học kỳ 2',
    content:
      'Phòng Đào tạo thông báo tới toàn thể sinh viên các khóa về thời gian mở cổng đăng ký học phần từ 05/11/2026 đến 15/11/2026. Sinh viên có nợ học phí vui lòng hoàn tất trước ngày 03/11 để được kích hoạt quyền đăng ký môn học.',
    type: 'fee',
    priority: 'high',
    targetType: 'all',
    targetName: 'Toàn bộ sinh viên & Giảng viên',
    channels: ['web', 'email'],
    status: 'published',
    sendAt: '28/10/2026 08:00',
    createdAt: '27/10/2026',
    createdBy: 'Phòng Đào tạo',
    readCount: 310,
    totalTarget: 384,
  },
  {
    id: '2',
    title:
      'Hạn chót nhập điểm giữa kỳ và xác nhận danh sách sinh viên vắng quá 20%',
    content:
      'Đề nghị quý Thầy/Cô phụ trách các lớp học phần hoàn thành nhập điểm kiểm tra giữa kỳ lên hệ thống trước 17h00 ngày 31/10/2026, đồng thời chốt danh sách sinh viên vắng mặt trên 20% tổng số tiết để Khoa ra quyết định cảnh báo.',
    type: 'academic',
    priority: 'urgent',
    targetType: 'lecturers',
    targetName: 'Tất cả Giảng viên',
    channels: ['web', 'email'],
    status: 'published',
    sendAt: '25/10/2026 10:30',
    createdAt: '25/10/2026',
    createdBy: 'Ban Quản lý Đào tạo',
    readCount: 26,
    totalTarget: 30,
  },
  {
    id: '3',
    title: 'Bảo trì và nâng cấp máy chủ cổng thông tin đào tạo SIS',
    content:
      'Hệ thống sẽ tiến hành bảo trì hạ tầng cơ sở dữ liệu định kỳ từ 23h00 ngày 31/10/2026 đến 02h00 ngày 01/11/2026. Trong thời gian này, các tính năng nhập điểm và xem hồ sơ có thể bị gián đoạn tạm thời.',
    type: 'system',
    priority: 'normal',
    targetType: 'all',
    targetName: 'Toàn bộ người dùng',
    channels: ['web'],
    status: 'scheduled',
    sendAt: '31/10/2026 20:00',
    createdAt: '29/10/2026',
    createdBy: 'Quản trị viên Hệ thống',
    readCount: 0,
    totalTarget: 384,
  },
  {
    id: '4',
    title:
      'Dự thảo thông báo Lễ trao bằng tốt nghiệp và Ngày hội việc làm 2026',
    content:
      'Nội dung chi tiết về thời gian nhận áo cử nhân, sơ duyệt lễ trao bằng và danh sách hơn 30 doanh nghiệp CNTT tham gia tuyển dụng trực tiếp tại Hội trường lớn C2.',
    type: 'academic',
    priority: 'normal',
    targetType: 'students',
    targetName: 'Sinh viên năm cuối',
    channels: ['web', 'email'],
    status: 'draft',
    sendAt: '',
    createdAt: '30/10/2026',
    createdBy: 'Phòng Đào tạo',
    readCount: 0,
    totalTarget: 120,
  },
];

export default {
  'GET /api/system/notifications': (req: Request, res: Response) => {
    const {
      keyword,
      type,
      priority,
      status,
      targetType,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;

    let filtered = [...notificationsDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(kw) ||
          n.content.toLowerCase().includes(kw),
      );
    }

    if (type) filtered = filtered.filter((n) => n.type === type);
    if (priority) filtered = filtered.filter((n) => n.priority === priority);
    if (status) filtered = filtered.filter((n) => n.status === status);
    if (targetType)
      filtered = filtered.filter((n) => n.targetType === targetType);

    const start = (Number(pageNumber) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    const pagedData = filtered.slice(start, end);

    res.json({
      data: pagedData,
      total: filtered.length,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      success: true,
    });
  },

  'GET /api/system/notifications/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const noti = notificationsDatabase.find((n) => n.id === id);
    if (!noti) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy thông báo', success: false });
      return;
    }
    res.json({ data: noti, success: true });
  },

  'POST /api/system/notifications': (req: Request, res: Response) => {
    const targetNames: Record<string, string> = {
      all: 'Toàn bộ người dùng',
      lecturers: 'Tất cả Giảng viên',
      students: 'Tất cả Sinh viên',
      class: 'Theo lớp học phần',
    };

    const newNoti: ISystemNotification = {
      ...req.body,
      id: String(Date.now()),
      targetName: targetNames[req.body.targetType] || 'Toàn trường',
      status: req.body.status || 'published',
      sendAt: req.body.status === 'published' ? '30/10/2026 10:20' : '',
      createdAt: '30/10/2026',
      createdBy: 'Quản trị viên Hệ thống',
      readCount: 0,
      totalTarget: req.body.targetType === 'lecturers' ? 30 : 384,
    };
    notificationsDatabase.unshift(newNoti);
    res.json({
      data: newNoti,
      success: true,
      message: 'Tạo thông báo thành công!',
    });
  },

  'PUT /api/system/notifications/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = notificationsDatabase.findIndex((n) => n.id === id);
    if (index === -1) {
      res
        .status(404)
        .json({ message: 'Không tìm thấy thông báo', success: false });
      return;
    }
    notificationsDatabase[index] = {
      ...notificationsDatabase[index],
      ...req.body,
    };
    res.json({
      data: notificationsDatabase[index],
      success: true,
      message: 'Cập nhật thành công!',
    });
  },

  'POST /api/system/notifications/:id/publish': (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const noti = notificationsDatabase.find((n) => n.id === id);
    if (noti) {
      noti.status = 'published';
      noti.sendAt = '30/10/2026 10:25';
      res.json({ success: true, message: 'Đã phát hành thông báo!' });
      return;
    }
    res
      .status(404)
      .json({ success: false, message: 'Không tìm thấy thông báo' });
  },

  'POST /api/system/notifications/:id/revoke': (
    req: Request,
    res: Response,
  ) => {
    const { id } = req.params;
    const noti = notificationsDatabase.find((n) => n.id === id);
    if (noti) {
      noti.status = 'revoked';
      res.json({ success: true, message: 'Đã thu hồi thông báo!' });
      return;
    }
    res
      .status(404)
      .json({ success: false, message: 'Không tìm thấy thông báo' });
  },

  'DELETE /api/system/notifications/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    notificationsDatabase = notificationsDatabase.filter((n) => n.id !== id);
    res.json({ success: true, message: 'Đã xóa thông báo thành công!' });
  },
};
