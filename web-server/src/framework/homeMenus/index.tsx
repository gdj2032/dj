/**
 * 导航栏
 */
import React, { useState } from 'react';
import './index.scss';
import { useAppSelector, routeAction } from '@/stores';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useDispatch } from 'react-redux';

interface IProps {
}

function HomeMenus(props: IProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { routes, currentRoute } = useAppSelector(routeAction.routeInfo)
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [activeParentKey, setActiveParentKey] = useState<str_num>('')

  const activeKey= currentRoute?.id

  const renderMenuItem = (e: ViewService.IView) => {
    const parentAble = !e.parentView?.id
    const active = activeKey && activeKey === e.id;
    const activeParent = parentAble && activeParentKey && activeParentKey === e.id;
    return (
      <Tooltip key={e.id} title={e.title} placement='right'>
        <div
          key={e.id}
          className={`p-menu-item ${parentAble && 'p-menu-parent-item'} p-menu-item-${active ? 'active' : ''} p-menu-parent-item-${activeParent ? 'active' : ''}`}
          onClick={() => {
            dispatch(routeAction.setCurrentRoute(e))
            setActiveParentKey(e.parentView?.id);
            navigate(e.path)
          }}
        >
          {/* {e.icon && (
            <div className="i-icon">{e.icon}</div>
          )} */}
          <div className='i-label'>{e.title}</div>
          {parentAble && <div className='i-line' />}
        </div>
      </Tooltip>
    )
  }
  return (
    <div className={`m-home-menus m-home-menus-${collapsed ? 'collapsed' : ''}`}>
      {routes?.map(e => (renderMenuItem(e)))}
      {/* <div className={`p-collapsed`} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      </div> */}
    </div>
  )
}

HomeMenus.displayName = 'HomeMenus';

export default HomeMenus;
