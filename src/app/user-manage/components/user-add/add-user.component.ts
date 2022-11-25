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
  fileToUpload!: File;
  imageSrc!: any;
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

  filechange(event: any) {
    this.fileToUpload = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);
    reader.readAsDataURL(this.fileToUpload);
  }

  async onSubmit() {
    if (this.doOk) {
      let data = this.createUserForm.value;
      const formData = new FormData();
      formData.append('avatar', this.fileToUpload);
      formData.set('email', data.email);
      formData.set('name', data.name);
      formData.set('phone', data.phone);
      formData.set('password', data.password);
      formData.set('userRoleId', data.userRoleId);
      formData.set('birthdate', data.birthdate);
      formData.set('gender', data.gender);

      let response = await this.userManageService.CreateUser(formData);
      if (response.ok) {
        alert('da tao thanh cong');
      } else {
        console.log(response);
      }
      return (this.doOk = false);
    }
    return;
  }

  async getAllRole() {
    let response = await this.shareCoreService.getAllRole();
    console.log(response);
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
