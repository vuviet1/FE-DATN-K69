import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as service from '../service';
import BaseView from './base';

const mocks = vi.hoisted(() => ({
  form: {
    setFieldValue: vi.fn(),
  },
  initialValues: undefined as Record<string, any> | undefined,
  onValuesChange: undefined as
    | ((changedValues: Record<string, unknown>) => void)
    | undefined,
  dependencyProvince: { label: 'Hà Nội', value: '010000' },
  requestResults: {} as Record<string, any>,
}));

vi.mock('@ant-design/pro-components', async () => {
  const React = await import('react');

  const ProForm = ({
    children,
    formRef,
    initialValues,
    onValuesChange,
  }: any) => {
    if (formRef) {
      formRef.current = mocks.form;
    }
    mocks.initialValues = initialValues;
    mocks.onValuesChange = onValuesChange;
    return <form>{children}</form>;
  };

  ProForm.Group = ({ children }: any) => <div>{children}</div>;

  return {
    ProForm,
    ProFormDependency: ({ children }: any) => (
      <div>{children({ province: mocks.dependencyProvince })}</div>
    ),
    ProFormFieldSet: ({ children }: any) => <div>{children}</div>,
    ProFormSelect: ({ name, params, request }: any) => {
      React.useEffect(() => {
        request?.(params).then((result: any) => {
          mocks.requestResults[name] = result;
        });
      }, [name, params, request]);
      return <div />;
    },
    ProFormText: () => <div />,
    ProFormTextArea: () => <div />,
  };
});

vi.mock('antd', () => ({
  Button: ({ children }: any) => <button type="button">{children}</button>,
  Input: (props: any) => <input {...props} />,
  Upload: ({ children }: any) => <div>{children}</div>,
  message: {
    success: vi.fn(),
  },
}));

vi.mock('@ant-design/icons', () => ({
  UploadOutlined: () => <span />,
}));

vi.mock('./index.style', () => ({
  default: () => ({
    styles: {
      area_code: 'area-code',
      avatar: 'avatar',
      avatar_title: 'avatar-title',
      baseView: 'base-view',
      button_view: 'button-view',
      left: 'left',
      phone_number: 'phone-number',
      right: 'right',
    },
  }),
}));

vi.mock('../service', () => ({
  queryCity: vi.fn(),
  queryCurrent: vi.fn(),
  queryProvince: vi.fn(),
}));

describe('BaseView geographic selects', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    mocks.initialValues = undefined;
    mocks.onValuesChange = undefined;
    mocks.dependencyProvince = { label: 'Hà Nội', value: '010000' };
    mocks.requestResults = {};
    vi.clearAllMocks();

    vi.mocked(service.queryCurrent).mockResolvedValue({
      data: {
        address: 'Số 1 Đại Cồ Việt, Hai Bà Trưng',
        avatar: '',
        country: 'Vietnam',
        email: 'hungnv@university.edu.vn',
        geographic: {
          province: { label: 'Hà Nội', key: '010000' },
          city: { label: 'Quận Ba Đình', key: '010100' },
        },
        group: '',
        name: 'TS. Nguyễn Văn Hùng',
        notice: [],
        notifyCount: 0,
        phone: '024-38691234',
        signature: '',
        tags: [],
        title: '',
        unreadCount: 0,
        userid: '00000001',
      },
    });
    vi.mocked(service.queryProvince).mockResolvedValue([
      { key: '010000', label: 'Hà Nội' },
    ]);
    vi.mocked(service.queryCity).mockResolvedValue([
      { key: '010100', label: 'Quận Ba Đình' },
    ]);
  });

  it('normalizes geographic initial values for labelInValue selects', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.initialValues?.province).toEqual({
        label: 'Hà Nội',
        value: '010000',
      });
      expect(mocks.initialValues?.city).toEqual({
        label: 'Quận Ba Đình',
        value: '010100',
      });
    });
  });

  it('does not set incomplete geographic initial values', async () => {
    vi.mocked(service.queryCurrent).mockResolvedValue({
      data: {
        address: 'Số 1 Đại Cồ Việt',
        avatar: '',
        country: 'Vietnam',
        email: 'hungnv@university.edu.vn',
        geographic: {
          province: { label: 'Hà Nội' },
          city: { label: 'Quận Ba Đình' },
        },
        group: '',
        name: 'TS. Nguyễn Văn Hùng',
        notice: [],
        notifyCount: 0,
        phone: '024-38691234',
        signature: '',
        tags: [],
        title: '',
        unreadCount: 0,
        userid: '00000001',
      } as any,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.initialValues?.name).toBe('TS. Nguyễn Văn Hùng');
      expect(mocks.initialValues?.province).toBeUndefined();
      expect(mocks.initialValues?.city).toBeUndefined();
    });
  });

  it('loads cities with the selected province value', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(service.queryCity).toHaveBeenCalledWith('010000');
    });
  });

  it('clears city when province changes', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.onValuesChange).toBeTypeOf('function');
    });

    mocks.onValuesChange?.({
      province: { label: 'TP. Hồ Chí Minh', value: '790000' },
    });

    expect(mocks.form.setFieldValue).toHaveBeenCalledWith('city', undefined);
  });

  it('returns label/value option arrays for geographic selects', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.requestResults.province).toEqual([
        { label: 'Hà Nội', value: '010000' },
      ]);
      expect(mocks.requestResults.city).toEqual([
        { label: 'Quận Ba Đình', value: '010100' },
      ]);
    });
  });

  it('supports local mock name/id geographic responses', async () => {
    vi.mocked(service.queryProvince).mockResolvedValue([
      { id: '790000', name: 'TP. Hồ Chí Minh' },
    ]);
    vi.mocked(service.queryCity).mockResolvedValue([
      { id: '790100', name: 'Quận 1' },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(mocks.requestResults.province).toEqual([
        { label: 'TP. Hồ Chí Minh', value: '790000' },
      ]);
      expect(mocks.requestResults.city).toEqual([
        { label: 'Quận 1', value: '790100' },
      ]);
    });
  });

  it('falls back to local city options when remote city data is empty', async () => {
    mocks.dependencyProvince = { label: 'Đà Nẵng', value: '480000' };
    vi.mocked(service.queryCity).mockResolvedValue([]);

    render(
      <QueryClientProvider client={queryClient}>
        <BaseView />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(service.queryCity).toHaveBeenCalledWith('480000');
      expect(mocks.requestResults.city).toContainEqual({
        label: 'Quận Hải Châu',
        value: '480100',
      });
    });
  });
});
