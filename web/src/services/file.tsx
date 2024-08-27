import { request } from "@/request";

// /**
//  * 下载文件
//  *
//  * @author gdj
//  * @date 2022-09-20
//  * @export
//  * @param query
//  * @returns
//  */
// export function downloadFile(id: string, isPreview?: boolean): Promise<[Error, any]> {
//   return fetchRequest.request({
//     path: `/files/${id}/download`,
//     query: { isPreview },
//     method: 'GET',
//   }, true)
// }

/**
 * 上传文件
 *
 * @author gdj
 * @date 2022-11-15
 * @export
 * @param formData
 * @returns
 */
export function uploadFile(data: FormData): Promise<IBaseRes<{
  id: string; filename: string; createTime: string; url: string;
}>> {
  return request.upload({
    path: '/file/upload',
    data,
  })
}
