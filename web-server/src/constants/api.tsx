import { isElectron } from '@/electron/constants';
export const mockSwitch = 0; // mock开关
const isProduction = process.env.NODE_ENV !== 'development';
const Credentials = 'include'; // include 跨域使用 、 same-origin 同源使用

const __DEV__ = process.env.NODE_ENV === 'development'

let API_HOST = ''

if (isProduction) {
  API_HOST = '/api';
  if (isElectron) {
    API_HOST = 'http://127.0.0.1:19999';
  }
} else {
  API_HOST = !mockSwitch ? '/api' : '/mock';
}

export {
  API_HOST,
  Credentials,
  __DEV__,
  isElectron,
};
