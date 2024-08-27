/**
 * 新增/编辑文档组件
 */
import React, { useEffect, useState, useRef } from 'react';
import './index.scss';
import { CBreadcrumb, MarkdownEditor, MdEditor } from '@/components';
import { PathConfig } from '@/framework/routes/routes';
import { Card, Form, Input, Row, Col, Select, Button, message, Radio } from 'antd';
import { documentService } from '@/services';
import { openModal } from '@/hooks';
import UpdateDocTypeModal from '@/pages/admin/comps/UpdateDocTypeModal';
import { IRowItem } from '@/components/ItemsRow';
import { PreViewMarkDownModal } from '@/hooks/model';
import { useParams, useNavigate } from 'react-router-dom';
import { DOCUMENT_CONTENT_TYPE } from '@/constants';

interface IProps {
  type: 'ADD' | 'EDIT';
}

function AddEditDocView(props: IProps) {
  const { type = 'ADD' } = props;
  const { id } = useParams()
  const navigate = useNavigate()
  const isAdd = type === 'ADD';
  const route = [
    { name: '首页', url: PathConfig.home },
    { name: isAdd ? '新建文档' : '编辑文档' },
  ]
  const [types, setTypes] = useState<IIdName[]>([])
  const [editorValue, setEditorValue] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef<any>()

  const initTypes = async () => {
    const res = await documentService.getDocumentTypes({ limit: 1000000, offset: 0 })
    setTypes(res.data.data)
  }

  const initDoc = async () => {
    if (id) {
      const res = await documentService.getDocumentDetail(id)
      if (res?.code === 200) {
        setEditorValue(res.data.content)
        formRef.current?.setFieldsValue({
          name: res.data.name,
          types: res.data.types.map((e) => e.id),
          contentType: res.data.contentType,
          description: res.data.description,
          content: res.data.content,
        })
      }
    }
  }

  useEffect(() => {
    initTypes()
    initDoc()
  }, [])

  const handleSubmit = async () => {
    const params = await formRef.current?.validateFields()
    console.log("🚀 ~ file: index.tsx:57 ~ handleSubmit ~ params", params)
    setLoading(true)
    try {
      if (isAdd) {
        const res = await documentService.addDocument({
          name: params.name,
          types: params.types,
          content: params.content,
          description: params.description,
          contentType: params.contentType,
        })
        if (res?.code === 200) {
          message.success('新增文档成功')
          navigate(PathConfig.home)
        }
      } else {
        const res = await documentService.editDocument(id, {
          name: params.name,
          types: params.types,
          content: params.content,
          description: params.description,
          contentType: params.contentType,
        })
        if (res?.code === 200) {
          message.success('编辑文档成功')
          navigate(PathConfig.home)
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:61 ~ handleSubmit ~ error", error)
    }
    setLoading(false)
  }

  const customItems = (): IRowItem[] => [
    { label: '确定', onClick: handleSubmit, btnProps: { loading } }
  ]

  const handleUpdate = () => {
    const { destroy } = openModal(UpdateDocTypeModal, {
      afterClose: (isOk) => {
        destroy()
        if (isOk) {
          initTypes()
        }
      }
    })
  }

  const handleMd = () => {
    const { destroy } = openModal(PreViewMarkDownModal, {
      value: editorValue,
      afterClose: () => {
        destroy()
      }
    })
  }

  const contentCardTitle = (
    <Row align="middle">
      <div style={{ marginRight: 8 }}>
        <span className="global-red-point">*</span>
        正文
      </div>
      {/* <Tooltip title="正文内容必须符合MarkDown格式">
        <span className="global-black-symbol">?</span>
      </Tooltip> */}
      <Form.Item
        name="contentType"
        labelCol={{ span: 0 }}
        initialValue={DOCUMENT_CONTENT_TYPE.markdown}
        noStyle
      >
        <Radio.Group optionType="button" options={DOCUMENT_CONTENT_TYPE.options()} />
      </Form.Item>
    </Row>
  )
  return (
    <div className='g-add-edit-doc-view'>
      <CBreadcrumb route={route} customItems={customItems()} />
      <Form ref={c => formRef.current = c} labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
        <Card title="基本信息" style={{ marginTop: 20 }}>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder='请输入名称' />
          </Form.Item>
          <Row>
            <Col span={16}>
              <Form.Item
                label="类型"
                name="types"
                rules={[{ required: true, message: '请选择类型' }]}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select style={{ width: '100%' }} allowClear showSearch placeholder='请选择类型' optionFilterProp="name" options={types} fieldNames={{ label: 'name', value: 'id' }} mode='multiple' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button type="link" onClick={handleUpdate}>新增文档类型</Button>
            </Col>
          </Row>
          <Form.Item
            label="备注"
            name="description"
            className="text-area-resize-none"
          >
            <Input.TextArea placeholder="请输入备注" showCount maxLength={200} style={{ height: 120 }} spellCheck={false} />
          </Form.Item>
        </Card>
        <Card title={contentCardTitle} style={{ marginTop: 20 }} extra={<Button type="link" onClick={handleMd}>预览</Button>}>
          <Form.Item
            label=""
            name="content"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
          >
            {/* <BraftEditorView onChange={setEditorValue} /> */}
            {/* <Input.TextArea placeholder="请输入正文" onChange={(e) => setEditorValue(e.target.value)} showCount style={{ height: 300 }} /> */}
            {/* <MarkdownEditor height={500} onChange={(e) => setEditorValue(e)} /> */}
            <MdEditor height={500} onChange={(e) => setEditorValue(e)} />
          </Form.Item>
        </Card>
      </Form>
    </div>
  )
}

AddEditDocView.displayName = 'AddEditDocView';

export default AddEditDocView;
