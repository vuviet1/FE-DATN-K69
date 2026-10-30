/**
 * @file IAttendance.ts
 * @description Domain Model Điểm danh sinh viên
 */

export type AttendanceStatus = 'present' | 'late' | 'excused' | 'absent';

export interface IAttendanceRecord {
  id: string;
  studentCode: string;
  fullName: string;
  avatar?: string;
  totalAbsences: number; // Tổng số buổi đã vắng trước đây
  status: AttendanceStatus;
  note?: string;
}

export interface IAttendanceClassReport {
  classId: string;
  date: string;
  totalStudents: number;
  presentCount: number;
  lateCount: number;
  excusedCount: number;
  absentCount: number;
}

export interface IAttendanceSubmit {
  classId: string;
  date: string;
  records: IAttendanceRecord[];
}
