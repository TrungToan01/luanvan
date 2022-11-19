import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { UserManageService } from '../../service/user-manage.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss'],
})
export class EmployeeManageComponent implements OnInit {
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
    'rolename',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private userService: UserManageService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllEmployee();
  }

  async getAllEmployee() {
    let response = await this.userService.getAllUser();
    if (response.ok) {
      var newArray = response.data.filter(function (el: any) {
        return el.userRoleId < 4;
      });
      this.dataSource = new MatTableDataSource(newArray);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = newArray.length;
    } else {
      alert(response);
    }
  }

  //delete user
  async deleteUser(id: any) {
    if (this.doOk) {
      const response = await this.userService.DeleteUser(id);
      if (response.ok) {
        alert('đã xóa thành công');
        this.getAllEmployee();
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
