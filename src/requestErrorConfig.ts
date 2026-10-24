import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { getIntl } from '@umijs/max';
import { message, notification } from 'antd';

// Cấu hình xử lý lỗi: Các loại hiển thị lỗi
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// Định dạng dữ liệu phản hồi chuẩn từ Backend
interface ResponseStructure {
  success: boolean;
  data: unknown;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name Xử lý lỗi Request
 * Quản lý thông báo lỗi toàn cục cho các cuộc gọi API
 */
export const errorConfig: RequestConfig = {
  // Cấu hình xử lý lỗi
  errorConfig: {
    // Ném lỗi nghiệp vụ nếu API trả về success: false
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error;
      }
    },
    // Tiếp nhận và xử lý hiển thị lỗi
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // Xử lý lỗi nghiệp vụ từ errorThrower
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                title: errorCode,
                description: errorMessage,
              });
              break;
            case ErrorShowType.REDIRECT:
              window.location.href = '/user/login';
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Lỗi phản hồi từ HTTP server
        message.error(`Mã trạng thái phản hồi: ${error.response.status}`);
      } else if (typeof navigator !== 'undefined' && !navigator.onLine) {
        message.error(
          getIntl().formatMessage({
            id: 'app.request.offline',
            defaultMessage:
              'Mạng không khả dụng. Vui lòng kiểm tra lại kết nối internet của bạn.',
          }),
        );
      } else if (error.request) {
        message.error('Máy chủ không phản hồi! Vui lòng thử lại.');
      } else {
        message.error('Lỗi gửi yêu cầu, vui lòng thử lại.');
      }
    },
  },

  // Bộ chặn yêu cầu (Request Interceptors)
  requestInterceptors: [
    (config: RequestOptions) => {
      // Tùy biến cấu hình trước khi gửi đi (ví dụ: gắn Token xác thực)
      return config;
    },
  ],

  // Bộ chặn phản hồi (Response Interceptors)
  responseInterceptors: [],
};
