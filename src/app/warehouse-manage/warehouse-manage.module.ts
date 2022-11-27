import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsListComponent } from './containers/receipts-list/receipts-list.component';
import { ReceiptsEditComponent } from './containers/receipts-edit/receipts-edit.component';
import { ReceiptsAddComponent } from './containers/receipts-add/receipts-add.component';
import { WarehouseService } from './service/warehouse.service';
import { BaseService } from '../services/base.service';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { warehouseManageRoutes } from '../common/routes';

@NgModule({
  declarations: [
    ReceiptsListComponent,
    ReceiptsEditComponent,
    ReceiptsAddComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(warehouseManageRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [WarehouseService, BaseService],
})
export class WarehouseManageModule {}
