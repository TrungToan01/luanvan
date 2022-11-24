import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class RomService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }
  //create Rom
  public async createRom(data: any): Promise<any> {
    const res = await this.basePostHttpClientUrl('rom/add', data);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // get all Rom
  public async getAllRom(pageinfo?: any): Promise<any> {
    const res = await this.baseGetHttpClientUrl('rom/getall', pageinfo);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // get Rom by id
  public async getRomById(id?: any): Promise<any> {
    const res = await this.baseGetHttpClientUrl(`rom/getOne/${id}`);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // update Rom by id
  public async updateRom(id?: any, data?: any): Promise<any> {
    const res = await this.basePutHttpClientUrl(`rom/update/${id}`, data);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }

  // delete Rom by id
  public async deleteColot(id?: any): Promise<any> {
    const res = await this.baseDeleteHttpClientUrl(`rom/delete/${id}`);
    if (res.ok) {
      return res;
    } else {
      return res;
    }
  }
}
