import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsListComponent } from './containers/receipts-list/receipts-list.component';
import { ReceiptsViewComponent } from './components/receipts-view/receipts-view.component';
import { ReceiptsEditComponent } from './components/receipts-edit/receipts-edit.component';
import { ReceiptsAddComponent } from './components/receipts-add/receipts-add.component';
import { WarehouseService } from './service/warehouse.service';
import { BaseService } from '../services/base.service';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { warehouseManagerouts } from '../common/routes';

@NgModule({
  declarations: [
    ReceiptsListComponent,
    ReceiptsViewComponent,
    ReceiptsEditComponent,
    ReceiptsAddComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(warehouseManagerouts),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [WarehouseService, BaseService],
})
export class WarehouseManageModule {}
