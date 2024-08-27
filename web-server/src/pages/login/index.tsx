import { PageFrame } from '@/components';
import { isElectron } from '@/constants';
import { doLogin, instance } from '@/utils';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
// import * as sha1 from 'sha1';
import { VERSION } from '@/constants';
import './index.scss';
export const RoutePath = '/login';

function Login() {

  const [remember, setRemember] = useState(!!instance.password)
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      await doLogin({ ...values, isLogin: true })
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:20 ~ onFinish ~ error", error)
    }
    setLoading(false)
  };

  const handleCheck = (e) => {
    setRemember(e.target.checked)
  }

  return (
    <PageFrame hideTitleBar={!isElectron}>
      <div className="layout-login">
        <div className="login-wrap">
          <div className="login-content">
            <div className="project-name">DEMO</div>
            <div className="login-form">
              <div className="login-title">登录</div>
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                initialValues={{
                  remember,
                  username: instance.username,
                  password: instance.password,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input placeholder="请输入用户名" spellCheck={false} />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox onChange={handleCheck}>记住密码</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 16 }} className="login-btn">
                  <Button type="primary" htmlType="submit" loading={loading}>
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
            {process.env.NODE_ENV !== 'development' ? <div className="version-number" style={{ fontSize: 10, textAlign: 'center' }}>{`版本号：${VERSION}`}</div> : null}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

export default Login;
