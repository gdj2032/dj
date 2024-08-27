/**
 * openModal-Modal-demo
 */
import { IModalProps } from '@/hooks/openModal';
import { Modal } from 'antd';
import React from 'react';
import './index.scss';

export interface IDemoProps extends IModalProps {
}

function DemoModal(props: IDemoProps) {
  const { close, visible, ...arg } = props;
  const handleOk = () => {
    close?.(true)
  }
  return (
    <Modal
      open={visible}
      title="demo"
      onCancel={() => close?.()}
      onOk={handleOk}
      okText="确认"
      cancelText="取消"
      {...arg}
    >DemoModal</Modal>
  )
}

DemoModal.displayName = 'DemoModal';

export default DemoModal;
