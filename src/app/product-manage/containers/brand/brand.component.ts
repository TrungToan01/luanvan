import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/base-core-ui/dialog/confirm-dialog/confirm-dialog.component';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { AddBrandComponent } from '../../components/brand-add/add-brand.component';
import { EditBrandComponent } from '../../components/brand-edit/edit-brand.component';
import { BrandService } from '../../service/brand.service';

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
    private shareCoreService: ShareCoreService,
    private brandService: BrandService,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    await this.getAllBrand();
  }

  async getAllBrand() {
    let response = await this.brandService.getAllBrands();
    if (response.ok) {
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.PageInfo.total = response.length;
    }
  }

  //create brand
  createBrand() {
    const dialogRef = this.dialog.open(AddBrandComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllBrand();
    });
  }

  //update brand
  dialogUpdateBrand(id: any) {
    const dialogEdit = this.dialog.open(EditBrandComponent, {
      width: '400px',
      data: {
        id: id,
      },
    });
    dialogEdit.afterClosed().subscribe((result) => {
      this.getAllBrand();
    });
  }

  //delete brand
  async deleteBrand(id: any) {
    if (this.doOk) {
      const response = await this.brandService.deleteBrand(id);
      if (response.ok) {
        this.getAllBrand();
      } else {
        alert('kh??ng th??? x??a');
      }
      this.doOk = false;
    }
  }

  //update published brand
  async published(id: any, data: any) {
    let formdata = new FormGroup({
      published: new FormControl(!data),
    });
    if (this.doOk) {
      let response = await this.brandService.updateBrands(id, formdata.value);
      if (response.ok) {
        console.log(response);
        this.doOk = false;
        this.getAllBrand();
      } else {
        alert('kh??ng th??? c???p nh???t');
        this.doOk = false;
      }
    }
    this.getAllBrand();
  }

  //confirm update published dialog
  confirmUpdate(id: any, data: any) {
    const updateDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'notification.notification',
        content: 'brand.update-status',
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
        title: 'brand.brand-delete',
        content: 'notification.confirm-delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.doOk = result;
      this.deleteBrand(id);
    });
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
