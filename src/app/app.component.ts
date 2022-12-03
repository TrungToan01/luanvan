import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/service/auth.service';
import { AppConst } from './common/const';
import { ShareCoreService } from './services/share-core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  userInfo: any;
  languages: string[] = Object.values(AppConst.Languages);
  currentLanguage = AppConst.Languages.Vietnamese;
  isAdmin = false;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService,
    private coreShareService: ShareCoreService
  ) {
    translate.addLangs(this.languages);

    const languages = localStorage.getItem(AppConst.LocalStorage.Language);
    if (languages && this.languages.indexOf(languages) >= 0) {
      this.currentLanguage = languages;
    }

    translate.setDefaultLang(this.currentLanguage);
    translate.use(this.currentLanguage);
    this.authService.updateLanguage(this.currentLanguage);
  }

  async ngOnInit() {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationStart) {
        await this.checkAuth();
        this.coreShareService.addNewHistoryUrl(event.url);
      }
    });
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
  }

  logout() {
    this.authService.logout();
  }

  changeLanguage(value: any) {
    if (this.currentLanguage !== value) {
      this.authService.updateLanguage(value);
      window.location.reload();
    }
  }
  getLanguageDisplay(lang: any, showCurrent: any) {
    let languageDisplay = '';
    switch (lang) {
      case AppConst.Languages.English:
        languageDisplay = this.translate.instant(
          'language.' + AppConst.Languages.English
        );
        break;
      case AppConst.Languages.Vietnamese:
        languageDisplay = this.translate.instant(
          'language.' + AppConst.Languages.Vietnamese
        );
        break;
      default:
        languageDisplay = this.translate.instant(
          'language.' + AppConst.Languages.Vietnamese
        );
        break;
    }
    if (showCurrent === undefined || showCurrent === true) {
      languageDisplay += this.currentLanguage === lang ? ' (\u2713)' : '';
    }
    return languageDisplay;
  }

  async checkAuth() {
    this.isAdmin = this.authService.isAdmin();
  }
}
