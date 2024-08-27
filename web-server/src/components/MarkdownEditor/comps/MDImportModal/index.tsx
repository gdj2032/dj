/**
 * 导入文件
 */
import React, { useState, useRef } from 'react';
import './index.scss';
import { IModalProps } from '@/hooks/openModal';
import { Modal, Upload, Button, Form, Input } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { API_HOST } from '@/constants';
import { instance } from '@/utils';
import { UploadOutlined } from '@ant-design/icons';

export type T_MD_IMPORT_MODAL_TYPE = 'image' | 'video' | 'href'

interface IProps extends IModalProps {
  type: T_MD_IMPORT_MODAL_TYPE;
}

function MDImportModal(props: IProps) {
  const { close, visible, type, ...arg } = props;
  const [loading, setLoading] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const formRef = useRef<any>()
  const handleOk = async () => {
    const params = await formRef.current.validateFields();
    const { response: res, status } = params.file?.file || {}
    if (status === 'done') {
      setConfirmLoading(true)
      const url = res.data.url;
      const wh = params.wh?.split('x');
      const param = {
        url,
        width: wh?.[0],
        height: wh?.[1],
        isOk: true,
      }
      setConfirmLoading(false)
      close?.(param)
    }
  }
  const title = () => {
    switch (type) {
      case 'image':
        return '插入图片'
      case 'video':
        return '插入视频'
      case 'href':
        return '插入链接'
      default:
        return '插入图片'
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    capture: true,
    accept: 'image/*',
    action: `${API_HOST}/file/upload`,
    method: 'POST',
    headers: {
      SESSION: instance.session,
    },
    onChange: ({ file }) => {
      const { status } = file
      if (status === 'uploading') {
        setLoading(true)
      }
      if (status === 'done') {
        // if (response.code === 200) {
        //   close?.({ isOk: true, url: response?.data?.url })
        // }
        setLoading(false)
      }
      if (status === 'error' || status === 'removed') {
        setLoading(false)
      }
    }
  }

  const imageView = () => {
    return (
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} ref={c => formRef.current = c}>
        <Form.Item name='file' label='图片' rules={[{ required: true, message: '请选择图片' }]}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={loading}>选择图片</Button>
          </Upload>
        </Form.Item>
        <Form.Item name='wh' label='分辨率'>
          <Input placeholder="请输入分辨率" />
        </Form.Item>
        <Form.Item label=' ' colon={false}>
          <span>例: 100x100 默认图片等宽高</span>
        </Form.Item>
      </Form>
    )
  }

  const renderContent = () => {
    switch (type) {
      case 'image':
        return imageView()
      case 'video':
        return '插入视频'
      case 'href':
        return '插入链接'
      default:
        return imageView()
    }
  }

  return (
    <Modal
      open={visible}
      title={title()}
      onCancel={() => close?.()}
      onOk={handleOk}
      okText="确认"
      cancelText="取消"
      confirmLoading={confirmLoading}
      {...arg}
    >
      {renderContent()}
    </Modal>
  )
}

MDImportModal.displayName = 'MDImportModal';

export default MDImportModal;
