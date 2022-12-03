import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class BannerService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  public async getAllBanners() {
    const response = await this.baseGetHttpClientUrl('banners/getall');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async createBanner(data: any) {
    const response = await this.basePostHttpClientUrl('banners/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async getbannersById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`banners/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async updatebanners(id: any, data: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `banners/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async deleteBrand(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`banners/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
}
