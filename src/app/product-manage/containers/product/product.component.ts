import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  PageInfo: PageDataInfo = {
    size: 10,
    page: 0,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100],
  };
  displayedColumns = [
    'id',
    'createdAt',
    'brand',
    'product',
    'stock',
    'sold',
    'published',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private shareCoreService: ShareCoreService,
    public dialog: MatDialog,
    private productService: ProductService
  ) {}
  async ngOnInit() {
    await this.getAllProduct();
  }

  async getAllProduct() {
    let response = await this.productService.getAllProduct();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.data.length;
    }
  }

  //update published brand
  async published(id: any, data: any) {
    let formdata = new FormGroup({
      published: new FormControl(!data),
    });
    if (this.doOk) {
      let response = await this.productService.updateProduct(
        id,
        formdata.value
      );
      if (response.ok) {
        this.doOk = false;
        this.getAllProduct();
      } else {
        alert('không thể cập nhật');
        this.doOk = false;
      }
    }
    this.getAllProduct();
  }

  //confirm update published dialog
  confirmUpdate(id: any, data: any) {
    const updateDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'product.update-status',
      },
    });
    updateDialog.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.published(id, data);
    });
  }

  //delete product
  async delete(id: any) {
    if (this.doOk) {
      let response = await this.productService.deleteProduct(id);
      if (response.ok) {
        alert('đẫ xóa thành công');
        this.getAllProduct();
      } else {
        alert('có lỗi xảy ra');
      }
    }
  }

  //confirm delete dialog
  confirmDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'notification.confirm-delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.delete(id);
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
