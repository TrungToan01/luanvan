export interface RequestItem {
  ActionName?: string;
  KeyValues?: {};
  GridRequestInfo?: GridRequestInfo;
  KeyRequest?: string;
  SearchInfo?: {};
}
export interface GridRequestInfo {
  size?: number;
  page?: number;
  total?: number;
  resetPage?: boolean;
}

export interface SearchParamRequest {
  Key: string;
  Value: string;
}
export interface PageDataInfo {
  size?: number;
  page?: number;
  total?: number;
  pageSizeOptions?: any;
  resetPage?: boolean;
}
