import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'src/app/common/const';
import { ProductService } from 'src/app/product-manage/service/product.service';
import { SupplierService } from 'src/app/supplier-manage/service/supplier.service';
import { DialogCreateReceiptComponent } from '../../components/dialog-create-receipt/dialog-create-receipt.component';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'app-receipts-add',
  templateUrl: './receipts-add.component.html',
  styleUrls: ['./receipts-add.component.scss'],
})
export class ReceiptsAddComponent implements OnInit {
  @ViewChild('formReceiptDetail')
  formReceiptDetail!: NgForm;
  userInfo: any;
  supplierList: any;
  productList: any;
  totalprice: any;
  data: any;
  doOk = false;
  displayedColumns = ['id', 'product', 'quantity', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private supplierService: SupplierService,
    private warehouseService: WarehouseService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.createNewReceipt();
    await this.getSupplier();
    await this.getProduct();
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
  }

  async getSupplier() {
    let response = await this.supplierService.getAllSupplier();
    if (response.ok) {
      this.supplierList = response.data;
    }
  }
  async getProduct() {
    let response = await this.productService.getAllProduct();
    if (response.ok) {
      this.productList = response.data;
    }
  }
  async getReceiptsDetail() {
    let response = await this.warehouseService.getAllReceiptDetail();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
    }
  }

  async createReDetail() {
    const fmData = new FormGroup({
      receiptId: new FormControl(this.data.id),
      productOptionId: new FormControl(
        this.formReceiptDetail.value.productOptionId
      ),
      price: new FormControl(this.formReceiptDetail.value.price),
      quantity: new FormControl(this.formReceiptDetail.value.quantity),
    });
    console.log(fmData.value);
    let response = await this.warehouseService.CreateReceiptDetail(
      fmData.value
    );
    if (response.ok) {
      this.getReceiptsDetail();
    } else {
      alert('không thể thêm sản phẩm');
    }
  }
  createNewReceipt() {
    let dialogRef = this.dialog.open(DialogCreateReceiptComponent, {
      width: '400px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
    });
  }
}
