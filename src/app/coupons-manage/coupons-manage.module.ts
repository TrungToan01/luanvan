import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponsComponent } from './containers/coupons/coupons.component';
import { CouponsAddComponent } from './components/coupons-add/coupons-add.component';
import { CouponsEditComponent } from './components/coupons-edit/coupons-edit.component';
import { CouponsService } from './service/coupons.service';
import { ShareCoreService } from '../services/share-core.service';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { couponsManageRoutes } from '../common/routes';

@NgModule({
  declarations: [CouponsComponent, CouponsAddComponent, CouponsEditComponent],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(couponsManageRoutes),
  ],
  providers: [ShareCoreService, CouponsService],
})
export class CouponsManageModule {}
