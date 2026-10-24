export const titles = [
  'Lập trình Web nâng cao',
  'Cơ sở dữ liệu phân tán',
  'Cấu trúc dữ liệu & Giải thuật',
  'Trí tuệ nhân tạo & Học máy',
  'Công nghệ phần mềm',
  'An toàn & Bảo mật hệ thống',
  'Phát triển ứng dụng di động',
  'Mạng máy tính & Truyền thông',
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

export const members = [
  {
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
    name: 'Nguyễn Hoàng Nam',
    id: 'member1',
  },
  {
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
    name: 'Trần Thị Mai',
    id: 'member2',
  },
  {
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
    name: 'Lê Văn Cường',
    id: 'member3',
  },
];

export const defaultUser = {
  name: 'TS. Nguyễn Văn Hùng',
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'hungnv@university.edu.vn',
  signature: 'Tận tâm vì sự nghiệp giáo dục và phát triển sinh viên',
  title: 'Giảng viên chính - Khoa CNTT',
  group: 'Đại học Quốc Gia Hà Nội - Khoa Công nghệ Thông tin - Bộ môn CNPM',
  tags: [
    { key: '0', label: 'Tận tâm' },
    { key: '1', label: 'Nghiên cứu AI' },
    { key: '2', label: 'Lập trình Web' },
    { key: '3', label: 'Kỹ sư phần mềm' },
    { key: '4', label: 'Hướng dẫn NCKH' },
  ],
  notifyCount: 3,
  unreadCount: 2,
  country: 'Vietnam',
  geographic: {
    province: { label: 'Hà Nội', key: '010000' },
    city: { label: 'Quận Ba Đình', key: '010100' },
  },
  address: 'Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội',
  phone: '024-38691234',
};

const statuses = ['active', 'exception', 'normal'];

export function fakeList(count: number) {
  const safeCount =
    Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
  const list = [];
  for (let i = 0; i < safeCount; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % user.length],
      title: titles[i % titles.length],
      avatar: avatars[i % avatars.length],
      cover:
        Math.floor(i / covers.length) % 2 === 0
          ? covers[i % covers.length]
          : covers[covers.length - 1 - (i % covers.length)],
      status: statuses[i % statuses.length],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % avatars.length],
      href: 'https://ant.design',
      updatedAt: Date.now() - Math.floor(Math.random() * 1000000000),
      createdAt: Date.now() - Math.floor(Math.random() * 1000000000),
      subDescription: desc[i % desc.length],
      description:
        'Hệ thống quản lý đào tạo và kết quả học tập của sinh viên dành cho giảng viên hướng dẫn và giảng viên bộ môn.',
      activeUser: Math.floor(Math.random() * 10000) + 1000,
      newUser: Math.floor(Math.random() * 1000) + 100,
      star: Math.floor(Math.random() * 100) + 10,
      like: Math.floor(Math.random() * 100) + 10,
      message: Math.floor(Math.random() * 100) + 10,
      content:
        'Hệ thống quản lý giảng dạy đại học, hỗ trợ theo dõi tiến độ sinh viên, đánh giá điểm danh chuyên cần, điểm giữa kỳ và đồ án.',
      members,
    });
  }
  return list;
}
