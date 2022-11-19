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
  searchParams!: SearchParamRequest;
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
    await this.getDistrict(this.SupplierInfo.province_id);
    await this.getWard(this.SupplierInfo.district_id);
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
    let response = await this.supService.CreateSupplier(
      this.formSupplier.value
    );
    if (response && response.ok) {
      alert(response.msg ? response.mgs : 'Đã thêm thành công');
      this.formSupplier.resetForm();
    } else {
      alert(response.msg);
    }
  }
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

  async getDistrict(id?: any) {
    const response = await this.shareCoreService.getDistrict();
    if (response.ok) {
      this.district = response.data.filter(function (data: any) {
        return data.province_id == id;
      });
    } else {
      alert(response.msg);
    }
  }

  async getWard(id?: any) {
    const response = await this.shareCoreService.getWards();
    if (response.ok) {
      this.wards = response.data.filter(function (data: any) {
        return data.district_id == id;
      });
    } else {
      alert(response.msg);
    }
  }
}
