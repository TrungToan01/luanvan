import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductComponent } from './containers/product/product.component';
import { BrandComponent } from './containers/brand/brand.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { productManage } from '../common/routes';
import { ShareCoreService } from '../services/share-core.service';
import { ProductService } from './service/product.service';

@NgModule({
  declarations: [
    ProductComponent,
    BrandComponent,
    ViewProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(productManage),
  ],
  providers: [ShareCoreService, ProductService],
})
export class ProductManageModule {}
