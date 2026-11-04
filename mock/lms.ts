import type { Request, Response } from 'express';

// Khởi tạo Mock Database cho LMS Mạng xã hội học tập
export const mockClasses = [
  {
    id: 'cls-1',
    code: 'WEB2026',
    name: 'Kỹ thuật Lập trình Web Hiện đại',
    courseCode: 'IT4409',
    credits: 3,
    teacherId: 'GV202401',
    teacherName: 'TS. Nguyễn Văn Hùng',
    teacherEmail: 'hung.nguyen@lms.edu.vn',
    teacherAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    semester: 'Học kỳ 1 - 2026-2027',
    room: 'D9-501',
    schedule: 'Thứ 2 (06:45 - 09:15)',
    studentCount: 48,
    status: 'active', // 'active' | 'closed'
    description: 'Nghiên cứu kiến trúc Single Page Application, React 19, TypeScript, REST API và triển khai ứng dụng đám mây.',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    createdAt: '2026-09-01T08:00:00Z',
  },
  {
    id: 'cls-2',
    code: 'SE3100',
    name: 'Công nghệ Phần mềm & Quản lý Dự án',
    courseCode: 'IT3100',
    credits: 3,
    teacherId: 'GV202401',
    teacherName: 'TS. Nguyễn Văn Hùng',
    teacherEmail: 'hung.nguyen@lms.edu.vn',
    teacherAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    semester: 'Học kỳ 1 - 2026-2027',
    room: 'TC-205',
    schedule: 'Thứ 4 (12:30 - 15:00)',
    studentCount: 52,
    status: 'active',
    description: 'Quy trình phát triển phần mềm chuẩn Agile/Scrum, thiết kế kiến trúc hệ thống và đảm bảo chất lượng kiểm thử.',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    createdAt: '2026-09-02T08:00:00Z',
  },
  {
    id: 'cls-3',
    code: 'AI401',
    name: 'Nhập môn Trí tuệ Nhân tạo & Học máy',
    courseCode: 'IT4100',
    credits: 4,
    teacherId: 'GV202402',
    teacherName: 'PGS.TS Trần Quang',
    teacherEmail: 'quang.tran@lms.edu.vn',
    teacherAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
    semester: 'Học kỳ 1 - 2026-2027',
    room: 'B1-302',
    schedule: 'Thứ 5 (09:25 - 11:55)',
    studentCount: 60,
    status: 'active',
    description: 'Các giải thuật tìm kiếm, học có giám sát, mạng nơ-ron tích chập và các mô hình ngôn ngữ lớn (LLM).',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    createdAt: '2026-09-03T08:00:00Z',
  },
  {
    id: 'cls-4',
    code: 'DSA202',
    name: 'Cấu trúc Dữ liệu & Giải thuật Ứng dụng',
    courseCode: 'IT3011',
    credits: 3,
    teacherId: 'GV202403',
    teacherName: 'TS. Lê Hải Yến',
    teacherEmail: 'yen.le@lms.edu.vn',
    teacherAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    semester: 'Học kỳ 2 - 2025-2026',
    room: 'D3-101',
    schedule: 'Thứ 6 (15:05 - 17:35)',
    studentCount: 55,
    status: 'closed',
    description: 'Tối ưu độ phức tạp thuật toán, cây nhị phân, đồ thị và quy hoạch động áp dụng trong các bài toán thực tế.',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
    createdAt: '2026-02-15T08:00:00Z',
  },
];

