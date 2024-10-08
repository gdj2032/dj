/**
 * 左侧导航栏
 */
import { INavFormat, menuConfig, USER_ROLE } from '@/constants';
import { Layout, Menu } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './index.scss';
import { useAppSelector, userAction } from '@/stores';

const { Sider } = Layout;

interface IProps {
}

const isAncestorNode = (key: string, config: INavFormat[] = []) => {
  if (!key || !config.length) {
    return false
  }
  for (let i = 0, len = config.length; i < len; i++) {
    const item = config[i]
    if (item.key === key || isAncestorNode(key, item.children)) {
      return true
    }
  }
  return false
}

const findSubMenuPath = (key: string, config: INavFormat[] = []) => {
  let result: string[] = []
  for (let i = 0, len = config.length; i < len; i++) {
    const menu = config[i]
    if (isAncestorNode(key, menu.children)) {
      result = result.concat([menu.key], findSubMenuPath(key, menu.children))
      break
    }
  }
  return result
}

const findSelectedKey = (key: string, config: INavFormat[] = []) => {
  let result = ''
  for (let i = 0, len = config.length; i < len; i++) {
    const menu = config[i]
    if (menu.children) {
      result = findSelectedKey(key, menu.children)
      if (result) {
        break
      }
    } else if (key.startsWith(menu.key)) {
      result = menu.key
      break
    }
  }
  return result
}

function Aside(props: IProps) {
  const user = useAppSelector(userAction.userInfo);
  const menus = menuConfig.filter(e => e.admin ? USER_ROLE.isAdmin(user?.role) : true).map((e) => ({ ...e, admin: undefined }))
  const history = useNavigate()
  const location = useLocation()
  const [selectedKey, changeSelectedKeys] = useState(location.pathname)
  const [defaultOpenKeys] = useState(findSubMenuPath(location.pathname, menus))


  useEffect(() => {
    const currentSelectedKey = findSelectedKey(location.pathname, menus)
    changeSelectedKeys(currentSelectedKey)
  }, [location.pathname, menus])

  const changeRouteHandle = ({ key }) => {
    history(key)
  }

  return (
    <Sider
      width={200}
      className="layout-aside"
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        onClick={(changeRouteHandle)}
        items={menus}
      />
    </Sider>
  )
}

Aside.displayName = 'Aside';

export default Aside;
