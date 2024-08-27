/**
 * markdown 编辑器
 */
import React, { Component } from 'react';
import './index.scss';
import { MD_GRAMMAR, MD_HEADER_BUTTON } from './constants';
import MarkdownPreview from '../MarkdownPreview';
import { message, Row, Button } from 'antd';
import { MDButton, MDImportModal } from './comps';
import Icon from '../Icon';
import { IMDHeaderButton } from './type';
import { nextTick } from '@/utils';
import { openModal } from '@/hooks';

interface IProps {
  value?: string;
  onChange?: (v: string) => void;
  height?: number;
}

interface IState {
  value?: string;
  /**
   * none 不显示
   * grammar 语法
   * menu 目录
   *
   * @memberof IState
   */
  menuType: 'none' | 'grammar' | 'menu'
  grammarTitle: string;
  focus: boolean;
  previewAble: boolean; // 是否显示预览
  grammarAble: boolean; // 是否显示语法说明
}

const textareaIdClass = 'i-md-textarea'

export default class MarkdownEditor extends Component<IProps, IState> {

  static defaultProps: IProps = {
    value: ''
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      value: props.value,
      menuType: 'grammar',
      grammarTitle: MD_GRAMMAR.list[0].title,
      focus: false,
      previewAble: false,
      grammarAble: false,
    };
  }

  textareaRef: HTMLTextAreaElement

  componentDidMount(): void {
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value })
    }
  }

  onChangeValue = (v?: string) => {
    this.setState({ value: v })
    this.props.onChange?.(v)
  }

  handleHeaderButton = (item: IMDHeaderButton) => {
    const { value: val } = this.state;
    const selectionStart = this.textareaRef.selectionStart
    const selectionEnd = this.textareaRef.selectionEnd
    let value = val;
    if (selectionStart !== selectionEnd) {
      // 待定
    }
    const before = value.substring(0, selectionStart);
    const after = value.substring(selectionStart);
    let v = `${before}${item.default}${after}`;
    if (item.type === 'image') {
      const { destroy } = openModal(MDImportModal, {
        type: item.type,
        afterClose: (params) => {
          if (params?.isOk) {
            const { url, width, height } = params
            let v0 = ''
            if (width && height) {
              v0 = `![](${url}?x-oss-process=image/resize,w_${width},h_${height})`
            } else {
              v0 = `![](${url})`
            }
            v = value ? `${before}\n${v0}\n${after}` : v0;
            this.onChangeValue(v)
            this.onSelectText(before.length + item.select?.start, before.length + item.select?.end)
          }
          destroy()
        }
      })
    } else {
      this.onChangeValue(v)
      this.onSelectText(before.length + item.select?.start, before.length + item.select?.end)
    }
  }

  // 选中指定文字 focus方法是个异步的
  onSelectText = (start: number, end: number) => {
    const ele = document.getElementById(textareaIdClass) as HTMLTextAreaElement
    if (ele) {
      ele.focus();
      nextTick(() => {
        ele.setSelectionRange(start, end);
      });
    }
  }

  // 顶部操作
  renderHeader = () => {
    return (
      <div className='m-md-header'>
        <div className='p-md-h-left'>
          {
            MD_HEADER_BUTTON.map((e1, i1) => (
              <Row key={i1}>
                {
                  e1.map((e2) => (
                    <MDButton
                      key={e2.type}
                      title={e2.title}
                      svg={<Icon name={e2.svg} size={18} />}
                      onClick={() => this.handleHeaderButton(e2)}
                    />
                  ))
                }
                {
                  i1 < MD_HEADER_BUTTON.length - 1 && (
                    <div className='p-header-line'>|</div>
                  )
                }
              </Row>
            ))
          }
        </div>
        <div className='p-md-h-right'>
          <Button type={this.state.previewAble ? 'primary' : 'default'} onClick={() => this.setState((prevState) => ({ previewAble: !prevState.previewAble }))}>预览视图</Button>
          <Button type={this.state.grammarAble ? 'primary' : 'default'} onClick={() => this.setState((prevState) => ({ grammarAble: !prevState.grammarAble }))}>语法说明</Button>
        </div>
      </div>
    )
  }

  renderExtraTitle = (title: string) => (
    <div className='p-extra-title'>
      <div className='i-e-title'>{title}</div>
      <div className='i-e-close'>x</div>
    </div>
  )

  handleCopy = (item) => {
    message.success('复制成功')
    navigator.clipboard.writeText(item.copy)
  }

  renderExtraTitleCopy = (item) => (
    <div className='p-extra-title'>
      <div className='i-e-title'>{item.title}</div>
      <div className='i-e-copy' onClick={() => this.handleCopy(item)}>复制</div>
    </div>
  )

  renderGrammarContent = () => {
    const { grammarTitle } = this.state;
    const item = MD_GRAMMAR.list.find(e => e.title === grammarTitle)
    if (item) {
      const { content } = item
      return (
        <div className='p-grammar-content'>
          {this.renderExtraTitleCopy(item)}
          <MarkdownPreview themes="light" height='100%' value={content} />
        </div>
      )
    }
    return null;
  }

  // 语法
  renderGrammar = () => {
    const { grammarTitle } = this.state;
    return (
      <div className='p-md-extra m-md-grammar'>
        {this.renderExtraTitle(MD_GRAMMAR.title)}
        <div className='p-grammar-titles'>
          {
            MD_GRAMMAR.list.map((e) => (
              <div
                key={e.title}
                className={`
                  i-title-item
                  ${grammarTitle === e.title ? 'i-title-item-active' : ''}
                `}
                onClick={() => this.setState({ grammarTitle: e.title })}
              >
                {e.title}
              </div>
            ))
          }
        </div>
        {this.renderGrammarContent()}
      </div>
    )
  }

  // 目录
  renderMenu = () => {
    return (
      <div className='p-md-extra m-md-menu'>renderMenu</div>
    )
  }

  renderExtra = () => {
    switch (this.state.menuType) {
      case 'grammar':
        return this.renderGrammar()
      case 'menu':
        return this.renderMenu()
      default:
        break;
    }
    return null;
  }

  renderEditor = () => {
    const { value } = this.state;
    return (
      <div className='p-md-editor'>
        <textarea
          id={textareaIdClass}
          className={textareaIdClass}
          suppressContentEditableWarning
          contentEditable
          spellCheck={false}
          value={value}
          onChange={e => this.onChangeValue(e.target.value)}
          ref={c => this.textareaRef = c}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
        />
      </div>
    )
  }

  renderPreview = () => {
    const { value } = this.state;
    console.log("🚀 ~ file: index.tsx:137 ~ MarkdownEditor ~ value", JSON.stringify(value))
    return (
      <div className='p-md-preview'>
        <MarkdownPreview themes="light" height='100%' value={value} />
      </div>
    )
  }

  render() {
    const { height } = this.props;
    const { previewAble, grammarAble } = this.state;
    console.info('--- state --->', this.state);
    return (
      <div className='g-markdown-editor' style={{ height }}>
        {this.renderHeader()}
        <div className='m-md-editor-preview'>
          {this.renderEditor()}
          {previewAble && this.renderPreview()}
          {grammarAble && this.renderExtra()}
        </div>
      </div>
    )
  }
}
