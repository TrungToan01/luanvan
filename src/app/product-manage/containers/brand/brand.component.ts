import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { AddBrandComponent } from '../../components/add-brand/add-brand.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  PageInfo: PageDataInfo = {
    size: 10,
    page: 0,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100],
  };
  displayedColumns = ['id', 'createdAt', 'name', 'published', 'action'];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllBrand();
  }

  async getAllBrand() {
    let response = await this.productService.getAllBrands();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    } else {
      alert(response);
    }
  }

  //create brand
  dialogAddBrand() {
    const dialogRef = this.dialog.open(AddBrandComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllBrand();
    });
  }

  //delete brand
  async deleteUser(id: any) {
    if (this.doOk) {
      const response = await this.productService.deleteBrand(id);
      if (response.ok) {
        alert('đã xóa thành công');
        this.getAllBrand();
      } else {
        alert('không thể xóa');
      }
      this.doOk = false;
    }
  }

  confirmDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'brand.delete-brand',
        content: 'notification.confirm-delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.deleteUser(id);
    });
  }
}
