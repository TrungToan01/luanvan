import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from 'src/app/common/const';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  protected baseLoginSourceUrl = 'login';
  protected baseRegisterSourceYrl = 'register';
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //login
  public async login(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(
      this.baseLoginSourceUrl,
      data
    );
    if (response.ok) {
      localStorage.setItem(
        AppConst.LocalStorage.Auth.TokenName,
        response.token
      );
      localStorage.setItem(
        AppConst.LocalStorage.Auth.UserInfo,
        JSON.stringify(response.data)
      );
      localStorage.setItem(AppConst.role, JSON.stringify(response.role));
      this.getUerDetail();
      return response;
    } else {
      return response;
    }
  }

  //register
  public async register(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(
      this.baseRegisterSourceYrl,
      data
    );
    if (response.ok) {
      localStorage.setItem(
        AppConst.LocalStorage.Auth.TokenName,
        response.token
      );
      localStorage.setItem(
        AppConst.LocalStorage.Auth.UserInfo,
        JSON.stringify(response.data)
      );
      this.getUerDetail();
      localStorage.setItem(AppConst.role, JSON.stringify(response.role_id));
      return response;
    } else {
      return response;
    }
  }

  //get user detail
  getUerDetail() {
    let userInfo = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);

    if (userInfo) {
      const info = JSON.parse(userInfo);
      if (info && info.id) {
        return {
          userId: info.id,
          username: info.full_name,
          phone: info.phone,
          email: info.email,
        };
      }
    }
    return {};
  }

  //logout
  public logout() {
    localStorage.removeItem(AppConst.LocalStorage.Auth.TokenName);
    localStorage.removeItem(AppConst.LocalStorage.Auth.UserInfo);
    localStorage.removeItem(AppConst.LocalStorage.Auth.Permissions);
    sessionStorage.clear();
  }

  isAuthenticated() {
    return localStorage.getItem(AppConst.LocalStorage.Auth.TokenName)
      ? true
      : false;
  }

  get getLanguage() {
    return localStorage.getItem(AppConst.LocalStorage.Language);
  }

  updateLanguage(value: any) {
    localStorage.removeItem(AppConst.LocalStorage.Language);
    localStorage.setItem(AppConst.LocalStorage.Language, value);
  }
}
