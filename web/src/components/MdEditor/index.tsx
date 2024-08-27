import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './index.scss';
import { fileService } from '@/services';
import { openModal } from '@/hooks';
import MDImportModal from './MDImportModal';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

interface IProps {
  value?: string;
  height?: number;
  onChange?: (v?: string) => void;
}

interface IState {
  value?: string;
}

export default class MdEditorView extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  handleEditorChange = (data) => {
    console.log('handleEditorChange', data);
    const { html, text } = data
    this.setState({
      value: html,
    })
    this.props.onChange?.(html)
  }

  handleUploadFn = async (file, cb) => {
    const formData = new FormData()
    formData.append('file', file)
    // formData.append('name', file.name)
    const res = await fileService.uploadFile(formData)
    if (res?.data?.url) {
      cb(res.data.url)
    }
  }

  uploadImage = () => new Promise((res, rej) => {
    const { destroy } = openModal(MDImportModal, {
      type: 'image',
      afterClose: (params) => {
        if (params?.isOk) {
          const { url, width, height, description } = params
          let v0 = url
          if (width && height) {
            v0 = `${url}?x-oss-process=image/resize,w_${width},h_${height}`
          }
          res({ text: description, url: v0 })
        }
        destroy()
        rej('close')
      }
    })
  })

  onCustomImageUpload = async () => {
    const res: any = await this.uploadImage()
    console.log("🚀 ~ file: index.tsx:83 ~ MdEditorView ~ onCustomImageUpload= ~ res", res)
    return res || { text: '', url: '' }
  }

  render() {
    const { height = 500 } = this.props;
    return (
      <MdEditor
        style={{ height }}
        renderHTML={text => mdParser.render(text)}
        onChange={this.handleEditorChange}
        // onImageUpload={this.handleUploadFn}
        onCustomImageUpload={this.onCustomImageUpload}
      />
    )
  }
}
