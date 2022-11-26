import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ShareCoreService extends BaseService {
  constructor(
    injector: Injector,
    router: Router,
    private titleService: Title,
    private translate: TranslateService
  ) {
    super(injector, router);
  }

  //get all role
  public async getAllRole() {
    const response = await this.baseGetHttpClientUrl(`user_role/getall`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get province
  public async getProvince() {
    const response = await this.baseGetHttpClientUrl('province/getall');
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  // get district
  public async getDistrict() {
    const response = await this.baseGetHttpClientUrl(`district/getall`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  //get wards
  public async getWards() {
    const response = await this.baseGetHttpClientUrl(`wards/getall`);
    if (response.ok) {
      return response;
    } else {
      return response;
    }
  }

  get historyUrls() {
    const historyUrlsString = sessionStorage.getItem('historyUrls');
    if (historyUrlsString) {
      const parseValue = JSON.parse(historyUrlsString);
      if (Array.isArray(parseValue)) {
        return parseValue;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }
  addNewHistoryUrl(url: string) {
    let currentHistoryUrls = this.historyUrls;
    if (currentHistoryUrls.length <= 0 || currentHistoryUrls[0] !== url) {
      currentHistoryUrls.unshift(url);
    }
    sessionStorage.setItem('historyUrls', JSON.stringify(currentHistoryUrls));
  }

  //go back
  goBack() {
    let currentHistoryUrls = this.historyUrls;
    if (currentHistoryUrls.length > 0) {
      currentHistoryUrls.shift();
    }
    sessionStorage.setItem('historyUrls', JSON.stringify(currentHistoryUrls));
    if (currentHistoryUrls.length > 0) {
      this.router.navigate([currentHistoryUrls[0]]);
    } else {
      this.router.navigate(['/']);
    }
  }

  capitalizeTitle(title: string) {
    let words = title.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return words.join(' ');
  }

  reloadTitlePage(title: any) {
    setTimeout(() => {
      this.titleService.setTitle(
        this.capitalizeTitle(this.translate.instant(title)) + ' - Fense'
      );
    }, 1000);
  }
}
