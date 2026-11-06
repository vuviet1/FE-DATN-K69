import { request } from '@umijs/max';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin' | 'teacher' | 'student';
}

export interface UserRegisterParams {
  mail: string;
  email?: string;
  username?: string;
  password: string;
  confirm?: string;
  mobile?: string;
  captcha?: string;
  prefix?: string;
  role?: string;
}

export async function fakeRegister(params: UserRegisterParams) {
  const registerPath = process.env.UMI_APP_API_REGISTER_PATH || '/api/register';
  return request(registerPath, {
    method: 'POST',
    data: params,
  });
}
