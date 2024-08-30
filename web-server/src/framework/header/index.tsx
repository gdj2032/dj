import React from 'react'
import { Layout, Tooltip } from 'antd'
import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { APPNAME } from '@/constants'
import './index.scss'
import { doLogout } from '@/utils'
import { useAppSelector } from '@/stores'
import { userInfo } from '@/stores/user'
import { useNavigate } from 'react-router'
import pageRoutes from '@/pages/pageRoutes'

const { Header } = Layout

const CustomHeader = () => {
  const { username } = useAppSelector(userInfo);
  const navigate = useNavigate()

  return (
    <Header className="layout-header">
      <div className="u-left-menu">
        <span className="u-app-name">
          {APPNAME}
        </span>
      </div>
      <div className="u-right-menu">
        {/* <div className='u-item'>
          <CSwitch
            size={{ width: 54 }}
            className='mode-switch'
            checked={sysInfo.mode === 'light'}
            checkCircle={<Icon name="light" fill='rgba(242, 230, 96, 1)' />}
            uncheckedCircle={<Icon name="dark" fill='rgba(146, 196, 255, 1)' />}
            checkedBg='rgba(188, 236, 200, 1)'
            uncheckedBg='rgba(68, 87, 129, 1)'
            checkedCircleBg='rgba(180, 200, 222, 1)'
            uncheckedCircleBg='rgba(26, 39, 68, 1)'
            onChange={(e) => {
              Loading.show()
              dispatch(sysAction.setMode(e ? 'light' : 'dark'))
              timer = setTimeout(() => {
                Loading.hide()
                clearTimeout(timer)
              }, 500);
            }}
          />
        </div> */}
        {
          username && (
            <div className="u-item">
              <UserOutlined className="u-icon" />
              <span className="u-text">
                欢迎您，
                {username}
              </span>
            </div>
          )
        }
        <div className="u-item u-login">
          <Tooltip title={username ? '登出' : '登录'}>
            {
              username ? <LogoutOutlined onClick={() => doLogout()} /> : <LoginOutlined onClick={() => navigate('/login')} />
            }
          </Tooltip>
        </div>
      </div>
    </Header>
  )
}

export default CustomHeader
