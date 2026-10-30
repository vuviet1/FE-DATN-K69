/**
 * @file IGrade.ts
 * @description Domain Model Bảng điểm & Kết quả học tập
 */

export interface IGradeItem {
  id: string;
  studentCode: string;
  fullName: string;
  attendanceScore: number; // 10%
  assignmentScore: number; // 20%
  midtermScore: number; // 20%
  finalScore: number; // 50%
  totalScore?: number;
  letterGrade?: string;
  isPassed?: boolean;
}

export interface IGradeClassSummary {
  classId: string;
  totalStudents: number;
  averageScore: number;
  passedCount: number;
  failedCount: number;
  passRate: number;
}

export interface IGradeSubmit {
  classId: string;
  grades: IGradeItem[];
}
