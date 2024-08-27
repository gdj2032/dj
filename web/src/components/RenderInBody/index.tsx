import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import './index.scss';

interface IProps {
  children?: ReactNode;
}

export default class RenderInBody extends React.PureComponent<IProps> {

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  popup: any;

  _render() {
    ReactDom.render(<div>{this.props.children}</div>, this.popup);
  }

  componentDidMount() {
    this.popup = document.createElement('div');
    document.body.appendChild(this.popup);
    this._render();
  }

  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDom.unmountComponentAtNode(this.popup);
    document.body.removeChild(this.popup);
  }

  render() {
    return null;
  }
}
