import { request } from '@/request';

// // 文档类型接口
// export const DOCUMENT_TYPE_API = {
//   list: '/document/types',
//   add: '/document/type',
//   edit: '/document/type/:id',
//   delete: '/document/type/:id',
// }

// // 文档接口
// export const DOCUMENT_API = {
//   list: '/documents',
//   add: '/document',
//   detail: '/document/:id',
//   edit: '/document/:id',
//   delete: '/document/:id',
// }

// ------------------------------------------------------------ 文档类型 ------------------------------------------------------------

/**
 * 文档类型列表
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param query
 * @returns
 */
export function getDocumentTypes(query: ILimitOffset): Promise<IBaseListRes<IIdName>> {
  return request.get({
    path: '/document/types',
    query
  })
}

/**
 * 新增文档类型
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param name
 * @returns
 */
export function addDocumentType(name: string): Promise<IBaseRes<IIdName>> {
  return request.post({
    path: '/document/type',
    data: { name }
  })
}

/**
 * 编辑文档类型
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param name
 * @returns
 */
export function editDocumentType(id: string, name: string): Promise<IBaseRes<IIdName>> {
  return request.put({
    path: `/document/type/${id}`,
    data: { name }
  })
}

/**
 * 删除文档类型
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param id
 * @returns
 */
export function deleteDocumentType(id: string): Promise<IBaseRes> {
  return request.delete({
    path: `/document/type/${id}`,
  })
}

// ------------------------------------------------------------ 文档 ------------------------------------------------------------

/**
 * 获取文档列表
 *
 * @author gdj
 * @date 2023-01-13
 * @export
 * @param query
 * @returns
 */
export function getDocuments(query: DocumentService.IGetDocumentsQuery): Promise<IBaseListRes<DocumentService.IDocument>> {
  return request.get({
    path: '/documents',
    query,
  })
}

/**
 * 获取文档详情
 *
 * @author gdj
 * @date 2023-01-13
 * @export
 * @param id
 * @returns
 */
export function getDocumentDetail(id: string): Promise<IBaseRes<DocumentService.IDocument>> {
  return request.get({
    path: `/document/${id}`,
  })
}

/**
 * 新增文档类型
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param name
 * @returns
 */
export function addDocument(data: DocumentService.IAddDocumentInfo): Promise<IBaseRes<DocumentService.IDocument>> {
  return request.post({
    path: '/document',
    data,
  })
}

/**
 * 编辑文档类型
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param name
 * @returns
 */
export function editDocument(id: string, data: DocumentService.IAddDocumentInfo): Promise<IBaseRes<DocumentService.IDocument>> {
  return request.put({
    path: `/document/${id}`,
    data,
  })
}

/**
 * 删除文档类型
 *
 * @author gdj
 * @date 2022-12-09
 * @export
 * @param id
 * @returns
 */
export function deleteDocument(id: string): Promise<IBaseRes> {
  return request.delete({
    path: `/document/${id}`,
  })
}