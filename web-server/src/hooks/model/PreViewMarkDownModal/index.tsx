/**
 * markdown预览弹窗
 */
import { IModalProps } from '@/hooks/openModal';
import { Modal } from 'antd';
import React from 'react';
import './index.scss';
import { MarkdownPreview } from '@/components';

export interface IDemoProps extends IModalProps {
  value: string;
}

function PreViewMarkDownModal(props: IDemoProps) {
  const { close, visible, value, ...arg } = props;
  return (
    <Modal
      open={visible}
      title="正文预览"
      onCancel={() => close?.()}
      footer={null}
      width={800}
      height={600}
      {...arg}
    >
      {/* <MarkdownPreview value={value} themes="light" /> */}
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </Modal>
  )
}

PreViewMarkDownModal.displayName = 'PreViewMarkDownModal';

export default PreViewMarkDownModal;
