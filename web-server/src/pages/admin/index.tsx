/**
 * 后台数据管理
 */
import { ADMIN_TAB } from '@/constants';
import { Tabs } from 'antd';
import React, { useState } from 'react';
import * as reduxCfg from 'react-redux';
import { DocumentList, DocumentType, UsersTable } from './comps';
import './index.scss';

export const RoutePath = '/admin';

function Admin() {
  const [tabKey, setTabKey] = useState(ADMIN_TAB.user)
  console.info('--- reduxCfg --->', reduxCfg);
  const tabs = [
    { key: ADMIN_TAB.user, tab: '用户列表', view: <UsersTable /> },
    { key: ADMIN_TAB.ctxType, tab: '文档类型', view: <DocumentType /> },
    // { key: ADMIN_TAB.context, tab: '文档列表', view: <DocumentList /> },
  ]
  return (
    <div className="g-admin">
      <Tabs activeKey={tabKey} onChange={setTabKey}>
        {
          tabs.map(e => (
            <Tabs.TabPane key={e.key} tab={e.tab}>
              {e.view}
            </Tabs.TabPane>
          ))
        }
      </Tabs>
    </div>
  )
}

Admin.displayName = 'Admin';

export default Admin;
