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
import { UserManageModule } from './user-manage/user-manage.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SupplierManageModule } from './supplier-manage/supplier-manage.module';
import { OrderManageModule } from './order-manage/order-manage.module';
import { ProductManageModule } from './product-manage/product-manage.module';
import { NotificationManageModule } from './notification-manage/notification-manage.module';
import { StatisticalManageModule } from './statistical-manage/statistical-manage.module';
import { WarehouseManageModule } from './warehouse-manage/warehouse-manage.module';
import { ProductConfigurationModule } from './product-configuration/product-configuration.module';

//service
import { UserManageService } from './user-manage/service/user-manage.service';
import { BaseService } from './services/base.service';
import { AuthService } from './auth/service/auth.service';
import { ShareCoreService } from './services/share-core.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    ProductConfigurationModule,
    WarehouseManageModule,
    SupplierManageModule,
    OrderManageModule,
    ProductManageModule,
    NotificationManageModule,
    StatisticalManageModule,
    AppShareMaterialUiModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    RouterModule.forChild(mainRoutes),
    BrowserAnimationsModule,
    AuthModule,
    UserManageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [BaseService, AuthService, UserManageService, ShareCoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
