import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //get all product
  public async getAllProduct(pageinfo?: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(
      'product/getAll',
      pageinfo
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get one product
  public async getProductById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`product/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //create product
  public async createProduct(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(`product/add`, data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update product
  public async updateProduct(id: any, data: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `product/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //delete product
  public async deleteProduct(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`product/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
  // ---------------------------------------------------------------------------------
  //get all brand
  public async createBrand(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('brands/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get all brand
  public async getAllBrands(): Promise<any> {
    const response = await this.baseGetHttpClientUrl('brands/getAll');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get all brand
  public async getBrandsById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`brands/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get all brand
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
  //get all brand
  public async deleteBrand(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`brands/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }
}
