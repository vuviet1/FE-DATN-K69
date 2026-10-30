/**
 * @name Cấu hình Routes - Hệ Thống Quản Trị Đào Tạo & Sinh Viên Chuẩn HUST & Becoxy
 * @description Định nghĩa đường dẫn và menu cho hệ thống
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
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './dashboard',
  },
  {
    name: 'academic',
    icon: 'book',
    path: '/academic',
    routes: [
      {
        path: '/academic',
        redirect: '/academic/curriculum',
      },
      {
        name: 'curriculum',
        icon: 'table',
        path: '/academic/curriculum',
        component: './academic/curriculum',
      },
      {
        name: 'registration',
        icon: 'form',
        path: '/academic/registration',
        component: './academic/registration',
      },
      {
        name: 'alerts',
        icon: 'alert',
        path: '/academic/alerts',
        component: './academic/alerts',
      },
    ],
  },
  {
    path: '/students',
    name: 'students',
    icon: 'team',
    component: './students',
  },
  {
    path: '/classes',
    name: 'classes',
    icon: 'read',
    component: './classes',
  },
  {
    path: '/grades',
    name: 'grades',
    icon: 'solution',
    component: './grades',
  },
  {
    path: '/attendance',
    name: 'attendance',
    icon: 'checkCircle',
    component: './attendance',
  },
  {
    name: 'ctsv',
    icon: 'heart',
    path: '/ctsv',
    routes: [
      {
        path: '/ctsv',
        redirect: '/ctsv/conduct',
      },
      {
        name: 'conduct',
        icon: 'trophy',
        path: '/ctsv/conduct',
        component: './ctsv/conduct',
      },
      {
        name: 'scholarships',
        icon: 'crown',
        path: '/ctsv/scholarships',
        component: './ctsv/scholarships',
      },
      {
        name: 'services',
        icon: 'fileText',
        path: '/ctsv/services',
        component: './ctsv/services',
      },
    ],
  },
  {
    name: 'finance',
    icon: 'dollar',
    path: '/finance',
    routes: [
      {
        path: '/finance',
        redirect: '/finance/tuition',
      },
      {
        name: 'tuition',
        icon: 'wallet',
        path: '/finance/tuition',
        component: './finance/tuition',
      },
    ],
  },
  {
    name: 'admin',
    icon: 'safetyCertificate',
    path: '/admin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/overview',
      },
      {
        name: 'overview',
        icon: 'dashboard',
        path: '/admin/overview',
        component: './admin',
      },
      {
        name: 'users',
        icon: 'user',
        path: '/admin/users',
        component: './admin/users',
      },
      {
        name: 'roles',
        icon: 'lock',
        path: '/admin/roles',
        component: './admin/roles',
      },
      {
        name: 'notifications',
        icon: 'bell',
        path: '/admin/notifications',
        component: './admin/notifications',
      },
    ],
  },
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/settings',
      },
      {
        name: 'settings',
        icon: 'setting',
        path: '/account/settings',
        component: './account/settings',
      },
      {
        name: 'center',
        icon: 'user',
        path: '/account/center',
        component: './account/center',
      },
    ],
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
    path: '/',
    layout: false,
    redirect: '/dashboard',
  },
  {
    component: './exception/404',
    path: '/*',
  },
];
