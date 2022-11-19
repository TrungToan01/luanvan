import { query } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  GridRequestInfo,
  SearchParamRequest,
} from '../base-core-ui/interfaces/service-interface';
import { AppConst, HttpResponse } from '../common/const';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected get API_ENDPOINT() {
    return environment.apiUrl;
  }
  protected http: HttpClient;

  constructor(injector: Injector, protected router: Router) {
    this.http = injector.get(HttpClient);
  }

  //generationHttpHeaders
  private generationToken(httpHeaders: HttpHeaders) {
    const token = localStorage.getItem(AppConst.LocalStorage.Auth.TokenName);
    if (token) {
      httpHeaders = httpHeaders.set('token', token);
    }
    return httpHeaders;
  }

  //generationHttparams
  private generatePagingHttpParams(
    httpParams?: HttpParams,
    gridInfo?: GridRequestInfo
  ) {
    if (gridInfo) {
      if (gridInfo.size !== undefined) {
        httpParams = httpParams?.set('size', gridInfo.size.toString());
      }
      if (gridInfo.page && gridInfo.page >= 0) {
        httpParams = httpParams?.set('page', (gridInfo.page + 1).toString());
      }
    }
    return httpParams;
  }

  //handle Data
  private handleData(response: any): HttpResponse {
    let result: HttpResponse = {
      ok: true,
      msg: response && response.message ? response.message : undefined,
      data:
        response && response.data
          ? response.data
          : response.rows
          ? response.rows
          : undefined,
      token: response && response.token ? response.token : undefined,
      role: response && response.role ? response.role : undefined,
    };
    return result;
  }

  //handle Error
  private handleErrors(error: any): HttpResponse {
    let result: HttpResponse = {
      ok: false,
      code: error.status,
      msg: error?.message,
    };
    return result;
  }
  //base API put
  public async basePutHttpClientUrl(url: any, requestItem?: any): Promise<any> {
    try {
      let httpHeaders = new HttpHeaders();
      const httpHeader = this.generationToken(httpHeaders);
      let response = await firstValueFrom(
        this.http.put(this.API_ENDPOINT + url, requestItem, {
          headers: httpHeader,
        })
      );
      return await this.handleData(response);
    } catch (error) {
      return await this.handleErrors(error);
    }
  }
  //base API post
  protected async basePostHttpClientUrl(
    url: any,
    requestItem: any
  ): Promise<any> {
    try {
      let httpHeaders = new HttpHeaders();
      const httpHeader = this.generationToken(httpHeaders);
      let response = await firstValueFrom(
        this.http.post<any>(this.API_ENDPOINT + url, requestItem, {
          headers: httpHeader,
        })
      );
      return await this.handleData(response);
    } catch (error) {
      console.log(error);
      return await this.handleErrors(error);
    }
  }

  //base API get
  protected async baseGetHttpClientUrl(
    url: any,
    gridInfo?: GridRequestInfo,
    searchParams?: any
  ): Promise<any> {
    let httpHeaders = new HttpHeaders();
    let httpParams = new HttpParams();
    const httpHeader = this.generationToken(httpHeaders);
    const httpParam = this.generatePagingHttpParams(httpParams, gridInfo);
    try {
      let response = await firstValueFrom(
        this.http.get<any>(this.API_ENDPOINT + url, {
          params: httpParam,
          headers: httpHeader,
        })
      );
      return await this.handleData(response);
    } catch (error) {
      return await this.handleErrors(error);
    }
  }

  // Api delete
  protected async baseDeleteHttpClientUrl(url: any): Promise<any> {
    try {
      let httpHeaders = new HttpHeaders();
      const httpHeader = this.generationToken(httpHeaders);
      let response = await firstValueFrom(
        this.http.delete(this.API_ENDPOINT + url, {
          headers: httpHeader,
        })
      );
      return await this.handleData(response);
    } catch (error) {
      return await this.handleErrors(error);
    }
  }
}
