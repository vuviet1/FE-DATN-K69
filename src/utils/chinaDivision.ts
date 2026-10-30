export type GeographicOption = {
  label: string;
  key: string;
};

type ProvinceData = {
  code: string;
  name: string;
  districts: { key: string; label: string }[];
};

const vietnamDivisions: ProvinceData[] = [
  {
    code: '01',
    name: 'Hà Nội',
    districts: [
      { key: '010100', label: 'Quận Ba Đình' },
      { key: '010200', label: 'Quận Hoàn Kiếm' },
      { key: '010300', label: 'Quận Hai Bà Trưng' },
      { key: '010400', label: 'Quận Đống Đa' },
      { key: '010500', label: 'Quận Cầu Giấy' },
      { key: '010600', label: 'Quận Thanh Xuân' },
      { key: '010700', label: 'Quận Hoàng Mai' },
      { key: '010800', label: 'Quận Long Biên' },
      { key: '010900', label: 'Quận Nam Từ Liêm' },
      { key: '011000', label: 'Quận Bắc Từ Liêm' },
      { key: '011100', label: 'Quận Tây Hồ' },
      { key: '011200', label: 'Quận Hà Đông' },
    ],
  },
  {
    code: '79',
    name: 'TP. Hồ Chí Minh',
    districts: [
      { key: '790100', label: 'Quận 1' },
      { key: '790200', label: 'Quận 3' },
      { key: '790300', label: 'Quận 5' },
      { key: '790400', label: 'Quận 7' },
      { key: '790500', label: 'Quận 10' },
      { key: '790600', label: 'TP. Thủ Đức' },
      { key: '790700', label: 'Quận Bình Thạnh' },
      { key: '790800', label: 'Quận Gò Vấp' },
      { key: '790900', label: 'Quận Tân Bình' },
      { key: '791000', label: 'Quận Phú Nhuận' },
    ],
  },
  {
    code: '48',
    name: 'Đà Nẵng',
    districts: [
      { key: '480100', label: 'Quận Hải Châu' },
      { key: '480200', label: 'Quận Thanh Khê' },
      { key: '480300', label: 'Quận Sơn Trà' },
      { key: '480400', label: 'Quận Ngũ Hành Sơn' },
      { key: '480500', label: 'Quận Liên Chiểu' },
      { key: '480600', label: 'Quận Cẩm Lệ' },
    ],
  },
  {
    code: '31',
    name: 'Hải Phòng',
    districts: [
      { key: '310100', label: 'Quận Hồng Bàng' },
      { key: '310200', label: 'Quận Ngô Quyền' },
      { key: '310300', label: 'Quận Lê Chân' },
      { key: '310400', label: 'Quận Hải An' },
      { key: '310500', label: 'Quận Kiến An' },
    ],
  },
  {
    code: '92',
    name: 'Cần Thơ',
    districts: [
      { key: '920100', label: 'Quận Ninh Kiều' },
      { key: '920200', label: 'Quận Bình Thủy' },
      { key: '920300', label: 'Quận Cái Răng' },
      { key: '920400', label: 'Quận Ô Môn' },
    ],
  },
  {
    code: '46',
    name: 'Thừa Thiên Huế',
    districts: [
      { key: '460100', label: 'TP. Huế' },
      { key: '460200', label: 'Thị xã Hương Thủy' },
      { key: '460300', label: 'Thị xã Hương Trà' },
    ],
  },
  {
    code: '14',
    name: 'Quảng Ninh',
    districts: [
      { key: '140100', label: 'TP. Hạ Long' },
      { key: '140200', label: 'TP. Cẩm Phả' },
      { key: '140300', label: 'TP. Uông Bí' },
    ],
  },
  {
    code: '27',
    name: 'Bắc Ninh',
    districts: [
      { key: '270100', label: 'TP. Bắc Ninh' },
      { key: '270200', label: 'TP. Từ Sơn' },
    ],
  },
  {
    code: '74',
    name: 'Bình Dương',
    districts: [
      { key: '740100', label: 'TP. Thủ Dầu Một' },
      { key: '740200', label: 'TP. Thuận An' },
      { key: '740300', label: 'TP. Dĩ An' },
    ],
  },
  {
    code: '75',
    name: 'Đồng Nai',
    districts: [
      { key: '750100', label: 'TP. Biên Hòa' },
      { key: '750200', label: 'TP. Long Khánh' },
    ],
  },
];

export const provinceOptions: GeographicOption[] = vietnamDivisions.map(
  (item) => ({
    label: item.name,
    key: `${item.code}0000`,
  }),
);

export const getCityOptions = (provinceKey: string): GeographicOption[] => {
  if (!provinceKey) return [];
  const provinceCode =
    provinceKey.length === 2 ? provinceKey : provinceKey.slice(0, 2);
  const found = vietnamDivisions.find((item) => item.code === provinceCode);
  return found ? found.districts : [];
};
