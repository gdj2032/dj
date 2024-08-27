import { ReactNode } from 'react';
import { RouteObject } from 'react-router/dist/lib/context';
import React from 'react';

// 自动引入 带有 export PageRoute = xxx;的页面
interface IPageInfo {
  route: string; // 组件路由
  component: ReactNode; // 组件
  path: string; // 页面路径
}

// 访问根目录下面的*.tsx : ./xxx/xxx.tsx
export default function autoImport() {
  const allPages: IPageInfo[] = [];
  const r = require.context('../../pages', true, /^\.\/([a-zA-Z0-9.]+\/)+([a-zA-Z0-9]+)\.(tsx|ts|jsx|js)$/);
  r.keys().forEach((key: any) => {
    const imported = r(key);
    const defComp = imported.default;
    const routePath = imported.RoutePath;
    if (!defComp || typeof routePath !== 'string') {
      // 没有导出 Route
      return;
    }
    // 页面路径分段
    const pageInfo: IPageInfo = {
      component: defComp,
      route: routePath,
      path: `pages/${key}`,
    }
    allPages.push(pageInfo);
  });
  let hasError = false;
  for (let i = 0; i < allPages.length; i++) {
    for (let j = i + 1; j < allPages.length; j++) {
      if (allPages[i].route === allPages[j].route) {
        console.error(`页面路由重复：${allPages[i].route}`)
        console.error(`${allPages[i].path}  |  ${allPages[j].path}`);
        console.error('------------------------------------------------------------------');
        hasError = true;
      }
    }
  }
  if (hasError) {
    throw new Error('错误: 页面路由有重复');
  }
  const pagesRoutes: RouteObject[] = [];
  allPages.forEach((p) => {
    const Comp: any = p.component;
    pagesRoutes.push({ element: <Comp />, path: p.route });
  });
  return pagesRoutes;
}
