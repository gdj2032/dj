/**
 * 分割线
 */
import React, { Component } from 'react';
import './index.scss';

interface IProps {
  width?: string | number;
  height?: string | number;
  background?: string;
  title?: string;
  class_name?: string;
}

interface IState {
}

export default class CDivider extends Component<IProps, IState> {

  static defaultProps = {
    height: 1,
    background: '#ccc',
  }

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { width, height, background, title, class_name } = this.props
    return (
      <div style={{ width: width ? `${width}px` : '100%', height: `${height}px`, backgroundColor: background }} className={`c-divider ${class_name}`} >
        {title}
      </div>
    )
  }

}
