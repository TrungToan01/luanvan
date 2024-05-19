import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './common/routes';
import { AuthModule } from './auth/auth.module';
import { AppShareMaterialUiModule } from './base-core-ui/app.share.material.ui.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BaseService } from './services/base.service';
import { AuthService } from './auth/service/auth.service';
import { ShareCoreService } from './services/share-core.service';
import { HomeComponent } from './page/containers/home/home.component';
import { ProfileComponent } from './page/containers/profile/profile.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent,HomeComponent, ProfileComponent],
  imports: [

    AppShareMaterialUiModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    RouterModule.forChild(mainRoutes),
    BrowserAnimationsModule,
    AuthModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [BaseService, AuthService, ShareCoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
