import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProductComponent } from './containers/product/product.component';
import { BrandComponent } from './containers/brand/brand.component';
import { ViewProductComponent } from './components/product-view/view-product.component';
import { EditProductComponent } from './components/product-edit/edit-product.component';
import { productManageRoutes } from '../common/routes';
import { ShareCoreService } from '../services/share-core.service';
import { ProductService } from './service/product.service';
import { AddBrandComponent } from './components/brand-add/add-brand.component';
import { EditBrandComponent } from './components/brand-edit/edit-brand.component';
import { BrandService } from './service/brand.service';
import { ProductAddComponent } from './components/product-add/product-add.component';

@NgModule({
  declarations: [
    ProductComponent,
    BrandComponent,
    ViewProductComponent,
    EditProductComponent,
    AddBrandComponent,
    EditBrandComponent,
    ProductAddComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(productManageRoutes),
  ],
  providers: [ShareCoreService, ProductService, BrandService],
})
export class ProductManageModule {}
