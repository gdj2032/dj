import React from 'react';
import { doLogin } from '@/utils';
import { Button, Form, Input } from 'antd';
import './index.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import CustomHeader from '@/framework/header';
import { useForm } from 'antd/lib/form/Form';

function Login() {

  const [form] = useForm()

  const onFinish = async (values: any) => {
    doLogin(values)
  };

  return (
    <div className="layout-login">
      <CustomHeader />
      <div className='layout-wrap__content'>
        <div className="login-wrap">
          <div className="login-tabs">
            {/* {
              tabs.map(e => renderTabItem(e))
            } */}
            <div className="project-name">欢迎登录</div>
          </div>
          <div className="login-form">
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
              >
                <Input
                  prefix={<UserOutlined className='prefix-icon' />}
                  placeholder="请输入用户名"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className='prefix-icon' />}
                  placeholder="请输入密码"
                />
              </Form.Item>

              <Form.Item className="login-btn">
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* {process.env.NODE_ENV !== 'development' ? <div className="version-number" style={{ fontSize: 10, textAlign: 'right' }}>{`版本号：${VERSION}`}</div> : null} */}
        </div>
      </div>
    </div>
  );
}

export default Login;
