/**
 * @file _mock.ts
 * @description Mock API endpoints cho Danh mục học phần & Chương trình đào tạo chuẩn HUST
 */

import type { ICourse } from '@domain/models';
import type { Request, Response } from 'express';

let coursesDatabase: ICourse[] = [
  {
    id: '1',
    code: 'IT3011',
    name: 'Cấu trúc dữ liệu và giải thuật',
    credits: 3,
    tuitionCredits: 3.5,
    theoryHours: 30,
    exerciseHours: 15,
    labHours: 15,
    courseType: 'fundamental',
    department: 'Khoa Khoa học máy tính - ĐHBK Hà Nội',
    prerequisiteCodes: ['IT1110'],
    description:
      'Nghiên cứu các cấu trúc dữ liệu cơ bản (danh sách, cây, đồ thị, bảng băm) và các giải thuật tìm kiếm, sắp xếp kinh điển.',
    status: 1,
  },
  {
    id: '2',
    code: 'IT3020',
    name: 'Toán rời rạc',
    credits: 3,
    tuitionCredits: 3,
    theoryHours: 30,
    exerciseHours: 15,
    labHours: 0,
    courseType: 'fundamental',
    department: 'Khoa Toán - Tin',
    prerequisiteCodes: ['MI1111'],
    description:
      'Lý thuyết tập hợp, quan hệ, hàm, đại số Boole, lý thuyết đồ thị và ứng dụng trong khoa học máy tính.',
    status: 1,
  },
  {
    id: '3',
    code: 'IT3040',
    name: 'Kỹ thuật lập trình',
    credits: 3,
    tuitionCredits: 3.5,
    theoryHours: 30,
    exerciseHours: 15,
    labHours: 15,
    courseType: 'fundamental',
    department: 'Khoa Kỹ thuật phần mềm',
    prerequisiteCodes: ['IT1110'],
    description:
      'Lập trình hướng đối tượng nâng cao, quản lý bộ nhớ, con trỏ, Generic Programming và Design Patterns trong C++/Java.',
    status: 1,
  },
  {
    id: '4',
    code: 'IT3080',
    name: 'Mạng máy tính',
    credits: 3,
    tuitionCredits: 3,
    theoryHours: 30,
    exerciseHours: 15,
    labHours: 15,
    courseType: 'fundamental',
    department: 'Khoa Truyền thông & Mạng máy tính',
    prerequisiteCodes: ['IT3011'],
    description:
      'Mô hình OSI, giao thức TCP/IP, định tuyến, bảo mật mạng và thực hành cấu hình mạng Cisco.',
    status: 1,
  },
  {
    id: '5',
    code: 'MI1111',
    name: 'Giải tích 1',
    credits: 4,
    tuitionCredits: 4,
    theoryHours: 45,
    exerciseHours: 30,
    labHours: 0,
    courseType: 'general',
    department: 'Khoa Toán - Tin',
    prerequisiteCodes: [],
    description:
      'Hàm một biến, giới hạn, đạo hàm, vi phân, tích phân bất định và xác định, chuỗi số.',
    status: 1,
  },
  {
    id: '6',
    code: 'PH1110',
    name: 'Vật lý đại cương 1',
    credits: 3,
    tuitionCredits: 3,
    theoryHours: 30,
    exerciseHours: 15,
    labHours: 15,
    courseType: 'general',
    department: 'Khoa Vật lý kỹ thuật',
    prerequisiteCodes: [],
    description:
      'Cơ học chất điểm và vật rắn, dao động và sóng, thuyết tương đối hẹp.',
    status: 1,
  },
  {
    id: '7',
    code: 'IT4409',
    name: 'Công nghệ Web và dịch vụ trực tuyến',
    credits: 3,
    tuitionCredits: 3.5,
    theoryHours: 30,
    exerciseHours: 15,
    labHours: 15,
    courseType: 'specialized',
    department: 'Khoa Kỹ thuật phần mềm',
    prerequisiteCodes: ['IT3040', 'IT3080'],
    description:
      'Kiến trúc ứng dụng web hiện đại (React, Vue, Node.js, Spring Boot), RESTful API, Microservices.',
    status: 1,
  },
  {
    id: '8',
    code: 'IT4995',
    name: 'Đồ án tốt nghiệp Kỹ sư CNTT',
    credits: 12,
    tuitionCredits: 15,
    theoryHours: 0,
    exerciseHours: 0,
    labHours: 180,
    courseType: 'graduation',
    department: 'Trường CNTT&TT - ĐHBK Hà Nội',
    prerequisiteCodes: ['IT4409'],
    description:
      'Thực hiện đề tài nghiên cứu hoặc phát triển hệ thống phần mềm hoàn chỉnh dưới sự hướng dẫn của giảng viên.',
    status: 1,
  },
];

export default {
  'GET /api/academic/courses': (req: Request, res: Response) => {
    const {
      keyword,
      courseType,
      status,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;
    let list = [...coursesDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (c) =>
          c.code.toLowerCase().includes(kw) ||
          c.name.toLowerCase().includes(kw),
      );
    }
    if (courseType) list = list.filter((c) => c.courseType === courseType);
    if (status !== undefined && status !== '')
      list = list.filter((c) => c.status === Number(status));

    const start = (Number(pageNumber) - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    const paged = list.slice(start, end);

    res.json({
      data: paged,
      total: list.length,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      success: true,
    });
  },

  'POST /api/academic/courses': (req: Request, res: Response) => {
    const newCourse: ICourse = {
      ...req.body,
      id: String(Date.now()),
      status: req.body.status ?? 1,
    };
    coursesDatabase.unshift(newCourse);
    res.json({
      data: newCourse,
      success: true,
      message: 'Thêm học phần thành công!',
    });
  },

  'PUT /api/academic/courses/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const index = coursesDatabase.findIndex((c) => c.id === id);
    if (index === -1) {
      res
        .status(404)
        .json({ success: false, message: 'Không tìm thấy học phần' });
      return;
    }
    coursesDatabase[index] = { ...coursesDatabase[index], ...req.body };
    res.json({
      data: coursesDatabase[index],
      success: true,
      message: 'Cập nhật học phần thành công!',
    });
  },

  'DELETE /api/academic/courses/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    coursesDatabase = coursesDatabase.filter((c) => c.id !== id);
    res.json({ success: true, message: 'Đã xóa học phần thành công!' });
  },
};
