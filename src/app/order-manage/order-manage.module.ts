import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './containers/orders/orders.component';
import { OrdersDetailComponent } from './containers/orders-detail/orders-detail.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrdersDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderManageModule { }
