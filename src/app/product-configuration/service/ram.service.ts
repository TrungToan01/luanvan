import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class RamService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }
  //create Ram
  public async createRam(data: any): Promise<any> {
    const res = await this.basePostHttpClientUrl('ram/add', data);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // get all Ram
  public async getAllRam(pageinfo?: any): Promise<any> {
    const res = await this.baseGetHttpClientUrl('ram/getall', pageinfo);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // get Ram by id
  public async getRamById(id?: any): Promise<any> {
    const res = await this.baseGetHttpClientUrl(`ram/getOne/${id}`);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // update Ram by id
  public async updateRam(id?: any, data?: any): Promise<any> {
    const res = await this.basePutHttpClientUrl(`ram/update/${id}`, data);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // delete Ram by id
  public async deleteColot(id?: any): Promise<any> {
    const res = await this.baseDeleteHttpClientUrl(`ram/delete/${id}`);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }
}
