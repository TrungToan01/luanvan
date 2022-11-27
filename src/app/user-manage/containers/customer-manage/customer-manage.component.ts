import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { UserManageService } from '../../service/user-manage.service';

@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.scss'],
})
export class CustomerManageComponent implements OnInit {
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
    'username',
    'email',
    'phone',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private userService: UserManageService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getallCustomer();
  }

  async getallCustomer() {
    let response = await this.userService.getAllUser();
    if (response.ok) {
      var newArray = response.data.filter(function (el: any) {
        return el.userRoleId == 4;
      });
      this.dataSource = new MatTableDataSource(newArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = newArray.length;
    }
  }

  //delete user
  async deleteUser(id: any) {
    if (this.doOk) {
      const response = await this.userService.DeleteUser(id);
      if (response.ok) {
        alert('đã xóa thành công');
        this.getallCustomer();
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
      this.deleteUser(id);
    });
  }
}
