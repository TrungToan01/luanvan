import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './containers/notifications/notifications.component';
import { NotificationAddComponent } from './components/notification-add/notification-add.component';
import { NotificationEditComponent } from './components/notification-edit/notification-edit.component';



@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationAddComponent,
    NotificationEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NotificationManageModule { }
