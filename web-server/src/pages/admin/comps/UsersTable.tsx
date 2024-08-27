/**
 * 用户列表
 */
import { USER_ROLE } from '@/constants';
import { usePagination, openModal } from '@/hooks';
import { userService } from '@/services';
import { Button, message, Modal, Table } from 'antd';
import React from 'react';
import UpdateUserModal from './UpdateUserModal';
import { useAppSelector, userAction } from '@/stores';

function UsersTable() {
  const user = useAppSelector(userAction.userInfo);
  const { tableProps, paginationProps, debounceRefresh } = usePagination<UserService.IUser>(async ({ limit, offset }) => {
    const res = await userService.getUsers({ limit, offset })
    if (res?.code === 200) {
      return { dataSource: res.data.data, total: +res.data.total }
    }
    return { dataSource: [], total: 0 }
  })

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: '删除用户',
      content: '是否删除用户?',
      icon: null,
      onOk: async () => {
        const res = await userService.deleteUser(id);
        if (res?.code === 200) {
          message.success('删除用户成功')
        }
        debounceRefresh()
      }
    })
  }

  const handleAddUser = (userInfo?: UserService.IUser) => {
    openModal(UpdateUserModal, {
      data: userInfo,
      afterClose: (isOk) => {
        debounceRefresh(isOk)
      }
    })
  }

  const columns = () => [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '角色', dataIndex: 'role', key: 'role', render: (text) => (USER_ROLE.toString(text)) },
    {
      title: '操作', dataIndex: 'operation', key: 'operation', render: (_, record) => USER_ROLE.isAdmin(user.role) && (
        <>
          <Button type="link" onClick={() => handleAddUser(record)}>编辑</Button>
          <Button type="link" danger onClick={() => handleDeleteUser(record.id)}>删除</Button>
        </>
      )
    },
  ]

  return (
    <>
      <Button type="link" onClick={() => handleAddUser()}>新增</Button>
      <Table
        columns={columns()}
        {...tableProps}
        pagination={paginationProps as any}
        rowKey={r => r.id}
      />
    </>
  )
}

UsersTable.displayName = 'UsersTable';

export default UsersTable;
