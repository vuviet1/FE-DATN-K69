/**
 * @name Cấu hình Routes - Mạng Xã Hội Học Tập Tích Hợp Quản Lý Lớp Học & Bài Tập
 * @description Định nghĩa đường dẫn và menu cho 3 vai trò: Admin, Teacher, Student
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './user/register',
      },
      {
        path: '/user/register-result',
        name: 'register-result',
        component: './user/register-result',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: '404',
        component: './exception/404',
        path: '/user/*',
      },
    ],
  },

  // Phân hệ Quản trị Admin (B1 - B6)
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/overview',
      },
      {
        path: '/admin/overview',
        name: 'overview',
        icon: 'dashboard',
        component: './admin',
      },
      {
        path: '/admin/users',
        name: 'users',
        icon: 'team',
        component: './admin/users',
      },
      {
        path: '/admin/classes',
        name: 'classes',
        icon: 'bank',
        component: './admin/classes',
      },
      {
        path: '/admin/import',
        name: 'import',
        icon: 'fileExcel',
        component: './admin/import',
      },
      {
        path: '/admin/posts',
        name: 'posts',
        icon: 'message',
        component: './admin/posts',
      },
      {
        path: '/admin/logs',
        name: 'logs',
        icon: 'history',
        component: './admin/logs',
      },
    ],
  },

  // Phân hệ Giảng viên (Teacher) (C1 - C9)
  {
    path: '/teacher',
    name: 'teacher',
    icon: 'read',
    access: 'canTeacher',
    routes: [
      {
        path: '/teacher',
        redirect: '/teacher/dashboard',
      },
      {
        path: '/teacher/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './teacher/dashboard',
      },
      {
        path: '/teacher/classes',
        name: 'classes',
        icon: 'appstore',
        component: './teacher/classes',
      },
      {
        path: '/teacher/classes/:classId',
        name: 'classDetail',
        hideInMenu: true,
        component: './teacher/classes/detail',
      },
      {
        path: '/teacher/assignments/:assignmentId',
        name: 'assignmentDetail',
        hideInMenu: true,
        component: './teacher/assignments/detail',
      },
      {
        path: '/teacher/submissions/:submissionId',
        name: 'submissionGrade',
        hideInMenu: true,
        component: './teacher/submissions/grade',
      },
    ],
  },

  // Phân hệ Sinh viên (Student) (D1 - D9)
  {
    path: '/student',
    name: 'student',
    icon: 'user',
    access: 'canStudent',
    routes: [
      {
        path: '/student',
        redirect: '/student/dashboard',
      },
      {
        path: '/student/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './student/dashboard',
      },
      {
        path: '/student/classes',
        name: 'classes',
        icon: 'appstore',
        component: './student/classes',
      },
      {
        path: '/student/classes/:classId',
        name: 'classDetail',
        hideInMenu: true,
        component: './student/classes/detail',
      },
      {
        path: '/student/assignments',
        name: 'assignments',
        icon: 'form',
        component: './student/assignments',
      },
      {
        path: '/student/assignments/:assignmentId',
        name: 'assignmentSubmit',
        hideInMenu: true,
        component: './student/assignments/detail',
      },
      {
        path: '/student/submissions/:submissionId',
        name: 'submissionResult',
        hideInMenu: true,
        component: './student/submissions/detail',
      },
      {
        path: '/student/grades',
        name: 'grades',
        icon: 'trophy',
        component: './student/grades',
      },
    ],
  },

  // Trung tâm thông báo chung (A3)
  {
    path: '/notifications',
    name: 'notifications',
    icon: 'bell',
    component: './notifications',
  },

  // Hồ sơ cá nhân & Cài đặt (A2)
  {
    path: '/account',
    name: 'account',
    icon: 'setting',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'user',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'setting',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },

  // Chuyển hướng tương thích
  {
    path: '/dashboard',
    redirect: '/teacher/dashboard',
  },
  {
    path: '/classes',
    redirect: '/teacher/classes',
  },
  {
    path: '/students',
    redirect: '/admin/users',
  },
  {
    path: '/grades',
    redirect: '/student/grades',
  },

  // Điều hướng gốc
  {
    path: '/',
    redirect: '/teacher/dashboard',
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    hideInMenu: true,
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'stop',
        path: '/exception/403',
        component: './exception/404',
      },
      {
        name: '404',
        icon: 'warning',
        path: '/exception/404',
        component: './exception/404',
      },
      {
        name: '500',
        icon: 'bug',
        path: '/exception/500',
        component: './exception/404',
      },
    ],
  },
  {
    component: './exception/404',
    path: '/*',
  },
];