export const mockPosts = [
  {
    id: 'post-1',
    classId: 'cls-1',
    className: 'Kỹ thuật Lập trình Web Hiện đại',
    authorId: 'GV202401',
    authorName: 'TS. Nguyễn Văn Hùng',
    authorRole: 'teacher',
    authorAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    title: 'Thông báo: Lịch nộp Bài tập lớn số 01 và tài liệu tham khảo Ant Design Pro',
    content: 'Chào cả lớp, thầy đã đăng tải tài liệu hướng dẫn và đề cương Bài tập lớn 01 về việc xây dựng giao diện Mạng xã hội học tập. Các nhóm chú ý thời hạn nộp bài là 23:59 ngày Chủ Nhật tuần sau. Đề nghị các nhóm nộp link repository GitHub và đường dẫn video demo.',
    attachments: [
      { name: 'De_Cuong_BTL_01_Web2026.pdf', size: '2.4 MB', url: '#' },
      { name: 'Huong_dan_AntDesignPro_React19.docx', size: '1.1 MB', url: '#' },
    ],
    createdAt: '2026-11-02T09:30:00Z',
    likesCount: 18,
    userLiked: true,
    status: 'active', // 'active' | 'hidden'
    comments: [
      {
        id: 'cmt-1',
        authorName: 'Lê Văn Minh',
        authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        authorRole: 'student',
        content: 'Thầy ơi, bài nộp nhóm hay bài cá nhân ạ? Nếu nộp link GitHub thì nhóm có cần gán quyền xem không thầy?',
        createdAt: '2026-11-02T10:15:00Z',
      },
      {
        id: 'cmt-2',
        authorName: 'TS. Nguyễn Văn Hùng',
        authorAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        authorRole: 'teacher',
        content: 'Bài nộp cá nhân nhưng các em có thể làm việc nhóm để trao đổi. Repository GitHub các em để chế độ Public hoặc add tài khoản thầy nhé!',
        createdAt: '2026-11-02T10:25:00Z',
      },
    ],
  },
  {
    id: 'post-2',
    classId: 'cls-1',
    className: 'Kỹ thuật Lập trình Web Hiện đại',
    authorId: 'student-2101',
    authorName: 'Trần Thị Mai',
    authorRole: 'student',
    authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    title: 'Hỏi đáp: Lỗi cấu hình TanStack Query v5 khi fetch dữ liệu từ Cloudflare Worker',
    content: 'Các bạn cho mình hỏi khi dùng queryClient.prefetchQuery trên React 19 có ai bị lỗi hydration mismatch không? Mình đính kèm ảnh chụp màn hình console log bên dưới.',
    attachments: [
      { name: 'error-hydration-log.png', size: '420 KB', url: '#' },
    ],
    createdAt: '2026-11-03T14:20:00Z',
    likesCount: 7,
    userLiked: false,
    status: 'active',
    comments: [
      {
        id: 'cmt-3',
        authorName: 'Đặng Thùy Dung',
        authorAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
        authorRole: 'student',
        content: 'Bạn kiểm tra lại SSR mode xem, nếu dùng client-side Umi Max thì tắt ssr trong .umirc hoặc config.ts đi là hết nhé!',
        createdAt: '2026-11-03T15:00:00Z',
      },
    ],
  },
  {
    id: 'post-3',
    classId: 'cls-2',
    className: 'Công nghệ Phần mềm & Quản lý Dự án',
    authorId: 'GV202401',
    authorName: 'TS. Nguyễn Văn Hùng',
    authorRole: 'teacher',
    authorAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    title: 'Tài liệu bài giảng Tuần 8: Đặc tả yêu cầu phần mềm theo chuẩn SRS IEEE 830',
    content: 'Thầy gửi cả lớp slide bài giảng tuần 8 và mẫu file phân tích đặc tả chức năng (Functional Specifications). Các nhóm lưu ý áp dụng vào tài liệu báo cáo tiến độ đồ án tốt nghiệp.',
    attachments: [
      { name: 'Slide_Tuan08_SRS_IEEE830.pdf', size: '3.8 MB', url: '#' },
      { name: 'SRS_Template_Vietnam_Standard.docx', size: '850 KB', url: '#' },
    ],
    createdAt: '2026-11-01T08:00:00Z',
    likesCount: 24,
    userLiked: true,
    status: 'active',
    comments: [],
  },
];

