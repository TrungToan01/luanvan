import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { AddRomComponent } from '../../components/rom-add/add-rom.component';
import { EditRomComponent } from '../../components/rom-edit/edit-rom.component';
import { RomService } from '../../service/rom.service';

@Component({
  selector: 'app-rom',
  templateUrl: './rom.component.html',
  styleUrls: ['./rom.component.scss'],
})
export class RomComponent implements OnInit {
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
    private romService: RomService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getRoms();
  }

  async getRoms() {
    let response = await this.romService.getAllRom();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    }
  }

  //dialog create rom
  createRom() {
    let dialogRef = this.dialog.open(AddRomComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getRoms();
    });
  }
  //dialog edit rom
  updateRom(romId: any) {
    let dialogUpdate = this.dialog.open(EditRomComponent, {
      width: '400px',
      data: {
        id: romId,
      },
    });
    dialogUpdate.afterClosed().subscribe((result) => {
      this.getRoms();
    });
  }

  //delete rom
  async deleteRom(id: any) {
    let response = await this.romService.deleteColot(id);
    if (response.ok) {
      this.getRoms();
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
      this.deleteRom(id);
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
