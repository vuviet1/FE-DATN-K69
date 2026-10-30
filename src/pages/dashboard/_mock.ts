/**
 * @file _mock.ts
 * @description Mock API endpoints cho Dashboard giảng viên
 */

import type {
  IDashboardOverview,
  IStudentAlertItem,
  ITeachingActivity,
} from '@domain/models';
import type { Request, Response } from 'express';

const overviewData: IDashboardOverview = {
  totalStudents: 168,
  activeClasses: 4,
  averageGpa: 3.12,
  averageAttendanceRate: 92.5,
};

const activitiesData: ITeachingActivity[] = [
  {
    id: '1',
    classCode: 'IT4409',
    className: 'Lập trình Web nâng cao',
    time: '07:30 - 09:50 (Ca 1)',
    room: 'Phòng D9-301',
    lessonTitle: 'Bài 10: Xây dựng Kiến trúc Clean trong React',
    status: 'upcoming',
  },
  {
    id: '2',
    classCode: 'IT3090',
    className: 'Cơ sở dữ liệu phân tán',
    time: '12:30 - 15:00 (Ca 2)',
    room: 'Phòng D3-102',
    lessonTitle: 'Bài 7: Sharding & Replication trong MongoDB',
    status: 'upcoming',
  },
];

const alertsData: IStudentAlertItem[] = [
  {
    id: '1',
    studentCode: '2021006',
    fullName: 'Đỗ Đức Thắng',
    className: 'CNTT2-K65',
    warningType: 'attendance',
    warningMessage: 'Vắng 4 buổi (Nguy cơ cấm thi)',
    absenceCount: 4,
  },
  {
    id: '2',
    studentCode: '2021003',
    fullName: 'Lê Văn Cường',
    className: 'KTPM2-K65',
    warningType: 'gpa',
    warningMessage: 'Điểm GPA dưới 2.0 (Cảnh báo học tập)',
    gpa: 1.95,
  },
];

export default {
  'GET /api/dashboard/overview': (_req: Request, res: Response) => {
    res.json(overviewData);
  },

  'GET /api/dashboard/activities': (_req: Request, res: Response) => {
    res.json(activitiesData);
  },

  'GET /api/dashboard/alerts': (_req: Request, res: Response) => {
    res.json(alertsData);
  },
};
