// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** Gửi mã xác nhận POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** Số điện thoại */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
