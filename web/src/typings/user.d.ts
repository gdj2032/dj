declare namespace UserService {
  interface ILoginParams {
    username: string;
    password: string;
    remember?: boolean;
  }

  interface IResetPasswordInfo {
    password: string,
    oldPassword: string,
  }

  interface IResetMyPsdInfo {
    oldPassword: string;
    password: string;
  }

  interface IUser {
    id: string;
    username: string;
    createTime: string;
    role: string;
  }

  interface IRegisterUser {
    username: string;
    password: string;
    role: string;
  }

}
