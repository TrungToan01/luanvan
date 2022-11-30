import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConst } from 'src/app/common/const';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { SupplierService } from 'src/app/supplier-manage/service/supplier.service';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'app-dialog-create-receipt',
  templateUrl: './dialog-create-receipt.component.html',
  styleUrls: ['./dialog-create-receipt.component.scss'],
})
export class DialogCreateReceiptComponent implements OnInit {
  @ViewChild('receiptFrom')
  receiptFrom!: NgForm;
  supplierList: any;
  userInfo: any;
  constructor(
    private supplierService: SupplierService,
    private warehouseService: WarehouseService,
    private shareCoreService: ShareCoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCreateReceiptComponent>
  ) {}

  async ngOnInit() {
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
    await this.getSupplier();
  }

  async getSupplier() {
    let response = await this.supplierService.getAllSupplier();
    if (response.ok) {
      this.supplierList = response.data;
    }
  }

  async onSubmit() {
    const fmData = new FormGroup({
      supplierId: new FormControl(this.receiptFrom.value.supplierId),
      userId: new FormControl(this.userInfo.userId),
    });

    let response = await this.warehouseService.CreateReceipt(fmData.value);
    if (response.ok) {
      this.dialogRef.close(response.data);
    } else {
      alert('không thể tạo');
    }
  }

  goBack() {
    this.dialogRef.close();
    this.shareCoreService.goBack();
  }
}
