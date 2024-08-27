// 此文件为编译时自动生成的代码，请勿更改, 改了也没有用
import { createPath } from './utils';
const pageRoutes = {
	admin: '/admin',
	homeAddDocument: '/home/document/add',
	homeDocumentDetail: (id) => createPath('/home/document/detail/:id', { id }),
	homeEditDocument: (id) => createPath('/home/document/edit/:id', { id }),
	home: '/home',
	login: '/login',
};
export default pageRoutes;
