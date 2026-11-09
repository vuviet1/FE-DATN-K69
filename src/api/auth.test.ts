import { request } from '@umijs/max';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  API_ENDPOINTS,
  currentUser,
  getFakeCaptcha,
  login,
  outLogin,
  register,
} from './index';

vi.mock('@umijs/max', () => ({
  request: vi.fn(),
}));

describe('Auth API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls login with correct endpoint and options', async () => {
    vi.mocked(request).mockResolvedValue({ status: 'ok', token: 'fake-token' });

    const params = {
      username: 'admin',
      password: 'password123',
      type: 'account',
    };
    await login(params);

    expect(request).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    });
  });

  it('calls register with correct endpoint and options', async () => {
    vi.mocked(request).mockResolvedValue({ status: 'ok' });

    const params = {
      email: 'student@example.com',
      password: 'password123',
      role: 'student',
    };
    await register(params);

    expect(request).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    });
  });

  it('calls currentUser with correct endpoint', async () => {
    vi.mocked(request).mockResolvedValue({
      data: { name: 'Admin', role: 'admin' },
    });

    await currentUser();

    expect(request).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.CURRENT_USER, {
      method: 'GET',
    });
  });

  it('calls outLogin with correct endpoint', async () => {
    vi.mocked(request).mockResolvedValue({ success: true });

    await outLogin();

    expect(request).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  });

  it('calls getFakeCaptcha with correct endpoint and query params', async () => {
    vi.mocked(request).mockResolvedValue({ code: 1234, status: 'ok' });

    await getFakeCaptcha({ phone: '0987654321' });

    expect(request).toHaveBeenCalledWith(API_ENDPOINTS.AUTH.CAPTCHA, {
      method: 'GET',
      params: {
        phone: '0987654321',
      },
    });
  });
});
