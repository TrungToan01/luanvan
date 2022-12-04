import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './containers/notifications/notifications.component';
import { NotificationAddComponent } from './components/notification-add/notification-add.component';
import { NotificationEditComponent } from './components/notification-edit/notification-edit.component';
import { AppShareMaterialUiModule } from '../base-core-ui/app.share.material.ui.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NotificationManageRoutes } from '../common/routes';
import { ShareCoreService } from '../services/share-core.service';
import { BrandService } from '../product-manage/service/brand.service';
import { NotificationService } from './service/notification.service';

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationAddComponent,
    NotificationEditComponent,
  ],
  imports: [
    CommonModule,
    AppShareMaterialUiModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(NotificationManageRoutes),
  ],
  providers: [ShareCoreService, NotificationService, BrandService],
})
export class NotificationManageModule {}
