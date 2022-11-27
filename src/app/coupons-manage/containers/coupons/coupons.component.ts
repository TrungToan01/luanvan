import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { CouponsAddComponent } from '../../components/coupons-add/coupons-add.component';
import { CouponsEditComponent } from '../../components/coupons-edit/coupons-edit.component';
import { CouponsService } from '../../service/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
})
export class CouponsComponent implements OnInit {
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
    'code',
    'start_date',
    'end_date',
    'quantity',
    'used_quantity',
    'discount_value',
    'disabled',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private couponsService: CouponsService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllCoupons();
  }

  async getAllCoupons() {
    let response = await this.couponsService.getAllCoupons();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    }
  }

  //add coupons
  dialogAddCoupons() {
    const dialogRef = this.dialog.open(CouponsAddComponent, {
      width: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllCoupons();
    });
  }

  //update coupons
  dialogUpdateCoupons(id: any) {
    const dialogEdit = this.dialog.open(CouponsEditComponent, {
      width: '550px',
      data: {
        id: id,
      },
    });
    dialogEdit.afterClosed().subscribe((result) => {
      this.getAllCoupons();
    });
  }

  //delete coupons
  async deleteCoupons(id: any) {
    if (this.doOk) {
      let response = await this.couponsService.deleteCoupons(id);
      if (response.ok) {
        this.getAllCoupons();
      } else {
        alert('không thể xóa');
      }
      this.doOk = false;
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
      this.deleteCoupons(id);
    });
  }

  //confirm update published dialog
  confirmUpdate(id: any, data: any) {
    const updateDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'notification.confirm-disabled-coupons?',
      },
    });
    updateDialog.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.disabled(id, data);
    });
  }

  //update published brand
  async disabled(id: any, data: any) {
    let formdata = new FormGroup({
      disabled: new FormControl(!data),
    });
    if (this.doOk) {
      let response = await this.couponsService.updateCoupons(
        id,
        formdata.value
      );
      if (response.ok) {
        console.log(response);
        this.doOk = false;
        this.getAllCoupons();
      } else {
        alert('không thể cập nhật');
        this.doOk = false;
      }
    }
    this.getAllCoupons();
  }
}
