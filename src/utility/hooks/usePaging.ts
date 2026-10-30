/**
 * @file usePaging.ts
 * @description Hook quản lý trạng thái phân trang, tìm kiếm và lọc
 */

import type { IFPagingApiParams } from '@domain/models';
import { useState } from 'react';

export const usePaging = (initialParams?: IFPagingApiParams) => {
  const [params, setParams] = useState<IFPagingApiParams>({
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
    ...initialParams,
  });

  const handlePageChange = (pageNumber: number, pageSize?: number) => {
    setParams((prev) => ({
      ...prev,
      pageNumber,
      pageSize: pageSize || prev.pageSize,
    }));
  };

  const handleSearch = (keyword: string) => {
    setParams((prev) => ({
      ...prev,
      keyword,
      pageNumber: 1,
    }));
  };

  const handleFilter = (filterParams: Partial<IFPagingApiParams>) => {
    setParams((prev) => ({
      ...prev,
      ...filterParams,
      pageNumber: 1,
    }));
  };

  const resetPaging = () => {
    setParams({
      pageNumber: 1,
      pageSize: 10,
      keyword: '',
      ...initialParams,
    });
  };

  return {
    params,
    setParams,
    handlePageChange,
    handleSearch,
    handleFilter,
    resetPaging,
  };
};

export default usePaging;
