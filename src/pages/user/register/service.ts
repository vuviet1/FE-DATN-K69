import type { RegisterParams } from '@/api';
import { register as registerApi } from '@/api';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin' | 'teacher' | 'student';
}

export interface UserRegisterParams extends RegisterParams {
  mail: string;
  password: string;
}

export async function fakeRegister(params: UserRegisterParams) {
  return registerApi(params);
}
