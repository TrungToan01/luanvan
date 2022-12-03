import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { BannersAddComponent } from '../../components/banners-add/banners-add.component';
import { BannersEditComponent } from '../../components/banners-edit/banners-edit.component';
import { BannerService } from '../../service/banner.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
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
    'image',
    'name',
    'userId',
    'published',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    private shareCoreService: ShareCoreService,
    private bannerService: BannerService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllBanner();
  }

  async getAllBanner() {
    let response = await this.bannerService.getAllBanners();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    }
  }

  //createBanner
  createBanner() {
    const dialogRef = this.dialog.open(BannersAddComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllBanner();
    });
  }

  //updateBanner
  dialogUpdateBanner(id: any) {
    const dialogEdit = this.dialog.open(BannersEditComponent, {
      width: '500px',
      data: {
        id: id,
      },
    });
    dialogEdit.afterClosed().subscribe((result) => {
      this.getAllBanner();
    });
  }

  //deleteBanner
  async deleteBanner(id: any) {
    if (this.doOk) {
      const response = await this.bannerService.deleteBrand(id);
      if (response.ok) {
        this.getAllBanner();
      } else {
        alert('không thể xóa');
      }
      this.doOk = false;
    }
  }

  //update publishedBanner
  async published(id: any, data: any) {
    let formdata = new FormGroup({
      published: new FormControl(!data),
    });
    if (this.doOk) {
      let response = await this.bannerService.updatebanners(id, formdata.value);
      if (response.ok) {
        console.log(response);
        this.doOk = false;
        this.getAllBanner();
      } else {
        alert('không thể cập nhật');
        this.doOk = false;
      }
    }

    this.getAllBanner();
  }

  //confirm update published dialog
  confirmUpdate(id: any, data: any) {
    const updateDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'banner.update-status',
      },
    });
    updateDialog.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.published(id, data);
    });
  }

  //confirm delete dialog
  confirmDialog(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'banner.banner-delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.deleteBanner(id);
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