export const mockAssignments = [
  {
    id: 'asm-1',
    classId: 'cls-1',
    className: 'Kỹ thuật Lập trình Web Hiện đại',
    title: 'Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design',
    description: 'Yêu cầu: Sinh viên sử dụng React 19, TypeScript và thư viện Ant Design Pro để xây dựng giao diện hoàn chỉnh các phân hệ: Admin, Giảng viên và Sinh viên. Đảm bảo kiểm tra phân quyền, bố cục responsive và các bảng quản trị trực quan.',
    attachments: [
      { name: 'Yeu_cau_chi_tiet_BT01.pdf', size: '1.5 MB', url: '#' },
    ],
    maxScore: 10,
    dueDate: '2026-11-15T23:59:59Z',
    allowLate: true,
    latePenalty: 'Trừ 1 điểm mỗi ngày nộp muộn',
    status: 'active',
    totalStudents: 48,
    submittedCount: 42,
    gradedCount: 28,
  },
  {
    id: 'asm-2',
    classId: 'cls-1',
    className: 'Kỹ thuật Lập trình Web Hiện đại',
    title: 'Bài tập 02: Tích hợp REST API, JWT Authentication & Prisma ORM',
    description: 'Xây dựng Backend bằng Node.js / Express, định nghĩa schema Prisma PostgreSQL cho các bảng: Users, Classes, Posts, Assignments, Submissions. Cài đặt JWT và bảo vệ API theo vai trò.',
    attachments: [
      { name: 'Prisma_Schema_Guideline.pdf', size: '890 KB', url: '#' },
    ],
    maxScore: 10,
    dueDate: '2026-11-28T23:59:59Z',
    allowLate: false,
    latePenalty: 'Không nhận bài quá hạn',
    status: 'active',
    totalStudents: 48,
    submittedCount: 15,
    gradedCount: 0,
  },
  {
    id: 'asm-3',
    classId: 'cls-2',
    className: 'Công nghệ Phần mềm & Quản lý Dự án',
    title: 'Báo cáo Tiến độ 01: Sơ đồ Use Case, ERD và Đặc tả yêu cầu người dùng',
    description: 'Nộp báo cáo tiến độ tuần theo mẫu Word đính kèm. Vẽ chi tiết biểu đồ thực thể quan hệ cơ sở dữ liệu và sơ đồ luồng hoạt động người dùng.',
    attachments: [
      { name: 'Bao_cao_tien_do_Mau.docx', size: '520 KB', url: '#' },
    ],
    maxScore: 10,
    dueDate: '2026-11-08T23:59:59Z',
    allowLate: true,
    latePenalty: 'Trừ 0.5 điểm mỗi ngày',
    status: 'active',
    totalStudents: 52,
    submittedCount: 50,
    gradedCount: 45,
  },
];

export const mockSubmissions = [
  {
    id: 'sub-1',
    assignmentId: 'asm-1',
    assignmentTitle: 'Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design',
    studentId: 'SV2021001',
    studentName: 'Lê Văn Minh',
    studentCode: '20210001',
    studentEmail: 'minh.lv2100@lms.edu.vn',
    studentAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    submissionUrl: 'https://github.com/minh-le/student-management-frontend',
    attachments: [
      { name: 'Bao_cao_Giao_dien_LeVanMinh.pdf', size: '3.1 MB', url: '#' },
      { name: 'Screenshot_Demo.zip', size: '8.5 MB', url: '#' },
    ],
    note: 'Em đã hoàn thiện đầy đủ giao diện Admin, Giáo viên và Sinh viên theo đúng yêu cầu đề bài. Link preview đã deploy trên Cloudflare Pages.',
    submittedAt: '2026-11-03T18:45:00Z',
    status: 'graded', // 'submitted' | 'graded' | 'late'
    isLate: false,
    score: 9.5,
    feedback: 'Giao diện thiết kế rất chỉn chu, bố cục trực quan, đầy đủ các chức năng theo đặc tả. Mã nguồn sạch sẽ, tuân thủ Biome lint và TypeScript strict. Điểm cộng cho việc tối ưu bộ chọn vai trò.',
    gradedAt: '2026-11-04T08:00:00Z',
    gradedBy: 'TS. Nguyễn Văn Hùng',
    history: [
      {
        version: 1,
        submittedAt: '2026-11-02T14:10:00Z',
        url: 'https://github.com/minh-le/student-management-frontend/commit/v1.0.0',
        note: 'Bản nộp khởi tạo ban đầu',
      },
      {
        version: 2,
        submittedAt: '2026-11-03T18:45:00Z',
        url: 'https://github.com/minh-le/student-management-frontend/commit/v1.1.0',
        note: 'Bổ sung thêm màn hình chi tiết bài tập và nộp bài',
      },
    ],
  },
  {
    id: 'sub-2',
    assignmentId: 'asm-1',
    assignmentTitle: 'Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design',
    studentId: 'SV2021002',
    studentName: 'Trần Thị Mai',
    studentCode: '20210002',
    studentEmail: 'mai.tt2100@lms.edu.vn',
    studentAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    submissionUrl: 'https://github.com/maitt/student-lms-ui',
    attachments: [
      { name: 'Bao_cao_MaiTT.pdf', size: '2.1 MB', url: '#' },
    ],
    note: 'Em xin nộp bài tập 1 ạ.',
    submittedAt: '2026-11-03T20:10:00Z',
    status: 'graded',
    isLate: false,
    score: 8.8,
    feedback: 'Bài làm tốt, giao diện tương tác mượt mà. Cần chú ý thêm về responsive trên màn hình tablet.',
    gradedAt: '2026-11-04T08:10:00Z',
    gradedBy: 'TS. Nguyễn Văn Hùng',
    history: [
      {
        version: 1,
        submittedAt: '2026-11-03T20:10:00Z',
        url: 'https://github.com/maitt/student-lms-ui',
        note: 'Bản nộp chính thức',
      },
    ],
  },
  {
    id: 'sub-3',
    assignmentId: 'asm-1',
    assignmentTitle: 'Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design',
    studentId: 'SV2021003',
    studentName: 'Nguyễn Hoàng Nam',
    studentCode: '20210003',
    studentEmail: 'nam.nh2100@lms.edu.vn',
    studentAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    submissionUrl: 'https://github.com/namnh/ant-social-learning',
    attachments: [],
    note: 'Bài nộp đúng hạn, em có đính kèm video link trong readme ạ.',
    submittedAt: '2026-11-04T07:20:00Z',
    status: 'submitted', // Chưa chấm
    isLate: false,
    score: null,
    feedback: null,
    gradedAt: null,
    history: [
      {
        version: 1,
        submittedAt: '2026-11-04T07:20:00Z',
        url: 'https://github.com/namnh/ant-social-learning',
        note: 'Bản nộp 1',
      },
    ],
  },
  {
    id: 'sub-4',
    assignmentId: 'asm-1',
    assignmentTitle: 'Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design',
    studentId: 'SV2021004',
    studentName: 'Đỗ Đức Thắng',
    studentCode: '20210004',
    studentEmail: 'thang.dd2100@lms.edu.vn',
    studentAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    submissionUrl: 'https://github.com/thangdd/react-lms',
    attachments: [],
    note: 'Em nộp bài trễ 10 phút do mạng chập chờn, thầy thông cảm giúp em ạ.',
    submittedAt: '2026-11-04T08:10:00Z',
    status: 'late',
    isLate: true,
    score: null,
    feedback: null,
    gradedAt: null,
    history: [],
  },
];

