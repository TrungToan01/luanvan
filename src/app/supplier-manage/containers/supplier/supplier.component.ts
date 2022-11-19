import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit {
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
    'name',
    'phone',
    'description',
    'address',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private supplierService: SupplierService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllSupplier();
  }

  async getAllSupplier() {
    let response = await this.supplierService.getAllSupplier();
    if (response.ok) {
      console.log(response.data);
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.data.length;
    } else {
      alert(response);
    }
  }

  //delete user
  async DeleteSupplier(id: any) {
    if (this.doOk) {
      const response = await this.supplierService.DeleteSupplier(id);
      if (response.ok) {
        alert('đã xóa thành công');
        this.getAllSupplier();
      } else {
        alert('không thể xóa');
      }
    }
  }

  confirmDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'user.delete-user',
        content: 'notification.confirm-delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.DeleteSupplier(id);
    });
  }
}
