import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { userManageRoutes } from '../common/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    RouterModule.forChild(userManageRoutes),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class StatisticalManageModule {}
