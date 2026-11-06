/**
 * @name Cấu hình Proxy
 * @description Proxy chỉ có hiệu lực ở môi trường phát triển (development).
 * Mọi request bắt đầu bằng /api/ sẽ được chuyển tiếp tự động sang máy chủ Backend được cấu hình trong file .env
 * Giúp tránh hoàn toàn lỗi chặn nguồn gốc chéo (CORS).
 * @doc https://umijs.org/docs/guides/proxy
 */

const { BACKEND_URL = 'http://localhost:8080' } = process.env;

export default {
  // Cấu hình proxy cho môi trường dev kết nối backend thật
  dev: {
    '/api/': {
      target: BACKEND_URL,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
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
