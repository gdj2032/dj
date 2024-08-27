import React, { Component } from 'react';
import './index.scss';

interface ICToastInfo {
  title: string;
  mask?: boolean;
  /**
   * 持续时间
   * @default 2000
   * @memberof ICToastInfo
   */
  duration?: number;
}

interface IProps {
}

interface IState {
  visible: boolean;
  mask: boolean;
  title: string;
  duration: number;
}

export default class CToast extends Component<IProps, IState> {

  static _ref: CToast | undefined;

  static setRef(ref: any) {
    CToast._ref = ref;
  }

  static show = (opt: ICToastInfo) => {
    CToast._ref?.show(opt);
  }

  static hide = () => {
    CToast._ref?.hide();
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      mask: false,
      title: '1111',
      duration: this.defaultDuration,
    };
  }

  private defaultDuration = 2000
  private timeout;
  private show = ({ title, mask, duration = this.defaultDuration }: ICToastInfo) => {
    this.setState({ visible: true, mask: !!mask, title, duration })
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.hide()
    }, duration);
  }

  private hide = () => {
    this.setState({ visible: false, mask: false, title: '', duration: this.defaultDuration })
  }

  render() {
    const { title, visible } = this.state;
    return (
      <div className="c-toast-view" style={{ display: visible ? '' : 'none' }}>
        <div className="ct-title">{title}</div>
      </div>
    )
  }
}
