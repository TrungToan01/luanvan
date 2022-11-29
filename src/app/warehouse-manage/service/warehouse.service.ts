import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService extends BaseService {
  constructor(injector: Injector, router: Router) {
    super(injector, router);
  }

  //Get all Receipt
  public async getAllReceipt(pageinfo?: any, position?: any): Promise<any> {
    const response = await this.baseGetHttpClientUrl(
      'receipts/getall',
      pageinfo
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //create new Receipt
  public async CreateReceipt(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl('receipts/add', data);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update Receipt
  public async UpdateReceipt(data: any, id: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `receipts/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get Receipt by id
  public async GetReceiptById(id: any) {
    const response = await this.baseGetHttpClientUrl(`receipts/getOne/${id}`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //delete Receipt
  public async DeleteReceipt(id: any) {
    const response = await this.baseDeleteHttpClientUrl(
      `receipts/delete/${id}`
    );
    if (response.ok) {
      return response;
    } else {
      response.message;
    }
  }
  // -------------------------------------------------------------------------------------

  //Get all Receipt detail
  public async getAllReceiptDetail(
    pageinfo?: any,
    position?: any
  ): Promise<any> {
    const response = await this.baseGetHttpClientUrl(
      'receipt_detail/getall',
      pageinfo
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //create new Receipt detail
  public async CreateReceiptDetail(data: any): Promise<any> {
    const response = await this.basePostHttpClientUrl(
      'receipt_detail/add',
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //update Receipt detail
  public async UpdateReceiptDetail(data: any, id: any): Promise<any> {
    const response = await this.basePutHttpClientUrl(
      `receipt_detail/update/${id}`,
      data
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get Receipt by id
  public async GetReceiptDetailById(id: any) {
    const response = await this.baseGetHttpClientUrl(
      `receipt_detail/getOne/${id}`
    );
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //delete Receipt
  public async DeleteReceiptDetail(id: any) {
    const response = await this.baseDeleteHttpClientUrl(
      `receipt_detail/delete/${id}`
    );
    if (response.ok) {
      return response;
    } else {
      response.message;
    }
  }
}
