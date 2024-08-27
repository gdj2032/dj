import React, { useEffect, useState } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
// import { CPopContainer, CToast } from '@/components';
import ContainerPage from '../container';
import autoImport from './autoImport';
import routeList from './routeList';
import { loginRoute, pageRoute, PathConfig } from './routes';

autoImport()

const Roots = () => {
  const [curHash, setCurHash] = useState(window.location.hash)
  useEffect(() => {
    // const browserLanguage = (navigator.language || navigator.language).toLowerCase().split(/[-_]/)[0];
    // console.info('🚀 ~ file: index.tsx ~ line 40 ~ useEffect ~ browserLanguage', browserLanguage)
    setCurHash(window.location.hash)
  }, [])
  const routes = pageRoute();
  const getContainer = () => {
    if (curHash.includes(PathConfig.login)) {
      return (
        <Routes>
          {routeList(loginRoute)}
        </Routes>
      )
    }
    return <ContainerPage routes={routes} />
  }
  return (
    <HashRouter>
      {getContainer()}
      {/* <CToast ref={c => CToast.setRef(c)} />
      <CPopContainer ref={c => CPopContainer.setRef(c)} /> */}
    </HashRouter>
  );
}

export default Roots;
