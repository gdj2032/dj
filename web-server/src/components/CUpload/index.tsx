/**
 * 文件上传组件
 */
import React from 'react';
import { Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { instance } from '@/utils';

interface IProps extends UploadProps {
}

function CUpload(props: IProps) {
  const curProps = {
    name: 'file',
    capture: '',
    withCredentials: true,
    multiple: false,
    maxCount: 1,
    headers: {
      SESSION: instance.session,
    },
    onChange: props.onChange,
    ...props,
  }
  return (
    <Upload {...curProps}>
      {curProps.children}
    </Upload>
  )
}

CUpload.displayName = 'CUpload';

export default CUpload;
