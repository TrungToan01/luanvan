import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConst } from 'src/app/common/const';
import { BannerService } from '../../service/banner.service';
import { BannersAddComponent } from '../banners-add/banners-add.component';

@Component({
  selector: 'app-banners-edit',
  templateUrl: './banners-edit.component.html',
  styleUrls: ['./banners-edit.component.scss'],
})
export class BannersEditComponent implements OnInit {
  @ViewChild('addBannerForm')
  addBannerForm!: NgForm;
  fileToUpload!: File;
  imageSrc!: any;
  filename!: any;
  userInfo!: any;
  dataBanner: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bannerService: BannerService,
    public dialogRef: MatDialogRef<BannersAddComponent>
  ) {}

  async ngOnInit() {
    await this.getBannerById(this.data.id);
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
  }

  filechange(event: any) {
    this.fileToUpload = event.target.files[0];
    this.filename = this.fileToUpload.name;
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = reader.result);
    reader.readAsDataURL(this.fileToUpload);
  }

  async getBannerById(id: any) {
    let response = await this.bannerService.getbannersById(id);
    if (response.ok) {
      this.dataBanner = response.data;
      this.imageSrc = 'http://localhost:5000' + response.data.image;
      console.log(this.imageSrc);
    }
  }

  async deleteFile() {
    this.dataBanner.image = null;
    this.imageSrc = null;
  }

  async onSubmit() {
    let data = this.addBannerForm.value;
    if (!data.name || !this.imageSrc) {
      return;
    }
    const fromData = new FormData();
    if (this.fileToUpload) {
      fromData.append('image', this.fileToUpload);
    }

    fromData.set('name', data.name);
    fromData.set('userId', this.userInfo.userId);
    fromData.set('published', data.published);

    let response = await this.bannerService.updateBanner(
      this.data.id,
      fromData
    );
    if (response.ok) {
      this.dialogRef.close();
    } else {
      alert(response.msg);
    }
  }
}
