import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { ProductDetailComponent } from './containers/product-detail/product-detail.component';
import { CartComponent } from './containers/cart/cart.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { OrderComponent } from './containers/order/order.component';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { pagesRoutes } from '../common/routes';
import { ProductsComponent } from './containers/products/products.component';
import { ProductTagComponent } from './components/product-tag/product-tag.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductDetailComponent,
    CartComponent,
    ProfileComponent,
    OrderComponent,
    ProductsComponent,
    ProductTagComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(pagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class PagesModule {}
