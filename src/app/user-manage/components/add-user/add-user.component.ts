import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { ShareCoreService } from 'src/app/services/share-core.service';

import { UserManageService } from '../../service/user-manage.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('createUserForm')
  createUserForm!: NgForm;
  confirmPass = true;
  imageSrc: string = '';
  fileToUpload!: File;
  roleList: any;
  doOk = false;

  constructor(
    public dialog: MatDialog,
    private userManageService: UserManageService,
    private shareCoreService: ShareCoreService
  ) {}

  async ngOnInit() {
    await this.getAllRole();
  }

  async onSubmit() {
    if (this.doOk) {
      this.createUserForm.form.value.avatar = new File(
        [this.createUserForm.form.value.avatar],
        'avatar.jpg',
        { type: 'image/jpg' }
      );
      let response = await this.userManageService.CreateUser(
        this.createUserForm.value
      );
      if (response.ok) {
        alert('da tao thanh cong');
      } else {
        console.log(response);
      }
    }
    return;
  }

  async getAllRole() {
    let response = await this.shareCoreService.getAllRole();
    if (response.ok) {
      this.roleList = response.data;
    } else {
      console.log(response);
    }
  }

  confirmDialog() {
    //check password
    if (
      this.createUserForm.value.password !=
      this.createUserForm.value.passwordconfirm
    ) {
      this.confirmPass = false;
      return;
    }
    this.confirmPass = true;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'user.create-user',
        content: 'notification.confirm-create',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.onSubmit();
    });
  }
}
