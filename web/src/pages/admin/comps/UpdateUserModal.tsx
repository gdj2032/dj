/**
 * 新增编辑用户
 */
import { USER_ROLE } from '@/constants';
import { userService } from '@/services';
import { IModalProps } from '@/hooks/openModal';
import { Form, Input, message, Modal, Select } from 'antd';
import sha1 from 'sha1';
import React, { useState } from 'react';

interface IProps extends IModalProps {
  data?: UserService.IUser;
}

function UpdateUserModal(props: IProps) {
  const { visible, close, data, ...arg } = props;
  const [loading, setLoading] = useState(false)

  let formRef;

  const handleOk = async () => {
    const params = await formRef?.validateFields();
    setLoading(true)
    params.password = sha1(params.password)
    const res = await userService.register(params);
    if (res?.code === 200) {
      message.success('新增用户成功')
      close?.(true)
    }
    setLoading(false)
  }
  return (
    <Modal
      visible={visible}
      onCancel={() => close?.()}
      onOk={handleOk}
      title="新增用户"
      okText="确认"
      cancelText="取消"
      confirmLoading={loading}
      {...arg}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        ref={c => formRef = c}
        initialValues={data}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }, { max: 20, message: '用户名长度不能超过20字' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        {
          !data && (
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }, { max: 20, message: '密码长度不能超过20字' }, { min: 6, message: '密码长度最少6位' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )
        }
        <Form.Item
          label="角色"
          name="role"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select options={USER_ROLE.options()} placeholder="请选择角色" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

UpdateUserModal.displayName = 'UpdateUserModal';

export default UpdateUserModal;
