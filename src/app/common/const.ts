export const AppConst = {
  Languages: {
    English: 'en-US',
    Vietnamese: 'vi-VN',
  },
  LocalStorage: {
    Auth: {
      TokenName: 'authToken',
      UserInfo: 'userInfo',
      Permissions: 'permissions',
      ForgotSendToken: 'forgotSendToken',
      role: 'rolename',
    },
    Language: 'pipeLanguage',
  },
  role: 'role',
  SessionStorage: {
    activeMenu: 'activeMenu',
  },
  ResponseMessage: {
    OK: 'OK',
  },
};
export interface HttpResponse {
  ok: boolean;
  code?: number | string;
  msg?: any[];
  data?: any;
  token?: any;
  length?: any;
}
