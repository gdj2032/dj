import pageRoutes from '@/pages/pageRoutes';
import { ReactNode } from 'react';

export interface INavFormat {
  label: string;
  key: string;
  icon?: ReactNode;
  children?: INavFormat[];
  admin?: boolean;
}

export const menuConfig: INavFormat[] = [
  {
    label: '主页',
    key: pageRoutes.home,
  },
  // {
  //   label: 'HTML',
  //   key: '/html',
  //   children: [
  //     {
  //       label: 'JavaScript',
  //       key: pageRoutes.htmlJavascript,
  //     },
  //     {
  //       label: 'CSS',
  //       key: pageRoutes.htmlCss,
  //     },
  //     {
  //       label: '正则表达式',
  //       key: pageRoutes.htmlRegex,
  //     },
  //     {
  //       label: '其他',
  //       key: pageRoutes.htmlOther,
  //     },
  //   ]
  // },
  // {
  //   label: 'React',
  //   key: '/react',
  //   children: [
  //     {
  //       label: '组件',
  //       key: pageRoutes.reactComp,
  //     },
  //     {
  //       label: 'Hooks',
  //       key: pageRoutes.reactHooks,
  //     },
  //     {
  //       label: '其他',
  //       key: pageRoutes.reactOther,
  //     },
  //   ]
  // },
  {
    label: '管理员',
    key: pageRoutes.admin,
    admin: true,
  },
]
