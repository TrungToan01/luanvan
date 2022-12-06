import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { UserManageService } from '../../service/user-manage.service';

@Component({
  selector: 'app-shop-information',
  templateUrl: './shop-information.component.html',
  styleUrls: ['./shop-information.component.scss'],
})
export class ShopInformationComponent implements OnInit {
  @ViewChild('ShopInfo')
  ShopInfo!: NgForm;
  shopdata: any;
  province: any;
  district: any;
  wards: any;
  doOk = false;

  constructor(
    public dialog: MatDialog,
    private userManageService: UserManageService,
    private shareCoreService: ShareCoreService
  ) {}

  async ngOnInit() {
    await this.getData();
    await this.getProvince();
    this.getDistrict(this.shopdata?.provinceId);
    this.getWard(this.shopdata?.districtId);
  }
  async getData() {
    let response = await this.userManageService.GetShopInfo();
    if (response.ok) {
      this.shopdata = response.data;
    }
  }

  async createData() {
    console.log(this.ShopInfo.value);
    let response = await this.userManageService.CreateShopInfo(
      this.ShopInfo.value
    );
    if (response.ok) {
      this.shopdata = response.data;
    } else {
      alert('Không thể tạo');
    }
  }

  async updateData() {
    let response = await this.userManageService.updateShopInfo(
      this.ShopInfo.value
    );
    if (response.ok) {
      alert('cập nhật thông tin thành công');
      this.getData();
    } else {
      alert('cập nhật thất bại');
    }
  }

  async getProvince() {
    const response = await this.shareCoreService.getProvince();
    if (response.ok) {
      this.province = response.data;
    } else {
      alert(response.msg);
    }
  }

  async getDistrict(id: any) {
    const response = await this.shareCoreService.getDistrict();
    if (response.ok) {
      this.district = response.data.filter(function (data: any) {
        return data.provinceId == id;
      });
    } else {
      alert(response.msg);
    }
  }

  async getWard(id?: any) {
    const response = await this.shareCoreService.getWards();
    if (response.ok) {
      this.wards = response.data.filter(function (data: any) {
        return data.districtId == id;
      });
    } else {
      alert(response.msg);
    }
  }
  goBack() {
    this.shareCoreService.goBack();
  }
}
