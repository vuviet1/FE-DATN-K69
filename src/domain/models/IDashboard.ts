/**
 * @file IDashboard.ts
 * @description Domain Model Thống kê & Bảng điều khiển giảng viên
 */

export interface IDashboardOverview {
  totalStudents: number;
  activeClasses: number;
  averageGpa: number;
  averageAttendanceRate: number;
}

export interface IStudentAlertItem {
  id: string;
  studentCode: string;
  fullName: string;
  className: string;
  warningType: 'attendance' | 'gpa' | 'tuition';
  warningMessage: string;
  gpa?: number;
  absenceCount?: number;
}

export interface ITeachingActivity {
  id: string;
  classCode: string;
  className: string;
  time: string;
  room: string;
  lessonTitle: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}
