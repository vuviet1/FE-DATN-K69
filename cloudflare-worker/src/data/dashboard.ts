function generateAnalysisChartData() {
  const beginDay = Date.now();

  const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
  const visitData = fakeY.map((y, i) => ({
    x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
    y,
  }));

  const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
  const visitData2 = fakeY2.map((y, i) => ({
    x: new Date(beginDay + 1000 * 60 * 60 * 24 * i).toISOString().split('T')[0],
    y,
  }));

  const salesData = Array.from({ length: 12 }, (_, i) => ({
    x: `Tháng ${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  }));

  const searchData = Array.from({ length: 50 }, (_, i) => ({
    index: i + 1,
    keyword: `Từ khóa-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  }));

  const salesTypeData = [
    { x: 'Bài tập lớn', y: 4544 },
    { x: 'Đồ án môn học', y: 3321 },
    { x: 'Khóa luận tốt nghiệp', y: 3113 },
    { x: 'Báo cáo thực tập', y: 2341 },
    { x: 'Chuyên cần', y: 1231 },
    { x: 'Khác', y: 1231 },
  ];

  const salesTypeDataOnline = [
    { x: 'Bài tập lớn', y: 244 },
    { x: 'Đồ án môn học', y: 321 },
    { x: 'Khóa luận tốt nghiệp', y: 311 },
    { x: 'Báo cáo thực tập', y: 41 },
    { x: 'Chuyên cần', y: 121 },
    { x: 'Khác', y: 111 },
  ];

  const salesTypeDataOffline = [
    { x: 'Bài tập lớn', y: 99 },
    { x: 'Đồ án môn học', y: 188 },
    { x: 'Khóa luận tốt nghiệp', y: 344 },
    { x: 'Báo cáo thực tập', y: 255 },
    { x: 'Khác', y: 65 },
  ];

  const offlineData = Array.from({ length: 10 }, (_, i) => ({
    name: `Lớp ${i + 1}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  }));

  const offlineChartData = Array.from({ length: 20 }, (_, i) => {
    const date = new Date(Date.now() + 1000 * 60 * 30 * i);
    return {
      date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
      type: 'Lượt nộp bài',
      value: Math.floor(Math.random() * 100) + 10,
    };
  }).concat(
    Array.from({ length: 20 }, (_, i) => {
      const date = new Date(Date.now() + 1000 * 60 * 30 * i);
      return {
        date: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
        type: 'Lượt điểm danh',
        value: Math.floor(Math.random() * 100) + 10,
      };
    }),
  );

  const radarOriginData = [
    { name: 'Cá nhân', ref: 10, koubei: 8, output: 4, contribute: 5, hot: 7 },
    { name: 'Nhóm', ref: 3, koubei: 9, output: 6, contribute: 3, hot: 1 },
    { name: 'Khoa', ref: 4, koubei: 1, output: 6, contribute: 5, hot: 7 },
  ];

  const radarTitleMap: Record<string, string> = {
    ref: 'Tài liệu tham khảo',
    koubei: 'Đánh giá',
    output: 'Tiến độ',
    contribute: 'Đóng góp',
    hot: 'Mức độ tương tác',
  };

  const radarData = radarOriginData.flatMap((item) =>
    Object.entries(item)
      .filter(([key]) => key !== 'name')
      .map(([key, value]) => ({
        name: item.name,
        label: radarTitleMap[key],
        value,
      })),
  );

  return {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    radarData,
  };
}

export const getAnalysisChartData = generateAnalysisChartData;

export function getProjectNotice() {
  const now = new Date().toISOString();
  return [
    {
      id: 'xxx1',
      title: 'Lập trình Web nâng cao',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      description: 'Học tập là việc cả đời, hãy kiên trì mỗi ngày',
      updatedAt: now,
      member: 'Nhóm Nghiên cứu AI',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx2',
      title: 'Cơ sở dữ liệu phân tán',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      description: 'Công nghệ thông tin và chuyển đổi số trong giáo dục đại học',
      updatedAt: '2026-10-24',
      member: 'Bộ môn Kỹ thuật phần mềm',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx3',
      title: 'Trí tuệ nhân tạo & Học máy',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      description: 'Phát triển kỹ năng lập trình và tư duy giải quyết vấn đề',
      updatedAt: now,
      member: 'Nhóm Hệ thống nhúng & IoT',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx4',
      title: 'Cấu trúc dữ liệu & Giải thuật',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      description: 'Nghiên cứu ứng dụng trí tuệ nhân tạo và hệ thống phân tán',
      updatedAt: '2026-10-23',
      member: 'CLB An toàn thông tin',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx5',
      title: 'Công nghệ phần mềm',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      description: 'Khoa học máy tính là nền tảng của mọi sự phát triển hiện đại',
      updatedAt: '2026-10-23',
      member: 'Nhóm Thị giác máy tính',
      href: '',
      memberLink: '',
    },
    {
      id: 'xxx6',
      title: 'An toàn & Bảo mật hệ thống',
      logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      description: 'Phát triển kỹ năng lập trình và tư duy giải quyết vấn đề',
      updatedAt: '2026-10-23',
      member: 'Bộ môn Mạng máy tính',
      href: '',
      memberLink: '',
    },
  ];
}

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
];

export function getActivities() {
  const now = new Date().toISOString();
  return [
    {
      id: 'trend-1',
      updatedAt: now,
      user: { name: 'Nguyễn Hoàng Nam', avatar: avatars2[0] },
      group: { name: 'Nhóm Nghiên cứu AI', link: 'https://github.com/' },
      project: { name: 'Hệ thống nhận diện', link: 'https://github.com/' },
      template: 'tại @{group} đã nộp đề cương @{project}',
    },
    {
      id: 'trend-2',
      updatedAt: now,
      user: { name: 'Trần Thị Mai', avatar: avatars2[1] },
      group: { name: 'Bộ môn CNPM', link: 'https://github.com/' },
      project: { name: 'Đồ án tốt nghiệp', link: 'https://github.com/' },
      template: 'tại @{group} đã cập nhật báo cáo tuần @{project}',
    },
    {
      id: 'trend-3',
      updatedAt: now,
      user: { name: 'Lê Văn Cường', avatar: avatars2[2] },
      group: { name: 'Nhóm IoT', link: 'https://github.com/' },
      project: { name: 'Mô hình Smarthome', link: 'https://github.com/' },
      template: 'tại @{group} hoàn thành giai đoạn 1 @{project}',
    },
    {
      id: 'trend-4',
      updatedAt: now,
      user: { name: 'Phạm Minh Tuấn', avatar: avatars2[4] },
      project: { name: 'Lập trình di động', link: 'https://github.com/' },
      template: 'đã nộp mã nguồn @{project}',
    },
    {
      id: 'trend-5',
      updatedAt: now,
      user: { name: 'Đỗ Đức Thắng', avatar: avatars2[3] },
      project: { name: 'Hệ thống phân tán', link: 'https://github.com/' },
      comment: { name: 'Câu hỏi thắc mắc', link: 'https://github.com/' },
      template: 'trong @{project} đã gửi @{comment}',
    },
    {
      id: 'trend-6',
      updatedAt: now,
      user: { name: 'Vũ Thu Trang', avatar: avatars2[5] },
      group: { name: 'CLB Tin học', link: 'https://github.com/' },
      project: { name: 'Website Quản lý', link: 'https://github.com/' },
      template: 'tại @{group} đã demo sản phẩm @{project}',
    },
  ];
}
