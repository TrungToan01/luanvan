import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //get all supplier
  public async getAllSupplier(pageinfo?: any, position?: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(
      'supplier/getAll',
      pageinfo
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //create new Supplier
  public async CreateSupplier(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('supplier/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update Supplier
  public async UpdateSupplier(data: any, id: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `supplier/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get Supplier by id
  public async GetSupplierById(id: any) {
    const response = await this.baseGetHttpClientUrl(`supplier/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //delete Supplier

  public async DeleteSupplier(id: any) {
    const response = await this.baseDeleteHttpClientUrl(
      `supplier/delete/${id}`
    );
    if (response.ok) {
      return response;
    } else {
      response.message;
    }
  }
}
