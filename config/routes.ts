/**
 * @name Cấu hình Routes - Cổng Quản Lý Sinh Viên Dành Cho Giảng Viên
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
    component: './dashboard/LecturerDashboard',
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
