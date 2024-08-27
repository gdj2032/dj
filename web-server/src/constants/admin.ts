export const ADMIN_TAB = {
  user: '1',
  ctxType: '2',
  context: '3',
  tabs: () => [
    { key: ADMIN_TAB.user, tab: '用户列表' },
    { key: ADMIN_TAB.ctxType, tab: '文档类型' },
    { key: ADMIN_TAB.context, tab: '文档列表' },
  ]
}

export const USER_ROLE = {
  admin: '1',
  commonUser: '2',
  options: () => [
    { label: '管理员', value: USER_ROLE.admin },
    { label: '普通用户', value: USER_ROLE.commonUser },
  ],
  isAdmin: (r) => r === USER_ROLE.admin,
  toString: (role: string) => {
    switch (role) {
      case '1':
        return '管理员'
      case '2':
        return '普通用户'
      default:
        return '未知'
    }
  }
}
