import proLayoutEnUS from '@ant-design/pro-components/es/layout/locales/en-US';
import proLayoutZhCN from '@ant-design/pro-components/es/layout/locales/zh-CN';
import enUSSettingDrawer from '@/locales/en-US/settingDrawer';
import viVNSettingDrawer from '@/locales/vi-VN/settingDrawer';

/**
 * ProLayout SettingDrawer không có sẵn ngôn ngữ `vi-VN` trong bảng locales nội bộ
 * dẫn đến việc mặc định fallback về `zh-CN` (tiếng Trung).
 * Hàm này ghi đè bản dịch vào runtime locale map của ProLayout để SettingDrawer
 * hiển thị chính xác Tiếng Việt hoặc Tiếng Anh theo ngôn ngữ hiện tại.
 */
export function applyProLayoutLocalePatch(locale?: string) {
  const currentLocale =
    locale ||
    (typeof window !== 'undefined'
      ? window.localStorage.getItem('umi_locale') || 'vi-VN'
      : 'vi-VN');

  if (currentLocale === 'vi-VN') {
    Object.assign(proLayoutZhCN, viVNSettingDrawer);
  } else {
    Object.assign(proLayoutZhCN, enUSSettingDrawer);
    Object.assign(proLayoutEnUS, enUSSettingDrawer);
  }
}

// Khởi tạo ngay khi module được load
applyProLayoutLocalePatch();
