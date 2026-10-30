/**
 * @file IUseContext.ts
 * @description Interface chuẩn cho Context của màn hình theo mô hình Becoxy
 */

export interface IWindowSize {
  innerWidth: number;
  innerHeight: number;
}

export interface IUseContext {
  windowSize?: IWindowSize;
  openModal?: boolean;
  handleModal?: (item?: any, type?: any) => void;
  openModalDetail?: boolean;
  handleModalDetail?: (item?: any) => void;
  typeModal?: { value: string; title?: string };
  setTypeModal?: (type: { value: string; title?: string } | any) => void;
  dataItem?: any;
  setDataItem?: (item: any) => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  refreshData?: () => void;
}
