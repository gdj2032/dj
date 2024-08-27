declare namespace DocumentService {
  interface IGetDocumentsQuery extends ILimitOffset {
    nameLike?: string;
    types?: string; // 文档类型id 逗号隔开 例 1,2,3
  }

  interface IAddDocumentInfo {
    name: string;
    types: string[]; // 文档类型id
    content: string; // 正文内容
    contentType: string;
    description?: string;
  }

  interface IDocument {
    id: string;
    name: string;
    contentType: string;
    content: string;
    description: string;
    types: IIdName[]
  }

}
