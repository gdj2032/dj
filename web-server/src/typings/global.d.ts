// 全局类型定义
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

interface IRequestParams {
  [key: string]: any;
}

interface IRequestOptions {
  path: string;
  method?: string;
  url?: string;
  credentials?: 'same-origin' | 'include';
  query?: IRequestParams;
  data?: IRequestParams;
  headers?: any;
  upload?: boolean;
  toast?: boolean;
}

interface menuOption {
  label: string;
  route: string;
  permissions?: number[];
  children?: menuOption[];
  icon?: string;
}

interface Common {
  id: string | number;
  name: string;
}

interface String {
  locales: Function;
  localeString: Function;
  localesDate: Function;
  localesTime: Function;
}

type str_num = string | number;

interface IPosition {
  x: number;
  y: number;
}

interface ICPopContainerInfo extends IPosition {
  children?: any;
}

interface ILimitOffset {
  limit: number;
  offset: number;
}

interface ILimitOffsetTotal extends ILimitOffset {
  total: number;
}

interface ICodeMsg {
  code: number;
  message: string;
}

interface IBaseRes<T = null> extends ICodeMsg {
  data: T;
}

interface IBaseListData<T = {}> extends ILimitOffsetTotal {
  data: T[];
}

interface IBaseListRes<T> extends ICodeMsg {
  data: IBaseListData<T>
}

interface ILabelValue {
  label: string;
  value: string;
}

interface IIdName<T = string> {
  id: T;
  name: string;
}
