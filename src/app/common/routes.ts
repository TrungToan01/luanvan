import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/containers/login/login.component';
import { RegisterComponent } from '../auth/containers/register/register.component';
import { ColorComponent } from '../product-configuration/containers/color/color.component';
import { RamComponent } from '../product-configuration/containers/ram/ram.component';
import { RomComponent } from '../product-configuration/containers/rom/rom.component';
import { ProductAddComponent } from '../product-manage/components/product-add/product-add.component';
import { EditProductComponent } from '../product-manage/components/product-edit/edit-product.component';
import { ViewProductComponent } from '../product-manage/components/product-view/view-product.component';
import { BrandComponent } from '../product-manage/containers/brand/brand.component';
import { ProductComponent } from '../product-manage/containers/product/product.component';
import { AddSupplierComponent } from '../supplier-manage/components/supplier-add/add-supplier.component';
import { EditSupplierComponent } from '../supplier-manage/components/supplier-edit/edit-supplier.component';
import { ViewSupplierComponent } from '../supplier-manage/components/supplier-view/view-supplier.component';
import { SupplierComponent } from '../supplier-manage/containers/supplier/supplier.component';
import { AddUserComponent } from '../user-manage/components/user-add/add-user.component';
import { EditUserComponent } from '../user-manage/components/user-edit/edit-user.component';
import { ViewUserComponent } from '../user-manage/components/user-view/view-user.component';
import { CustomerManageComponent } from '../user-manage/containers/customer-manage/customer-manage.component';
import { EmployeeManageComponent } from '../user-manage/containers/employee-manage/employee-manage.component';
import { ReceiptsAddComponent } from '../warehouse-manage/components/receipts-add/receipts-add.component';
import { ReceiptsEditComponent } from '../warehouse-manage/components/receipts-edit/receipts-edit.component';
import { ReceiptsViewComponent } from '../warehouse-manage/components/receipts-view/receipts-view.component';
import { ReceiptsListComponent } from '../warehouse-manage/containers/receipts-list/receipts-list.component';

export const mainRoutes: Routes = [];

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

export const userManageRoutes: Routes = [
  { path: 'employee', component: EmployeeManageComponent },
  { path: 'customer', component: CustomerManageComponent },
  { path: 'employee/add', component: AddUserComponent },
  { path: 'employee/edit/:id', component: EditUserComponent },
  { path: 'employee/view/:id', component: ViewUserComponent },
  { path: 'customer/view/:id', component: ViewUserComponent },
];

export const supplierManageRoutes: Routes = [
  { path: 'supplier', component: SupplierComponent },
  { path: 'supplier/edit/:id', component: EditSupplierComponent },
  { path: 'supplier/add', component: AddSupplierComponent },
  { path: 'supplier/view/:id', component: ViewSupplierComponent },
];

export const productManageRoutes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product/add', component: ProductAddComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: 'product/view/:id', component: ViewProductComponent },
  //brand
  { path: 'brands', component: BrandComponent },
];

export const warehouseManagerouts: Routes = [
  { path: 'warehouse', component: ReceiptsListComponent },
  { path: 'warehouse/add', component: ReceiptsAddComponent },
  { path: 'warehouse/view/:id', component: ReceiptsViewComponent },
  { path: 'warehouse/edit/:id', component: ReceiptsEditComponent },
];

export const ConfigurationManagerouts: Routes = [
  { path: 'ram', component: RamComponent },
  { path: 'rom', component: RomComponent },
  { path: 'color', component: ColorComponent },
];
