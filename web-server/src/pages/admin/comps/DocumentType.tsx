/**
 * 文档类型
 */
import { USER_ROLE } from '@/constants';
import { usePagination, openModal } from '@/hooks';
import { documentService } from '@/services';
import { Button, message, Modal, Table } from 'antd';
import React from 'react';
import UpdateDocTypeModal from './UpdateDocTypeModal';
import { useAppSelector, userAction } from '@/stores';

function DocumentType() {
  const user = useAppSelector(userAction.userInfo);
  const { tableProps, paginationProps, debounceRefresh } = usePagination<IIdName>(async ({ limit, offset }) => {
    const res = await documentService.getDocumentTypes({ limit, offset })
    if (res?.code === 200) {
      return { dataSource: res.data.data, total: +res.data.total }
    }
    return { dataSource: [], total: 0 }
  })

  const handleDelete = (id) => {
    Modal.confirm({
      title: '删除文档类型',
      content: '是否删除文档类型?',
      icon: null,
      onOk: async () => {
        const res = await documentService.deleteDocumentType(id);
        if (res?.code === 200) {
          message.success('删除文档类型成功')
        }
        debounceRefresh()
      }
    })
  }

  const handleUpdate = (info?: IIdName) => {
    const { destroy } = openModal(UpdateDocTypeModal, {
      data: info,
      afterClose: (isOk) => {
        console.log("🚀 ~ file: DocumentType.tsx:47 ~ handleUpdate ~ isOk", isOk)
        destroy()
        debounceRefresh(isOk)
      }
    })
  }

  const columns = () => [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '名称', dataIndex: 'name', key: 'name' },
    {
      title: '操作', dataIndex: 'operation', key: 'operation', render: (_, record) => USER_ROLE.isAdmin(user.role) && (
        <>
          <Button type="link" onClick={() => handleUpdate(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
        </>
      )
    },
  ]

  return (
    <>
      <Button type="link" onClick={() => handleUpdate()}>新增</Button>
      <Table
        columns={columns()}
        {...tableProps}
        pagination={paginationProps as any}
        rowKey={r => r.id}
      />
    </>
  )
}

DocumentType.displayName = 'DocumentType';

export default DocumentType;
