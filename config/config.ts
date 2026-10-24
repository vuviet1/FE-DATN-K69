// https://umijs.org/config/

import { join } from 'node:path';
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

import routes from './routes';

const { UMI_ENV = 'dev' } = process.env;

// Compute commit hash: env vars take precedence, fall back to git at build time
const commitHash =
  process.env.COMMIT_HASH ||
  process.env.CF_PAGES_COMMIT_SHA ||
  (() => {
    try {
      return require('node:child_process')
        .execSync('git rev-parse HEAD', {
          stdio: ['ignore', 'pipe', 'ignore'],
          encoding: 'utf-8',
        })
        .trim();
    } catch {
      return '';
    }
  })();

/**
 * @name Đường dẫn gốc
 * @description Đường dẫn triển khai hệ thống (mặc định là '/')
 */
const PUBLIC_PATH: string = '/';

export default defineConfig({
  alias: {
    '@root': join(__dirname, '..'),
  },
  /**
   * @name Chế độ Hash
   * @description Thêm mã hash vào file build để tránh cache trình duyệt
   */
  hash: true,

  publicPath: PUBLIC_PATH,

  /**
   * @name Cấu hình Routes
   * @description Định nghĩa các trang và điều hướng hệ thống
   */
  routes,
  /**
   * @name Cấu hình ngôn ngữ Moment
   */
  ignoreMomentLocale: true,
  /**
   * @name Cấu hình Proxy
   * @description Hỗ trợ kết nối API backend môi trường dev
   */
  proxy: proxy[UMI_ENV as keyof typeof proxy],
  /**
   * @name Hot Reload nhanh
   */
  fastRefresh: true,
  /**
   * @name Tải trước route
   */
  routePrefetch: {},
  manifest: {},
  //============== Cấu hình Plugin @umijs/max ===============
  /**
   * @name Plugin Data Flow
   */
  model: {},
  /**
   * @name Trạng thái khởi tạo toàn cục (Initial State)
   */
  initialState: {},
  /**
   * @name Plugin Layout
   */
  title: 'QL Sinh Viên - Giảng Viên',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name Plugin moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration', 'relativeTime'],
  },
  /**
   * @name Plugin Đa ngôn ngữ (i18n)
   * @description Mặc định là Tiếng Việt vi-VN, tùy chọn Tiếng Anh en-US
   */
  locale: {
    default: 'vi-VN',
    antd: true,
    baseNavigator: false,
  },
  /**
   * @name Plugin Ant Design
   */
  antd: {
    appConfig: {},
    configProvider: {
      variant: 'filled',
      theme: {
        token: {
          fontFamily: 'AlibabaSans, sans-serif',
        },
      },
    },
  },
  /**
   * @name Cấu hình Network Request
   */
  request: {},
  /**
   * @name Plugin React Query
   */
  reactQuery: {},
  /**
   * @name Plugin Phân quyền Access
   */
  access: {},
  /**
   * @name Google Analytics
   */
  analytics: {
    ga_v2: 'G-59NF1VHHPF',
  },
  /**
   * @name Scripts trong thẻ <head>
   */
  headScripts: [
    { src: join(PUBLIC_PATH, 'scripts/loading.js'), async: true },
  ],

  //================ Cấu hình Plugin Pro =================
  plugins: ['@umijs/max-plugin-openapi', '@umijs/request-record'],

  /**
   * @name Cấu hình OpenAPI
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
  ],

  tailwindcss: {},

  mock: {
    include: ['src/pages/**/_mock.ts'],
    exclude: ['mock/requestRecord.mock.js'],
  },
  utoopack: {
    module: {
      rules: {
        '*.md': {
          loaders: [{ loader: join(__dirname, 'md-raw-loader.cjs') }],
          as: '*.js',
        },
      },
    },
    devServer: {
      dynamicHmrChunkLists: true,
      lazyDynamicImports: true,
    },
  },
  requestRecord: {},
  exportStatic: {},
  define: {
    'process.env.CI': process.env.CI,
    'process.env.COMMIT_HASH': commitHash,
    __APP_VERSION__: require('./../package.json').version,
    __UMI_VERSION__: require('@umijs/max/package.json').version,
    __UTOO_VERSION__: require('@utoo/pack/package.json').version,
  },
});
