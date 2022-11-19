import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManageComponent } from './containers/customer-manage/customer-manage.component';
import { EmployeeManageComponent } from './containers/employee-manage/employee-manage.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseService } from '../services/base.service';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { userManageRoutes } from '../common/routes';
import { UserManageService } from './service/user-manage.service';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [
    CustomerManageComponent,
    EmployeeManageComponent,
    ViewUserComponent,
    EditUserComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(userManageRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [UserManageService, BaseService],
})
export class UserManageModule {}
