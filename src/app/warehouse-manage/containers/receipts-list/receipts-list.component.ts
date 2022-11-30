import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageDataInfo } from 'src/app/base-core-ui/interfaces/service-interface';
import { WarehouseService } from '../../service/warehouse.service';

@Component({
  selector: 'app-receipts-list',
  templateUrl: './receipts-list.component.html',
  styleUrls: ['./receipts-list.component.scss'],
})
export class ReceiptsListComponent implements OnInit {
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
    'user',
    'supplier',
    'total_price',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doOk = false;
  constructor(
    public dialog: MatDialog,
    private warehouseService: WarehouseService
  ) {}

  async ngOnInit() {}
}
