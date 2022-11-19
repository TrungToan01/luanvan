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
  imageSrc: string = '';
  fileToUpload: any;
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

  csvInputChange(fileInputEvent: any) {
    this.imageSrc = fileInputEvent.target.files[0];
  }

  async onSubmit() {
    if (this.doOk) {
      const response = await this.userManageService.UpdateUser(
        this.UserForm.value,
        this.userId
      );
      if (response.ok) {
        alert('đã cập nhật thành công');
      } else {
        alert('không thể cập nhật ');
      }
    }
  }

  async getAllRole() {
    let response = await this.shareCoreService.getAllRole();
    if (response.ok) {
      this.roleList = response.data;
    } else {
      alert('can get role');
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
        title: 'user.update-user',
        content: 'notification.confirm-update',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.onSubmit();
    });
  }
}
