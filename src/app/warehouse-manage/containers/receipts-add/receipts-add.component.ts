import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'src/app/common/const';
import { ProductService } from 'src/app/product-manage/service/product.service';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { SupplierService } from 'src/app/supplier-manage/service/supplier.service';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'app-receipts-add',
  templateUrl: './receipts-add.component.html',
  styleUrls: ['./receipts-add.component.scss'],
})
export class ReceiptsAddComponent implements OnInit {
  @ViewChild('formReceiptDetail')
  formReceiptDetail!: NgForm;
  @ViewChild('form1')
  form1!: NgForm;
  userInfo: any;
  supplierList: any;
  productList: any;
  totalprice = 0;
  doOk = false;
  displayedColumns = ['id', 'product', 'quantity', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;
  receiptId: any;

  constructor(
    private shareCoreService: ShareCoreService,
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
    let total = 0;
    var receiptId = this.receiptId;
    let response = await this.warehouseService.getAllReceiptDetail();
    if (response.ok) {
      var newArray = response.data.filter(function (el: any) {
        return el.receiptId == receiptId;
      });

      newArray.forEach((element: any) => {
        total = total + element.price * element.quantity;
      });
      this.totalprice = total;
      this.dataSource = new MatTableDataSource(newArray);
    }
  }

  async createReDetail() {
    const fmData = new FormGroup({
      receiptId: new FormControl(this.receiptId),
      productOptionId: new FormControl(
        this.formReceiptDetail.value.productOptionId
      ),
      price: new FormControl(this.formReceiptDetail.value.price),
      quantity: new FormControl(this.formReceiptDetail.value.quantity),
    });
    let response = await this.warehouseService.CreateReceiptDetail(
      fmData.value
    );
    if (response.ok) {
      this.getReceiptsDetail();
      this.formReceiptDetail.reset();
    } else {
      alert('không thể thêm sản phẩm');
    }
  }

  async submit() {
    let data = new FormGroup({
      total_price: new FormControl(this.totalprice),
    });
    let response = await this.warehouseService.UpdateReceipt(
      data.value,
      this.receiptId
    );
    if (response.ok) {
      alert('đã thêm thành công');
    }
  }

  //create receiptId
  async createReceipt() {
    const fmData = new FormGroup({
      supplierId: new FormControl(this.form1.value.supplierId),
      userId: new FormControl(this.userInfo.userId),
    });
    let response = await this.warehouseService.CreateReceipt(fmData.value);
    if (response.ok) {
      this.receiptId = response.data.id;
    }
  }

  //updare supplier
  async updateSupplier() {
    let response = await this.warehouseService.UpdateReceipt(
      this.form1.value,
      this.receiptId
    );
    if (response.ok) {
      return;
    }
  }

  //delete product on list
  async deleteProduct(id: any, price: any, quantity: any) {
    let response = await this.warehouseService.DeleteReceiptDetail(id);
    if (response.ok) {
      this.getReceiptsDetail();
    }
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
