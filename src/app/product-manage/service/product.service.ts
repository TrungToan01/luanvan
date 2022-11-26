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
      return response.msg;
    }
  }

  //get one product
  public async getProductById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`product/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //create product
  public async createProduct(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(`product/add`, data);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
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
      return response.msg;
    }
  }

  //delete product
  public async deleteProduct(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`product/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //create image product
  public async createImage(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(
      'products_image/add',
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //delete image product
  public async deleteImage(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(
      `products_image/delete/${id}`
    );

    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }
}
