/**
 * 系统设置 不可删除
 */
import React from 'react';
import './index.scss';
import { routeAction, useAppSelector } from '@/stores';
import Header from '@/framework/header';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet, Routes } from 'react-router';
import HomeMenus from '@/framework/homeMenus';

function System() {
  const { routes } = useAppSelector(routeAction.routeInfo)
  return (
    <Layout className="g-container">
      <Header />
      <Layout className="layout-container">
        <HomeMenus />
        <Content className="layout-content">
          <Outlet />
          content
        </Content>
      </Layout>
    </Layout>
  )
}

System.displayName = 'System';

export default System;
