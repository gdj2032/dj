import { PageFrame } from '@/components';
import { isElectron } from '@/constants';
import { routeAction, sysAction, useAppSelector } from '@/stores';
import React, { useEffect, useMemo } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
import routeList from './routeList';
import { initViews } from '@/utils';
import { System } from '@/pages';
import pageRoutes from '@/pages/pageRoutes';
import { ConfigProvider, theme } from 'antd';

const Roots = () => {

  const { routes: storeRoute } = useAppSelector(routeAction.routeInfo)
  const { sysTheme }  =useAppSelector(sysAction.sysInfo)

  const routes = useMemo(() => {
    const r = storeRoute.map(e => {
      const Comp = require(`@/pages${e.path}`).default
      return { path: e.path , Component: Comp, p: `#${e.path}` }
    })
    return [...r, { path: '*', Component: System }]
  }, [storeRoute])

  console.info('--- routes --->', routes);

  useEffect(() => {
    initViews();
  }, [])

  useEffect(() => {
    if (window.location.hash === '#/' || window.location.hash === '') {
      window.location.hash = pageRoutes.home
    } else if (!routes.map(e => e.p).includes(window.location.hash)) {
      window.location.hash = pageRoutes.home
    }
  }, [window.location.hash, routes])

  function changeTheme(themeObj) {
    const vars = Object.keys(themeObj).map(key => `--${key}:${themeObj[key]}`).join(';')
    document.documentElement.setAttribute('style', vars)
  }

  function getTheme() {
    // 更改项目内自定义主题
    changeTheme({ "theme-color": sysTheme === 'black' ? '#1890ff' : 'green' })
    // 更改antd组件主题
    if (sysTheme === 'black') {
      return {
        token: {
          colorPrimary: '#4994EC',
          colorTextQuaternary: '#ffffff',
          colorTextPlaceholder: 'rgba(255,255,255,0.5)',
          colorTextLabel: 'rgba(255,255,255,0.5)',
          colorBgContainer: 'rgba(73,148,236,0.06)'
        },
        components: {
          Card: {
            colorBgContainer: 'rgba(73,148,236,0.06)'
          },
          Layout: {
            colorBgLayout: 'rgba(73,148,236,0.02)'
          },
        },
        algorithm: theme.darkAlgorithm,
      }
    } else {
      return {
        token: {
          colorPrimary: '#497dbd',
        },
      }
    }
  }

  return (
    <ConfigProvider
      theme={getTheme()}
    >
      <PageFrame hideTitleBar={!isElectron}>
        <HashRouter>
            <Routes>
              {routeList(routes)}
            </Routes>
        </HashRouter>
      </PageFrame>
    </ConfigProvider>
  );
}

export default Roots;
