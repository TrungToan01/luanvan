import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppConst } from 'src/app/common/const';
import { BannerService } from '../../service/banner.service';

@Component({
  selector: 'app-banners-add',
  templateUrl: './banners-add.component.html',
  styleUrls: ['./banners-add.component.scss'],
})
export class BannersAddComponent implements OnInit {
  @ViewChild('addBannerForm')
  addBannerForm!: NgForm;
  fileToUpload!: File;
  imageSrc!: any;
  filename!: any;
  userInfo!: any;

  constructor(
    private bannerService: BannerService,
    public dialogRef: MatDialogRef<BannersAddComponent>
  ) {}

  async ngOnInit() {
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

  async onSubmit() {
    let data = this.addBannerForm.value;
    if (!data.name || !data.public || !this.fileToUpload) {
      alert('vui lòng nhập nội dung');
      return;
    }
    const fromData = new FormData();
    fromData.append('image', this.fileToUpload);
    fromData.set('name', data.name);
    fromData.set('userId', this.userInfo.userId);
    fromData.set('published', data.published);

    let response = await this.bannerService.createBanner(fromData);
    if (response.ok) {
      this.dialogRef.close();
      alert('Đã thêm thành công');
    } else {
      alert('không thể tạo');
    }
  }
}
