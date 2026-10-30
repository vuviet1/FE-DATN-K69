/**
 * @file _mock.ts
 * @description Mock API endpoints cho Quản lý Học phí & Công nợ theo tín chỉ chuẩn HUST
 */

import type { ITuitionFee } from '@domain/models';
import type { Request, Response } from 'express';

const tuitionDatabase: ITuitionFee[] = [
  {
    id: 't1',
    studentId: 's1',
    studentCode: '2021001',
    studentName: 'Nguyễn Hoàng Nam',
    classCode: 'IT1-02 K66',
    department: 'Trường CNTT&TT',
    cohort: 'K66',
    semester: '2026.1',
    totalRegisteredCredits: 20,
    unitPricePerCredit: 480000,
    totalAmount: 9600000,
    exemptionAmount: 0,
    amountToPay: 9600000,
    paidAmount: 9600000,
    remainingAmount: 0,
    status: 'PAID',
    dueDate: '15/11/2026',
    paidAt: '28/10/2026 14:15',
    transactionRef: 'VNPAY_99182374',
  },
  {
    id: 't2',
    studentId: 's2',
    studentCode: '2021002',
    studentName: 'Trần Thị Mai',
    classCode: 'IT1-02 K66',
    department: 'Trường CNTT&TT',
    cohort: 'K66',
    semester: '2026.1',
    totalRegisteredCredits: 18,
    unitPricePerCredit: 480000,
    totalAmount: 8640000,
    exemptionAmount: 4320000, // Miễn 50% chính sách
    amountToPay: 4320000,
    paidAmount: 4320000,
    remainingAmount: 0,
    status: 'PAID',
    dueDate: '15/11/2026',
    paidAt: '25/10/2026 09:30',
    transactionRef: 'MB_20261025_0019',
  },
  {
    id: 't3',
    studentId: 's3',
    studentCode: '2022451',
    studentName: 'Trần Minh Đức',
    classCode: 'IT2-01 K67',
    department: 'Trường CNTT&TT',
    cohort: 'K67',
    semester: '2026.1',
    totalRegisteredCredits: 21,
    unitPricePerCredit: 480000,
    totalAmount: 10080000,
    exemptionAmount: 0,
    amountToPay: 10080000,
    paidAmount: 5000000,
    remainingAmount: 5080000,
    status: 'PARTIAL',
    dueDate: '15/11/2026',
    paidAt: '29/10/2026 16:40',
    transactionRef: 'VCB_77192834',
  },
  {
    id: 't4',
    studentId: 's4',
    studentCode: '2023102',
    studentName: 'Vũ Thị Phương Thảo',
    classCode: 'MI2-01 K68',
    department: 'Khoa Toán - Tin',
    cohort: 'K68',
    semester: '2026.1',
    totalRegisteredCredits: 19,
    unitPricePerCredit: 450000,
    totalAmount: 8550000,
    exemptionAmount: 8550000, // Miễn 100%
    amountToPay: 0,
    paidAmount: 0,
    remainingAmount: 0,
    status: 'EXEMPT',
    dueDate: '15/11/2026',
    transactionRef: 'MIEN_GIAM_CSXH_2026',
  },
  {
    id: 't5',
    studentId: 's5',
    studentCode: '2020332',
    studentName: 'Hoàng Văn Sơn',
    classCode: 'ME-02 K65',
    department: 'Trường Cơ khí',
    cohort: 'K65',
    semester: '2026.1',
    totalRegisteredCredits: 16,
    unitPricePerCredit: 480000,
    totalAmount: 7680000,
    exemptionAmount: 0,
    amountToPay: 7680000,
    paidAmount: 0,
    remainingAmount: 7680000,
    status: 'UNPAID',
    dueDate: '15/11/2026',
  },
];

export default {
  'GET /api/finance/tuition': (req: Request, res: Response) => {
    const {
      keyword,
      status,
      semester,
      pageNumber = 1,
      pageSize = 10,
    } = req.query as any;
    let list = [...tuitionDatabase];

    if (keyword) {
      const kw = String(keyword).toLowerCase();
      list = list.filter(
        (t) =>
          t.studentCode.toLowerCase().includes(kw) ||
          t.studentName.toLowerCase().includes(kw) ||
          t.classCode.toLowerCase().includes(kw),
      );
    }
    if (status) list = list.filter((t) => t.status === status);
    if (semester) list = list.filter((t) => t.semester === semester);

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

  'POST /api/finance/tuition/:id/pay': (req: Request, res: Response) => {
    const { id } = req.params;
    const { amount, transactionRef } = req.body;
    const item = tuitionDatabase.find((t) => t.id === id);
    if (!item) {
      res
        .status(404)
        .json({ success: false, message: 'Không tìm thấy hóa đơn học phí' });
      return;
    }
    item.paidAmount += Number(amount);
    item.remainingAmount = Math.max(0, item.amountToPay - item.paidAmount);
    item.status = item.remainingAmount === 0 ? 'PAID' : 'PARTIAL';
    item.paidAt = '30/10/2026 11:45';
    item.transactionRef = transactionRef || `CASH_${Date.now()}`;

    res.json({
      success: true,
      message: 'Ghi nhận nộp học phí thành công!',
      data: item,
    });
  },
};