export const mockClassStudents = [
  {
    id: 'SV2021001',
    code: '20210001',
    fullName: 'Lê Văn Minh',
    email: 'minh.lv2100@lms.edu.vn',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    joinedAt: '2026-09-05',
    submittedCount: 3,
    avgScore: 9.2,
    status: 'active',
  },
  {
    id: 'SV2021002',
    code: '20210002',
    fullName: 'Trần Thị Mai',
    email: 'mai.tt2100@lms.edu.vn',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    joinedAt: '2026-09-05',
    submittedCount: 3,
    avgScore: 8.8,
    status: 'active',
  },
  {
    id: 'SV2021003',
    code: '20210003',
    fullName: 'Nguyễn Hoàng Nam',
    email: 'nam.nh2100@lms.edu.vn',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    joinedAt: '2026-09-06',
    submittedCount: 2,
    avgScore: 8.5,
    status: 'active',
  },
  {
    id: 'SV2021004',
    code: '20210004',
    fullName: 'Đỗ Đức Thắng',
    email: 'thang.dd2100@lms.edu.vn',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    joinedAt: '2026-09-07',
    submittedCount: 2,
    avgScore: 7.6,
    status: 'active',
  },
  {
    id: 'SV2021005',
    code: '20210005',
    fullName: 'Đặng Thùy Dung',
    email: 'dung.dt2100@lms.edu.vn',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
    joinedAt: '2026-09-08',
    submittedCount: 3,
    avgScore: 9.0,
    status: 'active',
  },
];

