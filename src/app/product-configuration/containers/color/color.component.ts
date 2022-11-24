import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { AddColorComponent } from '../../components/color-add/add-color.component';
import { EditColorComponent } from '../../components/color-edit/edit-color.component';
import { ColorService } from '../../service/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  PageInfo: PageDataInfo = {
    size: 10,
    page: 0,
    total: 0,
    pageSizeOptions: [10, 20, 50, 100],
  };
  displayedColumns = ['id', 'createdAt', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(private colorService: ColorService, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.getColors();
  }

  async getColors() {
    let response = await this.colorService.getAllColor();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    }
  }
  //dialog create color
  createColor() {
    let dialogRef = this.dialog.open(AddColorComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getColors();
    });
  }
  //dialog edit color
  updateColor(colorId: any) {
    let dialogUpdate = this.dialog.open(EditColorComponent, {
      width: '400px',
      data: {
        id: colorId,
      },
    });
    dialogUpdate.afterClosed().subscribe((result) => {
      this.getColors();
    });
  }

  //delete color
  async deleteColor(id: any) {
    console.log(id);
    let response = await this.colorService.deleteColot(id);
    if (response.ok) {
      this.getColors();
    } else {
      alert('không thể xóa');
    }
  }

  confirmUpdate(id: any) {
    const updateDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'notification.confirm-delete',
      },
    });

    updateDialog.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.deleteColor(id);
    });
  }
}
