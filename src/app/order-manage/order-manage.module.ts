import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './containers/orders/orders.component';
import { OrdersDetailComponent } from './containers/orders-detail/orders-detail.component';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { OrderManageRoutes } from '../common/routes';
import { ShareCoreService } from '../services/share-core.service';
import { BaseService } from '../services/base.service';
import { OrdersService } from './service/orders.service';

@NgModule({
  declarations: [OrdersComponent, OrdersDetailComponent],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(OrderManageRoutes),
  ],
  providers: [ShareCoreService, BaseService, OrdersService],
})
export class OrderManageModule {}
