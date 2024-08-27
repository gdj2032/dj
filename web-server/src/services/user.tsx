import { request } from '@/request';

export function login(params: UserService.ILoginParams): Promise<IBaseRes<UserService.IUser>> {
  return request.post({
    path: '/user/login',
    data: params
  })
}

export function logout(): Promise<IBaseRes> {
  return request.delete({
    path: '/user/logout',
  })
}

export function changePassword(parma: UserService.IResetPasswordInfo): Promise<IBaseRes> {
  return request.put({
    path: '/user/password',
    data: parma,
  })
}

export function getUsers(query: ILimitOffset): Promise<IBaseListRes<UserService.IUser>> {
  return request.get({
    path: '/user/users',
    query
  })
}

export function register(data: UserService.IRegisterUser): Promise<IBaseRes<UserService.IUser>> {
  return request.post({
    path: '/user/register',
    data
  })
}

export function deleteUser(id: number): Promise<IBaseRes<UserService.IUser>> {
  return request.delete({
    path: `/user/delete/${id}`,
  })
}
