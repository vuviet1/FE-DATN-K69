import proLayoutEnUS from '@ant-design/pro-components/es/layout/locales/en-US';
import proLayoutZhCN from '@ant-design/pro-components/es/layout/locales/zh-CN';
import proLayoutZhTW from '@ant-design/pro-components/es/layout/locales/zh-TW';
import proProviderEnUS from '@ant-design/pro-components/es/provider/locale/en_US';
import proProviderViVN from '@ant-design/pro-components/es/provider/locale/vi_VN';
import proProviderZhCN from '@ant-design/pro-components/es/provider/locale/zh_CN';
import proProviderZhHK from '@ant-design/pro-components/es/provider/locale/zh_HK';
import proProviderZhTW from '@ant-design/pro-components/es/provider/locale/zh_TW';
import enUSSettingDrawer from '@/locales/en-US/settingDrawer';
import viVNSettingDrawer from '@/locales/vi-VN/settingDrawer';

/**
 * Bản dịch Tiếng Việt chuẩn hóa cho ProProvider (ProTable, ProForm, QueryFilter,...)
 * Loại bỏ hoàn toàn fallback tiếng Trung (查询, 重置, 密度, 全屏, 列设置,...)
 */
export const cleanViVNProProvider = {
  moneySymbol: '₫',
  deleteThisLine: 'Xóa dòng này',
  copyThisLine: 'Sao chép dòng này',
  form: {
    lightFilter: {
      more: 'Thêm',
      clear: 'Xóa bộ lọc',
      confirm: 'Xác nhận',
      itemUnit: 'mục',
    },
  },
  tableForm: {
    search: 'Tìm kiếm',
    reset: 'Làm lại',
    submit: 'Gửi',
    collapsed: 'Mở rộng',
    expand: 'Thu gọn',
    inputPlaceholder: 'Nhập thông tin tìm kiếm',
    selectPlaceholder: 'Vui lòng chọn',
  },
  alert: {
    clear: 'Bỏ chọn',
    selected: 'Đã chọn',
    item: 'mục',
  },
  pagination: {
    total: {
      range: ' ',
      total: 'trên tổng số',
      item: 'mục',
    },
  },
  tableToolBar: {
    leftPin: 'Ghim sang trái',
    rightPin: 'Ghim sang phải',
    noPin: 'Bỏ ghim',
    leftFixedTitle: 'Cố định bên trái',
    rightFixedTitle: 'Cố định bên phải',
    noFixedTitle: 'Chưa cố định',
    reset: 'Làm lại',
    columnDisplay: 'Cột hiển thị',
    columnSetting: 'Cấu hình cột',
    fullScreen: 'Toàn màn hình',
    exitFullScreen: 'Thoát toàn màn hình',
    reload: 'Làm mới',
    density: 'Độ giãn dòng',
    densityDefault: 'Mặc định',
    densityLarger: 'Rộng',
    densityMiddle: 'Vừa',
    densitySmall: 'Nhỏ',
  },
  stepsForm: {
    next: 'Tiếp theo',
    prev: 'Quay lại',
    submit: 'Hoàn thành',
  },
  loginForm: {
    submitText: 'Đăng nhập',
  },
  editableTable: {
    onlyOneLineEditor: 'Chỉ có thể chỉnh sửa một dòng cùng lúc',
    onlyAddOneLine: 'Chỉ có thể thêm một dòng cùng lúc',
    action: {
      save: 'Lưu',
      cancel: 'Hủy',
      delete: 'Xóa',
      add: 'Thêm một dòng dữ liệu',
    },
  },
  switch: {
    open: 'Bật',
    close: 'Tắt',
  },
};

/**
 * Đệ quy gán thuộc tính để đảm bảo ghi đè các cấu trúc lồng nhau
 */
function deepAssign(target: Record<string, any>, source: Record<string, any>) {
  if (!target || !source) return;
  for (const key of Object.keys(source)) {
    const val = source[key];
    if (
      val &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      deepAssign(target[key], val);
    } else {
      target[key] = val;
    }
  }
}

/**
 * Ghi đè toàn bộ locale runtime của ProComponents và ProLayout
 * Đảm bảo hệ thống KHÔNG BAO GIỜ hiển thị tiếng Trung khi chạy với tiếng Việt hoặc tiếng Anh.
 */
export function applyProLayoutLocalePatch(locale?: string) {
  const currentLocale =
    locale ||
    (typeof window !== 'undefined'
      ? window.localStorage.getItem('umi_locale') || 'vi-VN'
      : 'vi-VN');

  if (currentLocale === 'vi-VN') {
    // SettingDrawer (ProLayout)
    deepAssign(proLayoutZhCN as any, viVNSettingDrawer);
    deepAssign(proLayoutZhTW as any, viVNSettingDrawer);

    // ProProvider (ProTable, ProForm, v.v.)
    deepAssign(proProviderViVN as any, cleanViVNProProvider);
    deepAssign(proProviderZhCN as any, cleanViVNProProvider);
    deepAssign(proProviderZhTW as any, cleanViVNProProvider);
    deepAssign(proProviderZhHK as any, cleanViVNProProvider);
  } else {
    // SettingDrawer (ProLayout)
    deepAssign(proLayoutZhCN as any, enUSSettingDrawer);
    deepAssign(proLayoutZhTW as any, enUSSettingDrawer);
    deepAssign(proLayoutEnUS as any, enUSSettingDrawer);

    // ProProvider (ProTable, ProForm, v.v.)
    deepAssign(proProviderZhCN as any, proProviderEnUS);
    deepAssign(proProviderZhTW as any, proProviderEnUS);
    deepAssign(proProviderZhHK as any, proProviderEnUS);
  }
}

// Khởi tạo ngay khi module được load
applyProLayoutLocalePatch();
