/**
 * 编辑器顶部按钮组件
 */
import React, { ReactNode } from 'react';
import './index.scss';

interface IProps {
  title: ReactNode;
  svg?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function MDButton(props: IProps) {
  const { title, svg, onClick } = props;
  return (
    <div className='md-button' onClick={onClick}>
      {svg}
      {title}
    </div>
  )
}

MDButton.displayName = 'MDButton';

export default MDButton;
