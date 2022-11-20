import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { SearchParamRequest } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  @ViewChild('formSupplier')
  formSupplier!: NgForm;
  searchParams!: SearchParamRequest;
  province: any;
  district: any;
  wards: any;
  doOk = false;
  constructor(
    public dialog: MatDialog,
    private shareCoreService: ShareCoreService,
    private supService: SupplierService
  ) {}

  async ngOnInit() {
    await this.getProvince();
  }
  async onSubmit() {
    if (this.doOk) {
      let response = await this.supService.CreateSupplier(
        this.formSupplier.value
      );
      this.doOk = false;
      if (response && response.ok) {
        alert('Đã thêm thành công');
        this.formSupplier.resetForm();
      } else {
        alert(response.msg);
      }
    }
  }

  //submit
  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'user.create-supplier',
        content: 'notification.confirm-create',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.onSubmit();
    });
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
}
