/**
 * @name Cấu hình Proxy
 * @description Proxy chỉ có hiệu lực ở môi trường phát triển (development).
 * Ở môi trường production, proxy cần được cấu hình qua web server (Nginx/Apache).
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // Cấu hình proxy cho môi trường dev khi kết nối backend thật
  // dev: {
  //   '/api/': {
  //     target: 'http://localhost:3000',
  //     changeOrigin: true,
  //   },
  // },
  test: {
    '/api/': {
      target: 'https://pro-api.ant-design-demo.workers.dev',
      changeOrigin: true,
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
    },
  },
};
