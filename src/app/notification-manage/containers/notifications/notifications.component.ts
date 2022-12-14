import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { NotificationAddComponent } from '../../components/notification-add/notification-add.component';
import { NotificationEditComponent } from '../../components/notification-edit/notification-edit.component';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
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
    'title',
    'content',
    'user',
    'published',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private shareCoreService: ShareCoreService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllEmployee();
  }

  createNoti() {
    const dialogRef = this.dialog.open(NotificationAddComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllEmployee();
    });
  }

  EditNoti(id: any) {
    console.log(id);
    const dialogRef = this.dialog.open(NotificationEditComponent, {
      width: '500px',
      data: {
        id: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllEmployee();
    });
  }

  async getAllEmployee() {
    let response = await this.notificationService.getallNoti();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    } else {
      alert(response.msg);
    }
  }

  async deleteUser(id: any) {
    if (this.doOk) {
      const response = await this.notificationService.DeleteNoti(id);
      if (response.ok) {
        alert('???? x??a th??nh c??ng');
        this.getAllEmployee();
      } else {
        alert('kh??ng th??? x??a');
      }
    }
  }

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
      this.deleteUser(id);
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
