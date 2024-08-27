// 编辑器语言类型
import { request } from '@/request';

// // 编辑器语言类型接口
// export const CONTENT_LANGUAGE_API = {
//   list: '/document/content/languages',
//   add: '/document/content/language',
//   edit: '/document/content/language/:id',
//   delete: '/document/content/language/:id',
// }

/**
 * 列表
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param query
 * @returns
 */
export function list(query: ILimitOffset): Promise<IBaseListRes<IIdName>> {
  return request.get({
    path: '/document/content/languages',
    query
  })
}

/**
 * 新增
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param name
 * @returns
 */
export function add(name: string): Promise<IBaseRes<IIdName>> {
  return request.post({
    path: '/document/content/language',
    data: { name }
  })
}

/**
 * 编辑
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param name
 * @returns
 */
export function edit(id: string, name: string): Promise<IBaseRes<IIdName>> {
  return request.put({
    path: `/document/content/language/${id}`,
    data: { name }
  })
}

/**
 * 删除
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param id
 * @returns
 */
export function deleteLanguage(id: string): Promise<IBaseRes> {
  return request.delete({
    path: `/document/content/language/${id}`,
  })
}
