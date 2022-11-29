import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'src/app/common/const';
import { ProductService } from 'src/app/product-manage/service/product.service';
import { SupplierService } from 'src/app/supplier-manage/service/supplier.service';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'app-receipts-add',
  templateUrl: './receipts-add.component.html',
  styleUrls: ['./receipts-add.component.scss'],
})
export class ReceiptsAddComponent implements OnInit {
  @ViewChild('FormData')
  userInfo: any;
  FormData!: NgForm;
  supplierList: any;
  productList: any;
  totalprice: any;
  doOk = false;
  displayedColumns = [
    'id',
    'product',
    'quantity',
    'price',
    'total-price',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  constructor(
    public dialog: MatDialog,
    private supplierService: SupplierService,
    private warehouseService: WarehouseService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    await this.getSupplier();
    await this.getProduct();
    let info = localStorage.getItem(AppConst.LocalStorage.Auth.UserInfo);
    if (info) {
      this.userInfo = JSON.parse(info);
    }
    console.log(this.FormData);
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
      console.log(this.productList);
    }
  }

  //create receipt

  async createReceipt(data: any) {
    let response = await this.warehouseService.CreateReceipt(data);
    if (response.ok) {
      alert('tạo thành công');
    }
  }
}
