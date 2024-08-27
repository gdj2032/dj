import React, { ReactNode } from 'react';
import RenderInBody from '../RenderInBody';
import './index.scss';

interface IState {
  position: IPosition;
  visible: boolean;
  children?: ReactNode;
}

export default class CPopContainer extends React.PureComponent<any, IState> {
  static _ref: CPopContainer;
  public readonly state: Readonly<IState> = {
    position: { x: 0, y: 0 },
    visible: false,
    children: undefined,
  };

  static setRef(ref: any) {
    CPopContainer._ref = ref;
  }

  static show = (opt: ICPopContainerInfo) => {
    CPopContainer._ref?.show(opt);
  }

  static hide = () => {
    CPopContainer._ref?.hide();
  }

  private show = (info: ICPopContainerInfo) => {
    const { x, y, children } = info;
    this.setState({
      visible: true,
      position: { x, y },
      children: children || undefined,
    });
  }

  private hide = () => {
    this.setState({
      visible: false,
      position: { x: 0, y: 0 },
      children: undefined,
    });
  }

  private stopEventPropagation = (e: any) => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  }

  render() {
    const { visible, position, children } = this.state;
    return (
      <RenderInBody>
        <div className="modal-container" style={{ display: visible ? 'block' : 'none' }} onClick={this.hide}>
          <div className="pop-container" onClick={this.stopEventPropagation} style={{ top: position ? position.y : 0, left: position ? position.x : 0 }}>
            {children}
          </div>
        </div>
      </RenderInBody>
    );
  }
}
