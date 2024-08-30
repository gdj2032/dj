declare namespace ViewService {
  interface IView {
    path: string;
    createTime: number;
    showInTab: boolean;
    canEdit: boolean;
    creatorId: string;
    name: string;
    viewType: string;
    updateTime: number;
    id: string;
    title: string;
    content: string;
    canCancel: boolean;
    role: IIdName;
    parentView: IView;
  }
}
