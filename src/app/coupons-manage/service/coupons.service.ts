import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class CouponsService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //create coupons
  public async createCoupons(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('coupons/add', data);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //get all
  public async getAllCoupons(): Promise<any> {
    const response = await this.baseGetHttpClientUrl('coupons/getall');
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //get one
  public async getCouponsById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`coupons/getone/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //update
  public async updateCoupons(id: any, data: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `coupons/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //delete
  public async deleteCoupons(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`coupons/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }
}
