import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserManageService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //Get all user
  public async getAllUser(pageinfo?: any, position?: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl('users/getAll', pageinfo);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //create new user
  public async CreateUser(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('users/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update user
  public async UpdateUser(data: any, id: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `users/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get user by id
  public async GetUserById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`users/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //delete user
  public async DeleteUser(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`users/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      response;
    }
  }
  // ---------------------------------------------------------------------------------------
  //create shop information
  public async CreateShopInfo(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('shopInfo/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get shop information
  public async GetShopInfo(): Promise<any> {
    const response = await this.baseGetHttpClientUrl('shopInfo/getOne/1');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update shop
  public async updateShopInfo(data: any): Promise<any> {
    const response = await this.basePutHttpClientUrl('shopInfo/update/1', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
}
