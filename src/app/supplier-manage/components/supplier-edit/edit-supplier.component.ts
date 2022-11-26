import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { SearchParamRequest } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss'],
})
export class EditSupplierComponent implements OnInit {
  supId = this.route.snapshot.paramMap.get('id');
  @ViewChild('formSupplier')
  formSupplier!: NgForm;
  SupplierInfo: any;
  province: any;
  district: any;
  wards: any;
  doOk = false;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private shareCoreService: ShareCoreService,
    private supService: SupplierService
  ) {}

  async ngOnInit() {
    await this.getSupplierData(this.supId);
    await this.getProvince();
    await this.getDistrict(this.SupplierInfo.provinceId);
    await this.getWard(this.SupplierInfo.districtId);
  }

  async getSupplierData(id: any) {
    const response = await this.supService.GetSupplierById(id);
    if (response.ok) {
      this.SupplierInfo = response.data;
    } else {
      console.log(response);
    }
  }

  async onSubmit() {
    if (this.doOk) {
      let response = await this.supService.UpdateSupplier(
        this.formSupplier.value,
        this.supId
      );
      this.doOk = false;
      if (response && response.ok) {
        alert('Đã cập nhật!');
        this.formSupplier.resetForm();
      } else {
        alert(response.msg);
      }
    }
  }

  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'user.update-supplier',
        content: 'notification.confirm-update',
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

  async getDistrict(id?: any) {
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
