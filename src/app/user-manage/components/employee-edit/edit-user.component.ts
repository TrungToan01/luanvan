import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { ShareCoreService } from 'src/app/services/share-core.service';

import { UserManageService } from '../../service/user-manage.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId = this.route.snapshot.paramMap.get('id');
  userInfo: any;
  @ViewChild('UserForm')
  UserForm!: NgForm;
  confirmPass = true;
  imageSrc!: any;
  fileToUpload!: File;
  roleList: any;
  doOk = false;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private userManageService: UserManageService,
    private shareCoreService: ShareCoreService
  ) {}

  async ngOnInit() {
    await this.getAllRole();
    await this.getUserById(this.userId);
  }

  filechange(fileInputEvent: any) {
    this.fileToUpload = fileInputEvent.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);
    reader.readAsDataURL(this.fileToUpload);
  }

  async onSubmit() {
    if (this.doOk) {
      let data = this.UserForm.value;
      const formData = new FormData();
      if (this.fileToUpload) {
        formData.append('avatar', this.fileToUpload);
      }
      formData.set('name', data.name);
      formData.set('phone', data.phone);
      formData.set('userRoleId', data.userRoleId);
      formData.set('birthdate', data.birthdate);
      formData.set('gender', data.gender);

      const response = await this.userManageService.UpdateUser(
        formData,
        this.userId
      );
      if (response.ok) {
        this.doOk = false;
        alert('đã cập nhật thành công');
      } else {
        this.doOk = false;
        alert('không thể cập nhật ');
      }
    }
  }

  async getAllRole() {
    let response = await this.shareCoreService.getAllRole();
    if (response.ok) {
      var newArray = response.data.filter(function (el: any) {
        return el.id != '4';
      });
      this.roleList = newArray;
    }
  }

  async getUserById(id: any) {
    let response = await this.userManageService.GetUserById(id);
    if (response.ok) {
      this.userInfo = response.data;
    } else {
      alert(response);
    }
  }

  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'user.user-update',
        content: 'notification.confirm-update',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.onSubmit();
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
