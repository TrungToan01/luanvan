import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareCoreService } from 'src/app/services/share-core.service';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss'],
})
export class ViewSupplierComponent implements OnInit {
  supId = this.route.snapshot.paramMap.get('id');
  supplierInfo: any;
  constructor(
    private route: ActivatedRoute,
    private supManageService: SupplierService,
    private shareCoreService: ShareCoreService
  ) {}

  async ngOnInit() {
    await this.getSupplierById(this.supId);
  }

  async getSupplierById(id: any) {
    let response = await this.supManageService.GetSupplierById(id);
    if (response.ok) {
      this.supplierInfo = response.data;
    } else {
      alert(response.msg);
    }
  }

  goBack() {
    this.shareCoreService.goBack();
  }
}
