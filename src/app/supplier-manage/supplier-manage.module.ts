import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './containers/supplier/supplier.component';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { supplierManageRoutes } from '../common/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ViewSupplierComponent } from './components/view-supplier/view-supplier.component';
import { EditSupplierComponent } from './components/edit-supplier/edit-supplier.component';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
import { SupplierService } from './service/supplier.service';
import { BaseService } from '../services/base.service';

@NgModule({
  declarations: [
    SupplierComponent,
    ViewSupplierComponent,
    EditSupplierComponent,
    AddSupplierComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(supplierManageRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [SupplierService, BaseService],
})
export class SupplierManageModule {}
