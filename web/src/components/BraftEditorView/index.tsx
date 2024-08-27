import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { fileService } from '@/services';
import './index.scss'

const Editor: any = BraftEditor;

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export default class BraftEditorView extends React.Component<IProps> {
  state = {
    editorState: null
  }

  componentDidMount() {
    this.setState({
      editorState: BraftEditor.createEditorState(this.props.value)
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const curVal = this.state.editorState?.toHTML?.()
    if (nextProps.value !== curVal) {
      this.setState({
        editorState: BraftEditor.createEditorState(nextProps.value)
      })
    }
  }

  submitContent = async () => {
    const htmlContent = this.state.editorState?.toHTML?.()
    const { onChange } = this.props;
    onChange?.(htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState }, () => {
      this.submitContent()
    })
  }

  handleUploadFn = async (params) => {
    console.info('--- handleUploadFn params --->', params);
    const { file } = params;
    const formData = new FormData()
    formData.append('file', file)
    // formData.append('name', file.name)
    const res = await fileService.uploadFile(formData)
    if (res?.data?.url) {
      params.success({
        url: res.data.url,
        meta: {
          id: res.data.id,
          title: file.name,
        }
      })
    } else {
      params.error({
        msg: 'unable to upload.'
      })
    }
  }

  // handleValidateFn = (file: any) => new Promise((resolve, reject) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //   file?.size < 1024 * 100 ? resolve() : reject()
  // })

  render() {
    const { readOnly } = this.props;
    const { editorState } = this.state

    return (
      <Editor
        className="g-braft-editor"
        value={editorState}
        onChange={this.handleEditorChange}
        readOnly={readOnly}
        controls={
          [
            'undo', 'redo', 'separator',
            'font-size', 'line-height', 'letter-spacing', 'separator',
            'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
            'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
            'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
            'link', 'separator', 'hr', 'separator',
            'media',
            'separator',
            'clear'
          ]
        }
        media={{
          uploadFn: this.handleUploadFn,
          // validateFn: this.handleValidateFn
        }}
      />
    )
  }
}
