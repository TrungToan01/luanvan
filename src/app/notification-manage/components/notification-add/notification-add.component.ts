import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppConst } from 'src/app/common/const';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification-add',
  templateUrl: './notification-add.component.html',
  styleUrls: ['./notification-add.component.scss'],
})
export class NotificationAddComponent implements OnInit {
  @ViewChild('addNotifiForm')
  addNotifiForm!: NgForm;
  userInfo: any;

  constructor(
    private NotiService: NotificationService,
    public dialogRef: MatDialogRef<NotificationAddComponent>
  ) {}

  async ngOnInit() {
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
  }

  async onSubmit() {
    let data = this.addNotifiForm.value;
    if (!data.title || !data.content) {
      return;
    } else {
      const fmData = new FormGroup({
        userId: new FormControl(this.userInfo.userId),
        title: new FormControl(this.addNotifiForm.value.title),
        content: new FormControl(this.addNotifiForm.value.content),
        published: new FormControl(this.addNotifiForm.value.published),
      });
      console.log(fmData.value);
      let response = await this.NotiService.createNoti(fmData.value);
      if (response.ok) {
        alert('đã thêm thành công');
        this.addNotifiForm.reset();
      } else {
        alert('không thể tạo');
      }
    }
  }
}
