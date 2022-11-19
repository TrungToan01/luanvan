import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/service/auth.service';
import { AppConst } from './common/const';

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
  showFiller = true;

  constructor(
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService
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
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`/login`]);
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
}
