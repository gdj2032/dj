/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 * 基本信息
 */
import React, { ReactNode } from 'react';
import {
  Card, Descriptions, Input, DatePicker
} from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload';
import { API_HOST } from '@/constants';

import './index.scss'
import CUpload from '../CUpload';
import { instance } from '@/utils';

export interface ICBaseInfoData {
  /**
   *
   * @default normal
   * @memberof ICBaseInfoData
   */
  type?: 'normal' | 'download' | 'input' | 'datePicker' | 'upload';
  label: string;
  value: any;
  url?: string;
  span?: number;
  click?: (item: ICBaseInfoData) => void;
  fileId?: string;
  props?: {
    onChange?: (e) => void;
    placeholder?: string;
  },
  uploadProps?: UploadProps;
}

interface IProps {
  title?: string;
  needMarginTop?: boolean;
  data: ICBaseInfoData[];
  children?: ReactNode;
}

function CBaseInfo(props: IProps) {
  const {
    title = '基本信息', needMarginTop = true, data = [], children
  } = props;

  const normalItem = (e: ICBaseInfoData) => (
    <Descriptions.Item key={e.label} label={e.label} span={e.span}>{e.value}</Descriptions.Item>
  )

  const downloadFile = (e: ICBaseInfoData) => {
    const url = `${API_HOST}/files/${e.fileId}/download`;
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('SESSION', instance.session)
    xhr.send();
    xhr.onload = (evt: any) => {
      const blob = evt.target.response
      const fileName = e.value;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (evt2: any) => {
        const a = document.createElement('a');
        a.download = fileName
        a.href = evt2.target.result;
        a.click();
        a.remove();
      }
    }
  }

  const downloadItem = (e: ICBaseInfoData) => (
    <Descriptions.Item key={e.label} label={e.label} span={e.span}>
      <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => e.click?.(e)}>
        <PaperClipOutlined />
        {/* <a href={e.fileId ? `${API_HOST}/files/${e.fileId}/download` : ''}>{e.value}</a> */}
        <a onClick={() => downloadFile(e)}>{e.value}</a>
      </div>
    </Descriptions.Item>
  )

  const inputItem = (e: ICBaseInfoData) => (
    <Descriptions.Item key={e.label} label={e.label} span={e.span}>
      <Input
        style={{ width: '80%' }}
        value={e.value}
        onChange={e.props?.onChange}
        placeholder={e.props?.placeholder || '请输入'}
      />
    </Descriptions.Item>
  )

  const datePickerItem = (e: ICBaseInfoData) => (
    <Descriptions.Item key={e.label} label={e.label} span={e.span}>
      <DatePicker value={e.value} onChange={e.props?.onChange} />
    </Descriptions.Item>
  )

  const uploadItem = (e: ICBaseInfoData) => (
    <Descriptions.Item key={e.label} label={e.label} span={e.span}>
      <CUpload {...e.uploadProps} />
    </Descriptions.Item>
  )

  const renderDescriptionItem = (item: ICBaseInfoData) => {
    const { type = 'normal' } = item;
    switch (type) {
      case 'normal':
        return normalItem(item)
      case 'download':
        return downloadItem(item)
      case 'input':
        return inputItem(item)
      case 'datePicker':
        return datePickerItem(item)
      case 'upload':
        return uploadItem(item)
      default:
        return normalItem(item)
    }
  }

  return (
    <Card className="g-c-base-info" title={title} style={{ marginTop: needMarginTop ? 16 : 0 }}>
      <Descriptions column={3}>
        {
          data.map(e => renderDescriptionItem(e))
        }
      </Descriptions>
      {children}
    </Card>
  )
}

CBaseInfo.displayName = 'CBaseInfo';

export default CBaseInfo;
