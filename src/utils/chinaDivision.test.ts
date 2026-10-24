import { describe, expect, it } from 'vitest';
import { getCityOptions, provinceOptions } from './chinaDivision';

describe('vietnamDivision geographic options', () => {
  it('keeps province values compatible with existing six-digit province ids', () => {
    expect(provinceOptions).toContainEqual({
      label: 'Hà Nội',
      key: '010000',
    });
    expect(provinceOptions).toContainEqual({
      label: 'TP. Hồ Chí Minh',
      key: '790000',
    });
  });

  it('returns city options for ordinary provinces', () => {
    expect(getCityOptions('010000')).toContainEqual({
      label: 'Quận Ba Đình',
      key: '010100',
    });
    expect(getCityOptions('790000')).toContainEqual({
      label: 'Quận 1',
      key: '790100',
    });
    expect(getCityOptions('79')).toContainEqual({
      label: 'Quận 1',
      key: '790100',
    });
  });

  it('returns district options for Da Nang', () => {
    expect(getCityOptions('480000')).toContainEqual({
      label: 'Quận Hải Châu',
      key: '480100',
    });
  });
});
