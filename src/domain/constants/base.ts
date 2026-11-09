/**
 * @file base.ts
 * @description Định nghĩa BASE_URL theo chuẩn cấu hình mes-client-es
 */

export const BASE_URL =
  (typeof process !== 'undefined' &&
    (process.env.REACT_APP_BASE_URL || process.env.UMI_APP_API_BASE_URL)) ||
  '';
