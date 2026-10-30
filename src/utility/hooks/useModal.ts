/**
 * @file useModal.ts
 * @description Hook quản lý đóng mở modal và truyền dữ liệu theo chuẩn Becoxy
 */

import { useState } from 'react';

export interface IModalType {
  value: 'CREATE' | 'EDIT' | 'VIEW' | string;
  title?: string;
}

export const useModal = <T = any>() => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [dataItem, setDataItem] = useState<T | null>(null);
  const [typeModal, setTypeModal] = useState<IModalType>({
    value: 'CREATE',
    title: 'Thêm mới',
  });

  const handleModal = (
    item?: T,
    type: IModalType = { value: 'CREATE', title: 'Thêm mới' },
  ) => {
    if (item !== undefined) {
      setDataItem(item);
    }
    setTypeModal(type);
    setOpenModal((prev) => !prev);
  };

  const handleModalDetail = (item?: T) => {
    if (item !== undefined) {
      setDataItem(item);
    }
    setOpenModalDetail((prev) => !prev);
  };

  const closeModal = () => {
    setOpenModal(false);
    setDataItem(null);
  };

  const closeModalDetail = () => {
    setOpenModalDetail(false);
  };

  return {
    openModal,
    setOpenModal,
    handleModal,
    closeModal,
    openModalDetail,
    setOpenModalDetail,
    handleModalDetail,
    closeModalDetail,
    dataItem,
    setDataItem,
    typeModal,
    setTypeModal,
  };
};

export default useModal;
