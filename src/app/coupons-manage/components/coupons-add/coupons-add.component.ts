import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CouponsService } from '../../service/coupons.service';

@Component({
  selector: 'app-coupons-add',
  templateUrl: './coupons-add.component.html',
  styleUrls: ['./coupons-add.component.scss'],
})
export class CouponsAddComponent implements OnInit {
  @ViewChild('addCouponsForm')
  addCouponsForm!: NgForm;
  validateDate = false;

  constructor(
    private couponsService: CouponsService,
    public dialogRef: MatDialogRef<CouponsAddComponent>
  ) {}

  async ngOnInit() {}

  onchangeDate() {
    let currentDate = new Date();
    let startDate = new Date(this.addCouponsForm.value.start_date);
    let endDate = new Date(this.addCouponsForm.value.end_date);
    if (endDate < currentDate) {
      this.validateDate = true;
      return;
    }
    if (startDate > endDate) {
      this.validateDate = true;
      return;
    }
    this.validateDate = false;
    return;
  }

  async onSubmit() {
    let data = this.addCouponsForm.value;
    if (
      this.validateDate ||
      !data.code ||
      !data.quantity ||
      !data.discount_value
    ) {
      return;
    }
    let response = await this.couponsService.createCoupons(
      this.addCouponsForm.value
    );
    if (response.ok) {
      console.log(response);
      this.addCouponsForm.reset();
    } else {
      alert('không thể tạo');
    }
  }
}
