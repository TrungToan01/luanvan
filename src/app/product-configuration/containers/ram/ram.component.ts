import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { AddRamComponent } from '../../components/ram-add/add-ram.component';
import { EditRamComponent } from '../../components/ram-edit/edit-ram.component';
import { RamService } from '../../service/ram.service';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.scss'],
})
export class RamComponent implements OnInit {
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
  constructor(
    private shareCoreService: ShareCoreService,
    private ramService: RamService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getRams();
  }

  async getRams() {
    let response = await this.ramService.getAllRam();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    }
  }

  //dialog create ram
  createRam() {
    let dialogRef = this.dialog.open(AddRamComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getRams();
    });
  }
  //dialog edit ram
  updateRam(ramId: any) {
    let dialogUpdate = this.dialog.open(EditRamComponent, {
      width: '400px',
      data: {
        id: ramId,
      },
    });
    dialogUpdate.afterClosed().subscribe((result) => {
      this.getRams();
    });
  }

  //delete ram
  async deleteRam(id: any) {
    let response = await this.ramService.deleteColot(id);
    if (response.ok) {
      this.getRams();
    } else {
      alert('không thể xóa');
    }
  }

  confirmDelete(id: any) {
    const updateDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'notification.confirm-delete',
      },
    });

    updateDialog.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.deleteRam(id);
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
