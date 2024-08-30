import { request } from '@/request';

/**
 * 所有页面
 * @returns {Promise<T_RESPONSE_BASE<ViewService.IView[]>>}
 */
export function all(): T_RESPONSE_BASE<ViewService.IView[]> {
  return request.get({
    path: '/view/all',
  })
}
