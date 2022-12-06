import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //get all notification
  public async getallNoti(): Promise<any> {
    let response = await this.baseGetHttpClientUrl('notification/getall');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get one
  public async getOneNoti(id: any): Promise<any> {
    let response = await this.baseGetHttpClientUrl(`notification/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //create notification
  public async createNoti(data: any): Promise<any> {
    let response = await this.basePostHttpClientUrl(`notification/add`, data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update notification
  public async UpdateNoti(data: any, id: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `notification/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //delete notification
  public async DeleteNoti(id: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `notification/delete/${id}`
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
}
