/**
 * Hàm tiện ích và dữ liệu Mock
 * Dữ liệu và phương thức dùng chung cho các mock API
 */

// Mảng dữ liệu dùng chung
export const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];

export const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
];

export const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

export const desc = [
  'Học tập là việc cả đời, hãy kiên trì mỗi ngày',
  'Công nghệ thông tin và chuyển đổi số trong giáo dục đại học',
  'Phát triển kỹ năng lập trình và tư duy giải quyết vấn đề',
  'Nghiên cứu ứng dụng trí tuệ nhân tạo và hệ thống phân tán',
  'Khoa học máy tính là nền tảng của mọi sự phát triển hiện đại',
];

export const user = [
  'Nguyễn Hoàng Nam',
  'Trần Thị Mai',
  'Lê Văn Cường',
  'Phạm Minh Tuấn',
  'Hoàng Diệu Linh',
  'Đỗ Đức Thắng',
  'Vũ Thu Trang',
  'Bùi Anh Quân',
  'Đặng Thùy Dung',
  'Ngô Bá Hưng',
];

// Dữ liệu Giảng viên mặc định
export const defaultUser = {
  name: 'TS. Nguyễn Văn Hùng',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: 'GV202401',
  email: 'hung.nguyen@daihoc.edu.vn',
  signature: 'Khoa Công Nghệ Thông Tin - Giảng viên Kỹ thuật phần mềm',
  title: 'Giảng viên chính',
  group: 'Khoa CNTT - Trường Đại Học Bách Khoa',
  tags: [
    { key: '0', label: 'Cố vấn học tập' },
    { key: '1', label: 'Bộ môn CNPM' },
    { key: '2', label: 'Chủ nhiệm K65' },
  ],
  notifyCount: 3,
  unreadCount: 2,
  country: 'Vietnam',
  geographic: {
    province: { label: 'Hà Nội', key: '01' },
    city: { label: 'Cầu Giấy', key: '0101' },
  },
  address: 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
  phone: '0988-123-456',
};

// Thành viên tổ bộ môn
export const memberAvatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
  'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
];

export const memberNames = ['PGS.TS Trần Quang', 'TS. Lê Hải Yến', 'ThS. Phạm Văn Minh'];

export const members = memberAvatars.map((avatar, i) => ({
  avatar,
  name: memberNames[i],
  id: `member${i + 1}`,
}));

/**
 * Giả lập độ trễ mạng
 */
export const waitTime = (time: number = 100): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * Tạo danh sách dữ liệu mẫu
 */
export function fakeList(count: number) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${Math.random().toString(36).slice(2, 6)}${i}`,
      owner: user[i % user.length],
      title: titles[i % titles.length],
      avatar: avatars[i % avatars.length],
      cover: Math.floor(i / 4) % 2 === 0 ? covers[i % covers.length] : covers[3 - (i % covers.length)],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: 'https://ant.design',
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description: 'Hệ thống Quản lý Sinh viên dành cho Giảng viên hỗ trợ tra cứu, nhập điểm, theo dõi chuyên cần và thông báo tự động.',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: 'Chương trình đào tạo đại học và sau đại học theo học chế tín chỉ chuẩn quốc tế.',
      members,
    });
  }
  return list;
}