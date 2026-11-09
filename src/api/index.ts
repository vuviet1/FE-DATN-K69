/**
 * ===================================================================
 * THƯ MỤC QUẢN LÝ TẬP TRUNG TẤT CẢ CÁC API CỦA HỆ THỐNG
 * ===================================================================
 *
 * Các API được phân chia theo module nghiệp vụ:
 * - auth.ts: Đăng nhập, đăng ký, đăng xuất, lấy thông tin user hiện tại
 * - endpoints.ts: Khai báo toàn bộ đường dẫn URL endpoint của Backend
 * - types.ts: Khai báo các kiểu dữ liệu DTO request / response
 */

export * from './auth';
export * from './endpoints';
export * from './types';
