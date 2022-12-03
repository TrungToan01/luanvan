import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannersComponent } from './containers/banners/banners.component';
import { BannersAddComponent } from './components/banners-add/banners-add.component';
import { BannersEditComponent } from './components/banners-edit/banners-edit.component';
import { BaseService } from '../services/base.service';
import { BannerService } from './service/banner.service';
import { ShareCoreService } from '../services/share-core.service';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { BannerManageRoutes } from '../common/routes';

@NgModule({
  declarations: [BannersComponent, BannersAddComponent, BannersEditComponent],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(BannerManageRoutes),
  ],
  providers: [ShareCoreService, BaseService, BannerService],
})
export class BannerManageModule {}
