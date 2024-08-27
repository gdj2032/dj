import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './stores/store';
import Roots from '@/framework/routes'
import zhCN from 'antd/lib/locale/zh_CN'
import './index.scss';
import { ConfigProvider } from 'antd';
import { PersistGate } from 'redux-persist/integration/react'

import '@/styles/global.scss';

// svg配置
// import all svg
const cache = {};
function importAll(r: any) {
  r.keys().forEach((key: any) => {
    // const reg = / fill="(\S*)"/g
    // const s = r(key).default.content.replaceAll(reg, '')
    // r(key).default.content = s;
    // console.info('--- info --->', r(key).default.content);
    (cache as any)[key] = r(key);
  });
}

importAll(require.context('./images/svg', true, /\.svg$/));
// svg end

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Roots />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
