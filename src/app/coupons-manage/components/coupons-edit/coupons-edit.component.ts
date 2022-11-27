import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CouponsService } from '../../service/coupons.service';

@Component({
  selector: 'app-coupons-edit',
  templateUrl: './coupons-edit.component.html',
  styleUrls: ['./coupons-edit.component.scss'],
})
export class CouponsEditComponent implements OnInit {
  @ViewChild('addCouponsForm')
  addCouponsForm!: NgForm;
  couponsInfo!: any;
  validateDate = false;

  constructor(
    private couponsService: CouponsService,
    public dialogRef: MatDialogRef<CouponsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    await this.getCouponsById(this.data.id);
  }

  async getCouponsById(id: any) {
    let response = await this.couponsService.getCouponsById(id);
    if (response.ok) {
      this.couponsInfo = response.data;
    }
  }

  onchangeDate() {
    let currentDate = new Date();
    let startDate = new Date(this.addCouponsForm.value.start_date);
    let endDate = new Date(this.addCouponsForm.value.end_date);
    if (endDate < currentDate) {
      return (this.validateDate = true);
    }
    if (startDate > endDate) {
      return (this.validateDate = true);
    }
    return (this.validateDate = false);
  }

  async onSubmit() {
    await this.onchangeDate();
    if (this.validateDate) {
      return;
    }
    let response = await this.couponsService.updateCoupons(
      this.data.id,
      this.addCouponsForm.value
    );
    if (response.ok) {
      alert('đã cập nhật công');
    } else {
      alert('không thể tạo');
    }
  }
}
