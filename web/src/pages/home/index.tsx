import React, { useEffect, useState, useRef } from 'react'
import { Button, Col, Form, Input, Row, Select, Table, Modal } from 'antd';
import './index.scss';
import { documentService } from '@/services';
import { useNavigate } from 'react-router-dom';
import { PathConfig } from '@/framework/routes/routes';
import { usePagination } from '@/hooks';

export const RoutePath = '/home';

const Home = () => {
  const navigate = useNavigate()
  const [types, setTypes] = useState<IIdName[]>([])
  const formRef = useRef<any>()

  const initTypes = async () => {
    const res = await documentService.getDocumentTypes({ limit: 1000000, offset: 0 })
    setTypes(res.data.data)
  }
  useEffect(() => {
    initTypes()
  }, [])

  const { tableProps, paginationProps, debounceRefresh } = usePagination(async ({ limit, offset }) => {
    const params = await formRef.current?.validateFields() || {}
    console.log("🚀 ~ file: index.tsx:26 ~ const{tableProps,paginationProps,debounceRefresh}=usePagination ~ formRef.current", formRef.current)
    const res = await documentService.getDocuments({
      limit,
      offset,
      ...params,
      types: params.types?.join(',')
    })
    return {
      dataSource: res?.data?.data || [],
      total: +(res?.data?.total || 0),
    }
  })

  const handleDelete = (item) => {
    Modal.confirm({
      title: '是否删除文档?',
      okText: '确认',
      cancelText: '取消',
      icon: null,
      onOk: async () => {
        const res = await documentService.deleteDocument(item.id);
        debounceRefresh(res?.code !== 200)
      }
    })
  }

  const columns = [
    { title: '标题', dataIndex: 'name', render: (t, r) => <Button type="link" onClick={() => navigate(PathConfig.homeDocumentDetail(r.id))}>{t}</Button> },
    { title: '类型', dataIndex: 'types', render: t => t?.map(e => e.name)?.join(',') },
    { title: '备注', dataIndex: 'description', render: t => t || '-' },
    {
      title: '操作', dataIndex: 'operations', render: (t, r) => (
        <>
          <Button type="link" onClick={() => navigate(PathConfig.homeEditDocument(r.id))}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(r)}>删除</Button>
        </>
      )
    },
  ]

  const handleCreate = () => {
    navigate(PathConfig.homeAddDocument)
  }
  return (
    <div className="g-home">
      <Form labelCol={{ span: 6 }} ref={c => formRef.current = c}>
        <Row>
          <Col span={8}>
            <Form.Item label="关键词" name="nameLike">
              <Input placeholder='请输入' />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="类型" name="types">
              <Select allowClear showSearch placeholder='请选择类型' optionFilterProp="name" options={types} fieldNames={{ label: 'name', value: 'id' }} mode='multiple' />
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Button type="default" style={{ marginRight: 20 }} onClick={() => { formRef.current?.resetFields(); debounceRefresh(true); }}>重置</Button>
            <Button type="primary" style={{ marginRight: 20 }} onClick={() => debounceRefresh(true)}>搜索</Button>
            <Button type="primary" onClick={handleCreate}>新建文档</Button>
          </Col>
        </Row>
      </Form>
      <Table
        {...tableProps}
        columns={columns}
        pagination={paginationProps as any}
        rowKey={e => e.id}
      />
    </div>
  )
}

export default Home
