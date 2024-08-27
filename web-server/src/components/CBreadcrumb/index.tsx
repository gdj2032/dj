/**
 * 面包屑
 */
import * as React from 'react';
import { default as AntBreadcrumb } from 'antd/lib/breadcrumb'
import 'antd/lib/breadcrumb/style'
import 'antd/lib/affix/style'
import ItemRow, { IRowItem } from '../ItemsRow';
import { Affix } from 'antd';
import './index.scss'
import { PAGE_HEADER_HEIGHT } from '@/constants';

interface IBreadcrumbProps {
  route?: Array<{ name: string; url?: string }>;
  customItems?: IRowItem[];
  style?: React.CSSProperties;
  className?: string;
  offsetTop?: number;
}

export default class CBreadcrumb extends React.Component<IBreadcrumbProps, any> {
  affixRef?: Affix | null;
  item: HTMLElement | null;
  oldPos: number;
  constructor(props: any) {
    super(props);
    this.state = {
      top: 0,
      route: null,
      button: null
    };
    this.item = null;
    this.oldPos = 0;
  }
  private onScroll = () => {
    if (this.affixRef && this.affixRef.updatePosition) {
      this.affixRef && this.affixRef.updatePosition();
    }

  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, true);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  getUrl(url: string) {
    let _url = url
    if (url.startsWith('/')) {
      _url = url.slice(1)
    }
    const { mainAppBaseUrl, microAppName } = this.context;
    const _mainAppBaseUrl = mainAppBaseUrl ? `${mainAppBaseUrl}/` : ''
    const _microAppName = microAppName ? `${microAppName}/` : ''
    return `${_mainAppBaseUrl}${_microAppName}${_url}`
  }

  render() {
    const { className, offsetTop = PAGE_HEADER_HEIGHT } = this.props;
    return (
      <div className={`c-breadcrumb ${className || ''}`} style={this.props.style}>
        <Affix ref={(r) => { this.affixRef = r; }} offsetTop={offsetTop}>
          <div className="c-breadcrumb-container">
            <AntBreadcrumb className="c-breadcrumb-inner-breadcrumb" style={{ fontSize: '18px' }}>
              {
                this.props.route && this.props.route.map((v: { name: string; url?: string }) => {
                  return v.url
                    ? (
                      <AntBreadcrumb.Item key={v.url}>
                        <a href={`#/${this.getUrl(v.url)}`}>{v.name}</a>
                      </AntBreadcrumb.Item>
                    )
                    : <AntBreadcrumb.Item key={v.name}>{v.name}</AntBreadcrumb.Item>
                })
              }
            </AntBreadcrumb>
            <div className="c-breadcrumb-custom-item-wrapper">
              <ItemRow items={this.props.customItems} />
            </div>
          </div>
        </Affix>
      </div>

    );
  }
}
