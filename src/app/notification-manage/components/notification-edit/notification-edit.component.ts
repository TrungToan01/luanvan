import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.scss'],
})
export class NotificationEditComponent implements OnInit {
  @ViewChild('addNotifiForm')
  addNotifiForm!: NgForm;
  Notification: any;

  constructor(
    private NotiService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationEditComponent>
  ) {}

  async ngOnInit() {
    await this.getNoti();
  }

  async getNoti() {
    let response = await this.NotiService.getOneNoti(this.data.id);
    if (response.ok) {
      this.Notification = response.data;
    }
  }

  async onSubmit() {
    let data = this.addNotifiForm.value;
    if (!data.title || !data.content) {
      return;
    } else {
      let response = await this.NotiService.UpdateNoti(data, this.data.id);
      if (response.ok) {
        alert('đã cập nhật thành công');
      } else {
        alert('không thể tạo');
      }
    }
  }
}
