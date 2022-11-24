import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //create color
  public async createColor(data: any): Promise<any> {
    const res = await this.basePostHttpClientUrl('color/add', data);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // get all color
  public async getAllColor(pageinfo?: any): Promise<any> {
    const res = await this.baseGetHttpClientUrl('color/getall');
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // get color by id
  public async getColorById(id?: any): Promise<any> {
    const res = await this.baseGetHttpClientUrl(`color/getOne/${id}`);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // update color by id
  public async updateColor(id?: any, data?: any): Promise<any> {
    const res = await this.basePutHttpClientUrl(`color/update/${id}`, data);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // delete color by id
  public async deleteColot(id?: any): Promise<any> {
    const res = await this.baseDeleteHttpClientUrl(`color/delete/${id}`);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }
}
