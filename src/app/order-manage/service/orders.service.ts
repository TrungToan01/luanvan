import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //get all order
  public async getAllorder(pageinfo?: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl('order/getAll', pageinfo);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //get one order
  public async getorderById(id: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(`order/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //create order
  public async createorder(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(`order/add`, data);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //update order
  public async updateorder(id: any, data: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `order/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //delete order
  public async deleteorder(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(`order/delete/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //create image order
  public async createImage(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('orders_image/add', data);
    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }

  //delete image order
  public async deleteImage(id: any): Promise<any> {
    const response = await this.baseDeleteHttpClientUrl(
      `orders_image/delete/${id}`
    );

    if (response.ok) {
      return response;
    } else {
      return response.msg;
    }
  }
}