export const mockAuditLogs = [
  {
    id: 'log-1',
    timestamp: '2026-11-04T08:15:20Z',
    actor: 'admin',
    actorName: 'Quản trị viên Hệ thống',
    action: 'LOCK_USER',
    targetType: 'User',
    targetName: 'nguyen.van.x@lms.edu.vn',
    details: 'Khóa tài khoản sinh viên do có hành vi spam bình luận trên bảng tin lớp học.',
    ipAddress: '192.168.1.10',
    status: 'success',
  },
  {
    id: 'log-2',
    timestamp: '2026-11-04T07:45:00Z',
    actor: 'admin',
    actorName: 'Quản trị viên Hệ thống',
    action: 'IMPORT_USERS',
    targetType: 'System',
    targetName: 'DanhSach_K66_CNTT.xlsx',
    details: 'Nhập hàng loạt thành công 120 sinh viên mới vào lớp Kỹ thuật Lập trình Web.',
    ipAddress: '192.168.1.10',
    status: 'success',
  },
  {
    id: 'log-3',
    timestamp: '2026-11-03T16:20:11Z',
    actor: 'admin',
    actorName: 'Quản trị viên Hệ thống',
    action: 'HIDE_POST',
    targetType: 'Post',
    targetName: 'Bài viết #post-99',
    details: 'Ẩn bài viết chứa ngôn từ không chuẩn mực trên bảng tin môn học.',
    ipAddress: '192.168.1.10',
    status: 'success',
  },
  {
    id: 'log-4',
    timestamp: '2026-11-03T09:10:00Z',
    actor: 'admin',
    actorName: 'Quản trị viên Hệ thống',
    action: 'UPDATE_CLASS',
    targetType: 'Class',
    targetName: 'WEB2026 - Kỹ thuật Lập trình Web Hiện đại',
    details: 'Cập nhật lại giảng viên phụ trách sang TS. Nguyễn Văn Hùng.',
    ipAddress: '192.168.1.10',
    status: 'success',
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'assignment',
    title: 'Bài tập mới vừa được giao',
    message: 'TS. Nguyễn Văn Hùng đã giao bài tập mới: "Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design" trong lớp WEB2026.',
    link: '/student/assignments/asm-1',
    read: false,
    createdAt: '2026-11-03T10:00:00Z',
  },
  {
    id: 'notif-2',
    type: 'grade',
    title: 'Bài nộp của bạn đã được chấm điểm',
    message: 'Bạn đã đạt 9.5 điểm cho "Bài tập 01". Nhận xét: "Giao diện thiết kế rất chỉn chu, bố cục trực quan...".',
    link: '/student/submissions/sub-1',
    read: false,
    createdAt: '2026-11-04T08:00:00Z',
  },
  {
    id: 'notif-3',
    type: 'post',
    title: 'Thông báo mới trong lớp Kỹ thuật Lập trình Web',
    message: 'Giảng viên đã đăng thông báo mới về tài liệu tham khảo Ant Design Pro và cấu trúc dự án.',
    link: '/student/classes/cls-1',
    read: true,
    createdAt: '2026-11-02T09:30:00Z',
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Cập nhật hệ thống định kỳ',
    message: 'Hệ thống đã nâng cấp lên Ant Design 6 và hỗ trợ nộp bài tệp đính kèm tối đa 20MB.',
    link: '#',
    read: true,
    createdAt: '2026-11-01T00:00:00Z',
  },
];

