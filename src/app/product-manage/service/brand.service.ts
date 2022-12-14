import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  public async createBrand(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('brands/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async getAllBrands(): Promise<any> {
    const response = await this.baseGetHttpClientUrl('brands/getAll');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async getBrandsById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`brands/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async updateBrands(id: any, data: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `brands/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  public async deleteBrand(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`brands/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
}
