import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ShareCoreService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //get all role
  public async getAllRole() {
    const response = await this.baseGetHttpClientUrl(`user_role/getall`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get province
  public async getProvince() {
    const response = await this.baseGetHttpClientUrl('province/getall');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  // get district
  public async getDistrict() {
    const response = await this.baseGetHttpClientUrl(`district/getall`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get wards
  public async getWards() {
    const response = await this.baseGetHttpClientUrl(`wards/getall`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
}