// Handlers
export default {
  // Lấy danh sách lớp học
  'GET /api/lms/classes': (req: Request, res: Response) => {
    const { teacherId, status, search } = req.query;
    let list = [...mockClasses];
    if (teacherId) {
      list = list.filter((c) => c.teacherId === teacherId);
    }
    if (status) {
      list = list.filter((c) => c.status === status);
    }
    if (search) {
      const q = String(search).toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q));
    }
    res.send({ success: true, data: list });
  },

  // Chi tiết lớp học
  'GET /api/lms/classes/:id': (req: Request, res: Response) => {
    const item = mockClasses.find((c) => c.id === req.params.id) || mockClasses[0];
    res.send({ success: true, data: item });
  },

  // Tạo lớp học mới
  'POST /api/lms/classes': (req: Request, res: Response) => {
    const newClass = {
      id: `cls-${Date.now()}`,
      code: req.body.code || `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      name: req.body.name,
      courseCode: req.body.courseCode || 'IT4000',
      credits: req.body.credits || 3,
      teacherId: 'GV202401',
      teacherName: 'TS. Nguyễn Văn Hùng',
      teacherEmail: 'hung.nguyen@lms.edu.vn',
      teacherAvatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      semester: req.body.semester || 'Học kỳ 1 - 2026-2027',
      room: req.body.room || 'Online / MS Teams',
      schedule: req.body.schedule || 'Linh hoạt',
      studentCount: 0,
      status: 'active',
      description: req.body.description || '',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
      createdAt: new Date().toISOString(),
    };
    mockClasses.unshift(newClass);
    res.send({ success: true, data: newClass });
  },

  // Tham gia lớp học bằng mã (D3)
  'POST /api/lms/classes/join': (req: Request, res: Response) => {
    const { code } = req.body;
    const targetClass = mockClasses.find(
      (c) => c.code.trim().toUpperCase() === String(code).trim().toUpperCase()
    );
    if (!targetClass) {
      res.status(400).send({
        success: false,
        errorMessage: 'Mã lớp không tồn tại hoặc đã hết hạn!',
      });
      return;
    }
    if (targetClass.status === 'closed') {
      res.status(400).send({
        success: false,
        errorMessage: 'Lớp học này hiện đã đóng nhận thành viên mới!',
      });
      return;
    }
    targetClass.studentCount += 1;
    res.send({
      success: true,
      data: targetClass,
      message: `Tham gia thành công lớp: ${targetClass.name} (${targetClass.code})!`,
    });
  },

  // Bảng tin lớp
  'GET /api/lms/posts': (req: Request, res: Response) => {
    const { classId } = req.query;
    let list = [...mockPosts];
    if (classId) {
      list = list.filter((p) => p.classId === classId);
    }
    res.send({ success: true, data: list });
  },

  // Đăng bài mới lên bảng tin
  'POST /api/lms/posts': (req: Request, res: Response) => {
    const newPost = {
      id: `post-${Date.now()}`,
      classId: req.body.classId || 'cls-1',
      className: req.body.className || 'Kỹ thuật Lập trình Web Hiện đại',
      authorId: req.body.authorRole === 'teacher' ? 'GV202401' : 'SV2021001',
      authorName: req.body.authorRole === 'teacher' ? 'TS. Nguyễn Văn Hùng' : 'Lê Văn Minh',
      authorRole: req.body.authorRole || 'teacher',
      authorAvatar: req.body.authorRole === 'teacher' 
        ? 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        : 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: req.body.title || 'Thông báo',
      content: req.body.content,
      attachments: req.body.attachments || [],
      createdAt: new Date().toISOString(),
      likesCount: 0,
      userLiked: false,
      status: 'active',
      comments: [],
    };
    mockPosts.unshift(newPost);
    res.send({ success: true, data: newPost });
  },

  // Thích hoặc bình luận bài viết
  'POST /api/lms/posts/:id/like': (req: Request, res: Response) => {
    const post = mockPosts.find((p) => p.id === req.params.id);
    if (post) {
      post.userLiked = !post.userLiked;
      post.likesCount += post.userLiked ? 1 : -1;
      res.send({ success: true, data: { likesCount: post.likesCount, userLiked: post.userLiked } });
      return;
    }
    res.status(404).send({ success: false, errorMessage: 'Bài viết không tồn tại' });
  },

  'POST /api/lms/posts/:id/comments': (req: Request, res: Response) => {
    const post = mockPosts.find((p) => p.id === req.params.id);
    if (post) {
      const comment = {
        id: `cmt-${Date.now()}`,
        authorName: req.body.authorName || 'Lê Văn Minh',
        authorAvatar: req.body.authorAvatar || 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
        authorRole: req.body.authorRole || 'student',
        content: req.body.content,
        createdAt: new Date().toISOString(),
      };
      post.comments.push(comment);
      res.send({ success: true, data: comment });
      return;
    }
    res.status(404).send({ success: false, errorMessage: 'Bài viết không tồn tại' });
  },

  // Quản lý bài tập
  'GET /api/lms/assignments': (req: Request, res: Response) => {
    const { classId } = req.query;
    let list = [...mockAssignments];
    if (classId) {
      list = list.filter((a) => a.classId === classId);
    }
    res.send({ success: true, data: list });
  },

  'GET /api/lms/assignments/:id': (req: Request, res: Response) => {
    const item = mockAssignments.find((a) => a.id === req.params.id) || mockAssignments[0];
    res.send({ success: true, data: item });
  },

  'POST /api/lms/assignments': (req: Request, res: Response) => {
    const newAsm = {
      id: `asm-${Date.now()}`,
      classId: req.body.classId || 'cls-1',
      className: req.body.className || 'Kỹ thuật Lập trình Web Hiện đại',
      title: req.body.title,
      description: req.body.description,
      attachments: req.body.attachments || [],
      maxScore: Number(req.body.maxScore) || 10,
      dueDate: req.body.dueDate,
      allowLate: Boolean(req.body.allowLate),
      latePenalty: req.body.latePenalty || 'Trừ 1 điểm/ngày',
      status: 'active',
      totalStudents: 48,
      submittedCount: 0,
      gradedCount: 0,
    };
    mockAssignments.unshift(newAsm);
    res.send({ success: true, data: newAsm });
  },

  // Bài nộp (Submissions)
  'GET /api/lms/submissions': (req: Request, res: Response) => {
    const { assignmentId, studentId } = req.query;
    let list = [...mockSubmissions];
    if (assignmentId) {
      list = list.filter((s) => s.assignmentId === assignmentId);
    }
    if (studentId) {
      list = list.filter((s) => s.studentId === studentId);
    }
    res.send({ success: true, data: list });
  },

  'GET /api/lms/submissions/:id': (req: Request, res: Response) => {
    const item = mockSubmissions.find((s) => s.id === req.params.id) || mockSubmissions[0];
    res.send({ success: true, data: item });
  },

  // Sinh viên nộp bài hoặc nộp lại (D7)
  'POST /api/lms/submissions': (req: Request, res: Response) => {
    const { assignmentId, submissionUrl, attachments, note, studentId } = req.body;
    let existing = mockSubmissions.find(
      (s) => s.assignmentId === assignmentId && s.studentId === (studentId || 'SV2021001')
    );

    const now = new Date().toISOString();
    if (existing) {
      // Nộp lại (resubmit)
      existing.history.push({
        version: existing.history.length + 1,
        submittedAt: now,
        url: submissionUrl,
        note: note || '',
      });
      existing.submissionUrl = submissionUrl;
      existing.attachments = attachments || existing.attachments;
      existing.note = note || existing.note;
      existing.submittedAt = now;
      existing.status = 'submitted';
      res.send({ success: true, data: existing, message: 'Nộp lại bài thành công!' });
      return;
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      assignmentId,
      assignmentTitle: 'Bài tập 01: Thiết kế giao diện Mạng xã hội học tập với Ant Design',
      studentId: studentId || 'SV2021001',
      studentName: 'Lê Văn Minh',
      studentCode: '20210001',
      studentEmail: 'minh.lv2100@lms.edu.vn',
      studentAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      submissionUrl,
      attachments: attachments || [],
      note: note || '',
      submittedAt: now,
      status: 'submitted',
      isLate: false,
      score: null,
      feedback: null,
      gradedAt: null,
      history: [
        {
          version: 1,
          submittedAt: now,
          url: submissionUrl,
          note: note || 'Lần nộp đầu tiên',
        },
      ],
    };
    mockSubmissions.unshift(newSub);
    res.send({ success: true, data: newSub, message: 'Nộp bài tập thành công!' });
  },

  // Giảng viên chấm điểm (C7)
  'POST /api/lms/submissions/:id/grade': (req: Request, res: Response) => {
    const { score, feedback } = req.body;
    const sub = mockSubmissions.find((s) => s.id === req.params.id);
    if (!sub) {
      res.status(404).send({ success: false, errorMessage: 'Không tìm thấy bài nộp' });
      return;
    }
    sub.score = Number(score);
    sub.feedback = feedback;
    sub.status = 'graded';
    sub.gradedAt = new Date().toISOString();
    sub.gradedBy = 'TS. Nguyễn Văn Hùng';
    res.send({ success: true, data: sub, message: 'Chấm điểm và nhận xét thành công!' });
  },

  // Danh sách sinh viên trong lớp (C8)
  'GET /api/lms/classes/:id/students': (_req: Request, res: Response) => {
    res.send({ success: true, data: mockClassStudents });
  },

  // Nhật ký quản trị (B6)
  'GET /api/lms/audit-logs': (req: Request, res: Response) => {
    const { action, actor } = req.query;
    let list = [...mockAuditLogs];
    if (action) {
      list = list.filter((l) => l.action === action);
    }
    if (actor) {
      list = list.filter((l) => l.actor === actor);
    }
    res.send({ success: true, data: list });
  },

  // Danh sách thông báo (A3)
  'GET /api/lms/notifications': (_req: Request, res: Response) => {
    res.send({ success: true, data: mockNotifications });
  },

  'POST /api/lms/notifications/mark-all-read': (_req: Request, res: Response) => {
    for (const n of mockNotifications) {
      n.read = true;
    }
    res.send({ success: true, message: 'Đã đánh dấu đọc tất cả thông báo!' });
  },
};

