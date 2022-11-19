import { Routes } from '@angular/router';
import { LoginComponent } from '../auth/containers/login/login.component';
import { RegisterComponent } from '../auth/containers/register/register.component';
import { AddProductComponent } from '../product-manage/components/add-product/add-product.component';
import { EditProductComponent } from '../product-manage/components/edit-product/edit-product.component';
import { ViewProductComponent } from '../product-manage/components/view-product/view-product.component';
import { ProductComponent } from '../product-manage/containers/product/product.component';
import { AddSupplierComponent } from '../supplier-manage/components/add-supplier/add-supplier.component';
import { EditSupplierComponent } from '../supplier-manage/components/edit-supplier/edit-supplier.component';
import { ViewSupplierComponent } from '../supplier-manage/components/view-supplier/view-supplier.component';
import { SupplierComponent } from '../supplier-manage/containers/supplier/supplier.component';
import { AddUserComponent } from '../user-manage/components/add-user/add-user.component';
import { EditUserComponent } from '../user-manage/components/edit-user/edit-user.component';
import { ViewUserComponent } from '../user-manage/components/view-user/view-user.component';
import { CustomerManageComponent } from '../user-manage/containers/customer-manage/customer-manage.component';
import { EmployeeManageComponent } from '../user-manage/containers/employee-manage/employee-manage.component';

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

export const productManage: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'supplier/view/:id', component: ViewProductComponent },
];
